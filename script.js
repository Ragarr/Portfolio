
let rootStyles = getComputedStyle(document.documentElement);

let circleColor = rootStyles.getPropertyValue('--circle-color');
let backgroundColor = rootStyles.getPropertyValue('--background-color');
let accentColor = rootStyles.getPropertyValue('--accent-color');
let textColor = rootStyles.getPropertyValue('--text-color');


document.addEventListener('mousemove', function(e) {
    // Variables de configuración
    const innerRadius = '0'; // Radio del color de acento
    const outerRadius = '300px'; // Radio total del gradiente
    
    const x = e.clientX; // Obtiene la coordenada X del cursor
    const y = e.clientY; // Obtiene la coordenada Y del cursor
    const width = window.innerWidth; // Ancho total de la ventana
    const height = window.innerHeight; // Alto total de la ventana

    // Calcula el porcentaje de la posición del cursor respecto al total de la ventana
    const xPercent = x / width * 100;
    const yPercent = y / height * 100;

    ligt = document.querySelector('.light');


    let new_bg = `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${circleColor} ${innerRadius}, transparent ${outerRadius} )`;
    
    ligt.style.background = new_bg;
});
