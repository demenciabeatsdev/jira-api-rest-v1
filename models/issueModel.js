// models/issueModel.js
class Issue {
  constructor(key, fields) {
    this.key = key;       // Clave del issue
    this.fields = fields; // Objeto de fields filtrados con los valores correspondientes
  }
}

module.exports = Issue;
