<?php
session_start();
unset($_SESSION['finishName']);

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
            <input type="button" id="menuBotton" name="menuBotton">
            <ul id="list" class="hiddenClass">
                <li id="limitedAmmo">Munició limitada</li>
                <li id="tankShips">Vaixells acorassats</li>
                <li id="specialAtack">Atacs especials</li>
            </ul>
            </input>
        </form>
        <h1>Excavació Juràssica</h1>
        <h3>Desenterra ossos de fa milions d'anys!</h3>
        <p>Explora i excava per trobar ossos de dinosaures ocults sota terra. Tria les coordenades correctes i
            descobreix tresors prehistòrics. Seràs capaç de desenterrar-los tots?</p>
        <div class="button_container">
            <!--<a id="btn_play" href="#" class="disabled"><i class="fa-solid fa-gamepad"></i>Terreny de Proves</a>
            <a id="btn_play" href="#" class="disabled"><i class="fa-solid fa-robot"></i>Excavació contra IA</a>-->
            <!-- Formulario para "Terreny de Proves" -->

            <form class="formBottonSolo" method="POST" action="game.php">
                <input type="hidden" id="soloName" name="name_landing">
                <input type="hidden" id="soloMenu" name="menuResult">
                <input type="hidden" name="gamemode" value="training">
                <button disabled id="bottonSolo" type="submit" class="btn_play disabled"><i
                        class="fa-solid fa-gamepad"></i> Terreny de Proves</button>
            </form>

            <form id="formBottonIa" method="POST" action="game.php">
                <input type="hidden" id="iaName" name="name_landing">
                <input type="hidden" id="iaMenu" name="menuResult">
                <input type="hidden" name="gamemode" value="versus-ia">
                <button disabled id="bottonIa" type="submit" class="btn_play disabled"><i class="fa-solid fa-robot"></i>
                    Excavació contra IA</button>
            </form>

            <a href="ranking.php"><i class="fa-solid fa-ranking-star"></i>Rànquing Paleontòlegs</a>
        </div>
    </div>

    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            const playButtonIa = document.getElementById("bottonIa");
            const playButtonSolo = document.getElementById("bottonSolo");
            const nameInput = document.getElementById("name_landing"); //Guardamos los valores introducidos
            const soloName = document.getElementById("soloName");
            const iaName = document.getElementById("iaName");


            // agregar variables para el menu desplegable
            const lilimitedAmmo = document.getElementById("limitedAmmo");
            const litankShips = document.getElementById("tankShips");
            const lispecialAtack = document.getElementById("specialAtack");
            const menuButton = document.getElementById("menuBotton");
            const menuList = document.getElementById("list");


            // funcion para el menu desplegable
            menuButton.addEventListener("click", function () {
                // Alternar la visibilidad de la lista
                menuList.classList.toggle("hidden");
                menuList.classList.toggle("visible");
            });

            // guardar el id de municion infinita
            lilimitedAmmo.addEventListener("click", function () {
                soloMenu.value = this.id; // Almacena el id del <li> en el menu para training
                iaMenu.value = this.id; // Almacena el id del <li> en el menu para la ia
               
            });

            // guardar el id de municion infinita
            litankShips.addEventListener("click", function () {
                soloMenu.value = this.id;
                iaMenu.value = this.id; 
              
            });

            // guardar el id de municion infinita
            lispecialAtack.addEventListener("click", function () {
                soloMenu.value = this.id; 
                iaMenu.value = this.id;
                
            });



            // funcion para pasar parametros del nombre
            nameInput.addEventListener("input", function () {
                if (nameInput.value.length >= 3 && nameInput.value.length <= 30) {
                    playButtonIa.classList.remove("disabled");
                    playButtonSolo.classList.remove("disabled");
                    playButtonIa.disabled = false;  // Habilitar el botón
                    playButtonSolo.disabled = false;  // Habilitar el botón
                } else {
                    playButtonIa.classList.add("disabled");
                    playButtonSolo.classList.add("disabled");
                    playButtonIa.disabled = true;   // Deshabilitar el botón
                    playButtonSolo.disabled = true; // Deshabilitar el botón
                }
                soloName.value = nameInput.value;
                iaName.value = nameInput.value;

            });

        });
    </script>

</body>

</html>