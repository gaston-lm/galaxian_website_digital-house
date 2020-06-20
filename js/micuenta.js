window.addEventListener("load", function() {

    let user = sessionStorage.getItem("user-name");
    let nombre = user.charAt(0).toUpperCase() + user.slice(1)
    console.log(nombre)


    let idioma = sessionStorage.getItem("idioma");
    if (idioma == 'EN') {
        document.querySelector('.saludo').innerHTML = 'Hi ' + nombre + ' you dont have an account yet. Wait for Programacion 2!!';
    } else {
        document.querySelector('.saludo').innerHTML = 'Hola ' + nombre + ', no tenés una cuenta todavía. ¡Esperá a Programacion 2!!';
    }
    

})