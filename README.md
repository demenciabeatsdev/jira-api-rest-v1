npm init -y
npm install express dotenv axios body-parser

Prueba la API:

Para buscar un issue: GET http://localhost:3000/issues/{key}
Para buscar fields: GET http://localhost:3000/fields
Para buscar por JQL: POST http://localhost:3000/search con un cuerpo JSON {"jql": "project = DEMO"}.
