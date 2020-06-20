window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let playlistId = queryString.get("playlistID");

    function truncateString(str, num, add) {
                    
        if (str.length <= num) {
          return str
        }
        
        return str.slice(0, add) + '...'
    }

    let idioma = sessionStorage.getItem("idioma");
    if (idioma == 'EN') {
        document.querySelector('.generos').innerHTML = 'All musical genres'
        document.querySelector('#elc').innerHTML = 'Electronic'
    } else {
        document.querySelector('.generos').innerHTML = 'Todos los géneros musicales'
        document.querySelector('#elc').innerHTML = 'Electrónica'
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {

            console.log(informacion);

            let arrayGeneros = informacion.data

            for (let i = 1; i < arrayGeneros.length; i++) {
                
                let imagen = arrayGeneros[i].picture_xl
                let nombre = arrayGeneros[i].name
                let idGenero = arrayGeneros[i].id

                if (window.matchMedia("(min-width: 1440px)").matches) {

                    if (nombre != nombre.toUpperCase()){
                        console.log("es minis");
                        nombre = truncateString(nombre, 21, 20);
                    } else if (nombre == nombre.toUpperCase()) {
                        console.log("es mayus")
                        nombre = truncateString(nombre, 20,19);
                    }

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (nombre != nombre.toUpperCase()){
                        console.log("es minis");
                        nombre = truncateString(nombre, 14, 13);
                    } else if (nombre == nombre.toUpperCase()) {
                        console.log("es mayus")
                        nombre = truncateString(nombre, 13, 12);
                    } 

                } else if (window.matchMedia("(min-width: 320px)").matches) {

                    if (nombre != nombre.toUpperCase()){
                        console.log("es minis");
                        nombre = truncateString(nombre, 13, 12);
                    } else if (nombre == nombre.toUpperCase()) {
                        console.log("es mayus")
                        nombre = truncateString(nombre, 12, 11);
                    } 
                }

                console.log(idGenero)
                let generoIndividual = '<a href="genero.html?generoID=' + idGenero + '"><p class="imagen"><img src="' + imagen + '" alt="Concentración" class="generos"></img></p><p class="nombre1">' + nombre + '</p></a>'
                
                

                document.querySelector(".todosLosGeneros").innerHTML += generoIndividual
                
            }
            
        }
    )
})
    var slideIndex  = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
    showSlides(slideIndex = n);
    }

    function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    }