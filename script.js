

document.addEventListener('mousemove', function(e) {
    // Variables de configuración
    const circleColor = 'rgba(115, 133, 152, 0.1)'; // Color de acento con opacidad
    const backgroundColor = 'rgb(60, 65, 94, 0.2)'; // Color de fondo
    const innerRadius = '1px'; // Radio del color de acento
    const outerRadius = '500px'; // Radio total del gradiente
    
    const x = e.clientX; // Obtiene la coordenada X del cursor
    const y = e.clientY; // Obtiene la coordenada Y del cursor
    const width = window.innerWidth; // Ancho total de la ventana
    const height = window.innerHeight; // Alto total de la ventana

    // Calcula el porcentaje de la posición del cursor respecto al total de la ventana
    const xPercent = x / width * 100;
    const yPercent = y / height * 100;
    // Establece el fondo como un gradiente radial que sigue al cursor
    document.body.style.background = `radial-gradient(circle at ${xPercent}% 
    ${yPercent}%, ${circleColor} ${innerRadius}, ${backgroundColor} ${outerRadius})`;
});
