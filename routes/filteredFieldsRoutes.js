// routes/filteredFieldsRoutes.js
const express = require('express');
const router = express.Router();
const filteredFieldsController = require('../controllers/filteredFieldsController');

// Ruta para obtener issues con los fields filtrados según JQL
router.post('/jql', filteredFieldsController.getFilteredFieldsByJQL);

module.exports = router;
