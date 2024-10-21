<?php
    session_start();
        
    if (isset($_POST["name_landing"])) {
        $_SESSION['name'] = $_POST["name_landing"];//sesion index
        $_SESSION['finishName'] = $_SESSION['name'];//sesion game
                unset($_SESSION['name']); //borrar la sesion de index
    }
        echo $_SESSION['finishName'];
?>


<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Excavació Juràssica</title>
    <script src="https://kit.fontawesome.com/9c44094610.js" crossorigin="anonymous"></script>

</head>
<body <?php
    if (isset($_POST['gamemode'])) {
        $gamemode = $_POST['gamemode'];
        
        if ($gamemode == 'training') {
            echo 'id="game_page" data-gamemode="singlePlayer"';
            
        } elseif ($gamemode == 'versus-ia') {
            echo 'id="game_page" class="versus-ia" data-gamemode="multiPlayer"';
        }
    }
    ?>
>


    <div class="tape">
        <div class="dinosaurs-left">
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
        </div>

        <h1>Excavació Juràssica</h1>

        <div class="dinosaurs-right">
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
            <svg width="10px" height="10px" version="1.1" viewBox="0 0 1200 1200" preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com">
                <path
                    d="M 520.381 572.885 C 574.982 549.924 621.554 540.597 657.333 540.647 C 719.945 540.733 762.732 561.489 796.125 552.227 C 829.518 542.981 879.168 475.671 895.034 420.399 C 910.884 365.129 959.313 209.476 988.914 169.937 C 1018.53 130.397 1038.664 108.096 1098.863 109.196 C 1135.37 109.874 1211.215 143.538 1198.6 207.664 C 1185.967 271.792 1094.916 237.603 1073.615 281.596 C 1052.329 325.606 1021.036 574.308 968.813 635.421 C 916.59 696.533 866.213 769.974 860.185 798.371 C 854.156 826.786 850.177 879.602 857.035 907.779 C 863.893 935.939 882.486 1049.732 861.337 1073.608 C 840.186 1097.484 787.828 1096.129 770.962 1072.169 C 754.079 1048.208 770.725 940.241 726.496 925.119 C 682.248 909.997 560.598 920.157 538.483 937.836 C 516.367 955.497 486.802 1025.975 471.63 1056.404 C 456.44 1086.816 391.568 1083.515 354.652 1076.775 C 317.721 1070.018 366.015 960.916 347.676 907.949 C 329.354 854.963 16.237 943.745 7.906 937.954 C -0.425 932.18 -2.423 921.427 3.114 914.078 C 8.651 906.712 285.717 843.635 317.061 750.839 C 348.387 658.061 464.713 596.295 520.381 572.885 Z"
                    stroke="#000" stroke-width=".085605" />
            </svg>
        </div>
    </div>

    <noscript>
        <div id="noScriptAlert">
            <p>Atenció! El navegador no té habilitat el JavaScript. Cal habilitar-lo per jugar.</p>
        </div>
    </noscript>

    <div class='container'>

<?php
function generateBoard(&$board_array, $isAI = false) {
    ob_start(); // Para almacenar la salida y retornarla luego

    // Definir el tamaño del tablero
    $column_board = 10;
    $row_board = 10;
    // Declarar los identificadores
    $letter_id = 65;
    $number_id = 1;
    if ($isAI) {
    echo "<div class='container-table ia-table'>
            <div class='timer-fame'>
                <div class='fame'>
                    <i class='fa-solid fa-bullhorn'></i>Fama: <span class='score'>-</span>
                </div>
                <div class='timer'>
                    <i class='fa-solid fa-hourglass-end'></i>Temps: <span id='gameClock'>00:00</span>
                </div>
            </div>
            <table>";
    } else {
        echo "<div class='container-table'>
            <div class='timer-fame'>
                <div class='fame'>
                    <i class='fa-solid fa-bullhorn'></i>Fama: <span class='score'>-</span>
                </div>
                <div class='timer'>
                    <i class='fa-solid fa-hourglass-end'></i>Temps: <span id='gameClock'>00:00</span>
                </div>
            </div>
            <table>";
    }
    for ($i = 0; $i <= $column_board; $i++) {
        echo "<tr>";

        for ($j = 0; $j <= $row_board; $j++) {
            if ($i == 0 && $j == 0) {
                echo "<td></td>"; // Primera celda vacía
            } elseif ($i == 0) {
                echo "<td>" . chr($letter_id) . "</td>"; // Primera fila con letras
                $letter_id++;
            } elseif ($j == 0) {
                echo "<td>" . $number_id . "</td>"; // Primera columna con números
                $number_id++;
            } else {
                // Generar el ID de la celda
                $cell_id = ($i - 1) . "_" . ($j - 1);
                // Determinar el prefijo del ID según si es el tablero del jugador o de la IA
                $cell_prefix = $isAI ? "ia_cell_" : "cell_";
                if (!$isAI) {
                    // Si la celda tiene un valor en $board_array, es un "bone"
                    if (isset($board_array[$i - 1][$j - 1])) {
                        echo "<td id='{$cell_prefix}{$cell_id}' class='bone covered'></td>";
                    } else {
                        // Si la celda no tiene valor, es "ground"
                        echo "<td id='{$cell_prefix}{$cell_id}' class='ground covered'></td>";
                    }
                } else {
                    // Si la celda tiene un valor en $board_array, es un "bone"
                    if (isset($board_array[$i - 1][$j - 1])) {
                        echo "<td id='{$cell_prefix}{$cell_id}' class='bone covered'></td>";
                    } else {
                        // Si la celda no tiene valor, es "ground"
                        echo "<td id='{$cell_prefix}{$cell_id}' class='ground covered'></td>";
                    }
                }
                
            }
        }

        echo "</tr>";
    }
    if ($isAI) {
        echo "</table></div>
          <div class='container-info ia-info'>
            <div class='info-item'> 
              <h3>Com aconseguir fama</h3>
              <div class='secondary-info'>
                <ul>
                  <li>Se sumen 10 punts de fama per os trobat.</li>
                  <li>Si trobes el fòssil sencer se sumen 15 de fama.</li>
                  <li>Si portes una ratxa de 2 o més ossos trobats, s'aniran sumant 2 punts a la puntuació.</li>
                  <li>Cada 3 errors seguits es restaran 2 punts.</li>
                </ul>
              </div>
            </div>
          </div>";
    } else {
    echo "</table></div>
          <div class='container-info'>
            <div class='info-item'> 
              <h3>Com aconseguir fama</h3>
              <div class='secondary-info'>
                <ul>
                  <li>Se sumen 10 punts de fama per os trobat.</li>
                  <li>Si trobes el fòssil sencer se sumen 15 de fama.</li>
                  <li>Si portes una ratxa de 2 o més ossos trobats, s'aniran sumant 2 punts a la puntuació.</li>
                  <li>Cada 3 errors seguits es restaran 2 punts.</li>
                </ul>
              </div>
            </div>
          </div>";
    }
    return ob_get_clean(); // Retornar la salida
}


// Definir los barcos
$ships = [
    "fragata" => [[], 1, "#C70039", 4],
    "submarí" => [[], 2, "#0057C7", 3],
    "destructor" => [[], 3, "#00C745", 2],
    "portaavions" => [[], 4, "#EFDF23", 1]
];
function placeShip(&$board, &$ship, &$shipList)
{
    $n = count($board);
    $ship_length = $ship[1];
    $ship_positions = [];
    $attempts = 0; // Puedes seguir contando intentos, pero no limitarás a 1000.

    while (true) { // Bucle infinito hasta que se coloque el barco
        $orientation = rand(0, 1); // 0 = horizontal, 1 = vertical

        if ($orientation == 0) { // Horizontal
            $start_row = rand(0, $n - 1);
            $start_col = rand(0, $n - $ship_length);
        } else { // Vertical
            $start_row = rand(0, $n - $ship_length);
            $start_col = rand(0, $n - 1);
        }

        $can_place = true;

        // Verificar si se puede colocar el barco
        for ($i = 0; $i < $ship_length; $i++) {
            if ($orientation == 0) {
                $row = $start_row;
                $col = $start_col + $i;
            } else {
                $row = $start_row + $i;
                $col = $start_col;
            }

            for ($r = $row - 1; $r <= $row + 1 && $can_place; $r++) {
                for ($c = $col - 1; $c <= $col + 1 && $can_place; $c++) {
                    if ($r >= 0 && $r < $n && $c >= 0 && $c < $n && !empty($board[$r][$c])) {
                        $can_place = false;
                    }
                }
            }
        }

        if ($can_place) {
            // Colocar el barco
            for ($i = 0; $i < $ship_length; $i++) {
                if ($orientation == 0) {
                    $row = $start_row;
                    $col = $start_col + $i;
                } else {
                    $row = $start_row + $i;
                    $col = $start_col;
                }
                $board[$row][$col] = $ship[2];
                $ship_positions[] = [$row, $col];
            }

            $shipPositions = [];
            foreach ($ship_positions as $position) {
                array_push($shipPositions, [[$position[0], $position[1]], false]);
            }
            array_push($shipList, $shipPositions);
            $ship[0] = $ship_positions;
            return true; // Devuelve `true` al colocar el barco correctamente
        }
    }
}


// Iniciar el tablero vacío
$board = array_fill(0, 10, array_fill(0, 10, null));

// Colocar los barcos en el tablero
$shipList = [];
foreach ($ships as &$ship) {
    for ($i = 0; $i < $ship[3]; $i++) {
        if (!placeShip($board, $ship, $shipList)) {
            echo "<p>Error al colocar el barco: {$ship[2]}</p>";
        }
    }
}
// Generate the board with the ships placed
$board_html = generateBoard($board, false);

// Show the generated board

echo $board_html;

// Iniciar el tablero vacío
$AIboard = array_fill(0, 10, array_fill(0, 10, null));

// Colocar los barcos en el tablero
$AIshipList = [];
foreach ($ships as &$ship) {
    for ($i = 0; $i < $ship[3]; $i++) {
        if (!placeShip($AIboard, $ship, $AIshipList)) {
            echo "<p>Error al colocar el barco: {$ship[2]}</p>";
        }
    }
}
// Generate the board with the ships placed
$AIboard_html = generateBoard($AIboard, true);

// Show the generated board
echo $AIboard_html;

?>

</div>

<div id="rankingInfo" class="centered-form">
    <h2>Has aconseguit <span id="score">-</span> punts de fama</h2>
    <h3>Entra el teu nom</h3>
    <form id="scoreForm" action="ranking.php" method="POST">
        <input type="text" id="nom" name="name" required minlength="3"> <!-- Cambiado a "name" -->
        <input type="hidden" id="score-hidden" name="score" value=""> <!-- Campo oculto para puntaje -->
        <input type="submit" value="Guardar">
    </form>
</div>

   

<div id="winner">
    <a href="index.php" class="nav-button home-button"><i class="fa-solid fa-chevron-left"></i>Inici</a>
    <a href="ranking.php" class="nav-button rank-button">Rànquing<i class="fa-solid fa-chevron-right"></i></a>
</div>

<script type="text/javascript">
    const ships = <?php echo json_encode($shipList); ?>;
    const iaShips = <?php echo json_encode($AIshipList); ?>;
</script>


<script type="text/javascript" src="game.js"></script>
</body>

</html>