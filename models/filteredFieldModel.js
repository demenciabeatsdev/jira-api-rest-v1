// models/filteredFieldModel.js
class FilteredField {
    constructor(issueKey, fields) {
      this.issueKey = issueKey; // Clave del issue
      this.fields = fields;     // Objeto de fields filtrados con los valores correspondientes
    }
  
    // Método estático para crear instancias de FilteredField a partir de la respuesta de la API de Jira
    static fromJiraResponse(issue, fieldsToReturn) {
      const filteredFields = {};
  
      // Filtrar solo los fields necesarios del issue
      fieldsToReturn.forEach(field => {
        filteredFields[field.name] = issue.fields[field.id] || null;
      });
  
      return new FilteredField(issue.key, filteredFields);
    }
  }
  
  module.exports = FilteredField;
  