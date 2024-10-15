<!DOCTYPE html>
<html lang="ca">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="style.css">
<title>Batalla Naval</title>
</head>

<body>
    <?php

    // Función para generar el tablero HTML
    function generateBoard(&$board_array)
    {

        ob_start(); //comando para no imprimir todo los echos hasta llamar a la funcion posteriormente; lo almacena y despues lo debuelve

        // Definimos el tamaño del tablero
        $column_board = 10;
        $row_board = 10;
        // declaramos los identificadores
        $letter_id = 65;
        $number_id = 1;


        echo "<table border='1' cellpadding='10'>";

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
                    $cell_id =  $i - 1 . "_" . ($j - 1); // Generamos el ID de la celda
                    if (isset($board_array[$i - 1][$j - 1])) {
                        echo "<td id='cell_$cell_id' class= 'bone covered'></td>";
                    } else {
                        echo "<td id='cell_$cell_id' class= 'ground covered'></td>";
                    }
                }
            }

            echo "</tr>";
        }

        echo "</table>";
        return ob_get_clean(); // Devolver el tablero
    }

    // Definir los barcos
    $ships = [
        "fragata" => [[], 2, "#C70039", 1],
        "submarí" => [[], 3, "#0057C7", 1],
        "destructor" => [[], 4, "#00C745", 1],
        "portaavions" => [[], 5, "#EFDF23", 1]
    ];

    // Función para colocar un barco
    function placeShip(&$board, &$ship, &$shipList)
    {
        $n = count($board);
        $ship_length = $ship[1];
        $ship_positions = [];
        $attempts = 0;

        while ($attempts < 100) {
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
                return true;
            }

            $attempts++;
        }

        return false;
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

    // Generar el tablero con los barcos colocados
    $board_html = generateBoard($board);

    // Mostrar el tablero generado
    echo $board_html;

    ?>

    <div id="winner" id="winner_result">
        <button onclick="location.href='index.php'">Inici</button>
        <button onclick="location.href='ranking.php'">Ranking</button>
    </div>

    <script type="text/javascript">
        const ships = <?php echo json_encode($shipList); ?>;
    </script>
    <script type="text/javascript" src="game.js"></script>
</body>

</html>