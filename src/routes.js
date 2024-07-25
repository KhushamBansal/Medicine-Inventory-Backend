const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/', controllers.upload.single('image'), controllers.createMedicine);
router.get('/', controllers.getMedicines);
router.put('/:id', controllers.updateMedicine);
router.delete('/:id', controllers.deleteMedicine);

module.exports = router;
