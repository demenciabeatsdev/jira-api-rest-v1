// utils/jiraClient.js
require('dotenv').config();
const axios = require('axios');

// Configuración de la autenticación en Base64
const authHeader = `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64')}`;

// Cliente de Jira configurado
const jiraClient = axios.create({
  baseURL: process.env.JIRA_BASE_URL,
  headers: {
    Authorization: authHeader,
    'Content-Type': 'application/json',
  },
});

module.exports = jiraClient;
