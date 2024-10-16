

// crear un array, donde usando cada nombre guarda un archivo de audio
const audios = [];
audios['arena'] = new Audio("./sounds/desenterrar_arena.mp3");
audios['hueso'] = new Audio("./sounds/desenterrar_huesos.mp3");
// audios['easter_egg']=new Audio("./sounds/game_over.mp3");
audios['dino'] = new Audio("./sounds/dino.mp3");
audios['win'] = new Audio("./sounds/win.mp3");

const discoveredFossils = [];

let elapsedTime = 0; //Tiempo que transcurrido
let timerId;
let points = 0;
let accumulatedErrors = 0;
let consecutiveAccumulatedHits = 0;
let pointsFrozen = false;

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
    console.log("Timer stopped at " + elapsedTime + " seconds.");
}

// creamos la fincion para definir las alertas
function createAlerts(alert_type) {

    // forzamos a limpiar la alerta para no repetir una alarma exstente
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    let alert;
    let elementI;

    // Crear la alerta de "encontrado"
    if (alert_type === 'found') {
        alert = document.createElement('div');
        alert.id = 'foundAlert';
        alert.className = 'alert';
        alert.textContent = 'Has trobat un ós!';
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "fallo"
    if (alert_type === 'miss') {
        alert = document.createElement('div');
        alert.id = 'missAlert';
        alert.className = 'alert';
        alert.textContent = "No s'ha trobat res en la cerca";
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "fosil entero descubierto"
    if (alert_type === 'foundAll') {
        alert = document.createElement('div');
        alert.id = 'foundAlertAll';
        alert.className = 'alert';
        alert.textContent = "Has trobat un fòssil!";
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "victoria"
    if (alert_type === 'win') {
        alert = document.createElement('div');
        alert.id = 'winAlert';
        alert.className = 'alert';
        alert.textContent = "Has guanyat el joc!";
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Remover las alertas después de 3 segundos (opcional)
    setTimeout(() => {
        if (alert) alert.remove();
    }, 2000);



}

// Función para actualizar el contador de puntos en pantalla
function updatePointsCounter() {
    if (!pointsFrozen) { 
        document.getElementById("score").innerText = points;
    }
}

function stopUpdatePoints() {
    pointsFrozen = true;
}

function checkStatus(event) {
    const cell = event.target;
    if (cell.classList.contains("covered")) {
        cell.classList.remove("covered");
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
                stopUpdatePoints();

                createAlerts('win');
                audios['win'].play();
                document.getElementById("rankingInfo").style.display = "block";
                document.getElementById("score").innerHTML = points;
                document.getElementById("winner").style.display = "block";
            } else {
                if (hitAndSink) {
                    points += 15;
                    // fosil descubierto

                    createAlerts('foundAll');
                    audios['dino'].play();

                } else {
                    points += 10;
                    // huesso encontrado

                    createAlerts('found');
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
            createAlerts('miss');
            audios['arena'].play();
        }
        updatePointsCounter();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cells = document.getElementsByTagName("td");
    for (cell of cells) {
        if (cell.id.includes("cell")) {
            cell.addEventListener("click", function (event) {
                checkStatus(event);
            });
        }
    }

    document.getElementById("rankingInfo").style.display = "none";
    document.getElementById("winner").style.display = "none";
    // Iniciar el temporizador al cargar la pÃ¡gina
    startClock();

    ships.forEach(ship => {
        discoveredFossils.push([true, false]);
        //console.log(ship);
    });

});

