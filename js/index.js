window.addEventListener("load", function() { 

    let queryString = new URLSearchParams(location.search);
    
    console.log(sessionStorage.getItem("user-name"))
    console.log(queryString.get("user"))
    let user;

    if ((queryString.get("user") == null) && ((sessionStorage.getItem("user-name") == null) || (sessionStorage.getItem("user-name") == 'null'))) {
        function noScroll() {
            window.scrollTo(0, 0);
        }
        
        // add listener to disable scroll
        window.addEventListener('scroll', noScroll);

        /* NO NECESARIO ahora que el boton submit lleva a charts directamente
        document.querySelectorAll(".music").forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
    
                // Remove listener to re-enable scroll
                window.removeEventListener('scroll', noScroll);
            });
        });
        */

        //idea obtenida de 'Stack Overflow'
        let bannerHeight = document.querySelector(".banner").scrollHeight;
        
        window.addEventListener('scroll', function() {
            if (document.body.scrollTop > bannerHeight || document.documentElement.scrollTop > bannerHeight) {
                //borrar banner
                document.querySelector('.banner').style.display = 'none';
            }
        })

        let formulario = document.querySelector('#inicio');
        let campoNombre = document.querySelector('.barra');
        let inputEs = document.querySelector('#Es');
        let inputEn = document.querySelector('#En');
        
        formulario.addEventListener('submit', function(e) {
            if (campoNombre.value == '') {
                e.preventDefault();
                campoNombre.classList.add('error1')
            } else if ((inputEs.checked == false) && (inputEn.checked == false)) {
                e.preventDefault();
                document.querySelector('.lang').style.color = 'red';
            }
            //idea obtenida de 'Stack Overflow'
            let idioma = document.querySelector('input[name="idioma"]:checked').value;
            sessionStorage.setItem("idioma", idioma)
        })

    } else if ((sessionStorage.getItem("user-name") == null) || (sessionStorage.getItem("user-name") == 'null')){
        document.querySelector('.banner').style.display = 'none';
        user = queryString.get("user");
        console.log(user)
        sessionStorage.setItem("user-name", user);
    } else {
        document.querySelector('.banner').style.display = 'none';
    } 

    let idioma = sessionStorage.getItem("idioma");
    console.log(idioma)

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(information) {

            if (idioma == 'EN') {
                document.querySelector('#tracks-title').innerHTML = "Today's top tracks"
            } else {
                document.querySelector('#tracks-title').innerHTML = "Mejores canciones de hoy"
            }

            let trackList = information.tracks.data;

            for (let i = 0; i < trackList.length; i++) {

                let trackId = trackList[i].id;
                                
                let trackTitle = trackList[i].title_short;

                let trackArtist = trackList[i].artist.name;

                let trackArtistId = trackList[i].artist.id;

                let trackItem;

                if (idioma == 'EN') {
                    trackItem = `
                    <li class='track-item'>
                        <a class='tNomb' href='track.html?trackID=` + trackId +`'>` + trackTitle + `</a>
                        <span> by <a class='aNomb' href='artist.html?artistID=` + trackArtistId + `'>` + trackArtist + `</a></span>
                    </li>`
                } else {
                    trackItem = `
                    <li class='track-item'>
                        <a class='tNomb' href='track.html?trackID=` + trackId +`'>` + trackTitle + `</a>
                        <span> de <a class='aNomb' href='artist.html?artistID=` + trackArtistId + `'>` + trackArtist + `</a></span>
                    </li>`
                }
                
                document.querySelector(".trackList").innerHTML += trackItem;

            }

            if (idioma == 'EN') {
                document.querySelector('#albums-title').innerHTML = "Most-streamed albums"
            } else {
                document.querySelector('#albums-title').innerHTML = "Álbumes más escuchados"
            }

            let albumList = information.albums.data;

            function truncateString(str, num, add) {
                // If the length of str is less than or equal to num
                // just return str--don't truncate it.
                if (str.length <= num) {
                  return str
                }
                // Return str truncated with '...' concatenated to the end of str.
                return str.slice(0, add) + '...'
            }

            for (let i = 0; i < albumList.length; i++) {
                               
                let albumTitle = albumList[i].title;

                let albumArtist = albumList[i].artist.name;

                let albumArtistId = albumList[i].artist.id;

                let albumCover = albumList[i].cover_xl;

                let albumId = albumList[i].id;

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    if (albumTitle != albumTitle.toUpperCase()){
                        albumTitle = truncateString(albumTitle, 18, 17);
                    } else if (albumTitle == albumTitle.toUpperCase()) {
                        albumTitle = truncateString(albumTitle, 16, 15);
                    }                    

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (albumTitle != albumTitle.toUpperCase()){
                        albumTitle = truncateString(albumTitle, 14, 11);
                    } else if (albumTitle == albumTitle.toUpperCase()) {
                        albumTitle = truncateString(albumTitle, 11, 10);
                    } 

                    if (albumArtist != albumArtist.toUpperCase()){
                        albumArtist = truncateString(albumArtist, 14, 12);
                    } else if (albumArtist == albumArtist.toUpperCase()) {
                        albumArtist = truncateString(albumArtist, 11, 10);
                    } 

                } else {

                    albumTitle = truncateString(albumTitle, 25, 24);
                }

                let albumItem;

                if (idioma == 'EN') {
                    albumItem = `
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + albumCover + `" alt="album N°` + i + `">
                                <i class="fas fa-play-circle play-album" data-albumid=` + albumId + `></i>
                            </div>
                            <div class="uk-card-body">
                                <a href="album.html?albumID=` + albumId + `"><h3 class="uk-card-title">` + albumTitle + `</h3></a>
                                <span>by </span><a href="artist.html?artistID=` + albumArtistId +`">` + albumArtist + `</a>
                            </div>
                        </div>
                    </li>`;
                } else {
                    albumItem = `
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + albumCover + `" alt="album N°` + i + `">
                                <i class="fas fa-play-circle play-album" data-albumid=` + albumId + `></i>
                            </div>
                            <div class="uk-card-body">
                                <a href="album.html?albumID=` + albumId + `"><h3 class="uk-card-title">` + albumTitle + `</h3></a>
                                <span>de </span><a href="artist.html?artistID=` + albumArtistId +`">` + albumArtist + `</a>
                            </div>
                        </div>
                    </li>`;
                }

                document.querySelector(".albumList").innerHTML += albumItem;

            }

            let botonesPlay = document.querySelectorAll(".play-album");

            botonesPlay.forEach(function(boton) {

                boton.addEventListener("click", function(e){

                    console.log(this.dataset)
                    document.querySelector('.reprod-container').innerHTML = `
                    <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=album&id=` + this.dataset.albumid + `&app_id=1" width="700" height="350"></iframe>
                    `
                    document.querySelector(".reprod").style.display = "block";
                    document.querySelector('footer').style.paddingBottom = "85px"
                })

            })

            if (idioma == 'EN') {
                document.querySelector('#artists-title').innerHTML = "Most-streamed artist"
            } else {
                document.querySelector('#artists-title').innerHTML = "Artistas más escuchados"
            }

            let artistList = information.artists.data;

            for (let i = 0; i < artistList.length; i++) {
                                
                let artistId = artistList[i].id;

                let artistName = artistList[i].name; 

                let artistPic = artistList[i].picture_xl;
            
                let artistItem = `  
                <li>
                    <div class="uk-card uk-card-default">
                        <div class="uk-card-media-top">
                            <img class="img-artist" src="` + artistPic + `" alt="artist N°` + i + `">
                        </div>
                        <div class="uk-card-body artist-body-card">
                            <a href="artist.html?artistID=` + artistId + `"><h3>` + artistName + `</h3></a>
                        </div>
                    </div>
                </li>`;
 
                document.querySelector(".artistList").innerHTML += artistItem;

                fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId)
                .then(
                    function(response) {
                        return response.json();
                    }
                )
                .then(
                    function(info) {

                        let cantFans = info.nb_fan;

                        // crea un nuevo span
                        var newSpan = document.createElement("p");
                        // y añade contenido
                        var newContent;
                        if (idioma == 'EN') {
                            newContent = document.createTextNode(cantFans + ' fans');
                        } else {
                            newContent = document.createTextNode(cantFans + ' seguidores');
                        } 
                        newSpan.appendChild(newContent); //añade texto al span creado. 
                        // añade el elemento creado y su contenido al DOM 
                        document.querySelectorAll(".artist-body-card")[i].appendChild(newSpan);

                    }
                )
            }

            if (idioma == 'EN') {
                document.querySelector('#playlists-title').innerHTML = "Most-streamed playlists"
            } else {
                document.querySelector('#playlists-title').innerHTML = "Listas más escuchadas"
            }

            let playlistArray = information.playlists.data;

            for (let i = 0; i < playlistArray.length; i++) {
                
                let playlistName = playlistArray[i].title;

                let playlistPic = playlistArray[i].picture_xl;

                let playlistNumTracks = playlistArray[i].nb_tracks;

                let playlistId = playlistArray[i].id

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    playlistName = truncateString(playlistName, 19, 18);

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    playlistName = truncateString(playlistName, 11, 10);

                } else {

                    playlistName = truncateString(playlistName, 30, 29);

                }

                let playlistItem;

                if (idioma == 'EN') {
                    playlistItem = `
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + playlistPic + `" alt="` + playlistName + `">
                                <i class="fas fa-play-circle play-playlist" data-playlistid=` + playlistId + `></i>
                            </div> 
                            <div class="uk-card-body">
                                <a href="playlist.html?playlistID=` + playlistId + `"><h3 class="uk-card-title">` + playlistName + `</h3></a>
                                <span>` + playlistNumTracks + ` tracks</span>
                            </div>
                        </div>
                    </li>
                    `;
                } else {
                    playlistItem = `
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + playlistPic + `" alt="` + playlistName + `">
                                <i class="fas fa-play-circle play-playlist" data-playlistid=` + playlistId + `></i>
                            </div> 
                            <div class="uk-card-body">
                                <a href="playlist.html?playlistID=` + playlistId + `"><h3 class="uk-card-title">` + playlistName + `</h3></a>
                                <span>` + playlistNumTracks + ` canciones</span>
                            </div>
                        </div>
                    </li>
                    `;
                }

                document.querySelector(".playlistList").innerHTML += playlistItem;

            }

            let botonesPlayPlaylist = document.querySelectorAll(".play-playlist");

            botonesPlayPlaylist.forEach(function(boton) {

                boton.addEventListener("click", function(e){

                    console.log(this.dataset)
                    document.querySelector('.reprod-container').innerHTML = `
                    <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=playlist&id=` + this.dataset.playlistid + `&app_id=1" width="700" height="350"></iframe>
                    `
                    document.querySelector(".reprod").style.display = "block";
                    document.querySelector('footer').style.paddingBottom = "85px";
                })

            })
        }
    )
  
})