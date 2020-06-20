window.addEventListener("load", function() {
    
    function truncateString(str, num, add) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) { 
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, add) + '...'
    }
    
    let userName = sessionStorage.getItem("user-name");
    let user = userName.charAt(0).toUpperCase() + userName.slice(1)
    let idioma = sessionStorage.getItem("idioma");

    // Paso 1: Chequeo si hay tracks favoritos

    if(sessionStorage.getItem("likeTracks") != null) {

        if (idioma == 'EN') {
            document.querySelector('.title').innerHTML = user + "'s favorite tracks";
            document.querySelector('#track').innerHTML = 'TRACK';
            document.querySelector('#artist').innerHTML = 'ARTIST';
            document.querySelector('#album').innerHTML = 'ALBUM';
        } else {
            document.querySelector('.title').innerHTML = 'Las canciones favoritas de ' + user;
            document.querySelector('#track').innerHTML = 'CANCIÓN';
            document.querySelector('#artist').innerHTML = 'ARTISTA';
            document.querySelector('#album').innerHTML = 'ALBUM';
        }

        // Paso 2: Leemos los favoritos

        let arrayTracks = sessionStorage.getItem("likeTracks").split(",")

        // Paso 3: Recorremos el array de favoritos
        for (let i = 0; i < arrayTracks.length; i++) {

            // Paso 4: Traigo de deezer la info de ese track
            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + arrayTracks[i])
            .then(
                function(respuesta) {
                    return respuesta.json();            
                }
            )
            .then(
                function(resultado) {

                    let track = resultado;
                
                    let trackTitle = track.title;

                    let trackId = track.id;

                    let trackExplicit = track.explicit_lyrics;

                    let trackArtist = track.artist.name;
                    
                    let artistId = track.artist.id;

                    let trackAlbum = track.album.title;

                    let albumId = track.album.id;

                    let duration = track.duration;

                    let minutes = duration/60
                    minutes = Math.floor(minutes)

                    let seconds = duration %60

                    if(seconds<10){
                        seconds = '0' + seconds
                    }

                    if (window.matchMedia("(min-width: 1440px)").matches) {
                        
                        if (trackAlbum != trackAlbum.toUpperCase()){
                            console.log("es minis");
                            trackAlbum = truncateString(trackAlbum, 20, 19);
                        } else {
                            console.log("es mayus")
                            trackAlbum = truncateString(trackAlbum, 16, 15);
                        }                    

                        console.log(trackAlbum);

                    } else if (window.matchMedia("(min-width: 1024px)").matches) {

                        if (trackAlbum != trackAlbum.toUpperCase()){
                            console.log("es minis");
                            trackAlbum = truncateString(trackAlbum, 18, 17);
                        } else {
                            console.log("es mayus")
                            trackAlbum = truncateString(trackAlbum, 15, 14);
                        }   

                        if (trackTitle != trackTitle.toUpperCase()){
                            console.log("es minis");
                            trackTitle = truncateString(trackTitle, 23, 22);
                        } else {
                            console.log("es mayus")
                            trackTitle = truncateString(trackTitle, 20, 19);
                        } 

                        console.log(trackAlbum);

                    } else {

                        trackTitle = truncateString(trackTitle, 25, 24);
                    }

                    let trackImg = track.album.cover_big;

                    if (trackExplicit == true) {
                        
                        let trackItem =
                        `
                        <li class="track-item">
                            <div class="img-container" data-trackid="` + trackId +`">
                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                                <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                            </div>
                            <i class="far fa-trash-alt" data-trackid="` + trackId +`"></i>
                            <a href="track.html?trackID=` + trackId + `" class="track-title">` + trackTitle + `</a>
                            <div class="info-mobile">
                                <a href="track.html?trackID=` + trackId + `" class="track">` + trackTitle + `</a>
                                <a href="artist.html?artistID=` + artistId + `" class="artist">` + trackArtist + `</a>
                            </div>
                            <p class="explicit">E</p>
                            <a href="artist.html?artistID=` + artistId + `" class="track-artist">` + trackArtist + `</a>
                            <a href="album.html?albumID=` + albumId + `" class="track-album">` + trackAlbum + `</a>
                            <p class="duration">` + minutes + `:` + seconds + `</p>
                        </li>
                        `
                        document.querySelector(".ul").innerHTML += trackItem;
                    } else {
                        let trackItem =
                        `
                        <li class="track-item">
                            <div class="img-container" data-trackid="` + trackId +`">
                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                                <i class="fas fa-play-circle play" data-trackid="` + trackId +`"></i>
                            </div>
                            <i class="far fa-trash-alt" data-trackid="` + trackId +`"></i>
                            <a href="track.html?trackID=` + trackId + `" class="track-title">` + trackTitle + `</a>
                            <div class="info-mobile">
                                <a href="track.html?trackID=` + trackId + `" class="track">` + trackTitle + `</a>
                                <a href="artist.html?artistID=` + artistId + `" class="artist">` + trackArtist + `</a>
                            </div>
                            <p></p>
                            <a href="artist.html?artistID=` + artistId + `" class="track-artist">` + trackArtist + `</a>
                            <a href="album.html?albumID=` + albumId + `" class="track-album">` + trackAlbum + `</a>
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

                    let arrayFavorites = sessionStorage.getItem("likeTracks");
                    arrayFavorites = sessionStorage.getItem("likeTracks").split(",")

                    let basura = document.querySelectorAll('.fa-trash-alt');

                    basura.forEach (function(borrar) {

                        borrar.addEventListener('click', function(e) {
                        
                            e.preventDefault();
        
                            console.log(this.dataset.trackid)
                            for (let i = 0; i < arrayFavorites.length; i++) {

                                if(arrayFavorites[i] == this.dataset.trackid) {
                                    arrayFavorites.splice(i, 1);
                                }
                            }
        
                            borrar.parentElement.style.display = 'none'
                            console.log(arrayFavorites);
                            sessionStorage.setItem("likeTracks", arrayFavorites);
                        })
                    })
                }
            )

        }

    } else {    
        if (idioma == 'EN') {
            document.querySelector('.title').innerHTML = 'No tracks marked as favorite yet';
        } else {
            document.querySelector('.title').innerHTML = 'No hay canciones marcadas como favoritas todavía';
        }
        
        document.querySelector('.ul').style.display = 'none';
    }
})