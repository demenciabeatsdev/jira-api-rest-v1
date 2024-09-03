// controllers/fieldController.js
const jiraClient = require('../utils/jiraClient');
const Field = require('../models/fieldModel');

// Obtener todos los fields disponibles y formatearlos usando el modelo Field
exports.getFields = async (req, res) => {
  try {
    const response = await jiraClient.get('/rest/api/3/field');
    
    // Mapear los datos de respuesta al modelo Field
    const fields = response.data.map(fieldData => {
      return new Field(
        fieldData.id,
        fieldData.name,
        fieldData.custom,
        fieldData.schema
      );
    });

    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los fields' });
  }
};
