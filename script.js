
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
    link.addEventListener('click', clickOnNav.bind(this));
});

function clickOnNav(e) {
    e.preventDefault();
    let li = e.target;
    if (li.tagName != 'LI') {
        li = e.target.parentElement;
    }

    nav_links.forEach(link => {
        link.classList.remove('selected-index');
    });
    li.classList.add('selected-index');

    // el trget puede ser un li, un a o un span
    // si no es un li buscar el li padre
    

    // ahora ir al anchor dentro del li y obtener el href
    let anchor = li.querySelector('a');
    let section_id = anchor.getAttribute('href');

    // obtener la sección correspondiente al href
    let section = document.querySelector(section_id);
    
    // hacer scroll a la sección
    section.scrollIntoView({behavior: 'smooth'});

}



// si una sección es visible en la pantalla, marcar el link correspondiente

let sections = document.querySelectorAll('section');
let main = document.querySelector('main');

main.addEventListener('scroll', function(e) {
    // obtener el scroll actual dentro del main
    let scroll = main.scrollTop;
    let mainHeight = main.clientHeight;
    let mainScrollHeight = main.scrollHeight;
    const lambda = 0.5;

    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;

        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight ) {
            let section_id = '#' + section.id;
            let link = document.querySelector(`a[href="${section_id}"]`);
            nav_links.forEach(link => {
                link.classList.remove('selected-index');
            });
            link.parentElement.classList.add('selected-index');
        }
    });

}
);