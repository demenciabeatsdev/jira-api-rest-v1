// routes/fieldRoutes.js
const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');

// Ruta para obtener todos los fields
router.get('/', fieldController.getFields);

module.exports = router;
