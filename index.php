<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excavació Jurásica</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/9c44094610.js" crossorigin="anonymous"></script>
</head>

<body id="landing_page">
    <noscript>
        <div id="noScriptAlert">
            <p>Atenció! El navegador no té habilitat el JavaScript. Cal habilitar-lo per jugar.</p>
        </div>
    </noscript>

    <div class="hero">
        <h1>Excavació Jurásica</h1>
        <h3>Desenterra ossos de fa milions d'anys!</h3>
        <p>Explora i excava per trobar ossos de dinosaures ocults sota terra. Tria les coordenades correctes i
            descobreix tresors prehistòrics. Seràs capaç de desenterrar-los tots?</p>
        <div class="button_container">
            <a id="btn_play" href="#" class="disabled"><i class="fa-solid fa-gamepad"></i>Començar Joc</a>
            <a href="ranking.php"><i class="fa-solid fa-ranking-star"></i>Rànquing Paleontòlegs</a>
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