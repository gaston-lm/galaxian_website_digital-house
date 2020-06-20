window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let albumId = queryString.get("albumID");
    
    function truncateString(str, num, add) {
                    
        if (str.length <= num) {
          return str
        }
        
        return str.slice(0, add) + '...'
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/' + albumId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);

            let albumName = informacion.title
            document.querySelector('.favoritas').innerHTML = albumName;

            let artistName = informacion.artist.name
            document.querySelector('.Cantante').innerHTML = artistName;

            let artistId = informacion.artist.id;
            document.querySelector('#art').href = `artist.html?artistID=` + artistId;

            let albumPicture = informacion.cover_xl;
            document.querySelector('.imagen').src = albumPicture;

            let cantidadDeCanciones = informacion.nb_tracks
            

            let segundos = informacion.duration
            let duracion = segundos/60
            duracion = Math.floor(duracion)
            
            let idioma = sessionStorage.getItem("idioma");
            let tiempo;

            if(idioma == 'EN'){
                tiempo = duracion + ' minutes'
            }else{
                tiempo = duracion + ' minutos'
            }
            
            document.querySelector('.minutos').innerHTML = tiempo ;

            let explicacion;
            if(idioma == 'EN'){
                explicacion = '<p class="title">Title</p><p class="tiempo"><i class="fab fa-algolia"></i></p><p class="artista">Artist</p>';
            }else{
                explicacion = '<p class="title">Titulo</p><p class="tiempo"><i class="fab fa-algolia"></i></p><p class="artista">Artista</p>';
            }
            document.querySelector('.explicacion').innerHTML = explicacion

            let cantidad;
            if (idioma == 'EN') {
                cantidad = cantidadDeCanciones + ' songs';
            }else{
                cantidad = cantidadDeCanciones + ' canciones';
            }
            document.querySelector('.ndc').innerHTML = cantidad;

            let fecha = informacion.release_date
            document.querySelector('.fecha').innerHTML = fecha;

            let allSongs = informacion.tracks.data

            console.log(allSongs);
            
            for (let i = 0; i < allSongs.length; i++) {

                let songTitle = allSongs[i].title;

                console.log(songTitle);
                

                let songArtist = allSongs[i].artist.name;

                let songLength = allSongs[i].duration;
                let minutes = songLength/60
                minutes = Math.floor(minutes)
                let seconds = songLength %60
                if(seconds<10){
                    seconds = '0' + seconds
                }

                let trackId = allSongs[i].id;
                let artistId = allSongs[i].artist.id

                if (window.matchMedia("(min-width: 1440px)").matches) {

                    if (songArtist != songArtist.toUpperCase()){
                        console.log("es minis");
                        songArtist = truncateString(songArtist, 15, 14);
                    } else if (songArtist == songArtist.toUpperCase()) {
                        console.log("es mayus")
                        songArtist = truncateString(songArtist, 14,13);
                    }

                }else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (songArtist != songArtist.toUpperCase()){
                    console.log("es minis");
                    songArtist = truncateString(songArtist, 10, 9);
                    } else if (songArtist == songArtist.toUpperCase()) {
                    console.log("es mayus")
                    songArtist = truncateString(songArtist, 10, 9);}
                
                    }else if (window.matchMedia("(min-width: 375px)").matches) {

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 22, 21);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 20, 19);
                    } 
                }
                



                let songItem = `
                <article class="cancion">
                    <p class="nombre"><a href="track.html?trackID=` + trackId + `">` + songTitle + `</a></p>
                    <p class="duracion">` + minutes + ':' + seconds + `</p>
                    <p class="artista"><a href="artist.html?artistID=` + artistId + `">` + songArtist + `</p>
                </article>
                `;

                document.querySelector(".canciones").innerHTML += songItem
                
                
            }
            
            let cadaCancion = document.querySelectorAll('.cancion')

            cadaCancion.forEach(function (cancion) {

                cancion.addEventListener('mouseover', function() {
                    this.style.backgroundColor = "rgba(53, 47, 68, 0.692)";
                })

                cancion.addEventListener('mouseout', function() {
                    this.style.backgroundColor = "rgb(12, 8, 7)" ;
                    
                })
                
            })  
        }
        
    )

})