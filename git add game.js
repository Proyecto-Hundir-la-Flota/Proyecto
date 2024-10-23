[1mdiff --git a/game.js b/game.js[m
[1mindex 7596c46..d6110c1 100644[m
[1m--- a/game.js[m
[1m+++ b/game.js[m
[36m@@ -5,6 +5,7 @@[m [mconst gameMode = document.body.getAttribute('data-gamemode');[m
 [m
 // crear un array, donde usando cada nombre guarda un archivo de audio[m
 const audios = [];[m
[32m+[m[32maudios['cavar']= new Audio("./sounds/cavar.mp3");[m
 audios['arena'] = new Audio("./sounds/desenterrar_arena.mp3");[m
 audios['hueso'] = new Audio("./sounds/desenterrar_huesos.mp3");[m
 audios['easter_egg'] = new Audio("./sounds/easter_egg.mp3");[m
[36m@@ -14,13 +15,8 @@[m [maudios['win'] = new Audio("./sounds/win.mp3");[m
 const discoveredFossils = [];[m
 const iaDiscoveredFossils = [];[m
 [m
[31m-const playerBoard = document.querySelector(".turn-overlay");[m
[31m-const aiBoard = document.querySelector(".turn-overlay-ia");[m
[31m-[m
 // Variable para controlar si el jugador puede hacer clic[m
 let playerCanClick = true;[m
[31m-let repeatTurn = false;[m
[31m-let IArepeatTurn = false;[m
 [m
 let elapsedTime = 0; //Tiempo que transcurrido[m
 let timerId;[m
[36m@@ -82,20 +78,6 @@[m [mfunction createAlerts(alert_type, playerType) {[m
     // Clase adicional para diferenciar las alertas del jugador y la IA[m
     const playerClass = playerType === 'player' ? 'player-alert' : 'ia-alert';[m
 [m
[31m-    // Crear la alerta de "espera"[m
[31m-    if (alert_type === 'wait') {[m
[31m-        alert = document.createElement('div');[m
[31m-        alert.id = 'waitAlert';[m
[31m-        alert.className = `alert ${playerClass}`; // Añadimos la clase del jugador/IA[m
[31m-        document.body.appendChild(alert);[m
[31m-        elementI = document.createElement('i');[m
[31m-        elementI.className = emojis['wait']; // Agregamos el icono usando la clase[m
[31m-        alert.appendChild(elementI); // Añadimos element i como hijo de alert para agregar el emoji[m
[31m-        const textNode = document.createTextNode("Espera tu turno!");[m
[31m-        alert.appendChild(textNode); // Añadimos element textNode como hijo de alert para agregar el texto[m
[31m-        alert.style.display = 'block';[m
[31m-    }[m
[31m-[m
     // Crear la alerta de "encontrado"[m
     if (alert_type === 'found') {[m
         alert = document.createElement('div');[m
[36m@@ -214,19 +196,22 @@[m [mfunction checkStatus(event, boardType) {[m
 [m
     // Verificar si es el turno del jugador[m
     if (!playerCanClick) {[m
[31m-        createAlerts('wait', 'player');[m
[32m+[m[32m        console.log("Espera tu turno");[m
         return; // Salir si el jugador no puede hacer clic[m
     }[m
[31m-    [m
 [m
     // Si la celda está cubierta, se destapa[m
     if (cell.classList.contains("covered")) {[m
[32m+[m
[32m+[m[32m        audios['cavar'].play();[m
[32m+[m[32m        setTimeout(() => {[m
[32m+[m[41m            [m
[32m+[m[32m            cell.classList.remove("covered");[m
[32m+[m[32m        }, 3500);[m
         [m
[31m-        cell.classList.remove("covered");[m
 [m
         if (boardType === 'player') {[m
             // Lógica y sonidos para el tablero del jugador[m
[31m-            [m
             handlePlayerBoardLogic(cell);[m
 [m
             // Deshabilitar los clics del jugador después de su turno[m
[36m@@ -234,6 +219,7 @@[m [mfunction checkStatus(event, boardType) {[m
 [m
             // Solo ejecutar iaTurn si estamos en modo multiPlayer o versus-ia[m
             if (gameMode === 'multiPlayer' || gameMode === 'versus-ia') {[m
[32m+[m[32m                // Esperar 2 segundos antes de que la IA haga su movimiento[m
                 if (!repeatTurn) {[m
                     // Esperar 2.5 segundos antes de que la IA haga su movimiento[m
                     setTimeout(() => {[m
[36m@@ -242,22 +228,20 @@[m [mfunction checkStatus(event, boardType) {[m
                             iaTurn();  // La IA hace su turno después de 2.5 segundos[m
                         }, 1250);[m
                     }, 1250);[m
[31m-                } else {[m
[31m-                    // Si es turno del jugador de repetir, habilitar los clics nuevamente después de su turno[m
[31m-                    setTimeout(() => {[m
[31m-                        playerCanClick = true;[m
[31m-                    }, 2500);[m
[31m-                }[m
[31m-                [m
[31m-                [m
             } else {[m
                 // En single player, podemos reactivar los clics inmediatamente si no hay IA[m
                 playerCanClick = true;[m
[32m+[m[32m                /*[m
[32m+[m[32m                posible cambio[m
[32m+[m[32m                setTimeout(() => {[m
[32m+[m[32m                        playerCanClick = true;[m
[32m+[m[32m                    }, 2500);[m
[32m+[m[32m                    */[m
             }[m
         }[m
     }[m
 }[m
[31m-[m
[32m+[m[32m}[m
 [m
 [m
 [m
[36m@@ -287,9 +271,9 @@[m [mfunction handlePlayerBoardLogic(cell) {[m
             points += 2;[m
         }[m
 [m
[31m-            repeatTurn = true;[m
[31m-            let hitAndSink = false;[m
[31m-            let victory = true;[m
[32m+[m[32m        repeatTurn = true;[m
[32m+[m[32m        let hitAndSink = false;[m
[32m+[m[32m        let victory = true;[m
 [m
         let cellPosition = cell.id.replace("cell_", "").split("_");[m
 [m
[36m@@ -356,49 +340,44 @@[m [mfunction handlePlayerBoardLogic(cell) {[m
             if (hitAndSink) {[m
                 points += 15;[m
                 // fosil descubierto[m
[31m-                if (!audios['dino'].paused) {[m
[31m-                    audios['dino'].pause(); // Si está reproduciéndose, lo pausamos[m
[31m-                    audios['dino'].currentTime = 0; // Reiniciamos el audio[m
[31m-                }[m
[31m-                createAlerts('foundAll', 'player');[m
[31m-                audios['dino'].play();[m
[31m-[m
[32m+[m[32m                setTimeout(() => {[m
[32m+[m[32m                    createAlerts('foundAll', 'player');[m
[32m+[m[32m                    audios['dino'].play();[m[41m                   [m
[32m+[m[32m                }, 3500);[m[41m           [m
             } else {[m
                 points += 10;[m
                 // huesso encontrado[m
[31m-                if (!audios['hueso'].paused) {[m
[31m-                    audios['hueso'].pause(); // Si está reproduciéndose, lo pausamos[m
[31m-                    audios['hueso'].currentTime = 0; // Reiniciamos el audio[m
[31m-                }[m
[31m-                createAlerts('found', 'player');[m
[31m-                audios['hueso'].play();[m
[32m+[m[32m                setTimeout(() => {[m
[32m+[m[32m                    createAlerts('found', 'player');[m
[32m+[m[32m                    audios['hueso'].play();[m[41m          [m
[32m+[m[32m                }, 3500);[m[41m  [m
             }[m
[31m-[m
[31m-            }[m
[31m-        } else {[m
[31m-            accumulatedErrors++;[m
[31m-            consecutiveAccumulatedHits = 0;[m
[31m-            repeatTurn = false;[m
[32m+[m[32m        }[m
[32m+[m[32m    } else {[m
[32m+[m[32m        accumulatedErrors++;[m
[32m+[m[32m        consecutiveAccumulatedHits = 0;[m
[32m+[m[32m        repeatTurn = false;[m
 [m
         if (accumulatedErrors >= 3) {[m
             points -= 5;[m
             accumulatedErrors = 0;[m
         }[m
         // fallo al buscar[m
[31m-        if (!audios['arena'].paused) {[m
[31m-            audios['arena'].pause(); // Si está reproduciéndose, lo pausamos[m
[31m-            audios['arena'].currentTime = 0; // Reiniciamos el audio[m
[31m-        }[m
[31m-        createAlerts('miss', 'player');[m
[31m-        audios['arena'].play();[m
[32m+[m[32m        setTimeout(() => {[m
[32m+[m[32m            createAlerts('miss', 'player');[m
[32m+[m[32m            audios['arena'].play();[m
[32m+[m[32m        }, 3500);[m[41m  [m
     }[m
     updatePointsCounter();[m
 }[m
 [m
 function handleAIBoardLogic(cell) {[m
[32m+[m
[32m+[m[32m    audios['cavar'].play();[m
     // Verifica si la celda clicada contiene un hueso[m
     if (cell.classList.contains("bone")) {[m
 [m
[32m+[m[41m        [m
         let hitAndSink = false;[m
         let victory = true;[m
         IArepeatTurn = true;[m
[36m@@ -409,28 +388,27 @@[m [mfunction handleAIBoardLogic(cell) {[m
         // Recorremos los barcos de la IA para verificar si la posición coincide con algún fósil[m
         for (let index = 0; index < iaShips.length; index++) {[m
             iaDiscoveredFossils[index][0] = true;[m
[31m-        [m
[32m+[m
             for (let indexShip = 0; indexShip < iaShips[index].length; indexShip++) {[m
                 let position = iaShips[index][indexShip][0];[m
[31m-        [m
[32m+[m
                 // Comprobar si la posición de la celda corresponde a un fósil del barco[m
                 if (position[0] == cellPosition[0] && position[1] == cellPosition[1]) {[m
                     iaShips[index][indexShip][1] = true; // Marcar como descubierto en IA[m
                     iaDiscoveredFossils[index][1] = true; // Marcar fósil como encontrado[m
                 }[m
[31m-        [m
[32m+[m
                 // Si alguna parte del barco no ha sido descubierta, no se completa el fósil[m
                 if (!iaShips[index][indexShip][1]) {[m
                     iaDiscoveredFossils[index][0] = false;[m
                 }[m
             }[m
         }[m
[31m-        [m
         // Comprobar si la IA ha ganado[m
         for (let index = 0; index < iaDiscoveredFossils.length; index++) {[m
             let discoveredFossil = iaDiscoveredFossils[index];[m
             let foundBone = discoveredFossil[0];[m
[31m-        [m
[32m+[m
             if (!foundBone) {[m
                 victory = false; // Si no se encontró todo el fósil[m
             } else {[m
[36m@@ -438,10 +416,10 @@[m [mfunction handleAIBoardLogic(cell) {[m
                     hitAndSink = true; // Se descubrió el fósil completo[m
                 }[m
             }[m
[31m-        [m
[32m+[m
             iaDiscoveredFossils[index][1] = false; // Reiniciar la parte encontrada para el próximo clic[m
         }[m
[31m-        [m
[32m+[m
         if (victory) {[m
             stopClock();[m
         [m
[36m@@ -460,29 +438,38 @@[m [mfunction handleAIBoardLogic(cell) {[m
         } else {[m
             if (hitAndSink) {[m
                 // Mostrar alerta de fósil completo[m
[31m-                createAlerts('foundAll', 'ia');[m
[31m-                audios['dino'].play();[m
[32m+[m[32m                setTimeout(() => {[m
[32m+[m[32m                    createAlerts('foundAll', 'ia');[m
[32m+[m[32m                    audios['dino'].play();[m
[32m+[m[32m                }, 3500);[m
             } else {[m
                 // Mostrar alerta de fósil encontrado[m
[31m-                createAlerts('found', 'ia');[m
[31m-                audios['hueso'].play();[m
[32m+[m[32m                setTimeout(() => {[m
[32m+[m[32m                    createAlerts('found', 'ia');[m
[32m+[m[32m                    audios['hueso'].play();[m
[32m+[m[32m                }, 3500);[m[41m     [m
             }[m
[31m-        }        [m
[32m+[m[32m        }[m
     } else {[m
         // Si no se encontró un fósil, reproducimos el sonido de fallo[m
         IArepeatTurn = false;[m
[31m-        createAlerts('miss', 'ia');[m
[31m-        audios['arena'].play();[m
[32m+[m[32m        setTimeout(() => {[m
[32m+[m[32m            createAlerts('miss', 'ia');[m
[32m+[m[32m            audios['arena'].play();[m[41m   [m
[32m+[m[32m        }, 3500);[m
     }[m
 }[m
 [m
 [m
 [m
[32m+[m[32m// Función que maneja el turno de la IA[m
 function iaTurn() {[m
     console.log("Turno de la IA");[m
[31m-    let validMove = false;[m
     [m
[31m-    // Mientras la IA no haga una jugada válida[m
[32m+[m[32m    setTimeout(() => {[m
[32m+[m[32m    let validMove = false;[m
[32m+[m
[32m+[m[32m    // Bucle que busca una celda válida para que la IA juegue[m
     while (!validMove) {[m
         const randomRow = Math.floor(Math.random() * 10);[m
         const randomCol = Math.floor(Math.random() * 10);[m
[36m@@ -490,15 +477,18 @@[m [mfunction iaTurn() {[m
 [m
         // Verificar si la celda existe y está cubierta[m
         if (cell && cell.classList.contains("covered")) {[m
[31m-            // La IA hace su jugada[m
[31m-            cell.classList.remove("covered"); // Destapar la celda[m
[32m+[m[32m             // La IA hace su jugada[m[41m   [m
[32m+[m[32m            setTimeout(() => {[m
[32m+[m[32m                cell.classList.remove("covered"); // Destapar la celda[m
[32m+[m[32m            }, 3000);[m
[32m+[m[41m            [m
[32m+[m
             handleAIBoardLogic(cell); // Lógica para manejar el clic de la IA[m
             validMove = true; // Salir del bucle al encontrar una celda válida[m
         }[m
     }[m
[31m-[m
[31m-    // Si la IA acierta y tiene que repetir turno[m
[31m-    if (IArepeatTurn) {[m
[32m+[m[32m     // Si la IA acierta y tiene que repetir turno[m
[32m+[m[32m     if (IArepeatTurn) {[m
         setTimeout(iaTurn, 2500);  // Espera 2.5 segundos y repite el turno[m
         playerCanClick = false;    // Deshabilitar clics del jugador mientras la IA tiene derecho a otro turno[m
     } else {[m
[36m@@ -509,6 +499,7 @@[m [mfunction iaTurn() {[m
             }, 1250);[m
         }, 1250);[m
     }[m
[32m+[m[32m}, 2000);[m
 }[m
 [m
 document.addEventListener("DOMContentLoaded", function () {[m
[36m@@ -541,5 +532,3 @@[m [mdocument.addEventListener("DOMContentLoaded", function () {[m
         document.getElementById("score-hidden").value = points;[m
     });[m
 });[m
[31m-[m
[31m-[m
[1mdiff --git a/game.php b/game.php[m
[1mindex 79dbf68..a41bda4 100644[m
[1m--- a/game.php[m
[1m+++ b/game.php[m
[36m@@ -6,7 +6,32 @@[m
         $_SESSION['finishName'] = $_SESSION['name'];//sesion game[m
         unset($_SESSION['name']); //borrar la sesion de index[m
     }[m
[31m-        [m
[32m+[m
[32m+[m[32m     if (isset($_POST["limitedAmmo"])) {[m
[32m+[m[32m        if($_POST["limitedAmmo"]==="limitedAmmo"){[m
[32m+[m[32m            echo $_POST["limitedAmmo"];[m
[32m+[m[41m           [m
[32m+[m[32m    //  funciona, guardar valor en variable deseada[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[41m     [m
[32m+[m[32m     if (isset($_POST["menuTankShips"])) {[m
[32m+[m[32m        if($_POST["menuTankShips"]==="tankShips"){[m
[32m+[m[32m            echo $_POST["menuTankShips"];[m
[32m+[m[32m            //  funciona, guardar valor en variable deseada[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m[41m    [m
[32m+[m[41m      [m
[32m+[m[32m     if (isset($_POST["menuSpecialAtack"])) {[m
[32m+[m[32m        if($_POST["menuSpecialAtack"]==="specialAtack"){[m
[32m+[m[32m            echo $_POST["menuSpecialAtack"];[m
[32m+[m[32m            //  funciona, guardar valor en variable deseada[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m     }[m[41m   [m
[32m+[m
 ?>[m
 [m
 [m
[36m@@ -35,7 +60,6 @@[m
     ?>[m
 >[m
 [m
[31m-[m
     <div class="tape">[m
         <div class="dinosaurs-left">[m
             <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"[m
[1mdiff --git a/index.php b/index.php[m
[1mindex f90d420..787f7ba 100644[m
[1m--- a/index.php[m
[1m+++ b/index.php[m
[36m@@ -23,9 +23,16 @@[m [munset($_SESSION['finishName']);[m
     </noscript>[m
 [m
     <div class="hero">[m
[31m-        <input type="text" id="name_landing" name="name_landing" required minlength="3" maxlength="30">[m
[31m-[m
[31m-[m
[32m+[m[41m       [m
[32m+[m[32m            <input type="text" id="name_landing" name="name_landing" required minlength="3" maxlength="30">[m
[32m+[m[32m            <input type="button" id="menuBotton" name="menuBotton">[m
[32m+[m[32m            <ul id="list" class="hiddenClass">[m
[32m+[m[32m                <li ><input type="checkbox" id="limitedAmmo">Munició limitada</li>[m
[32m+[m[32m                <li ><input type="checkbox" id="tankShips">Vaixells acorassats</li>[m
[32m+[m[32m                <li ><input type="checkbox" id="specialAtack">Atacs especials</li>[m
[32m+[m[32m            </ul>[m
[32m+[m[32m            </input>[m
[32m+[m[41m       [m
         <h1>Excavació Juràssica</h1>[m
         <h3>Desenterra ossos de fa milions d'anys!</h3>[m
         <p>Explora i excava per trobar ossos de dinosaures ocults sota terra. Tria les coordenades correctes i[m
[36m@@ -37,6 +44,9 @@[m [munset($_SESSION['finishName']);[m
 [m
             <form class="formBottonSolo" method="POST" action="game.php">[m
                 <input type="hidden" id="soloName" name="name_landing">[m
[32m+[m[32m                <input type="hidden" id="soloMenuLimitedAmmo" name="limitedAmmo">[m
[32m+[m[32m                <input type="hidden" id="soloMenuTankShips" name="menuTankShips">[m
[32m+[m[32m                <input type="hidden" id="soloMenuSpecialAtack" name="menuSpecialAtack">[m
                 <input type="hidden" name="gamemode" value="training">[m
                 <button disabled id="bottonSolo" type="submit" class="btn_play disabled"><i[m
                         class="fa-solid fa-gamepad"></i> Terreny de Proves</button>[m
[36m@@ -44,6 +54,9 @@[m [munset($_SESSION['finishName']);[m
 [m
             <form id="formBottonIa" method="POST" action="game.php">[m
                 <input type="hidden" id="iaName" name="name_landing">[m
[32m+[m[32m                <input type="hidden" id="iaMenuLimitedAmmo" name="limitedAmmo">[m
[32m+[m[32m                <input type="hidden" id="iaMenuTankShips" name="menuTankShips">[m
[32m+[m[32m                <input type="hidden" id="iaMenuSpecialAtack" name="menuSpecialAtack">[m
                 <input type="hidden" name="gamemode" value="versus-ia">[m
                 <button disabled id="bottonIa" type="submit" class="btn_play disabled"><i class="fa-solid fa-robot"></i>[m
                     Excavació contra IA</button>[m
[36m@@ -62,6 +75,68 @@[m [munset($_SESSION['finishName']);[m
             const iaName = document.getElementById("iaName");[m
 [m
 [m
[32m+[m[32m            // agregar variables para el menu desplegable[m
[32m+[m[32m            const lilimitedAmmo = document.getElementById("limitedAmmo"); //guardamos la variable para la fucion de click en el li[m
[32m+[m[32m            const litankShips = document.getElementById("tankShips");[m
[32m+[m[32m            const lispecialAtack = document.getElementById("specialAtack");[m
[32m+[m
[32m+[m[32m            const menuButton = document.getElementById("menuBotton");[m
[32m+[m[32m            const menuList = document.getElementById("list");[m
[32m+[m
[32m+[m
[32m+[m[32m            // funcion para el menu desplegable[m
[32m+[m[32m            menuButton.addEventListener("click", function () {[m
[32m+[m[32m                // Alternar la visibilidad de la lista[m
[32m+[m[32m                menuList.classList.toggle("hidden");[m
[32m+[m[32m                menuList.classList.toggle("visible");[m
[32m+[m[32m            });[m
[32m+[m
[32m+[m[32m            // guardar el id de municion infinita al hacer click[m
[32m+[m[32m            lilimitedAmmo.addEventListener("click", function () {[m
[32m+[m[32m                    if (limitedAmmo.checked == true){[m
[32m+[m[32m                        soloMenuLimitedAmmo.value = "limitedAmmo"; // Almacena el id del <li> en el menu para training[m
[32m+[m[32m                        iaMenuLimitedAmmo.value = "limitedAmmo"; // Almacena el id del <li> en el menu para la ia[m
[32m+[m[41m               [m
[32m+[m[32m                    } else {[m
[32m+[m[32m                        soloMenuLimitedAmmo.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor[m
[32m+[m[32m                        iaMenuLimitedAmmo.value = "";[m[41m [m
[32m+[m[41m               [m
[32m+[m[32m                    }[m
[32m+[m[41m     [m
[32m+[m[32m            });[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m            // guardar el id de barco acorazado[m
[32m+[m[32m            litankShips.addEventListener("click", function () {[m
[32m+[m[32m                if (tankShips.checked == true){[m
[32m+[m[32m                    soloMenuTankShips.value = "tankShips"; // Almacena el id del <li> en el menu para training[m
[32m+[m[32m                    iaMenuTankShips.value = "tankShips"; // Almacena el id del <li> en el menu para la ia[m
[32m+[m[41m               [m
[32m+[m[32m                    } else {[m
[32m+[m[32m                        soloMenuTankShips.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor[m
[32m+[m[32m                        iaMenuTankShips.value = "" ;[m
[32m+[m[41m               [m
[32m+[m[32m                    }[m
[32m+[m[41m              [m
[32m+[m[32m            });[m
[32m+[m
[32m+[m[32m            // guardar el id de municion infinita[m
[32m+[m[32m            lispecialAtack.addEventListener("click", function () {[m
[32m+[m[32m                if (specialAtack.checked == true){[m
[32m+[m[32m                    soloMenuSpecialAtack.value = "specialAtack"; // Almacena el id del <li> en el menu para training[m
[32m+[m[32m                    iaMenuSpecialAtack.value = "specialAtack"; // Almacena el id del <li> en el menu para la ia[m
[32m+[m[41m               [m
[32m+[m[32m                    } else {[m
[32m+[m[32m                        soloMenuSpecialAtack.value = ""; // en caso de deseleccionar, mandar un valor vacio, en game.php hacemos comprovacion del valor[m
[32m+[m[32m                        iaMenuSpecialAtack.value = "" ;[m
[32m+[m[41m               [m
[32m+[m[32m                    }[m
[32m+[m[32m            });[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m            // funcion para pasar parametros del nombre[m
             nameInput.addEventListener("input", function () {[m
                 if (nameInput.value.length >= 3 && nameInput.value.length <= 30) {[m
                     playButtonIa.classList.remove("disabled");[m
[1mdiff --git a/sounds/cavar.mp3 b/sounds/cavar.mp3[m
[1mnew file mode 100644[m
[1mindex 0000000..7cb0bfd[m
Binary files /dev/null and b/sounds/cavar.mp3 differ
[1mdiff --git a/sounds/desenterrar_arena.mp3 b/sounds/desenterrar_arena.mp3[m
[1mindex 3566f69..a511f26 100644[m
Binary files a/sounds/desenterrar_arena.mp3 and b/sounds/desenterrar_arena.mp3 differ
[1mdiff --git a/sounds/desenterrar_huesos.mp3 b/sounds/desenterrar_huesos.mp3[m
[1mindex e698a39..edd0c9e 100644[m
Binary files a/sounds/desenterrar_huesos.mp3 and b/sounds/desenterrar_huesos.mp3 differ
[1mdiff --git a/style.css b/style.css[m
[1mindex cddc089..562acfa 100644[m
[1m--- a/style.css[m
[1m+++ b/style.css[m
[36m@@ -1023,3 +1023,52 @@[m [mhtml {[m
         opacity: 0;[m
     }[m
 }[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m/* estilos menu desplegable */[m
[32m+[m[32m.hiddenClass{[m
[32m+[m[32m    display: none;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32m.visible {[m
[32m+[m[32m    display: block;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32mdiv.hero>ul {[m
[32m+[m[32m    position: absolute;[m[41m [m
[32m+[m[32m    list-style-type: none;[m
[32m+[m[32m    padding: 0;[m[41m [m
[32m+[m[32m    top: 100px;[m
[32m+[m[32m    right: 0;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mdiv.hero>#menuBotton {[m
[32m+[m[32m    position: relative;[m
[32m+[m[32m    left:400px;[m
[32m+[m[32m    top:10px;[m
[32m+[m[32m    right:10px;[m
[32m+[m[32m    padding: 10px 20px;[m
[32m+[m[32m    font-size: 16px;[m
[32m+[m[41m [m
[32m+[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mdiv.hero>#menuBotton:hover {[m
[32m+[m[32m    background-color: #0056b3; /* Color de fondo al pasar el ratón */[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mdiv.hero>ul li {[m
[32m+[m[41m   [m
[32m+[m[32m    padding: 10px;[m
[32m+[m[32m    background-color: gainsboro;[m
[32m+[m[32m    margin: 5px 10px;[m
[32m+[m[32m    border: 1px solid black;[m
[32m+[m[32m    opacity: 0.8;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mdiv.hero>ul li:hover {[m
[32m+[m[32m    background-color: burlywood;[m[41m [m
[32m+[m[32m}[m
