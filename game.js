

// crear un array, donde usando cada nombre guarda un archivo de audio
const audios=[];
audios['arena']=new Audio("./sounds/desenterrar_arena.mp3");
audios['hueso']=new Audio("./sounds/desenterrar_huesos.mp3");
// audios['easter_egg']=new Audio("./sounds/game_over.mp3");
audios['dino']=new Audio("./sounds/dino.mp3");
audios['win']=new Audio("./sounds/win.mp3");

const discoveredFossils = [];


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
        const textCode = document.createTextNode(' You found a bone!');
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
        const textNode = document.createTextNode(' Has miss in your search!');
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
        const textNode = document.createTextNode(' You found a fossil!');
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
        const textNode = document.createTextNode(' You win the game!');
        alert.appendChild(textNode); //añadimos element textNode como hijo de alert para agregar el texto
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
                    if (!audios['dino'].paused) {
                        audios['dino'].pause(); // Si está reproduciéndose, lo pausamos
                        audios['dino'].currentTime = 0; // Reiniciamos el audio
                    }
                    createAlerts('foundAll');
                    audios['dino'].play();

                } else {
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

