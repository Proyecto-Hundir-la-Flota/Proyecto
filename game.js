

// crear un array, donde usando cada nombre guarda un archivo de audio

const audios = [];
audios['arena'] = new Audio("./sounds/desenterrar_arena.mp3");
audios['hueso'] = new Audio("./sounds/desenterrar_huesos.mp3");
audios['easter_egg'] = new Audio("./sounds/easter_egg.mp3");
audios['dino'] = new Audio("./sounds/dino.mp3");
audios['win'] = new Audio("./sounds/win.mp3");


const discoveredFossils = [];

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
    console.log("Timer stopped at " + elapsedTime + " seconds.");
}

// creamos la fincion para definir las alertas
function createAlerts(alert_type) {

    // forzamos a limpiar la alerta para no repetir una alarma exstente
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    let alert;
    let elementI;

    const emojis=[];
    emojis['correct']= "fa-solid fa-thumbs-up";
    emojis['incorrect']="fa-solid fa-circle-xmark";
    emojis['win']="fa-solid fa-crown";
    emojis['complet']="fa-solid fa-bone";


    // Crear la alerta de "encontrado"
    if (alert_type === 'found') {
        alert = document.createElement('div');
        alert.id = 'foundAlert';
        alert.className = 'alert';
        document.body.appendChild(alert);
        elementI = document.createElement('i'); 
        elementI.className = emojis['correct']; // Agregamos el icono usando la clase
        alert.appendChild(elementI); //añadimos element i como hijo de alert para agregar el emoji
        const textCode = document.createTextNode(" Has trobat un ós!");
        alert.appendChild(textCode); //añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "fallo"
    if (alert_type === 'miss') {
        alert = document.createElement('div');
        alert.id = 'missAlert';
        alert.className = 'alert';
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['incorrect']; // Agregamos el icono usando la clase
        alert.appendChild(elementI);  //añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(" No s'ha trobat res en la cerca");
        alert.appendChild(textNode); //añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "fosil entero descubierto"
    if (alert_type === 'foundAll') {
        alert = document.createElement('div');
        alert.id = 'foundAlertAll';
        alert.className = 'alert';
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['complet']; // Agregamos el icono usando la clase
        alert.appendChild(elementI);  //añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(" Has trobat un fòssil!");
        alert.appendChild(textNode); //añadimos element textNode como hijo de alert para agregar el texto
        alert.style.display = 'block';
    }

    // Crear la alerta de "victoria"
    if (alert_type === 'win') {
        alert = document.createElement('div');
        alert.id = 'winAlert';
        alert.className = 'alert';
        document.body.appendChild(alert);
        elementI = document.createElement('i');
        elementI.className = emojis['win']; // Agregamos el icono usando la clase
        alert.appendChild(elementI); //añadimos element i como hijo de alert para agregar el emoji
        const textNode = document.createTextNode(" Has guanyat el joc!");
        alert.appendChild(textNode); //añadimos element textNode como hijo de alert para agregar el texto
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
        const scoreElements = document.querySelectorAll(".score");
        
        scoreElements.forEach(element => {
            element.innerText = points;
        });
    }
}

function stopUpdatePoints() {
    pointsFrozen = true;
}
class checkTypeBoard{}

// ejecutar solo con el boton de entrenamiento
if(checkTypeBoard==="tainning"){
// no tocar dado que es el codigo de entrenamiento
    function checkStatus(event) {
        const cell = event.target;
        if (cell.classList.contains("covered")) {
            cell.classList.remove("covered");


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

                    createAlerts('win');
                    audios['win'].play();
                    document.getElementById("rankingInfo").style.display = "block";
                    document.getElementById("score").innerHTML = points;
                    document.getElementById("winner").style.display = "flex";
                    

                    stopUpdatePoints();
                } else {
                    if (hitAndSink) {
                        points += 15;
                        // fosil descubierto
                        if (!audios['dino'].paused) {
                            audios['dino'].pause(); // Si está reproduciéndose, lo pausamos
                            audios['dino'].currentTime = 0; // Reiniciamos el audio
                        }
                        createAlerts('foundAll');
                        audios['dino'].play();

                    } else {
                        points += 10;
                        // huesso encontrado
                        if (!audios['hueso'].paused) {
                            audios['hueso'].pause(); // Si está reproduciéndose, lo pausamos
                            audios['hueso'].currentTime = 0; // Reiniciamos el audio
                        }
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
}

// ejecutar solo con el boton de contra la maquina
if(checkTypeBoard==="versus-ia"){
    function checkStatus(event) {
        const cell = event.target;
        const turn= true; //poner condicionales en todo el codigo para cambiar de turnos y tener en cuenta el crear otro tablero para el turno de la maquina
        const hit= false;
        if (cell.classList.contains("covered")) {
            cell.classList.remove("covered");


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
            //codigo de la funcion
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

                    createAlerts('win');
                    audios['win'].play();
                    document.getElementById("rankingInfo").style.display = "block";
                    document.getElementById("score").innerHTML = points;
                    document.getElementById("winner").style.display = "flex";
                    

                    stopUpdatePoints();
                } else {
                    if (hitAndSink) {
                        points += 15;
                        // fosil descubierto
                        if (!audios['dino'].paused) {
                            audios['dino'].pause(); // Si está reproduciéndose, lo pausamos
                            audios['dino'].currentTime = 0; // Reiniciamos el audio
                        }
                        createAlerts('foundAll');
                        audios['dino'].play();

                    } else {
                        points += 10;
                        // huesso encontrado
                        if (!audios['hueso'].paused) {
                            audios['hueso'].pause(); // Si está reproduciéndose, lo pausamos
                            audios['hueso'].currentTime = 0; // Reiniciamos el audio
                        }
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

    // Manejar el evento de envío del formulario
    const form = document.getElementById("scoreForm");
    form.addEventListener("submit", function (event) {
        // Aquí colocamos el puntaje en el campo oculto
        document.getElementById("score-hidden").value = points; // Asignar el puntaje acumulado
    });

});

