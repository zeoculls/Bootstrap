//Funcion javaScript simple para activar botones de menu
  var menuLinks;
  window.onload=function () {
    //Recuperamos todos los links del menu
    menuLinks = document.getElementById("menu").getElementsByTagName("li");
    //Activamos el primero en la carga inicial
    displayPanel(menuLinks[0]);
    //Activo la funcion en todos los botones del menu
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].onclick = function () {
          displayPanel(this);
          return false;
        }
      }
    }
  

  function displayPanel(botonParaActivar) {
    for (var i = 0 ; i < menuLinks.length; i++) {
        if (menuLinks[i] == botonParaActivar) {
          menuLinks[i].classList.add("active");
        } else {
          menuLinks[i].classList.remove("active");
        }
    }
  }