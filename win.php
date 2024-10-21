<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/9c44094610.js" crossorigin="anonymous"></script>
    <?php
    if ($_SERVER['HTTP_REFERER'] == '') {
        header('HTTP/1.0 403 Forbidden');
    ?>
        <title>Error 403 - Excavació Juràssica</title>
</head>

<body>
    <h1>Error 403 - Forbidden</h1>
    <p>No pots accedir a aquesta pàgina perquè no tens els permisos necessaris. Si creus que això és un error, contacta amb l'administrador del lloc web.</p>
</body>

</html>
<?php
        exit;
    }
    // Resta del codi de la pàgina

    session_start();
    $userName = "";
    $score = 0;
    if (isset($_SESSION['finishName'])) {
        $userName = $_SESSION['finishName'];
    }
    if (isset($_POST['score'])) {
        $score = $_POST['score'];
    }

?>
<title>Excavació Juràssica</title>
</head>

<body id="result_page">
    <div class="hero">
        <h1>Has guanyat</h1>
        <div id="rankingInfo">
            <h2>Has aconseguit <span id="score"><?php echo $score ?></span> punts de fama</h2>
            <h3>Entra el teu nom</h3>
            <form id="scoreForm" action="ranking.php" method="POST">
                <input type="text" id="nameInput" name="name" required minlength="3" value="<?php echo $userName ?>"> <!-- Cambiado a "name" -->
                <input type="hidden" id="scoreHidden" name="score" value="<?php echo $score ?>"> <!-- Campo oculto para puntaje -->
            </form>
            <div class="button_container">
                <a id="btnReturn" href="index.php"><i class="fa-solid fa-chevron-left"></i>Inici</a>
                <a id="btnSaveRecord" href="#">Guardar</a>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            const saveRecord = document.getElementById("btnSaveRecord");
            const nameInput = document.getElementById("nameInput"); //Guardamos los valores introducidos
            const scoreForm = document.getElementById("scoreForm"); //Guardamos el formato de formulario para poder hacer un submit



            nameInput.addEventListener("input", function() {
                // Comprobar la longitud del nombre
                if (nameInput.value.length > 3 && nameInput.value.length < 30) {
                    saveRecord.classList.remove("disabled");
                    saveRecord.href = "#"; // Href nulo para esperar que el usuario confirme
                } else {
                    saveRecord.classList.add("disabled");
                    saveRecord.href = "#"; // href nulo
                }
            });

            // AÃ±adir el evento click solo una vez
            saveRecord.addEventListener("click", function(event) {
                if (!saveRecord.classList.contains("disabled")) {
                    // Enviar el formulario cuando el boton esta habilitado y se haga click
                    scoreForm.submit();
                }
            });
        });
    </script>
</body>

</html>