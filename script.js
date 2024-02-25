// SI CLICK EN TERMINAL, FOCO EN INPUT
document.querySelector(".terminal").addEventListener("click", function () {
    document.querySelector("#command-input").focus();
});



const ALL_COMMANDS = [
    "help",
    "clear",
    "about-me",
    "skills",
    "education",
    "experience",
    "contact",
    "projects",
    "github",
]

var coincidentCommands = ALL_COMMANDS;


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
    autocompleteContainer.children[selectedComand].classList.add('highlighted');
    
});

// AL ESCRIIR EN EL INPUT, BUSCAR COMANDOS SIMILARES
document.querySelector("#command-input").addEventListener("input", function (e) {
    var input = e.target.value;
    coincidentCommands = ALL_COMMANDS.filter(function (command) {
        return command.includes(input);
    });
    selectedComand = 0;
    autocompleteContainer.innerHTML = "";
    coincidentCommands.forEach(function(comando) {
        var listItem = document.createElement('li');
        listItem.textContent = comando;
        autocompleteContainer.appendChild(listItem);
    });
});


// HIGHLIGHT SELECTED COMMAND WHEN SELECTING WITH ARROW KEYS (not on hover)