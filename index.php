<?php
session_start();

?>

<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excavació Juràssica</title>
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
        <form id="infoForm" action="game.php" method="POST">
            <input type="text" id="name_landing" name="name_landing" required minlength="3" maxlength="30"> 
           
        </form> 
        <h1>Excavació Juràssica</h1>
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
            const nameInput = document.getElementById("name_landing"); //Guardamos los valores introducidos
            const infoForm = document.getElementById("infoForm"); //Guardamos el formato de formulario para poder hacer un submit

            nameInput.addEventListener("input", function() {
                // Comprobar la longitud del nombre
                if (nameInput.value.length > 3 && nameInput.value.length < 30) {
                playButton.classList.remove("disabled");
                playButton.href = "#"; // Href nulo para esperar que el usuario confirme
            } else {
                playButton.classList.add("disabled");
                playButton.href = "#"; // href nulo
            }
        });

        // Añadir el evento click solo una vez
        playButton.addEventListener("click", function(event) {
          if   (!playButton.classList.contains("disabled")) {
                // Enviar el formulario cuando el boton esta habilitado y se haga click
                infoForm.submit();
            } 
            });
        });
    </script>

</body>
</html>
