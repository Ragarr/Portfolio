
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


nav_links = document.querySelectorAll('.nav-link');

nav_links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        nav_links.forEach(link => {
            link.classList.remove('selected-index');
        });
        link.classList.add('selected-index');
        
        // get the a inside the li (nav_link is the li)
        let target = link.querySelector('a').getAttribute('href');
        let target_section = document.querySelector(target);
        let target_section_top = target_section.offsetTop;
        window.scrollTo({
            top: target_section_top,
            behavior: 'smooth'
        });
        
    });
});

// cuando navegas por las secciones de la página 
// se cambia el color del link seleccionado correspondiente a la sección actual

window.addEventListener('scroll', function() {
    let scroll_position = window.scrollY;
    let sections = document.querySelectorAll('section');
    let current_section = '';

    sections.forEach(section => {
        let section_top = section.offsetTop;
        let section_height = section.clientHeight;

        if (scroll_position >= section_top - section_height / 3) {
            current_section = section.getAttribute('id');
        }
    });

    nav_links.forEach(link => {
        link.classList.remove('selected-index');
        if (link.classList.contains(current_section)) {
            link.classList.add('selected-index');
        }
    });
});


