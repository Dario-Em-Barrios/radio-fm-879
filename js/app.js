const tituloCancion = document.querySelector('.reproductor-musica h1')
const nombreArtista = document.querySelector('.reproductor-musica p')

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras')
const botonAdelante = document.querySelector('.controles button.adelante')

const tiempoActual = document.getElementById('tiempoActual');
const duracionTotal = document.getElementById('duracionTotal');

const controlVolumen = document.getElementById('volumen');



const canciones = [
    {
        titulo:'Cómo Hago',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Cómo Hago.mp3'
    },
    {
        titulo:'Cuando me Enamoro',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Cuando me Enamoro.mp3'
    },
    {
        titulo:'El Mismo Calor',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - El Mismo Calor.mp3'
    },
    {
        titulo:'Eso Duele',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Eso Duele.mp3'
    },
    {
        titulo:'Mi Primavera',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Mi Primavera.mp3'
    },
    {
        titulo:'Piradita',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Piradita.mp3'
    },
    {
        titulo:'Que Bonito',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Que Bonito.mp3'
    },
    {
        titulo:'Te Pido Perdon',
        nombre:'Banda XXI',
        fuente:'music/Banda XXI - Te Pido Perdon.mp3'
    },
];

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    progreso.value = 0;
    tiempoActual.textContent = '0:00';
    duracionTotal.textContent = '0:00';
};

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${minutos}:${seg < 10 ? '0' : ''}${seg}`;
}



cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    duracionTotal.textContent = formatearTiempo(cancion.duration);
});

//

cancion.volume = controlVolumen.value;

controlVolumen.addEventListener('input', function(){
    cancion.volume = controlVolumen.value;
});

//

cancion.addEventListener('ended', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

//

botonReproducirPausar.addEventListener('click',reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
     }
};

function reproducirCancion() {
    cancion.play();
    iconoControl.classList.add('bi-pause-fill');
    iconoControl.classList.remove('bi-play-fill');
}

function pausarCancion() {
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill');
    iconoControl.classList.add('bi-play-fill');
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
        tiempoActual.textContent = formatearTiempo(cancion.currentTime);
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});




 //progreso.addEventListener('change', function(){
 //   reproducirCancion();
 // });

botonAdelante.addEventListener('click', function(){
   indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
   actualizarInfoCancion();
   reproducirCancion();
});

botonAtras.addEventListener('click', function(){
   indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
   actualizarInfoCancion();
   reproducirCancion();

});

actualizarInfoCancion();