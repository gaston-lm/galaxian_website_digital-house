window.addEventListener('load', function() {

    // traigo la info de url para poder trabajarla
    let queryString = new URLSearchParams(location.search)
    // searcher es el "name" lo que hace es usar la info buscada
    let loBuscado = queryString.get("searcher");

    document.querySelector('title').innerHTML += '"' + loBuscado + '"';

    let idioma = sessionStorage.getItem("idioma");

    if (idioma == 'EN') {
        document.querySelector('.pri').innerHTML = "Results of '" + loBuscado + "'";
    } else {
        document.querySelector('.pri').innerHTML = "Resultados de '" + loBuscado + "'";
    }
 
    function truncateString(str, num, add) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) { 
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, add) + '...'
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=' + loBuscado)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )//formato navegable
    .then(
        function (informacion) {

            if (idioma == 'EN') {
                document.querySelector('.title-artist').innerHTML = 'Artists';
            } else {
                document.querySelector('.title-artist').innerHTML = 'Artistas';
            }

            let arrayArtist = informacion.data;
            // si no hay resultados
            if (arrayArtist.length == 0) {
                console.log('no hay artistas')
                document.querySelector('.artirstCar').style.display = 'none';
                let texto = document.querySelector('.title-artist')
                if (idioma == 'EN') {
                    texto.innerHTML = "No results founded for artists";
                } else {
                    texto.innerHTML = "No se encontraron resultados para artistas";
                }
                texto.style.fontSize = '26';
                texto.style.color = 'gray'
            }

            // y si hay...
            for (let i = 0; i < arrayArtist.length; i++) {

                let artistName = arrayArtist[i].name;

                let idArtist = arrayArtist[i].id;

                let artistPic = arrayArtist[i].picture_xl;

                let nbFans = arrayArtist[i].nb_fan;

                let artistItem;

                if (idioma == 'EN') {
                    artistItem =`
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img class="img-artist" src="` + artistPic + `" alt="artist N°` + i + `">
                            </div>
                            <div class="uk-card-body artist-body-card">
                                <a href="artist.html?artistID=` + idArtist + `"><h3>` + artistName + `</h3></a>
                                <p>` + nbFans + ` fans</p>
                            </div>
                        </div>
                    </li>
                    `
                } else {
                    artistItem =`
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img class="img-artist" src="` + artistPic + `" alt="artist N°` + i + `">
                            </div>
                            <div class="uk-card-body artist-body-card">
                                <a href="artist.html?artistID=` + idArtist + `"><h3>` + artistName + `</h3></a>
                                <p>` + nbFans + ` seguidores</p>
                            </div>
                        </div>
                    </li>
                    `
                }
                
                document.querySelector('.artistList').innerHTML += artistItem;
            }  
        }
    )
    //ahora vamos con album
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=' + loBuscado)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
            
            if (idioma == 'EN') {
                document.querySelector('.title-albums').innerHTML = 'Albums';
            } else {
                document.querySelector('.title-albums').innerHTML = 'Álbumes';
            }

            let arrayAlbum = informacion.data;
            // si no hay
            if (arrayAlbum.length == 0) {
                console.log('no hay albums')
                document.querySelector('.albumsCar').style.display = 'none';
                let texto = document.querySelector('.title-albums')
                if (idioma == 'EN') {
                    texto.innerHTML = "No results founded for albums";
                } else {
                    texto.innerHTML = "No se encontraron resultados para álbunes";
                }
                texto.style.fontSize = '26';
                texto.style.color = 'gray'
            }
            // si hay
            for (let i = 0; i < arrayAlbum.length; i++) {

                let albumName = arrayAlbum[i].title;

                let idAlbum = arrayAlbum[i].id;

                let artistAlbum = arrayAlbum[i].artist.name;

                let artistAlbumId = arrayAlbum[i].artist.id;

                let pictureAlbum = arrayAlbum[i].cover_xl;

                //cortar strings
                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    //*ver si es minuscula o mayuscula
                    if (albumName != albumName.toUpperCase()){
                        //*minuscula
                        albumName = truncateString(albumName, 18, 17);
                    } else {
                        //*mayuscula
                        albumName = truncateString(albumName, 16, 15);
                    }                    

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    //*ver si es minuscula o mayuscula
                    if (albumName != albumName.toUpperCase()){
                        //*minuscula
                        albumName = truncateString(albumName, 13, 10);
                    } else {
                        //*mayuscula
                        albumName = truncateString(albumName, 11, 10);
                    } 

                    //*ver si es minuscula o mayuscula
                    if (artistAlbum != artistAlbum.toUpperCase()){
                        //*minuscula
                        artistAlbum = truncateString(artistAlbum, 13, 11);
                    } else {
                        //*mayuscula
                        artistAlbum = truncateString(artistAlbum, 11, 10);
                    }

                } else {

                    albumName = truncateString(albumName, 25, 24);
                }

                let albumItem;

                if (idioma == 'EN') {
                    albumItem =`
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + pictureAlbum + `" alt="album N°` + i + `">
                                <i class="fas fa-play-circle playCar" data-albumid=` + idAlbum + `></i>
                            </div>
                            <div class="uk-card-body">
                                <a href="album.html?albumID=` + idAlbum + `"><h3 class="uk-card-title">` + albumName + `</h3></a>
                                <span>by</span>
                                <a href="artist.html?artistID=` + artistAlbumId + `">` + artistAlbum + `</a>
                            </div>
                        </div>
                    </li>
                    `
                } else {
                    albumItem =`
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + pictureAlbum + `" alt="album N°` + i + `">
                                <i class="fas fa-play-circle playCar" data-albumid=` + idAlbum + `></i>
                            </div>
                            <div class="uk-card-body">
                                <a href="album.html?albumID=` + idAlbum + `"><h3 class="uk-card-title">` + albumName + `</h3></a>
                                <span>de</span>
                                <a href="artist.html?artistID=` + artistAlbumId + `">` + artistAlbum + `</a>
                            </div>
                        </div>
                    </li>
                    `
                }
                
                document.querySelector('.albumList').innerHTML += albumItem;
                
            }
            // boton de albumes
            let botonesPlay = document.querySelectorAll(".playCar");

            botonesPlay.forEach(function(boton) {

                boton.addEventListener("click", function(e){

                    console.log(this.dataset)
                    document.querySelector('.reprod-container').innerHTML = `
                    <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=album&id=` + this.dataset.albumid + `&app_id=1" width="700" height="350"></iframe>
                    `
                    document.querySelector(".reprod").style.display = "block";
                    document.querySelector('footer').style.paddingBottom = "85px";
                })

            })
        }
    )
        // ahora por ultimo vamos con track
    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' + loBuscado)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function (informacion) {

            let numberTracks = informacion.total;
            // cantidad de tracks
            if (idioma == 'EN') {
                document.querySelector(".number-tracks").innerHTML = numberTracks + " tracks";
                document.querySelector('#track').innerHTML = 'TRACK';
                document.querySelector('#artist').innerHTML = 'ARTIST';
                document.querySelector('#album').innerHTML = 'ALBUM';
            } else {
                document.querySelector(".number-tracks").innerHTML = numberTracks + " canciones";
                document.querySelector('#track').innerHTML = 'CANCIÓN';
                document.querySelector('#artist').innerHTML = 'ARTISTA';
                document.querySelector('#album').innerHTML = 'ALBUM';
            }

            arrayTracks = informacion.data;

            if (arrayTracks.length == 0) {
                console.log('no hay tracks')
                document.querySelector('.ul').style.display = 'none';
                let texto = document.querySelector('.number-tracks')
                if (idioma == 'EN') {
                    texto.innerHTML = "No results founded for tracks";
                } else {
                    texto.innerHTML = "No se encontraron resultados para canciones";
                }
                texto.style.fontSize = '26';
                texto.style.color = 'gray'
                sessionStorage.setItem('resultadosTracks', false);
            }

            for (let i = 0; i < arrayTracks.length; i++) {

                let trackTitle = arrayTracks[i].title;

                let trackId = arrayTracks[i].id;

                let trackExplicit = arrayTracks[i].explicit_lyrics;

                let trackArtist = arrayTracks[i].artist.name;
                
                let artistId = arrayTracks[i].artist.id;

                let trackAlbum = arrayTracks[i].album.title;

                let albumId = arrayTracks[i].album.id;

                //minutos:segundos

                let duration = arrayTracks[i].duration;

                let minutes = duration/60
                minutes = Math.floor(minutes)

                let seconds = duration %60

                if(seconds<10){
                    seconds = '0' + seconds
                }              

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    if (trackAlbum != trackAlbum.toUpperCase()){
                        trackAlbum = truncateString(trackAlbum, 19, 17);
                    } else {
                        trackAlbum = truncateString(trackAlbum, 13, 11);
                    }  

                    if (trackTitle != trackTitle.toUpperCase()){
                        trackTitle = truncateString(trackTitle, 32, 30);
                    } else {
                        trackTitle = truncateString(trackTitle, 25, 23);
                    } 

                    if (trackArtist != trackArtist.toUpperCase()){
                        trackArtist = truncateString(trackArtist, 19, 17);
                    } else {
                        trackArtist = truncateString(trackArtist, 16, 15);
                    } 

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (trackAlbum != trackAlbum.toUpperCase()){
                        trackAlbum = truncateString(trackAlbum, 16, 15);
                    } else {
                        trackAlbum = truncateString(trackAlbum, 15, 14);
                    }   

                    if (trackTitle != trackTitle.toUpperCase()){
                        trackTitle = truncateString(trackTitle, 23, 22);
                    } else {
                        trackTitle = truncateString(trackTitle, 20, 19);
                    } 

                } else {

                    trackTitle = truncateString(trackTitle, 24, 22);
                }

                let trackImg = arrayTracks[i].album.cover_big;
                // letra explisita 
                if (trackExplicit == true) {
                    
                    let trackItem =
                    `
                    <li class="track-item" data-trackid="` + trackId +`">
                        <div class="img-container" data-trackid="` + trackId +`">
                            <img class="track-img" src="` + trackImg + `" alt="track-image">
                            <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                        </div>
                        <i class="far fa-heart fav" data-trackid="` + trackId +`"></i>
                        <a href="track.html?trackID=` + trackId + `" class="track-title track-info">` + trackTitle + `</a>
                        <div class="info-mobile">
                            <a href="track.html?trackID=` + trackId + `" class="track track-info">` + trackTitle + `</a>
                            <a href="artist.html?artistID=` + artistId + `" class="artist track-info artist-name">` + trackArtist + `</a>
                        </div>
                        <p class="explicit">E</p>
                        <a href="artist.html?artistID=` + artistId + `" class="track-artist track-info">` + trackArtist + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="track-album track-info">` + trackAlbum + `</a>
                        <p class="duration">` + minutes + `:` + seconds + `</p>
                    </li>
                    `
                    document.querySelector(".ul").innerHTML += trackItem;
                } else {
                    let trackItem =
                    `
                    <li class="track-item" data-trackid="` + trackId +`">
                        <div class="img-container" data-trackid="` + trackId +`">
                            <img class="track-img" src="` + trackImg + `" alt="track-image">
                            <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                        </div>
                        <i class="far fa-heart fav" data-trackid="` + trackId +`"></i>
                        <a href="track.html?trackID=` + trackId + `" class="track-title track-info">` + trackTitle + `</a>
                        <div class="info-mobile">
                            <a href="track.html?trackID=` + trackId + `" class="track track-info">` + trackTitle + `</a>
                            <a href="artist.html?artistID=` + artistId + `" class="artist track-info artist-name">` + trackArtist + `</a>
                        </div>
                        <p></p>
                        <a href="artist.html?artistID=` + artistId + `" class="track-artist track-info">` + trackArtist + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="track-album track-info">` + trackAlbum + `</a>
                        <p class="duration">` + minutes + `:` + seconds + `</p>
                    </li>
                    `
                    document.querySelector(".ul").innerHTML += trackItem;

                }

                let trackItems = document.querySelectorAll(".track-item");
                
                trackItems.forEach (function(cancion) {

                    cancion.addEventListener('mouseover', function() {
                        this.style.backgroundColor = "rgba(53, 47, 68, 0.692)";
                        //*children 0 = img
                        this.children[0].children[0].style.display = "none";
                        //*children 1 = play
                        this.children[0].children[1].style.display = "block";
                                            
                    })
                    cancion.addEventListener('mouseout', function() {
                        this.style.backgroundColor = "";
                        //*children 1 = play
                        this.children[0].children[1].style.display = "none";
                        //*children 0 = img
                        this.children[0].children[0].style.display = "block";
                    })
 
                })

                let botonesPlay = document.querySelectorAll('.play');
                // al igual que el album pero solo un track
                botonesPlay.forEach (function(boton) {
                    boton.addEventListener('click', function() {
                        document.querySelector('.reprod-container').innerHTML = `
                        <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + this.dataset.trackid +`&app_id=1" width="700" height="350"></iframe>
                        `
                        document.querySelector(".reprod").style.display = "block";
                        document.querySelector('footer').style.paddingBottom = "85px"
                    })
                })

                let arrayFavorites;

                let corazones = document.querySelectorAll('.fav');

                for (let i = 0; i < corazones.length; i++) {
                    if (sessionStorage.getItem("likeTracks") != null) {
                        //divido el array con comas
                        arrayFavorites = sessionStorage.getItem("likeTracks").split(",")
                        //si ya esta incluida aparece en rojo
                        if (arrayFavorites.includes("" + corazones[i].dataset.trackid) == true) {
                            corazones[i].style.color = 'red';
                            corazones[i].classList.add('enFav');
                        }
                    }
                }

                corazones.forEach (function(meGusta) {

                    meGusta.addEventListener('click', function() {
                        // Me fijo si hay cosas en storage
                        if (sessionStorage.getItem("likeTracks") != null) {
                            //divido el array con comas
                            arrayFavorites = sessionStorage.getItem("likeTracks").split(",")
                            //si no esta incluida esta cancion en el array
                            if (arrayFavorites.includes("" + this.dataset.trackid) != true) {
                                arrayFavorites.push(this.dataset.trackid)
                                meGusta.style.color = 'red';
                                meGusta.classList.add('enFav')
                            }
        
                        } else {
                            //creo el array y le agrego esa cancion
                            arrayFavorites = []
                            arrayFavorites.push(this.dataset.trackid)
                        }
                        
                        sessionStorage.setItem("likeTracks", arrayFavorites);
                    })
                })
            
            }  
            
            /* NO FUNCIONA, ARREGLAR O BORRAR
            let favoritos = document.querySelectorAll('.enFav');

            let arrayFavorites;

            if (sessionStorage.getItem("likeTracks") != null) {
                arrayFavorites = sessionStorage.getItem("likeTracks").split(",");
            }

            for (let i = 0; i < favoritos.length; i++) {

                favoritos[i].addEventListener('click', function() {

                    for (let i = 0; i < arrayFavorites.length; i++) {
                        if(arrayFavorites[i] == this.dataset.trackid) {
                            arrayFavorites.splice(i, 1);
                        }
                    }
                    sessionStorage.setItem("likeTracks", arrayFavorites);

                    favoritos[i].style.color = 'rgb(197, 197, 197)';
                })   
            }
            */

            let infoTracks = document.querySelectorAll('.track-info');

            let aristsInfo = document.querySelectorAll('.artist-name');

            for (let i = 0; i < infoTracks.length; i++) {
                
                infoTracks[i].addEventListener('mouseover', function (e) {
                    this.style.color = '#2f9bc1'
                    this.style.textDecoration = 'none'
                })

                infoTracks[i].addEventListener('mouseout', function (e) {
                    this.style.color = 'ivory'
                })
                
            }
            
            for (let i = 0; i < aristsInfo.length; i++) {
                
                aristsInfo[i].addEventListener('mouseover', function (e) {
                    this.style.color = 'gray'
                    this.style.textDecoration = 'none'
                })

                aristsInfo[i].addEventListener('mouseout', function (e) {
                    this.style.color = '#2f9bc1'
                })
                
            }
    
            // Más canciones


            let next = informacion.hasOwnProperty('next');

            let linkNext = informacion.next;

            if (next == true) {

                if (idioma == 'EN') {
                    document.querySelector('.botones').innerHTML += '<a class="more" href="">More</a>';
                } else {
                    document.querySelector('.botones').innerHTML += '<a class="more" href="">Más</a>';
                }

                document.querySelector('.more').addEventListener('click', function(e) {
                    e.preventDefault();

                    fetch('https://cors-anywhere.herokuapp.com/' + linkNext)
                    .then(
                        function(respuesta) {
                            return respuesta.json();            
                        }
                    )
                    .then(
                        function(res) {

                            next = res.hasOwnProperty('next');

                            linkNext = res.next;

                            if (next == true) {

                                linkNext = res.next;

                                arrayTracks = res.data;

                                for (let i = 0; i < arrayTracks.length; i++) {
                    
                                    let trackTitle = arrayTracks[i].title;
                    
                                    let trackId = arrayTracks[i].id;
                    
                                    let trackExplicit = arrayTracks[i].explicit_lyrics;
                    
                                    let trackArtist = arrayTracks[i].artist.name;
                                    
                                    let artistId = arrayTracks[i].artist.id;
                    
                                    let trackAlbum = arrayTracks[i].album.title;
                    
                                    let albumId = arrayTracks[i].album.id;
                    
                                    let duration = arrayTracks[i].duration;
                    
                                    let minutes = duration/60
                                    minutes = Math.floor(minutes)
                    
                                    let seconds = duration %60
                    
                                    if(seconds<10){
                                        seconds = '0' + seconds
                                    }
                    
                                    if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                                        if (trackAlbum != trackAlbum.toUpperCase()){
                                            trackAlbum = truncateString(trackAlbum, 20, 19);
                                        } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                            trackAlbum = truncateString(trackAlbum, 16, 15);
                                        }  
                    
                                        if (trackTitle != trackTitle.toUpperCase()){
                                            trackTitle = truncateString(trackTitle, 32, 30);
                                        } else if (trackTitle == trackTitle.toUpperCase()) {
                                            trackTitle = truncateString(trackTitle, 25, 22);
                                        } 
                    
                                        if (trackArtist != trackArtist.toUpperCase()){
                                            trackArtist = truncateString(trackArtist, 19, 17);
                                        } else if (trackArtist == trackArtist.toUpperCase()) {
                                            trackArtist = truncateString(trackArtist, 16, 15);
                                        } 
                    
                                    } else if (window.matchMedia("(min-width: 1024px)").matches) {
                    
                                        if (trackAlbum != trackAlbum.toUpperCase()){
                                            trackAlbum = truncateString(trackAlbum, 16, 15);
                                        } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                            trackAlbum = truncateString(trackAlbum, 15, 14);
                                        }   
                    
                                        if (trackTitle != trackTitle.toUpperCase()){
                                            trackTitle = truncateString(trackTitle, 23, 22);
                                        } else if (trackTitle == trackTitle.toUpperCase()) {
                                            trackTitle = truncateString(trackTitle, 20, 19);
                                        } 
                    
                                    } else {
                    
                                        trackTitle = truncateString(trackTitle, 24, 22);
                                    }
                    
                                    let trackImg = arrayTracks[i].album.cover_big;
                    
                                    if (trackExplicit == true) {
                                        
                                        let trackItem =
                                        `
                                        <li class="track-item" data-trackid="` + trackId +`">
                                            <div class="img-container" data-trackid="` + trackId +`">
                                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                                                <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                                            </div>
                                            <i class="far fa-heart fav" data-trackid="` + trackId +`"></i>
                                            <a href="track.html?trackID=` + trackId + `" class="track-title track-info">` + trackTitle + `</a>
                                            <div class="info-mobile">
                                                <a href="track.html?trackID=` + trackId + `" class="track track-info">` + trackTitle + `</a>
                                                <a href="artist.html?artistID=` + artistId + `" class="artist track-info artist-name">` + trackArtist + `</a>
                                            </div>
                                            <p class="explicit">E</p>
                                            <a href="artist.html?artistID=` + artistId + `" class="track-artist track-info">` + trackArtist + `</a>
                                            <a href="album.html?albumID=` + albumId + `" class="track-album track-info">` + trackAlbum + `</a>
                                            <p class="duration">` + minutes + `:` + seconds + `</p>
                                        </li>
                                        `
                                        document.querySelector(".ul").innerHTML += trackItem;
                                    } else {
                                        let trackItem =
                                        `
                                        <li class="track-item" data-trackid="` + trackId +`">
                                            <div class="img-container" data-trackid="` + trackId +`">
                                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                                                <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                                            </div>
                                            <i class="far fa-heart fav" data-trackid="` + trackId +`"></i>
                                            <a href="track.html?trackID=` + trackId + `" class="track-title track-info">` + trackTitle + `</a>
                                            <div class="info-mobile">
                                                <a href="track.html?trackID=` + trackId + `" class="track track-info">` + trackTitle + `</a>
                                                <a href="artist.html?artistID=` + artistId + `" class="artist track-info artist-name">` + trackArtist + `</a>
                                            </div>
                                            <p></p>
                                            <a href="artist.html?artistID=` + artistId + `" class="track-artist track-info">` + trackArtist + `</a>
                                            <a href="album.html?albumID=` + albumId + `" class="track-album track-info">` + trackAlbum + `</a>
                                            <p class="duration">` + minutes + `:` + seconds + `</p>
                                        </li>
                                        `
                                        document.querySelector(".ul").innerHTML += trackItem;
                    
                                    }
                    
                                    let trackItems = document.querySelectorAll(".track-item")
                                    
                                    trackItems.forEach (function(cancion) {
                    
                                        cancion.addEventListener('mouseover', function() {
                                            this.style.backgroundColor = "rgba(53, 47, 68, 0.692)";
                                            //*children 0 = img
                                            this.children[0].children[0].style.display = "none";
                                            //*children 1 = play
                                            this.children[0].children[1].style.display = "block";
                                                                
                                        })
                                        cancion.addEventListener('mouseout', function() {
                                            this.style.backgroundColor = "";
                                            //*children 1 = play
                                            this.children[0].children[1].style.display = "none";
                                            //*children 0 = img
                                            this.children[0].children[0].style.display = "block";
                                        })
                     
                                    })
                    
                                    let botonesPlay = document.querySelectorAll('.play');
                    
                                    botonesPlay.forEach (function(boton) {
                                        boton.addEventListener('click', function() {
                                            document.querySelector('.reprod-container').innerHTML = `
                                            <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + this.dataset.trackid +`&app_id=1" width="700" height="350"></iframe>
                                            `
                                            document.querySelector(".reprod").style.display = "block";
                                        })
                                    })
                    
                                    let arrayFavorites;
                    
                                    let corazones = document.querySelectorAll('.fav');
                    
                                    for (let i = 0; i < corazones.length; i++) {
                                        if (sessionStorage.getItem("likeTracks") != null) {
                                            //divido el array con comas
                                            arrayFavorites = sessionStorage.getItem("likeTracks").split(",")
                                            //
                                            if (arrayFavorites.includes("" + corazones[i].dataset.trackid) == true) {
                                                corazones[i].style.color = 'red';
                                                corazones[i].classList.add('enFav');
                                            }
                                        }
                                    }
                    
                                    corazones.forEach (function(meGusta) {
                    
                                        meGusta.addEventListener('click', function() {
                                            // Me fijo si hay cosas en storage
                                            if (sessionStorage.getItem("likeTracks") != null) {
                                                //divido el array con comas
                                                arrayFavorites = sessionStorage.getItem("likeTracks").split(",")
                                                //
                                                if (arrayFavorites.includes("" + this.dataset.trackid) != true) {
                                                    arrayFavorites.push(this.dataset.trackid)
                                                    meGusta.style.color = 'red';
                                                    meGusta.classList.add('enFav')
                                                }
                            
                                            } else {
                                                //TENGO QUE CREAR UN ARRAY NUEVO CON EL CODIGO DEL GIF
                                                arrayFavorites = []
                                                arrayFavorites.push(this.dataset.trackid)
                                            }

                                            sessionStorage.setItem("likeTracks", arrayFavorites);
                                        })
                                    })

                                }

                                

                            } else {
                                document.querySelector('.botones').innerHTML = '';
                            }


                            let infoTracks = document.querySelectorAll('.track-info');

                            let aristsInfo = document.querySelectorAll('.artist-name');

                            for (let i = 0; i < infoTracks.length; i++) {
                                
                                infoTracks[i].addEventListener('mouseover', function (e) {
                                    this.style.color = '#2f9bc1'
                                    this.style.textDecoration = 'none'
                                })

                                infoTracks[i].addEventListener('mouseout', function (e) {
                                    this.style.color = 'ivory'
                                })
                                
                            }
                            
                            for (let i = 0; i < aristsInfo.length; i++) {
                                
                                aristsInfo[i].addEventListener('mouseover', function (e) {
                                    this.style.color = 'gray'
                                    this.style.textDecoration = 'none'
                                })

                                aristsInfo[i].addEventListener('mouseout', function (e) {
                                    this.style.color = '#2f9bc1'
                                })
                                
                            }

                        }
                    
                    )
                
                })
            }

           
        }
    )

    

})