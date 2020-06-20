window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let artistId = queryString.get("artistID");

    function truncateString(str, num, add) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) {
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, add) + '...'
    }

    let idioma = sessionStorage.getItem("idioma");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(res) {

            console.log(res)

            document.querySelector(".text-container h2").innerHTML = res.name;

            let artistId = res.id;

            if (idioma == 'EN') {
                document.querySelector(".text-container p").innerHTML = res.nb_fan + " fans";
                document.querySelector('.play-artist').innerHTML = 'Artist Mix';
                document.querySelector('.similar').innerHTML = 'Similar Artists';
                document.querySelector('.albu').innerHTML = 'Albums';
            } else {
                document.querySelector(".text-container p").innerHTML = res.nb_fan + " seguidores";
                document.querySelector('.play-artist').innerHTML = 'Mezcla Artista';
                document.querySelector('.play-artist').style.fontSize = '13px'
                document.querySelector('.similar').innerHTML = 'Artistas Similares';
                document.querySelector('.albu').innerHTML = 'Álbumes';
            }

            document.querySelector(".infoArtist img").src = res.picture_xl;

            document.querySelector('.play-artist').addEventListener('click', function() {

                console.log("hola")
                document.querySelector('.reprod-container').innerHTML = `
                <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=radio&id=artist-` + artistId + `&app_id=1" width="700" height="350"></iframe>
                `
                document.querySelector(".reprod").style.display = "block";
                document.querySelector('footer').style.paddingBottom = "85px";
            })

            fetch('https://cors-anywhere.herokuapp.com/' + res.tracklist)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(info) {
                    topTracksArray = info.data

                    for (let i = 0; i < 5; i++) {
                        
                        let trackTitle = topTracksArray[i].title;

                        let trackAlbum = topTracksArray[i].album.title;

                        if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 57, 56);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 38, 37);
                            }   
                            
                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 40, 39);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 28, 27);
                            }
        
                            console.log(trackAlbum);
        
                        } else if (window.matchMedia("(min-width: 1024px)").matches) {
        
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 42, 41);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 25, 24);
                            } 

                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 24, 23);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 22, 21);
                            }
        
                            console.log(trackAlbum);
        
                        } else {
        
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 40, 39);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 30, 29);
                            }

                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 27, 26);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 25, 24);
                            }
                        }

                        let trackAlbumId = topTracksArray[i].album.id;

                        let trackDuration = topTracksArray[i].duration;

                        let trackId = topTracksArray[i].id;

                        let minutes = trackDuration/60
                        minutes = Math.floor(minutes)
                        let seconds = trackDuration %60
                        if(seconds<10){
                            seconds = '0' + seconds
                        }

                        trackItem = `
                        <article class="songs">
                            <h3>` + (i+1) + `</h3>
                            <div>
                                <a href="track.html?trackID=` + trackId +`"><h2>` + trackTitle + `</h2></a>
                                <a href="album.html?albumID=` + trackAlbumId + `"><h5>` + trackAlbum + `</h5></a>
                            </div>
                            <h4>` + minutes + `:` + seconds + `</h4>   
                        </article>
                        `;

                        document.querySelector(".list-of-songs").innerHTML += trackItem;
                    }
                }
            )
        }
    )

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId + '/albums')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
        
            let arrayAlbums = informacion.data;

            for (let i = 0; i < 12; i++) {
                
                let albumTitle = arrayAlbums[i].title;

                let lanzamiento = arrayAlbums[i].release_date;

                let albumPic = arrayAlbums[i].cover_xl;

                let albumId = arrayAlbums[i].id;

                let albumItem;

                if (idioma == 'EN') {
                    albumItem =`
                    <article class="album-item">
                        <div class="photo-container">
                            <img src="` + albumPic + `" alt="album N°` + i +`">
                            <i class="fas fa-play-circle playAlbum" data-albumid=` + albumId + `></i>
                        </div>
                        <div class="info-album-body">
                            <a href="album.html?albumID=` + albumId + `"><h3 class="nombAlbum">` + albumTitle + `</h3></a>
                            <span>by</span>
                            <a class="name" href="artist.html?artistID=` + artistId + `"></a>
                            <p>Realesed on ` + lanzamiento + `</p>
                        </div>
                    </article>
                    `
                } else {
                    albumItem =`
                    <article class="album-item">
                        <div class="photo-container">
                            <img src="` + albumPic + `" alt="album N°` + i +`">
                            <i class="fas fa-play-circle playAlbum" data-albumid=` + albumId + `></i>
                        </div>
                        <div class="info-album-body">
                            <a href="album.html?albumID=` + albumId + `"><h3 class="nombAlbum">` + albumTitle + `</h3></a>
                            <span>de</span>
                            <a class="name" href="artist.html?artistID=` + artistId + `"></a>
                            <p>Lanzado el ` + lanzamiento + `</p>
                        </div>
                    </article>
                    `
                }

                document.querySelector('.grillaAlbums').innerHTML += albumItem;
                
            }

            let botonesPlay = document.querySelectorAll(".playAlbum");

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

            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(informacion) {

                    let nombreArtista = informacion.name;

                    let name = document.querySelectorAll('.name');

                    for (let i = 0; i < name.length; i++) {
                        name[i].innerHTML = nombreArtista;
                    }
                }
            )

        }
    )

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId + '/related')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(info) {

            let relatedArtists = info.data;

            for (let i = 0; i < 5; i++) {

                let artistName = relatedArtists[i].name;
                let rId = relatedArtists[i].id;
                let aristsImg = relatedArtists[i].picture_xl;
                let artistFans = relatedArtists[i].nb_fan;

                let reletedArt;
                if (idioma == 'EN') {
                    reletedArt =`
                    <li class="artist-item">
                        <div class="photo-container">
                            <img class="img-artist" src="` + aristsImg + `" alt="artist N°` + i +`">
                        </div>
                        <div class="similar-artist-info">
                            <a href="artist.html?artistID=` + rId + `"><h3>` + artistName + `</h3></a>
                            <span>` + artistFans + `</span>
                            <a href="">fans</a>
                        </div>
                        <div class="boton-follow-similar-artist">
                            <i class="far fa-play-circle playAritst" data-artistid=` + rId + `></i>
                        </div>
                    </li>
                    `
                } else {
                    reletedArt =`
                    <li class="artist-item">
                        <div class="photo-container">
                            <img class="img-artist" src="` + aristsImg + `" alt="artist N°` + i +`">
                        </div>
                        <div class="similar-artist-info">
                            <a href="artist.html?artistID=` + rId + `"><h3>` + artistName + `</h3></a>
                            <span>` + artistFans + `</span>
                            <a href="">seguidores</a>
                        </div>
                        <div class="boton-follow-similar-artist">
                            <i class="far fa-play-circle playAritst" data-artistid=` + rId + `></i>
                        </div>
                    </li>
                    `
                }
                
                document.querySelector('.list-related').innerHTML += reletedArt;
            }

            let botonPlayArtist = document.querySelectorAll(".playAritst");

            console.log(botonPlayArtist)

            botonPlayArtist.forEach(function(boton) {

                boton.addEventListener("click", function(e){

                    document.querySelector('.reprod-container').innerHTML = `
                    <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=radio&id=artist-` + this.dataset.artistid + `&app_id=1" width="700" height="350"></iframe>
                    `
                    document.querySelector(".reprod").style.display = "block";
                    document.querySelector('footer').style.paddingBottom = "85px";
                })

            })
            
        }
    )

})
