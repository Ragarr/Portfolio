// SI CLICK EN TERMINAL, FOCO EN INPUT
document.querySelector(".terminal").addEventListener("click", function () {
    document.querySelector("#command-input").focus();
});

window.onload = function() {
    var textarea = document.getElementById('command-input');
    textarea.addEventListener('input', autoResize, false);

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
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
    "help": help,
    "clear": clear,
    "about-me": aboutMe,
    "skills": skills,
    "education": education,
    "experience": experience,
    "contact": contact,
    "projects": projects,
    "github": github,
};

coincidentCommands = Object.keys(ALL_COMMANDS);


var selectedComand = 0;


var autocompleteContainer = document.querySelector('.autocomplete-container');

coincidentCommands.forEach(function(comando) {
  var listItem = document.createElement('li');
  listItem.textContent = comando;
  autocompleteContainer.appendChild(listItem);
});

// RESALTAR LOS COMANDOS AL PULSAR UP Y DOWN, HACERLO CICLICO
document.querySelector("#command-input").addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
        selectedComand--;
        if (selectedComand < 0) {
            selectedComand = coincidentCommands.length - 1;
        }
        document.querySelector("#command-input").value = coincidentCommands[selectedComand];
    } else if (e.key === "ArrowDown") {
        selectedComand++;
        if (selectedComand > coincidentCommands.length - 1) {
            selectedComand = 0;
        }
        document.querySelector("#command-input").value = coincidentCommands[selectedComand];
    }
    // remove highlight from all commands
    autocompleteContainer.querySelectorAll('li').forEach(function (command) {
        command.classList.remove('highlighted');
    });

    // highlight selected command
    if (autocompleteContainer.children[selectedComand]){
        autocompleteContainer.children[selectedComand].classList.add('highlighted');
    }

    
});

// AL ESCRIIR EN EL INPUT, BUSCAR COMANDOS SIMILARES
document.querySelector("#command-input").addEventListener("input", function (e) {
    var input = e.target.value;
    coincidentCommands = Object.keys(ALL_COMMANDS).filter(function (command) {
        // coincidencia de comandos (include sin case sensitive)
        return command.toLowerCase().includes(input.toLowerCase());
    });
    selectedComand = 0;
    autocompleteContainer.innerHTML = "";
    coincidentCommands.forEach(function(comando) {
        var listItem = document.createElement('li');
        listItem.textContent = comando;
        autocompleteContainer.appendChild(listItem);
    });
});


// AL HACER CLICK EN UN COMANDO, ESCIBIRLO EN EL INPUT
autocompleteContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        document.querySelector("#command-input").value = e.target.textContent;
        autocompleteContainer.innerHTML = "";
    }
});


// AL HACER SUBMIT EN EL INPUT, EJECUTAR EL COMANDO
document.querySelector("#command-input").addEventListener("submit", function (e) {
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
document.querySelector("#command-input").addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
        if (coincidentCommands.length === 0) {
            return;
        }
        document.querySelector("#command-input").value = coincidentCommands[selectedComand];
        autocompleteContainer.innerHTML = "";
    }
    else if (e.key === "Enter") {
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
        
    }
});
