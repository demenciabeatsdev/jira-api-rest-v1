// controllers/issueController.js
const jiraClient = require('../utils/jiraClient');
const Issue = require('../models/issueModel');

// Campos específicos que queremos obtener
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


// Obtener detalles de un issue por su key y retornar solo los campos especificados
exports.getIssueByKey = async (req, res) => {
  const { key } = req.params;

  try {
    // Hacer la solicitud a la API de Jira para obtener el issue con los campos especificados
    const response = await jiraClient.get(`/rest/api/3/issue/${key}`, {
      params: {
        fields: fieldsToReturn.map(field => field.id).join(','), // Solicitar solo los campos necesarios
      }
    });

    // Formatear la respuesta para incluir solo los campos especificados
    const filteredFields = {};
    fieldsToReturn.forEach(field => {
      if (field.id === 'parent' && response.data.fields[field.id]) {
        // Obtener solo el key y summary del campo Parent
        filteredFields['Parent'] = {
          key: response.data.fields[field.id].key,
          summary: response.data.fields[field.id].fields.summary
        };
      } else if (field.id === 'reporter' && response.data.fields[field.id]) {
        // Obtener solo el displayName del campo Reporter
        filteredFields['Reporter'] = response.data.fields[field.id].displayName;
      } else if (field.id === 'customfield_10186' && response.data.fields[field.id]) {
        // Obtener solo el displayName del campo QA
        filteredFields['QA'] = response.data.fields[field.id].displayName;
      } else if (field.id === 'customfield_10020' && response.data.fields[field.id]) {
        // Obtener solo el nombre del Sprint
        filteredFields['Sprint'] = response.data.fields[field.id].name;
      } else if (field.id === 'status' && response.data.fields[field.id]) {
        // Obtener solo el nombre del campo Status
        filteredFields['Status'] = response.data.fields[field.id].name;
      } else {
        filteredFields[field.name] = response.data.fields[field.id] || null;
      }
    });
    

    // Crear una instancia del modelo Issue con los datos filtrados
    const issue = new Issue(response.data.key, filteredFields);

    res.json(issue);
  } catch (error) {
    console.error('Error al obtener el issue:', error);
    res.status(500).json({ error: 'Error al obtener el issue' });
  }
};
