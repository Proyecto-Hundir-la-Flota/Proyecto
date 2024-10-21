// Obtener el modo de juego desde el atributo data-gamemode del body
const gameMode = document.body.getAttribute('data-gamemode');

// Ahora gameMode será 'singlePlayer' o 'multiPlayer'

// crear un array, donde usando cada nombre guarda un archivo de audio
const audios = [];
audios['arena'] = new Audio("./sounds/desenterrar_arena.mp3");
audios['hueso'] = new Audio("./sounds/desenterrar_huesos.mp3");
audios['easter_egg'] = new Audio("./sounds/easter_egg.mp3");
audios['dino'] = new Audio("./sounds/dino.mp3");
audios['win'] = new Audio("./sounds/win.mp3");

const discoveredFossils = [];

// Variable para controlar si el jugador puede hacer clic
let playerCanClick = true;

let elapsedTime = 0; //Tiempo que transcurrido
let timerId;
let points = 0;
let accumulatedErrors = 0;
let consecutiveAccumulatedHits = 0;
let pointsFrozen = false;
// Definimos las IDs de las celdas necesarias para el easter egg
let cell_0_0 = false;
let cell_0_9 = false;
let cell_9_0 = false;
let cell_9_9 = false;

// definir variable para comprovar que el easter egg solo se inicia una vez
let easterEggPlayed = false;

// Guardar la imagen para el easter egg
const easterEggImage = document.createElement('img');
easterEggImage.id = 'easter_egg'; 
easterEggImage.src = './images/easter_egg.png'; 
easterEggImage.alt = 'Easter Egg'; 
easterEggImage.style.display = 'none'; 
easterEggImage.className = 'easter-egg-style';
document.body.appendChild(easterEggImage);

// Mostrar el tiempo formateado en mm:ss
function displayTime() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById("gameClock").innerText = formattedTime;
}

// Iniciar el reloj
function startClock() {
    timerId = setInterval(function () {
        elapsedTime++;
        displayTime();
    }, 1000); // Incrementar cada segundo
}

// Detener el reloj
function stopClock() {
    clearInterval(timerId); // Detener el temporizador
}

function createAlerts(alert_type, playerType) {
    // forzamos a limpiar la alerta para no repetir una alarma existente
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    let alert;
    let elementI;

    const emojis = [];
    emojis['correct'] = "fa-solid fa-thumbs-up";
    emojis['incorrect'] = "fa-solid fa-circle-xmark";
    emojis['win'] = "fa-solid fa-crown";
    emojis['complet'] = "fa-solid fa-bone";

    // Clase adicional para diferenciar las alertas del jugador y la IA
    const playerClass = playerType === 'player' ? 'player-alert' : 'ia-alert';

    // Crear la alerta de "encontrado"
    if (alert_type === 'found') {
        alert = document.createElement('div');
        alert.id = 'foundAlert';
        alert.className = `alert ${playerClass}`; // Añadimos la clase del jugador/IA
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['correct']; // Agregamos el icono usando la clase
        alert.appendChild(elementI); // Añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(playerType === 'player' ? " Has trobat un ós!" : " La IA ha trobat un ós!");
        alert.appendChild(textNode); // Añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "fallo"
    if (alert_type === 'miss') {
        alert = document.createElement('div');
        alert.id = 'missAlert';
        alert.className = `alert ${playerClass}`; // Añadimos la clase del jugador/IA
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['incorrect']; // Agregamos el icono usando la clase
        alert.appendChild(elementI);  // Añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(playerType === 'player' ? " No s'ha trobat res" : " La IA no ha trobat res");
        alert.appendChild(textNode); // Añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "fósil entero descubierto"
    if (alert_type === 'foundAll') {
        alert = document.createElement('div');
        alert.id = 'foundAlertAll';
        alert.className = `alert ${playerClass}`; // Añadimos la clase del jugador/IA
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['complet']; // Agregamos el icono usando la clase
        alert.appendChild(elementI);  // Añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(playerType === 'player' ? " Has trobat un fòssil!" : " La IA ha trobat un fòssil!");
        alert.appendChild(textNode); // Añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "victoria"
    if (alert_type === 'win') {
        alert = document.createElement('div');
        alert.id = 'winAlert';
        alert.className = `alert ${playerClass}`; // Añadimos la clase del jugador/IA
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['win']; // Agregamos el icono usando la clase
        alert.appendChild(elementI); // Añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(playerType === 'player' ? " Has guanyat el joc!" : " La IA ha guanyat el joc!");
        alert.appendChild(textNode); // Añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Remover las alertas después de 3 segundos (opcional)
    setTimeout(() => {
        if (alert) {
            // Añadir la clase de salida según el tipo de jugador
            alert.classList.add(playerType === 'player' ? 'slide-out-player' : 'slide-out-ai');
            // Remover después de la animación
            setTimeout(() => {
                alert.remove();
            }, 500); // Duración de la animación de salida
        }
    }, 2000);
}



// Función para actualizar el contador de puntos en pantalla
function updatePointsCounter() {
    if (!pointsFrozen) { 
        const scoreElements = document.querySelectorAll(".score");
        
        scoreElements.forEach(element => {
            element.innerText = points;
        });
    }
}

function stopUpdatePoints() {
    pointsFrozen = true;
}

// Función checkStatus
function checkStatus(event, boardType) {
    const cell = event.target;

    // Verificar si es el turno del jugador
    if (!playerCanClick) {
        console.log("Espera tu turno");
        return; // Salir si el jugador no puede hacer clic
    }

    // Si la celda está cubierta, se destapa
    if (cell.classList.contains("covered")) {
        cell.classList.remove("covered");

        if (boardType === 'player') {
            // Lógica y sonidos para el tablero del jugador
            handlePlayerBoardLogic(cell);

            // Deshabilitar los clics del jugador después de su turno
            playerCanClick = false;

            // Solo ejecutar iaTurn si estamos en modo multiPlayer o versus-ia
            if (gameMode === 'multiPlayer' || gameMode === 'versus-ia') {
                // Esperar 2 segundos antes de que la IA haga su movimiento
                setTimeout(() => {
                    iaTurn(); // La IA hace su turno después de 2 segundos

                    // Después del turno de la IA, esperar 1 segundo antes de habilitar los clics del jugador
                    setTimeout(() => {
                        playerCanClick = true;
                    }, 2500); // Espera 2.5 segundo antes de permitir al jugador hacer clic de nuevo
                }, 2500); // 2.5 segundos antes de que la IA haga su movimiento
            } else {
                // En single player, podemos reactivar los clics inmediatamente si no hay IA
                playerCanClick = true;
            }
        }
    }
}




function handlePlayerBoardLogic(cell) {

        // Verificar que las celdas para completar el easter egg estan seleccionadas
        if (cell.id === 'cell_0_0') cell_0_0 = true;
        if (cell.id === 'cell_0_9') cell_0_9 = true;
        if (cell.id === 'cell_9_0') cell_9_0 = true;
        if (cell.id === 'cell_9_9') cell_9_9 = true;

        // Condicional para reproducir el easter egg
        if (cell_0_0 && cell_0_9 && cell_9_0 && cell_9_9 && !easterEggPlayed) {
            easterEggPlayed = true;  // Marcar que el easter egg ya se ha reproducido
            audios['easter_egg'].play();
            easterEggImage.style.display = 'block';
            setTimeout(() => {
                if (easterEggImage) easterEggImage.remove();
            }, 3600);
        }
        
        if (cell.classList.contains("bone")) {
            accumulatedErrors = 0;
            consecutiveAccumulatedHits++;

            if (consecutiveAccumulatedHits > 1) {
                points += 2;
            }

            let hitAndSink = false;
            let victory = true;

            let cellPosition = cell.id.replace("cell_", "").split("_");


            for (let index = 0; index < ships.length; index++) {
                discoveredFossils[index][0] = true;
                for (let indexShip = 0; indexShip < ships[index].length; indexShip++) {
                    
                    let position = ships[index][indexShip][0];


                    if (position[0] == cellPosition[0] && position[1] == cellPosition[1]) {
                        ships[index][indexShip][1] = true;
                        discoveredFossils[index][1] = true;
                    }

                    if (!ships[index][indexShip][1]) {
                        discoveredFossils[index][0] = false;
                    }
                }
            }


            for (let index = 0; index < discoveredFossils.length; index++) {
                let discoveredFossil = discoveredFossils[index];
                let foundBone = discoveredFossil[0];

                if (!foundBone) {
                    victory = false;
                } else {
                    if (discoveredFossil[1]) {
                        hitAndSink = true;
                    }
                }
                discoveredFossils[index][1] = false;
            }
            if (victory) {

                stopClock();
                points += 15;
                
                if (elapsedTime < 60) {
                    points += 20;
                } else if (elapsedTime <= 120) {
                    points += 10;
                } else if (elapsedTime > 180) {
                    points -= 10;
                }

                updatePointsCounter();

                createAlerts('win', 'player');
                audios['win'].play();
                //document.getElementById("winner").style.display = "flex";
                stopUpdatePoints();
                
                document.getElementById("score-hidden").value = points;
                let scoreForm = document.getElementById("scoreForm");
                scoreForm.action = "win.php";
                scoreForm.submit();
            } else {
                if (hitAndSink) {
                    points += 15;
                    // fosil descubierto
                    if (!audios['dino'].paused) {
                        audios['dino'].pause(); // Si está reproduciéndose, lo pausamos
                        audios['dino'].currentTime = 0; // Reiniciamos el audio
                    }
                    createAlerts('foundAll', 'player');
                    audios['dino'].play();

                } else {
                    points += 10;
                    // huesso encontrado
                    if (!audios['hueso'].paused) {
                        audios['hueso'].pause(); // Si está reproduciéndose, lo pausamos
                        audios['hueso'].currentTime = 0; // Reiniciamos el audio
                    }
                    createAlerts('found', 'player');
                    audios['hueso'].play();
                }

            }
        } else {
            accumulatedErrors++;
            consecutiveAccumulatedHits = 0;

            if (accumulatedErrors >= 3) {
                points -= 5;
                accumulatedErrors = 0;
            }
            // fallo al buscar
            if (!audios['arena'].paused) {
                audios['arena'].pause(); // Si está reproduciéndose, lo pausamos
                audios['arena'].currentTime = 0; // Reiniciamos el audio
            }
            createAlerts('miss', 'player');
            audios['arena'].play();
        }
        updatePointsCounter();
}

function handleAIBoardLogic(cell) {
    // Verifica si la celda clicada contiene un hueso
    if (cell.classList.contains("bone")) {

        let hitAndSink = false;
        let victory = true;

        // Obtener la posición de la celda IA
        let cellPosition = cell.id.replace("ia_cell_", "").split("_");

        // Recorremos los barcos de la IA para verificar si la posición coincide con algún fósil
        for (let index = 0; index < iaShips.length; index++) {  
            discoveredFossils[index][0] = true;

            for (let indexShip = 0; indexShip < iaShips[index].length; indexShip++) {
                let position = iaShips[index][indexShip][0];  

                // Comprobar si la posición de la celda corresponde a un fósil del barco
                if (position[0] == cellPosition[0] && position[1] == cellPosition[1]) {
                    iaShips[index][indexShip][1] = true; // Marcar como descubierto en IA
                    discoveredFossils[index][1] = true; // Marcar fósil como encontrado
                }

                // Si alguna parte del barco no ha sido descubierta, no se completa el fósil
                if (!iaShips[index][indexShip][1]) {
                    discoveredFossils[index][0] = false;
                }
            }
        }

        for (let index = 0; index < discoveredFossils.length; index++) {
            let discoveredFossil = discoveredFossils[index];
            let foundBone = discoveredFossil[0];

            if (!foundBone) {
                victory = false; // Si no se encontró todo el fósil
            } else {
                if (discoveredFossil[1]) {
                    hitAndSink = true; // Se descubrió el fósil completo
                }
            }

            discoveredFossils[index][1] = false; // Reiniciar la parte encontrada para el próximo clic
        }

        if (victory) {
            stopClock();

            // Mostrar alerta de victoria para la IA
            createAlerts('win', 'ia');
            audios['win'].play();
            document.getElementById("rankingInfo").style.display = "block";
            document.getElementById("winner").style.display = "flex";
            
            // Lógica de fin del juego aquí, si es necesario
        } else {
            if (hitAndSink) {
                // Mostrar alerta de fósil completo
                createAlerts('foundAll', 'ia');
                audios['dino'].play();
            } else {
                // Mostrar alerta de fósil encontrado
                createAlerts('found', 'ia');
                audios['hueso'].play();
            }
        }
    } else {
        // Si no se encontró un fósil, reproducimos el sonido de fallo
        createAlerts('miss', 'ia');
        audios['arena'].play();
    }
}



// Función que maneja el turno de la IA
function iaTurn() {
    console.log("Turno de la IA");
    
    let validMove = false;

    // Bucle que busca una celda válida para que la IA juegue
    while (!validMove) {
        const randomRow = Math.floor(Math.random() * 10);
        const randomCol = Math.floor(Math.random() * 10);
        const cell = document.getElementById(`ia_cell_${randomRow}_${randomCol}`);

        // Verificar si la celda existe y está cubierta
        if (cell && cell.classList.contains("covered")) {
            // La IA hace su jugada
            cell.classList.remove("covered"); // Destapar la celda
            handleAIBoardLogic(cell); // Lógica para manejar el clic de la IA
            validMove = true; // Salir del bucle al encontrar una celda válida
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const playerCells = document.querySelectorAll("td[id^='cell_']"); // Selecciona las celdas del jugador (IDs que empiezan por 'cell_')
    const aiCells = document.querySelectorAll("td[id^='ia_cell_']"); // Selecciona las celdas de la IA (IDs que empiezan por 'ia_cell_')

    // Asignar eventos de clic a las celdas del jugador
    for (let cell of playerCells) {
        cell.addEventListener("click", function (event) {
            checkStatus(event, 'player'); // Llamamos a checkStatus indicando que es del tablero del jugador
        });
    }

    // Asignar eventos de clic a las celdas del tablero de la IA
    for (let cell of aiCells) {
        // cell.addEventListener("click", function (event) {
        //     checkStatus(event, 'ai'); // Llamamos a checkStatus indicando que es del tablero de la IA
        // });
        // cell.removeEventListener("click", checkStatus);
    }

    document.getElementById("rankingInfo").style.display = "none";
    //document.getElementById("winner").style.display = "none";
    // Iniciar el temporizador al cargar la pÃ¡gina
    startClock();

    ships.forEach(ship => {
        discoveredFossils.push([true, false]);
    });

    // Evento del formulario para enviar puntaje
    const form = document.getElementById("scoreForm");
    form.addEventListener("submit", function (event) {
        document.getElementById("score-hidden").value = points;
    });
});


