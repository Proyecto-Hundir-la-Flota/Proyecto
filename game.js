const discoveredFossils = [];

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
                alert("Has guanyat!");
                document.getElementById("winner").style.display = "block";
            } else {
                if (hitAndSink) {
                    alert("Descobert fossil senser!");
                } else {
                    alert("Descobert os!");
                }

            }
        } else {
            alert("No hi ha res!");
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