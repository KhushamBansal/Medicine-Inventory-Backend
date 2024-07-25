const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    quantity: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Medicine', medicineSchema);
