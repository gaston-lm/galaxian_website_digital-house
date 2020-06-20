window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let trackId = queryString.get("trackID");

    document.querySelector(`.reprod-container`).innerHTML = `<iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + trackId + `&app_id=1" width="700" height="350"></iframe>`
    document.querySelector('.reprod').style.display = "block";
    document.querySelector('footer').style.paddingBottom = "85px";

    let idioma = sessionStorage.getItem("idioma");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + trackId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);

            let coverTrack = informacion.album.cover_xl;
            document.querySelector('.track-cover').src = coverTrack;

            let cantante = informacion.artist.name

            let titulo = informacion.title;

            let albumDeCancion = informacion.album.title;

            let artistId = informacion.artist.id

            let albumId = informacion.album.id

            let trackId = informacion.id;

            let estado = true;

            let arrayFavorites;
            
            if (sessionStorage.getItem("likeTracks") != null) {
                arrayFavorites = sessionStorage.getItem("likeTracks").split(",");
                if (arrayFavorites.includes("" + trackId) == true) {

                    if (idioma == 'EN') {
                        document.querySelector('.derecha').innerHTML += `
                        <a href="" class="remove-track">
                            <i class="far fa-heart"></i>
                            <p>Remove</p>
                        </a>
                        `
                    } else {
                        document.querySelector('.derecha').innerHTML += `
                        <a href="" class="remove-track">
                            <i class="far fa-heart"></i>
                            <p>Borrar</p>
                        </a>
                        `
                    }
                    
                    estado = false;
                } else {
                    if (idioma == 'EN') {
                        document.querySelector('.derecha').innerHTML += `
                        <a href="" class="add-track">
                            <i class="far fa-heart"></i>
                            <p>Add</p>
                        </a>
                        `
                    } else {
                        document.querySelector('.derecha').innerHTML += `
                        <a href="" class="add-track">
                            <i class="far fa-heart"></i>
                            <p>Añadir</p>
                        </a>
                        `
                        document.querySelector('.add-track').style.paddingLeft = '3px'
                    }
                    
                    estado = true;
                }
            } else {
                if (idioma == 'EN') {
                    document.querySelector('.derecha').innerHTML += `
                    <a href="" class="add-track">
                        <i class="far fa-heart"></i>
                        <p>Add</p>
                    </a>
                    `
                } else {
                    document.querySelector('.derecha').innerHTML += `
                    <a href="" class="add-track">
                        <i class="far fa-heart"></i>
                        <p>Añadir</p>
                    </a>
                    `
                    document.querySelector('.add-track').style.paddingLeft = '3px'
                }
                estado = true;
            }             

            let fechaimp;
            let release = informacion.release_date;
            let year = release.slice(0, 4);

            if (idioma == 'EN') {
                fechaimp =  'Released: ' + release   
            }else{
                fechaimp = 'Lanzamiento: ' + release 
            }

            document.querySelector(".released h3").innerHTML = fechaimp;

            let infoTrack;

            if (idioma == 'EN') {
                 infoTrack =
                `
                <h1 class="title">` + titulo +`</h1>
                <h2 class="artistDk">by <a href="artist.html?artistID=` + artistId + `" class="artist-link">` + cantante + `</a></h2>
                <h2 class="details">by <a href="artist.html?artistID=` + artistId + `" class="artist-link2">` + cantante + `</a> • <span class="year">` + year + `</span></h2>
                `
            }else { infoTrack =
                `
                <h1 class="title">` + titulo +`</h1>
                <h2 class="artistDk">de <a href="artist.html?artistID=` + artistId + `" class="artist-link">` + cantante + `</a></h2>
                <h2 class="details">by <a href="artist.html?artistID=` + artistId + `" class="artist-link2">` + cantante + `</a> • <span class="year">` + year + `</span></h2>
                `
            }

            let explicacion;
            if(idioma == 'EN'){
                explicacion = '<p class="t">Title</p><p class="info">Album</p><p class="tiempo"><i class="fab fa-algolia"></i></p>'
            }else{
                explicacion = '<p class="t">Titulo</p><p class="info">Album</p><p class="tiempo"><i class="fab fa-algolia"></i></p>'
            }

            document.querySelector('.explicacion').innerHTML = explicacion;

            document.querySelector(".track-info").innerHTML = infoTrack;

            let songLength = informacion.duration;

            let minutes = songLength/60
            minutes = Math.floor(minutes);
            let seconds = songLength %60
            if(seconds<10){
                seconds = '0' + seconds
            }

            let explicit = informacion.explicit_lyrics;

            let songItem;

            if (explicit == true) {
                songItem = 
                `
                <div class="track-item">
                    <a href="track.html?trackID=` + trackId + `" class="track-title">` + titulo + `</a>
                    <div class="info-mobile">
                    <a href="track.html?trackID=` + trackId + `" class="track">` + titulo + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="album">` + albumDeCancion + `</a>
                    </div>
                    <p class="explicit">E</p>
                    <a href="album.html?albumID=` + albumId + `" class="track-album">` + albumDeCancion + `</a>
                    <p class="duration">` + minutes + `:` + seconds + `</p>
                </div>
                `;
            } else {
                songItem = 
                `
                <div class="track-item">
                    <a href="track.html?trackID=` + trackId + `" class="track-title">` + titulo + `</a>
                    <div class="info-mobile">
                    <a href="track.html?trackID=` + trackId + `" class="track">` + titulo + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="album">` + albumDeCancion + `</a>
                    </div>
                    <p></p>
                    <a href="album.html?albumID=` + albumId + `" class="track-album">` + albumDeCancion + `</a>
                    <p class="duration">` + minutes + `:` + seconds + `</p>
                </div>
                `;
            }

            document.querySelector("main").innerHTML += songItem;

            if (estado == true) {
                document.querySelector(".add-track").addEventListener("click", function(e) {

                    e.preventDefault();
    
                    if (idioma == 'EN') {
                        document.querySelector('.add-track p').innerHTML = "Added";
                    } else {
                        document.querySelector('.add-track p').innerHTML = "Añadido";
                    }
                    
                    let boton = document.querySelector('.add-track');
    
                    boton.style.backgroundColor = "#2f9ac17e";
    
                    if (window.matchMedia("(max-width: 375px)").matches) {
                        boton.style.width = "96px"
                    } else {
                        boton.style.width = "120px"
                    }
                                   
                    // Me fijo si hay cosas en storage
                    if (sessionStorage.getItem("likeTracks") != null) {
                        //arrayDeGifsFavoritos y le voy a agregar el código el GIF
                        arrayFavorites = sessionStorage.getItem("likeTracks").split(",")
                        if (arrayFavorites.includes("" + trackId) != true) {
                            arrayFavorites.push(trackId)
                        }
    
                    } else {
                        //TENGO QUE CREAR UN ARRAY NUEVO CON EL CODIGO DEL GIF
                        arrayFavorites = []
                        arrayFavorites.push(trackId)
                    }
                    
                    sessionStorage.setItem("likeTracks", arrayFavorites);
                })
            } else {

                console.log(arrayFavorites)

                let remove = document.querySelector('.remove-track');

                remove.addEventListener('click', function(e) {
                        
                    e.preventDefault();

                    for (let i = 0; i < arrayFavorites.length; i++) {
                        if(arrayFavorites[i] == trackId) {
                            arrayFavorites.splice(i, 1);
                        }
                    }

                    if (idioma == 'EN') {
                        document.querySelector('.remove-track p').innerHTML = "Removed";
                    } else {
                        document.querySelector('.remove-track p').innerHTML = "Borrado";
                    }
                    
                    let boton = document.querySelector('.remove-track');
    
                    boton.style.backgroundColor = "#2f9ac17e";

                    console.log(arrayFavorites);
                    sessionStorage.setItem("likeTracks", arrayFavorites);
                })
            }

        }
    )
    
})
