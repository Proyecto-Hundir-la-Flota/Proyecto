function checkStatus(event) {
    const cell = event.target;
    if (cell.classList.contains("hidden")) {
        cell.classList.remove("hidden");
        alert("Tocat");
    } else {
        alert("Aigua");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cells = document.getElementsByTagName("td");
    for (cell of cells) {
        cell.addEventListener("click", function (event) {
            checkStatus(event);
        });
    }
});