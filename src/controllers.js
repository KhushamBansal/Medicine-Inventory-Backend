const Medicine = require('./models');

// Middleware for image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create Medicine
const createMedicine = async (req, res) => {
    try {
        const { name, price, discountPrice, quantity, manufacturer } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const medicine = new Medicine({ name, price, discountPrice, quantity, manufacturer, imageUrl });
        await medicine.save();
        res.status(201).json(medicine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Medicines
const getMedicines = async (req, res) => {
    try {
        const redisClient = req.redisClient;
        
        // Create a cache key based on the query parameters
        const cacheKey = `medicines:${JSON.stringify(req.query)}`;

        // Try to get data from Redis cache
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            // If data is in cache, return it
            console.log("Getting data from Redis")
            return res.status(200).json(JSON.parse(cachedData));
        }

        // If not in cache, query the database
        let query = Medicine.find();
        
        // Filtering
        if (req.query.manufacturer) {
            query = query.where('manufacturer').equals(req.query.manufacturer);
        }
        
        // Searching
        if (req.query.name) {
            query = query.where('name').regex(new RegExp(req.query.name, 'i'));
        }
        
        // Sorting
        if (req.query.sortBy) {
            const sortCriteria = req.query.sortBy.split(',').join(' ');
            query = query.sort(sortCriteria);
        }

        const medicines = await query.exec();

        // Store the result in Redis cache
        await redisClient.set(cacheKey, JSON.stringify(medicines), {
            EX: 3600 // Set expiration to 1 hour (3600 seconds)
        });

        res.status(200).json(medicines);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Medicine
const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.status(200).json(medicine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Medicine
const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.status(200).json({ message: 'Medicine deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createMedicine,
    getMedicines,
    updateMedicine,
    deleteMedicine,
    upload,
};



