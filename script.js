// SI CLICK EN TERMINAL, FOCO EN INPUT
document.querySelector(".terminal").addEventListener("click", function () {
    document.querySelector("#command-input").focus();
});
var textarea = document.getElementById("command-input");
textarea.addEventListener("input", autoResize, false);
function autoResize() {
    let scalingFactor = 1;
    // count number of characters in the textarea and the widht they take
    // divide the width by the width of the chars to get the number of lines
    var numChars = textarea.value.length;
    var width = textarea.clientWidth;
    var charWidth = parseFloat(getComputedStyle(textarea).fontSize) * 0.62; // width of a char in pixels (approx)
    var numLines = Math.ceil((numChars * charWidth) / width);
    var height = numLines * scalingFactor;

    let terminal = document.querySelector(".terminal");
    let terminalHeight = terminal.clientHeight;

    if (height * charWidth < terminalHeight) {
        if (height < scalingFactor) {
            height = scalingFactor;
        }
        textarea.style.height = 0.5 + height + "em";
    } else {
        textarea.style.height = terminalHeight + "px";
    }
    if (numLines < 1) {
        numLines = 1;
    }
    textarea.rows = numLines;
    console.log(charWidth * numChars, width, numLines, charWidth);
}

// Declaración de las funciones
function help() {
    console.log("help");
}

function clear() {
    console.log("clear");
}

function aboutMe() {
    console.log("about-me");
}

function skills() {
    console.log("skills");
}

function education() {
    console.log("education");
}

function experience() {
    console.log("experience");
}

function contact() {
    console.log("contact");
}

function projects() {
    console.log("projects");
}

function github() {
    console.log("github");
}

// Asignación de las funciones a los comandos
const ALL_COMMANDS = {
    help: help,
    clear: clear,
    "about-me": aboutMe,
    skills: skills,
    education: education,
    experience: experience,
    contact: contact,
    projects: projects,
    github: github,
};

coincidentCommands = Object.keys(ALL_COMMANDS);

var selectedComand = 0;

var autocompleteContainer = document.querySelector(".autocomplete-container");

coincidentCommands.forEach(function (comando) {
    var listItem = document.createElement("li");
    listItem.textContent = comando;
    autocompleteContainer.appendChild(listItem);
});

// RESALTAR LOS COMANDOS AL PULSAR UP Y DOWN, HACERLO CICLICO
document
    .querySelector("#command-input")
    .addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp") {
            selectedComand--;
            if (selectedComand < 0) {
                selectedComand = coincidentCommands.length - 1;
            }
            document.querySelector("#command-input").value =
                coincidentCommands[selectedComand];
        } else if (e.key === "ArrowDown") {
            selectedComand++;
            if (selectedComand > coincidentCommands.length - 1) {
                selectedComand = 0;
            }
            document.querySelector("#command-input").value =
                coincidentCommands[selectedComand];
        }
        // remove highlight from all commands
        autocompleteContainer
            .querySelectorAll("li")
            .forEach(function (command) {
                command.classList.remove("highlighted");
            });

        // highlight selected command
        if (autocompleteContainer.children[selectedComand]) {
            autocompleteContainer.children[selectedComand].classList.add(
                "highlighted"
            );
            // Scroll the selected command into view
            autocompleteContainer.children[selectedComand].scrollIntoView({
                block: "nearest",
            });
        }
    });

// RESALTAR EN EL MOUSEOVER Y SELECCIONAR COMO selectedComand el comando
autocompleteContainer.addEventListener("mouseover", function (e) {
    if (e.target.tagName === "LI") {
        // remove highlight from all commands
        autocompleteContainer
            .querySelectorAll("li")
            .forEach(function (command) {
                command.classList.remove("highlighted");
            });
        e.target.classList.add("highlighted");
        selectedComand = Array.from(autocompleteContainer.children).indexOf(
            e.target
        );
    }
});
function updateCoincidences(e) {
    if (e){
        var input = e.target.value;
    }
    else{
        input = "";
    }
    coincidentCommands = Object.keys(ALL_COMMANDS).filter(function (
        command
    ) {
        // coincidencia de comandos (include sin case sensitive)
        return command.toLowerCase().includes(input.toLowerCase());
    });
    if (input === "") {
        console.log("input vacío");
        coincidentCommands = Object.keys(ALL_COMMANDS);
    }
    selectedComand = 0;
    autocompleteContainer.innerHTML = "";
    coincidentCommands.forEach(function (comando) {
        var listItem = document.createElement("li");
        listItem.textContent = comando;
        autocompleteContainer.appendChild(listItem);
    });
}
// AL ESCRIIR EN EL INPUT, BUSCAR COMANDOS SIMILARES
document
    .querySelector("#command-input")
    .addEventListener("input", updateCoincidences);

// AL HACER CLICK EN UN COMANDO, ESCIBIRLO EN EL INPUT
autocompleteContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        document.querySelector("#command-input").value = e.target.textContent;
        autocompleteContainer.innerHTML = "";
    }
});

// AL HACER SUBMIT EN EL INPUT, EJECUTAR EL COMANDO
document
    .querySelector("#command-input")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        var command = document.querySelector("#command-input").value;
        if (ALL_COMMANDS[command]) {
            ALL_COMMANDS[command]();
        } else {
            // código para el comando no encontrado
        }
        document.querySelector("#command-input").value = "";
        autocompleteContainer.innerHTML = "";
    });

// al presionar tab, autocompletar el comando en el input
document
    .querySelector("#command-input")
    .addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault();
            if (coincidentCommands.length === 0) {
                return;
            }
            document.querySelector("#command-input").value =
                coincidentCommands[selectedComand];
            autocompleteContainer.innerHTML = "";
            autoResize();
        } else if (e.key === "Enter") {
            // submit form
            e.preventDefault();
            var command = document.querySelector("#command-input").value;
            if (ALL_COMMANDS[command]) {
                ALL_COMMANDS[command]();
            } else {
                help();
            }
            document.querySelector("#command-input").value = "";
            autocompleteContainer.innerHTML = "";
            updateCoincidences();
        }
    });

// RELOJ MADRID

function mostrarHoraMadrid() {
    var fecha = new Date();
    var opciones = {
        timeZone: "Europe/Madrid",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    };
    var horaMadrid = fecha.toLocaleTimeString("es-ES", opciones);
    document.getElementById("clock").textContent = horaMadrid;
}

mostrarHoraMadrid(); // Mostrar la hora al cargar la página

// Actualizar la hora cada segundo
setInterval(mostrarHoraMadrid, 1000);
