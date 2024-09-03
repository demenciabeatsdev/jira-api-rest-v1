// routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Ruta para obtener detalles de un issue
router.get('/:key', issueController.getIssueByKey);

module.exports = router;
