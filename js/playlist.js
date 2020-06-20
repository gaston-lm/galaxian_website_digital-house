window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let playlistId = queryString.get("playlistID");

    function truncateString(str, num, add) {
                    
        if (str.length <= num) {
          return str
        }
        
        return str.slice(0, add) + '...'
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/'+ playlistId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion){
            console.log(informacion);

            let coverAlbum = informacion.picture_xl
            document.querySelector('.imagen').src = coverAlbum;

            let playlistName = informacion.title
            document.querySelector('.favoritas').innerHTML = playlistName
            let creator = informacion.creator.name
            document.querySelector('.creador').innerHTML = creator

            let cantidadDeCanciones = informacion.nb_tracks

            let segundos = informacion.duration
            let duracion = segundos/60
            duracion = Math.floor(duracion)

            let seguidores = informacion.fans

            let idioma = sessionStorage.getItem("idioma");

            let nSeguidores;
            if (idioma == 'EN') {
                nSeguidores = seguidores + ' fans'
            }else{
                nSeguidores = seguidores + ' seguidores'
            }
            document.querySelector('.fans').innerHTML = nSeguidores
            

            let cantidad;
            if (idioma == 'EN') {
                cantidad = cantidadDeCanciones + ' songs';
            }else{
                cantidad = cantidadDeCanciones + ' canciones';
            }
            document.querySelector('.ndc').innerHTML = cantidad;

            let tiempo;
            if(idioma == 'EN'){
                tiempo = duracion + ' minutes'
            }else{
                tiempo = duracion + ' minutos'
            }
            document.querySelector('.minutos').innerHTML = tiempo ;


            let explicacion;
            if(idioma == 'EN'){
                explicacion = '<p class="title">Title</p><p class="tiempo"><i class="fab fa-algolia"></i></p><p class="artista">Artist</p><p class="info">Album</p>';
            }else{
                explicacion = '<p class="title">Titulo</p><p class="tiempo"><i class="fab fa-algolia"></i></p><p class="artista">Artista</p><p class="info">Album</p>';
            }
            document.querySelector('.explicacion').innerHTML = explicacion

                    
                                

            
            

            let allSongs = informacion.tracks.data
            console.log(allSongs);

            for (let i = 0; i < allSongs.length; i++) {

                let songTitle = allSongs[i].title;

                let songArtist = allSongs[i].artist.name;

                let songLength = allSongs[i].duration;
                let minutes = songLength/60
                minutes = Math.floor(minutes)
                let seconds = songLength %60
                if(seconds<10){ seconds = '0' + seconds }

                let albumDeCancion = allSongs[i].album.title

                let trackId = allSongs[i].id
                
                let artistId = allSongs[i].artist.id
                
                let albumId = allSongs[i].album.id


                if (window.matchMedia("(min-width: 1440px)").matches) {

                    if (songArtist != songArtist.toUpperCase()){
                        console.log("es minis");
                        songArtist = truncateString(songArtist, 21, 20);
                    } else if (songArtist == songArtist.toUpperCase()) {
                        console.log("es mayus")
                        songArtist = truncateString(songArtist, 20,19);
                    }

                    if (albumDeCancion != albumDeCancion.toUpperCase()){
                        console.log("es minis");
                        albumDeCancion = truncateString(albumDeCancion, 21, 20);
                    } else if (albumDeCancion == albumDeCancion.toUpperCase()) {
                        console.log("es mayus")
                        albumDeCancion = truncateString(albumDeCancion, 20,19);
                    }

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 21, 20);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 20,19);
                    }
                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (albumDeCancion != albumDeCancion.toUpperCase()){
                        console.log("es minis");
                        albumDeCancion = truncateString(albumDeCancion, 14, 13);
                    } else if (albumDeCancion == albumDeCancion.toUpperCase()) {
                        console.log("es mayus")
                        albumDeCancion = truncateString(albumDeCancion, 13, 12);
                    } 

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 12, 11);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 11, 10);
                    } 

                    if (songArtist != songArtist.toUpperCase()){
                        console.log("es minis");
                        songArtist = truncateString(songArtist, 12, 11);
                    } else if (songArtist == songArtist.toUpperCase()) {
                        console.log("es mayus")
                        songArtist = truncateString(songArtist, 11, 10);
                    } 
                } else if (window.matchMedia("(min-width: 320px)").matches) {

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 16, 15);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 14, 13);
                    } 
                }

                let songItem = '<article class="cancion"><p class="nombre"> <a href="track.html?trackID=' + trackId +'">' + songTitle + '</a></p><p class="duracion">' + minutes + ':' + seconds + '</p><p class="artista"><a href="artist.html?artistID=' + artistId +'">' + songArtist + '</a></p> <p class="album"> <a href="album.html?albumID=' + albumId +'">' + albumDeCancion + '</a></p></article>'

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
