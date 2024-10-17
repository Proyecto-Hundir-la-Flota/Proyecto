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
?>
    <title>Excavació Juràssica</title>
</head>

<body id="landing_page">
    <div class="hero">
        <h1>Has guanyat</h1>
        <div id="rankingInfo"   >
            <h2>Has aconseguit <span id="score">-</span> punts de fama</h2>
            <h3>Entra el teu nom</h3>
            <form id="scoreForm" action="ranking.php" method="POST">
                <input type="text" id="nom" name="name" required minlength="3"> <!-- Cambiado a "name" -->
                <input type="hidden" id="score-hidden" name="score" value=""> <!-- Campo oculto para puntaje -->
                <input type="submit" value="Guardar">
            </form>
        </div>
    </div>
</body>

</html>