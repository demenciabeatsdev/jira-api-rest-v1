// models/fieldModel.js
class Field {
    constructor(id, name, custom, schema) {
      this.id = id;           // Identificador único del field
      this.name = name;       // Nombre del field
      this.custom = custom;   // Indica si el field es personalizado o no
      this.schema = schema;   // Esquema del field (opcional)
    }
  }
  
  module.exports = Field;
  