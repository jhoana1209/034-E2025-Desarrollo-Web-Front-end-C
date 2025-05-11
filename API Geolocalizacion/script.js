// Inicializar el mapa
var map = L.map('map').setView([19.4326, -99.1332], 13);

// Agregar capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Definir el polígono (el primer punto se repite al final para cerrarlo)
var polygonCoords = [
    [19.430, -99.140], 
    [19.435, -99.120], 
    [19.445, -99.125], 
    [19.440, -99.145],
    [19.430, -99.140] // Punto repetido para cerrar el polígono
];

// Dibujar el polígono en el mapa
var polygon = L.polygon(polygonCoords, { color: 'blue' }).addTo(map);
map.fitBounds(polygon.getBounds());

// Convertir las coordenadas a formato compatible con Turf.js
var turfPolygon = turf.polygon([polygonCoords.map(coord => [coord[1], coord[0]])]);

// Obtener la ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
} else {
    document.getElementById("status").innerText = "❌ Geolocalización no soportada en este navegador.";
}

// Función en caso de éxito
function success(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    document.getElementById("status").innerText = `📍 Ubicación actual: ${lat}, ${lng}`;

    // Marcar la ubicación del usuario
    var userMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup("📍 Tu ubicación").openPopup();
    map.setView([lat, lng], 14);

    // Crear el punto del usuario en formato Turf.js
    var userPoint = turf.point([lng, lat]);

    // Verificar si el usuario está dentro del polígono
    var inside = turf.booleanPointInPolygon(userPoint, turfPolygon);

    if (inside) {
        document.getElementById("message").innerText = "✅ Estás en el área";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("message").innerText = "❌ Fuera del área";
        document.getElementById("message").style.color = "red";
    }
}

// Función en caso de error con mensajes detallados
function error(err) {
    console.error("Error de geolocalización:", err);
    let msg = "❌ Error al obtener la ubicación.";
    
    switch (err.code) {
        case err.PERMISSION_DENIED:
            msg = "⚠️ Permiso denegado. Activa la ubicación en tu navegador.";
            break;
        case err.POSITION_UNAVAILABLE:
            msg = "⚠️ Ubicación no disponible. Intenta nuevamente.";
            break;
        case err.TIMEOUT:
            msg = "⏳ Tiempo de espera agotado. Inténtalo de nuevo.";
            break;
    }

    document.getElementById("status").innerText = msg;
}
