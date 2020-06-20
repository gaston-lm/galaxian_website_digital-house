window.addEventListener('load', function() {

    document.querySelector(".btn").addEventListener('mouseover', function() {
        this.style.color = "black"
    })
    document.querySelector(".btn").addEventListener('mouseout', function() {
        this.style.color = "gray"
    })

    let idioma = sessionStorage.getItem("idioma");

    let home = document.querySelectorAll('.home');
    let account = document.querySelectorAll('.account');
    let fav = document.querySelectorAll('.favo');
    let genre = document.querySelectorAll('.genre');
    let buscador = document.querySelector('.searcher');
    let developers = document.querySelector('.devs');
    let colaboration = document.querySelector('.colab');

    if (idioma == 'EN') {
        home.forEach(function(texto) {
            texto.innerHTML = 'Home'
        })
        account.forEach(function(texto) {
            texto.innerHTML = 'My account'
        })
        fav.forEach(function(texto) {
            texto.innerHTML = 'Favorites'
        })
        genre.forEach(function(texto) {
            texto.innerHTML = 'Genres'
        })
        buscador.placeholder = 'Search';
        developers.innerHTML = 'Developers';
        colaboration.innerHTML = 'Colaboration by Francisco Catarino';
    } else {
        home.forEach(function(texto) {
            texto.innerHTML = 'Inicio'
        })
        account.forEach(function(texto) {
            texto.innerHTML = 'Mi cuenta'
        })
        fav.forEach(function(texto) {
            texto.innerHTML = 'Favoritas'
        })
        genre.forEach(function(texto) {
            texto.innerHTML = 'Géneros'
        })
        buscador.placeholder = 'Buscar';
        developers.innerHTML = 'Desarrolladores';
        colaboration.innerHTML = 'Colaboraciones de Francisco Catarino';
    }
    

    


})