var defaultVolume = 50; // Puedes ajustar este valor según el valor predeterminado que desees.

// Al cargar la página, establecer el volumen predeterminado.
document.getElementById('volume').value = defaultVolume;

function updateVolume() {
    var volumeValue = document.getElementById('volume').value;
    console.log('Volumen actual: ' + volumeValue);
    // Puedes realizar acciones adicionales según el volumen, como ajustar el volumen real en la aplicación.
}

function updateSoundType() {
    var soundTypeValue = document.getElementById('soundType').value;
    console.log('Tipo de sonido seleccionado: ' + soundTypeValue);
    // Puedes realizar acciones adicionales según el tipo de sonido seleccionado.
}

function applyChanges() {
    alert('Cambios aplicados correctamente.'); // Puedes implementar acciones adicionales aquí.
}

function resetToDefault() {
    document.getElementById('volume').value = defaultVolume;
    document.getElementById('soundType').selectedIndex = 0; // Selecciona el primer elemento por defecto.
    alert('Configuración restablecida a los valores predeterminados.');
}