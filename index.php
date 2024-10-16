<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Batalla Naval</title>
</head>

<body>
    <noscript>
        <div id="noScriptAlert">
            <p>Atenció! El navegador no té habilitat el JavaScript. Cal habilitar-lo per jugar.</p>
        </div>
    </noscript>
    <div class="container">
        <div class="content">
            <h1>Batala Naval</h1>
            <p>Enfonsar la flota o jugar a barcos és un joc de taula per a dues persones que es pot jugar amb llapis i paper o en versions de tauler. El seu objectiu és endevinar la situació dels vaixells de l'enemic i enfonsar-los indicant-ne les coordenades. Les primeres versions van sorgir a finals del segle xix però es va popularitzar poc després de la primera guerra mundial</p>

            <div class="button_container">
                <a id="btn_play" href="#" class="disabled"><i class="fa-solid fa-gamepad"></i>Començar Joc</a>
                <a href="ranking.php"><i class="fa-solid fa-ranking-star"></i>Rànquing Paleontòlegs</a>
            </div>
        </div>
        <div class="shipImage">
            <img src="ship.png" alt="Nau Espacial">
        </div>
    </div>
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            const playButton = document.getElementById("btn_play");
            playButton.classList.remove("disabled");
            playButton.href = "game.php";
        });
    </script>
</body>

</html>