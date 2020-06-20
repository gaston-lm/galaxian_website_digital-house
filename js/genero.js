window.addEventListener("load", function() {

    function truncateString(str, num, add) {
                    
        if (str.length <= num) {
          return str
        }
        
        return str.slice(0, add) + '...'
    }

    let queryString = location.search;
    let datos = new URLSearchParams(queryString);
    let idGenero = datos.get('generoID');
    console.log(idGenero)

    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let url = proxy + "https://api.deezer.com/genre/" + idGenero + "/artists"

    fetch(url)
    .then(function(response){
            return response.json();
        }
    )

    .then(function (dgenero) { 
        console.log(dgenero);
        let xyz = dgenero.data; 

        for (let i= 0; i<12; i++) {

            let artista = xyz[i].name
            let img = xyz[i].picture_big
            let artistId = xyz[i].id

            if (window.matchMedia("(min-width: 320px)").matches) {

            if (artista != artista.toUpperCase()){
                //console.log("es minis");
                artista = truncateString(artista, 15, 14);
            } else if (artista == artista.toUpperCase()) {
                //console.log("es mayus")
                artista = truncateString(artista, 14, 13);
            }
            }
            if (window.matchMedia("(min-width: 1024px)").matches) {

                if (artista != artista.toUpperCase()){
                    //console.log("es minis");
                    artista = truncateString(artista, 13, 12);
                } else if (artista == artista.toUpperCase()) {
                    //console.log("es mayus")
                    artista = truncateString(artista, 12, 11);
                }
            }

            if (window.matchMedia("(min-width: 1440px)").matches) {

                if (artista != artista.toUpperCase()){
                        //console.log("es minis");
                        artista = truncateString(artista, 18, 17);
                } else if (artista == artista.toUpperCase()) {
                        //console.log("es mayus")
                        artista = truncateString(artista, 17, 16);
                }
            }

            let detalleGenero = document.querySelector(".contenido")
            detalleGenero.innerHTML += '<article class="genero"> <a href = "artist.html?artistID='+ artistId + ' " > <h2>' + artista + ' </h2> </a><a href = "artist.html?artistID='+ artistId + ' " > <img src="'+ img + '" alt="rock" class="img-genero"></a></article>'
       
        }
 
    })
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
                
                let generoId = arrayGeneros[i].id.toString()
                console.log(generoId);
                let titulo = arrayGeneros[i].name

                console.log(idGenero);
                
                if(generoId == idGenero){
                    console.log('funca')
                    document.querySelector('.titule').innerHTML = titulo;
                    document.querySelector('title').innerHTML += titulo;
                }
            }
        }
    )
})
