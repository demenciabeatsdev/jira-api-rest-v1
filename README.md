npm init -y
npm install express dotenv axios body-parser

Prueba la API:

Para buscar un issue: GET http://localhost:3000/issues/{key}
Para buscar fields: GET http://localhost:3000/fields
Para buscar por JQL: POST http://localhost:3000/search con un cuerpo JSON {"jql": "project = DEMO"}.


JIRA_BASE_URL=https://dhemax.atlassian.net/

JIRA_EMAIL=fprovoste@dhemax.com

JIRA_API_TOKEN=ATATT3xFfGF0GaEm__FKoK-vXIPOUFf9Z7nccs6qTtAGgDCmfAOlQVvPYTXTGjmtW8V5Xc1NBDJ4YYAqqu-1uSgIU5FDJyROARPi8N2iq4PiYdwTxkRKPxqZCEuJvCUdY-yZbxq38g-9o25Hd4pt8fg6YbMc1N_cPC9kD6jmcINtqadjogJW9BY=9CE7688D