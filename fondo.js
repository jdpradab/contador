// Obtenemos el canvas y el contexto 2D para dibujar
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;

// Función para ajustar el tamaño del canvas al tamaño de la ventana
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

// Redimensionar el canvas cuando cambie el tamaño de la ventana
window.addEventListener("resize", resize);
resize(); // Ejecutar una vez al inicio

// 🌟 ESTRELLAS NORMALES (titilantes)

// Creamos un arreglo de estrellas
const stars = [];
for (let i = 0; i < 300; i++) {
  stars.push({
    x: Math.random() * w,               // posición horizontal aleatoria
    y: Math.random() * h,               // posición vertical aleatoria
    radius: Math.random() * 1.5 + 0.5,  // tamaño de la estrella
    alpha: Math.random(),               // opacidad inicial (brillo)
    delta: (Math.random() * 0.005) + 0.001 // velocidad de cambio de brillo
  });
}

// 🌠 ESTRELLAS FUGACES

// Arreglo para almacenar las estrellas fugaces activas
const shootingStars = [];

// Función para crear una nueva estrella fugaz
function createShootingStar() {
  const yStart = Math.random() * h * 0.5; // Inicia en la mitad superior
  shootingStars.push({
    x: -100,                           // Inicia fuera del borde izquierdo
    y: yStart,                         // Altura aleatoria
    length: Math.random() * 80 + 80,   // Longitud de la estela
    speed: Math.random() * 8 + 4,      // Velocidad de movimiento
    opacity: 1                         // Opacidad inicial
  });
}

// 🖌️ Dibujar estrellas normales
function drawStars() {
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`; // blanco con opacidad
    ctx.fill();
  }
}

// 🖌️ Dibujar estrellas fugaces
function drawShootingStars() {
  // Recorremos las estrellas fugaces de atrás hacia adelante
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];

    // Dibujamos una línea diagonal (como la cola de una estrella fugaz)
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.length, s.y + s.length / 2); // línea en diagonal
    ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Mover la estrella fugaz
    s.x += s.speed;
    s.y += s.speed * 0.5; // Movimiento diagonal (más lento hacia abajo)

    // Reducir opacidad gradualmente
    s.opacity -= 0.01;

    // Si ya es invisible, eliminarla del arreglo
    if (s.opacity <= 0) {
      shootingStars.splice(i, 1);
    }
  }
}

// 🎬 Animación principal
function animate() {
  // Limpiar el canvas en cada fotograma
  ctx.clearRect(0, 0, w, h);

  // Actualizar opacidad de las estrellas normales (efecto de titileo)
  for (let star of stars) {
    star.alpha += star.delta;

    // Cambiar dirección del cambio si se pasa del límite
    if (star.alpha >= 1 || star.alpha <= 0.1) {
      star.delta *= -1;
    }
  }

  // Dibujar el fondo estrellado y las fugaces
  drawStars();
  drawShootingStars();

  // Crear una estrella fugaz aleatoriamente (muy ocasional)
  if (Math.random() < 0.005) {
    createShootingStar();
  }

  // Pedir el siguiente fotograma de animación
  requestAnimationFrame(animate);
}

// Iniciar la animación
animate();
