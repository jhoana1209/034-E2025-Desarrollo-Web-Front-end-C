// Seleccionar todas las teclas
const teclas = document.querySelectorAll('.teclado');

// Rutas dinámicas de sonidos
const sonidos = [
    'sounds/boom.wav',
    'sounds/clap.wav',
    'sounds/hihat.wav',
    'sounds/kick.wav',
    'sounds/openhat.wav',
    'sounds/ride.wav',
    'sounds/snare.wav',
    'sounds/tink.wav',
    'sounds/tom.wav'
];

teclas.forEach((tecla, index) => {
    tecla.addEventListener('click', () => {
        // Quitar clases activas de todas las teclas
        removeActiveClasses();
        // Añadir clase activa a la tecla presionada
        tecla.classList.add('active');

        // Reproducir el sonido correspondiente
        const audio = new Audio(sonidos[index]);
        audio.play();
        console.log(sonidos[index]);
    });
});

function removeActiveClasses() {
    teclas.forEach(tecla => {
        tecla.classList.remove('active');
    });
}
