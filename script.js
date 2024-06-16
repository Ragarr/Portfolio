let rootStyles = getComputedStyle(document.documentElement);

let circleColor = rootStyles.getPropertyValue("--circle-color");
let backgroundColor = rootStyles.getPropertyValue("--background-color");
let accentColor = rootStyles.getPropertyValue("--accent-color");
let textColor = rootStyles.getPropertyValue("--text-color");

document.addEventListener("mousemove", function (e) {
    // Variables de configuración
    const innerRadius = "0"; // Radio del color de acento
    const outerRadius = "300px"; // Radio total del gradiente

    const x = e.clientX; // Obtiene la coordenada X del cursor
    const y = e.clientY; // Obtiene la coordenada Y del cursor
    const width = window.innerWidth; // Ancho total de la ventana
    const height = window.innerHeight; // Alto total de la ventana

    // Calcula el porcentaje de la posición del cursor respecto al total de la ventana
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    ligt = document.querySelector(".light");

    let new_bg = `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${circleColor} ${innerRadius}, transparent ${outerRadius} )`;

    ligt.style.background = new_bg;
});

nav_links = document.querySelectorAll(".nav-link");

nav_links.forEach((link) => {
    link.addEventListener("click", clickOnNav.bind(this));
});

function clickOnNav(e) {
    e.preventDefault();
    let li = e.target;
    if (li.tagName != "LI") {
        li = e.target.parentElement;
    }

    nav_links.forEach((link) => {
        link.classList.remove("selected-index");
    });
    li.classList.add("selected-index");

    // el trget puede ser un li, un a o un span
    // si no es un li buscar el li padre

    // ahora ir al anchor dentro del li y obtener el href
    let anchor = li.querySelector("a");
    let section_id = anchor.getAttribute("href");

    // obtener la sección correspondiente al href
    let section = document.querySelector(section_id);

    // hacer scroll a la sección
    section.scrollIntoView({ behavior: "smooth" });
}

// si una sección es visible en la pantalla, marcar el link correspondiente

let sections = document.querySelectorAll("section");
let main = document.querySelector("main");

main.addEventListener("scroll", function (e) {
    // obtener el scroll actual dentro del main
    let scroll = main.scrollTop;
    const margin = 120;

    sections.forEach((section) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;

        if (
            scroll >= sectionTop - margin &&
            scroll < sectionTop + sectionHeight 
        ) {
            let section_id = "#" + section.id;
            let link = document.querySelector(`a[href="${section_id}"]`);
            nav_links.forEach((link) => {
                link.classList.remove("selected-index");
            });
            link.parentElement.classList.add("selected-index");
        }
    });
});

const blocks = document.querySelectorAll(".block");

blocks.forEach((project) => {
    project.addEventListener("mouseover", function (e) {
        // if is in mobile, don't add the hover effect
        if (window.innerWidth < 768) {
            return;
        }

        // get the parent until its a project div
        let target = e.target;
        while (!target.classList.contains("block")) {
            target = target.parentElement;
        }
        blocks.forEach((project) => {
            if (project !== target) {
                project.classList.add("not-hovered");
            }
        });
        target.classList.add("hovered");
    });
});

blocks.forEach((project) => {
    project.addEventListener("mouseout", function (e) {
        // if is in mobile, don't remove the hover effect
        if (window.innerWidth < 768) {
            return;
        }
        blocks.forEach((project) => {
            project.classList.remove("not-hovered");
            project.classList.remove("hovered");
        });
    });
});


// dibujar una barra de scroll en el body en función del scroll del main
let scroll_bar = document.querySelector(".scroll-bar");
let scroll_bar_thumb = document.querySelector(".scroll-bar-thumb");
let thumb_height = (main.clientHeight / main.scrollHeight) * 100;

scroll_bar_thumb.style.height = `${thumb_height}%`;

// evitar que el thumb sea más grande que la barra o más pequeño que 10%
thumb_height = Math.max(thumb_height, 10);

main.addEventListener("scroll", function (e) {
    let scroll = main.scrollTop;
    let max_scroll = main.scrollHeight - main.clientHeight;

    // evitar que el thumb salga por arriba o por abajo
    let thumb_top = (scroll / max_scroll) * (100 - thumb_height);

    scroll_bar_thumb.style.height = `${thumb_height}%`;
    scroll_bar_thumb.style.top = `${thumb_top}%`;
});

scroll_bar.addEventListener("click", function (e) {
    if (e.target === scroll_bar_thumb) {
        return;
    }
    let y = e.clientY;
    let y_percent = (y / window.innerHeight) * 100;

    let scroll = (y_percent / 100) * (main.scrollHeight - main.clientHeight);

    main.scrollTo({ top: scroll, behavior: 'smooth' });
    console.log(y_percent);
});


let isDragging = false;

scroll_bar_thumb.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDragging = true;
});

document.addEventListener("mousemove", function (e) {
    e.preventDefault();
    if (isDragging) {
        let y = e.clientY;
        let y_percent = (y / window.innerHeight) * 100;

        let scroll = (y_percent / 100) * (main.scrollHeight - main.clientHeight);

        main.scrollTo({ top: scroll, behavior: 'auto' });
    }
});

document.addEventListener("mouseup", function (e) {
    isDragging = false;
});

