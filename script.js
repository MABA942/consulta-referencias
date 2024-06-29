let tarifario = [];

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            tarifario = XLSX.utils.sheet_to_json(worksheet);
            // Normalizar los datos
            tarifario.forEach(row => {
                row['Número de Referencia'] = row['Número de Referencia'].replace(/\s+/g, '').toLowerCase();
            });
            alert('Archivo cargado exitosamente.');
        };
        reader.readAsArrayBuffer(file);
    }
});

function buscarValor() {
    const referencia = document.getElementById('referenceInput').value.replace(/\s+/g, '').toLowerCase();
    const resultado = document.getElementById('resultado');
    const referenciaEncontrada = tarifario.find(row => row['Número de Referencia'] === referencia);
    if (referenciaEncontrada) {
        const valor = parseInt(referenciaEncontrada['Valor de Referencia Antes de IVA']).toLocaleString('es-ES');
        resultado.textContent = `El valor de referencia antes de IVA es: $${valor}`;
    } else {
        resultado.textContent = 'Número de referencia no encontrado.';
    }
}
