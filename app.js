// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const issueRoutes = require('./routes/issueRoutes');
const fieldRoutes = require('./routes/fieldRoutes');

const filteredFieldsRoutes = require('./routes/filteredFieldsRoutes'); // Nueva ruta importada

const app = express();
app.use(bodyParser.json());

// Configurar la carpeta 'public' para servir archivos estáticos
app.use(express.static('public'));


// Rutas registradas en el servidor
app.use('/issues', issueRoutes);
app.use('/fields', fieldRoutes);

app.use('/filtered-fields', filteredFieldsRoutes); // Nueva ruta integrada

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
