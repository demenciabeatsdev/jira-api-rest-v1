// controllers/filteredFieldsController.js
const jiraClient = require('../utils/jiraClient');
const FilteredField = require('../models/filteredFieldModel');

// Lista de fields a retornar
const fieldsToReturn = [
  { id: "summary", name: "Summary" },
  { id: "status", name: "Status" },
  { id: "labels", name: "Labels" },
  { id: "parent", name: "Parent" },
  { id: "reporter", name: "Reporter" },
  { id: "customfield_10032", name: "Story Points" },
  { id: "customfield_10186", name: "QA" },
  { id: "customfield_10015", name: "Start date" },
  { id: "customfield_10226", name: "Analysis start date" },
  { id: "customfield_10088", name: "Analysis end date" },
  { id: "customfield_10008", name: "Actual start" },
  { id: "customfield_10054", name: "Dev end date" },
  { id: "customfield_10085", name: "Last dev end date" },
  { id: "customfield_10237", name: "Estimated dev end date" },
  { id: "customfield_10055", name: "QA start date" },
  { id: "customfield_10009", name: "Actual end" },
  { id: "customfield_10089", name: "Prod start date" },
  { id: "customfield_10020", name: "Sprint" },
];

// Obtener issues por JQL y retornar solo los fields solicitados
exports.getFilteredFieldsByJQL = async (req, res) => {
  const { jql } = req.body;

  try {
    // Hacer la petición a la API de Jira con el JQL proporcionado
    const response = await jiraClient.post('/rest/api/3/search', {
      jql: jql,
      fields: fieldsToReturn.map(field => field.id), // Solicitar solo los fields necesarios
    });

    // Usar el modelo FilteredField para formatear los datos
    const issues = response.data.issues.map(issue => {
      // Filtrar y formatear solo los campos especificados
      const filteredFields = {};
      fieldsToReturn.forEach(field => {
        if (field.id === 'parent' && issue.fields[field.id]) {
          // Verificar si 'parent' y 'summary' existen antes de acceder
          const parentField = issue.fields[field.id];
          filteredFields['Parent'] = {
            key: parentField.key,
            summary: parentField.fields && parentField.fields.summary ? parentField.fields.summary : null, // Verificar si 'fields' existe y luego 'summary'
          };
        } else if (field.id === 'reporter' && issue.fields[field.id]) {
          // Obtener solo el displayName del campo Reporter
          filteredFields['Reporter'] = issue.fields[field.id].displayName;
        } else if (field.id === 'customfield_10186' && issue.fields[field.id]) {
          // Obtener solo el displayName del campo QA
          filteredFields['QA'] = issue.fields[field.id].displayName;
        } else if (field.id === 'customfield_10020' && issue.fields[field.id]) {
          // Obtener solo el nombre del Sprint
          filteredFields['Sprint'] = issue.fields[field.id].name;
        } else if (field.id === 'status' && issue.fields[field.id]) {
          // Obtener solo el nombre del campo Status
          filteredFields['Status'] = issue.fields[field.id].name;
        } else {
          filteredFields[field.name] = issue.fields[field.id] || null;
        }
      });

      // Crear una instancia del modelo FilteredField con los datos filtrados
      return new FilteredField(issue.key, filteredFields);
    });

    res.json(issues);
  } catch (error) {
    console.error('Error al obtener los fields filtrados:', error);
    res.status(500).json({ error: 'Error al obtener los fields filtrados' });
  }
};
