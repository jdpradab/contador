let estado = false;

let fechaInicio;

// Si hay una fecha guardada, la usamos; si no, usamos la predeterminada
if (localStorage.getItem("fechaInicio")) {
  fechaInicio = new Date(localStorage.getItem("fechaInicio"));
} else {
  fechaInicio = new Date('2025-08-01');
}

// Aseguramos que esté a medianoche
fechaInicio.setHours(0, 0, 0, 0);

// Función que calcula y muestra la cantidad de días
function actualizarContador() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const diferencia = hoy - fechaInicio;

  const min = Math.floor(diferencia / (1000 * 60));
  const dia = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  const diaMC = Math.floor(dia * 72);
  const deathNote = Math.floor(min / 851);
  const capAnime = Math.floor(min / 24);
  const supermanPeli = Math.floor(min / 170);
  const harryPotter = Math.floor(min / 1179);
  const diariosAphoticary = Math.floor(min / 1104);

  document.getElementById('contador').textContent = `${(dia / 7).toFixed(1)} semanas`;
  document.getElementById('mc').textContent = `Equivalente a ${diaMC} días en Minercaft`;
  document.getElementById('dn').textContent = `Equiparable a ver death note ${deathNote} veces`;
  document.getElementById('an').textContent = `Similar a ${capAnime} capitulos de anime`;
  document.getElementById('sm').textContent = `Igual a ver la pelicula Superman ${supermanPeli} veces`;
  document.getElementById('hp').textContent = `Análogo a ver la saga de Harry Potter ${harryPotter} veces`;
}

// Llamamos la función una vez al cargar la página
actualizarContador();

// Y también cada minuto
setInterval(actualizarContador, 60000);

//----------------------------------------------------- Botón "Comparaciones" --------------------------------------------------

document.querySelector(".button-74").addEventListener("click", () => {
  estado = !estado;

  if (estado) {
    mostrarComparaciones();
    anime({
      targets: '#comps',
      opacity: [0, 1],
      delay: 1100
    });
    anime({
      targets: ".cuadro",
      height: ["0%", "70%"],
      opacity: [0, 1],
      borderWidth: [0, 5],
      duration: 500,
      delay: 700,
      easing: "easeInOutQuad",
    });
  } else {
    anime({
      targets: '#contenedorDiv',
      scale: [0.6, 1],
      translateX: 0,
      translateY: 0,
      duration: 1000,
      delay: 500,
      easing: 'easeInOutQuad'
    });
    anime({
      targets: '#comps',
      opacity: [1, 0],
      delay: 10
    });
    anime({
      targets: ".cuadro",
      height: ["70%", "0%"],
      opacity: [1, 0],
      borderWidth: [0, 5],
      duration: 500,
      delay: 150,
      easing: "easeInOutQuad",
    });
  }
});

function mostrarComparaciones() {
  if (estado) {
    anime({
      targets: '#contenedorDiv',
      scale: [1, 0.6],
      translateX: -390,
      translateY: 50,
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  }
}

//----------------------------------------------------- Botón "Reset" --------------------------------------------------

document.querySelector(".b2").addEventListener("click", () => {
  const nuevaFecha = new Date();
  nuevaFecha.setHours(0, 0, 0, 0);
  fechaInicio = nuevaFecha;

  // Guardamos la nueva fecha en localStorage
  localStorage.setItem("fechaInicio", fechaInicio.toISOString());

  actualizarContador();
});
