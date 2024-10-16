

// crear un array, donde usando cada nombre guarda un archivo de audio
const audios=[];
audios['arena']=new Audio("./sonidos/desenterrar_arena.mp3");
audios['hueso']=new Audio("./sonidos/desenterrar_huesos.mp3");
audios['exit']=new Audio("./sonidos/game_over.mp3");
audios['dino']=new Audio("./sonidos/dino.mp3");
audios['win']=new Audio("./sonidos/win.mp3");

const discoveredFossils = [];


// creamos la fincion para definir las alertas
function createAlerts(alert_type) {

    // forzamos a limpiar la alerta para no repetir una alarma exstente
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
    let alert;

    // Crear la alerta de "encontrado"
    if (alert_type === 'found') {
        alert = document.createElement('div');
        alert.id = 'foundAlert';
        alert.className = 'alert';
        alert.textContent = 'You found a bone!';
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "fallo"
    if (alert_type === 'miss') {
        alert = document.createElement('div');
        alert.id = 'missAlert';
        alert.className = 'alert';
        alert.textContent = 'Has miss in your search!';
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "fosil entero descubierto"
    if (alert_type === 'foundAll') {
        alert = document.createElement('div');
        alert.id = 'foundAlertAll';
        alert.className = 'alert';
        alert.textContent = 'You found a fossil!';
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Crear la alerta de "victoria"
    if (alert_type === 'win') {
        alert = document.createElement('div');
        alert.id = 'winAlert';
        alert.className = 'alert';
        alert.textContent = 'You win the game!';
        document.body.appendChild(alert);
        alert.style.display = 'block';
    }

    // Remover las alertas después de 3 segundos (opcional)
    setTimeout(() => {
        if (alert) alert.remove(); 
    }, 2000);



}



function checkStatus(event) {
    const cell = event.target;
    if (cell.classList.contains("covered")) {
        cell.classList.remove("covered");
        if (cell.classList.contains("bone")) {
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
                createAlerts('win');
                audios['win'].play();
            } else {
                if (hitAndSink) {
                    // fosil descubierto
                    
                    createAlerts('foundAll');
                    audios['dino'].play();

                } else {
                    // huesso encontrado
                   
                    createAlerts('found');
                    audios['hueso'].play();
                }

            }
        } else {
            // fallo al buscar
            if (!audios['arena'].paused) {
                audios['arena'].pause(); // Si está reproduciéndose, lo pausamos
                audios['arena'].currentTime = 0; // Reiniciamos el audio
            } 
            createAlerts('miss');
            audios['arena'].play(); 
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

    document.getElementById("winner").style.display = "none";

    ships.forEach(ship => {
        discoveredFossils.push([true, false]);
        //console.log(ship);
    });

});

