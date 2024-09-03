let issuesData = [];  // Variable global para almacenar los datos

// Función para obtener los issues usando la API de Jira y el JQL proporcionado
async function fetchIssues() {
    const jql = document.getElementById('jqlInput').value;

    try {
        const response = await fetch('/filtered-fields/jql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jql })
        });

        const data = await response.json();
        issuesData = data;  // Guardar datos en una variable global

        // Cargar los datos en la tabla usando Bootstrap Table
        $('#issuesTable').bootstrapTable('load', processIssuesData(data));
    } catch (error) {
        console.error('Error fetching issues:', error);
        alert('Error fetching issues, please check the console for details.');
    }
}

// Función para procesar los datos de los issues
function processIssuesData(data) {
    return data.map(issue => ({
        key: issue.issueKey,
        summary: issue.fields.Summary || '--',
        status: issue.fields.Status || '--',
        labels: issue.fields.Labels ? issue.fields.Labels.join(', ') : '--',
        parent: issue.fields.Parent ? issue.fields.Parent.key + ': ' + issue.fields.Parent.summary : '--',
        reporter: issue.fields.Reporter || '--',
        storyPoints: issue.fields['Story Points'] || '--',
        qa: issue.fields.QA || '--',
        startDate: formatDate(issue.fields['Start date']),
        analysisStartDate: formatDate(issue.fields['Analysis start date']),
        analysisEndDate: formatDate(issue.fields['Analysis end date']),
        actualStart: formatDate(issue.fields['Actual start']),
        devEndDate: formatDate(issue.fields['Dev end date']),
        lastDevEndDate: formatDate(issue.fields['Last dev end date']),
        estimatedDevEndDate: formatDate(issue.fields['Estimated dev end date']),
        qaStartDate: formatDate(issue.fields['QA start date']),
        actualEnd: formatDate(issue.fields['Actual end']),
        prodStartDate: formatDate(issue.fields['Prod start date']),
        sprint: issue.fields.Sprint || '--',
        // Columna con color de fecha
        estimatedDevEndDateColor: getDateColor(issue.fields['Estimated dev end date']),
    }));
}

// Función para formatear la fecha sin la hora
function formatDate(dateString) {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
}

// Función para obtener el color según la lógica de fechas
function getDateColor(dateString) {
    if (!dateString) return 'white'; // Si no hay fecha, color blanco

    const currentDate = new Date();
    const estimatedDate = new Date(dateString);
    const differenceInDays = Math.ceil((estimatedDate - currentDate) / (1000 * 60 * 60 * 24)); // Diferencia en días

    if (differenceInDays < 0) { // Menor a hoy
        return 'red';
    } else if (differenceInDays === 0) { // Igual a hoy
        return 'green';
    } else if (differenceInDays === 1) { // Mayor o igual a un día
        return 'yellow';
    } else if (differenceInDays >= 2) { // Mayor o igual a dos días
        return 'blue';
    } else {
        return 'white'; // Por defecto
    }
}

// Inicializar la tabla al cargar la página
$(document).ready(function () {
    $('#issuesTable').bootstrapTable({
        data: processIssuesData(issuesData)  // Cargar los datos iniciales (si existen)
    });
});
