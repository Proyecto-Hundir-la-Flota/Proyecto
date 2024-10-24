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
       
       <input type="text" id="name_landing" name="name_landing" required minlength="3" maxlength="30">
       <input type="button" id="menuBotton" name="menuBotton">
       <ul id="list" class="hiddenClass">
           <li ><input type="checkbox" id="limitedAmmo">Munició limitada</li>
           <li ><input type="checkbox" id="tankShips">Vaixells acorassats</li>
           <li ><input type="checkbox" id="specialAtack">Atacs especials</li>
       </ul>
       </input>
  

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
                <input type="hidden" id="soloMenuLimitedAmmo" name="limitedAmmo">
                <input type="hidden" id="soloMenuTankShips" name="menuTankShips">
                <input type="hidden" id="soloMenuSpecialAtack" name="menuSpecialAtack">
                <input type="hidden" name="gamemode" value="training">
                <button disabled id="bottonSolo" type="submit" class="btn_play disabled"><i
                        class="fa-solid fa-gamepad"></i> Terreny de Proves</button>
            </form>

            <form id="formBottonIa" method="POST" action="game.php">
                <input type="hidden" id="iaName" name="name_landing">
                <input type="hidden" id="iaMenuLimitedAmmo" name="limitedAmmo">
                <input type="hidden" id="iaMenuTankShips" name="menuTankShips">
                <input type="hidden" id="iaMenuSpecialAtack" name="menuSpecialAtack">
                <input type="hidden" name="gamemode" value="versus-ia">
                <button disabled id="bottonIa" type="submit" class="btn_play disabled"><i class="fa-solid fa-robot"></i>
                    Excavació contra IA</button>
            </form>

            <a href="ranking.php"><i class="fa-solid fa-ranking-star"></i>Rànquing Paleontòlegs</a>
        </div>
    </div>

    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            const playButtonIa = document.getElementById("bottonIa");
            const playButtonSolo = document.getElementById("bottonSolo");
            const nameInput = document.getElementById("name_landing"); //Guardamos los valores introducidos
            const soloName = document.getElementById("soloName");
            const iaName = document.getElementById("iaName");
            
            // agregar variables para el menu desplegable
            const lilimitedAmmo = document.getElementById("limitedAmmo"); //guardamos la variable para la fucion de click en el li
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

            // guardar el id de municion infinita al hacer click
            lilimitedAmmo.addEventListener("click", function () {
                    if (limitedAmmo.checked == true){
                        soloMenuLimitedAmmo.value = "limitedAmmo"; // Almacena el id del <li> en el menu para training
                        iaMenuLimitedAmmo.value = "limitedAmmo"; // Almacena el id del <li> en el menu para la ia
               
                    } else {
                        soloMenuLimitedAmmo.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor
                        iaMenuLimitedAmmo.value = ""; 
               
                    }
     
            });

            // guardar el id de barco acorazado
            litankShips.addEventListener("click", function () {
                if (tankShips.checked == true){
                    soloMenuTankShips.value = "tankShips"; // Almacena el id del <li> en el menu para training
                    iaMenuTankShips.value = "tankShips"; // Almacena el id del <li> en el menu para la ia
               
                    } else {
                        soloMenuTankShips.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor
                        iaMenuTankShips.value = "" ;
               
                    }
              
            });

            // guardar el id de municion infinita
            lispecialAtack.addEventListener("click", function () {
                if (specialAtack.checked == true){
                    soloMenuSpecialAtack.value = "specialAtack"; // Almacena el id del <li> en el menu para training
                    iaMenuSpecialAtack.value = "specialAtack"; // Almacena el id del <li> en el menu para la ia
               
                    } else {
                        soloMenuSpecialAtack.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor
                        iaMenuSpecialAtack.value = "" ;
               
                    }
            });

            nameInput.addEventListener("input", function () {
                if (nameInput.value.length >= 3 && nameInput.value.length <= 30) {
                    playButtonIa.classList.remove("disabled");
                    playButtonSolo.classList.remove("disabled");
                    playButtonIa.disabled = false; // Habilitar el botón
                    playButtonSolo.disabled = false; // Habilitar el botón
                } else {
                    playButtonIa.classList.add("disabled");
                    playButtonSolo.classList.add("disabled");
                    playButtonIa.disabled = true; // Deshabilitar el botón
                    playButtonSolo.disabled = true; // Deshabilitar el botón
                }
                soloName.value = nameInput.value;
                iaName.value = nameInput.value;

            });

        });
    </script>

</body>

</html>