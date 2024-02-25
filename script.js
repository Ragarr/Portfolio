// SI CLICK EN TERMINAL, FOCO EN INPUT
document.querySelector(".terminal").addEventListener("click", function () {
    document.querySelector("#command-input").focus();
});



const comandos = [
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

var autocompleteContainer = document.querySelector('.autocomplete-container');

comandos.forEach(function(comando) {
  var listItem = document.createElement('li');
  listItem.textContent = comando;
  autocompleteContainer.appendChild(listItem);
});
