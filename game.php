<!DOCTYPE html>
<html lang="ca">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Batalla Naval</title>
</head>

<body>
    <?php
    $n = 10; // Tamaño del tablero

    if ($n > 26) {
        $n = 26;
    }

    $ships = [
        "fragata" => [[], 2, "#C70039", 1],
        "submarí" => [[], 3, "#0057C7", 1],
        "destructor" => [[], 4, "#00C745", 1],
        "portaavions" => [[], 5, "#EFDF23", 1]
    ];

    $board = array_fill(0, $n, array_fill(0, $n, null));

    function placeShip(&$board, &$ship)
    {
        $n = count($board);
        $ship_length = $ship[1];
        $ship_positions = [];
        $attempts = 0;

        while ($attempts < 100) {
            $orientation = rand(0, 1);

            if ($orientation == 0) {
                $start_row = rand(0, $n - 1);
                $start_col = rand(0, $n - $ship_length);
            } else {
                $start_row = rand(0, $n - $ship_length);
                $start_col = rand(0, $n - 1);
            }

            $can_place = true;

            // Este bucle comprueba las posiciones adyacentes del barco
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
                $ship[0] = $ship_positions;
                return true;
            }

            $attempts++;
        }

        return false;
    }

    // Este bucle intenta conseguir la posición de todos los barcos, según su cantidad
    $all_ships_placed = true;
    foreach ($ships as &$ship) {
        for ($i = 0; $i < $ship[3]; $i++) { // Intentar colocar la cantidad definida de cada barco
            if (!placeShip($board, $ship)) {
                $all_ships_placed = false;
                break 2;
            }
        }
    }

    if ($all_ships_placed) {
        echo '<table>';
        echo "<tr><td></td>";
        for ($i = 1; $i <= $n; $i++) {
            echo "<th>$i</th>";
        }
        echo "</tr>";

        $letters = range('A', chr(65 + $n - 1));

        foreach ($letters as $row_index => $letter) {
            echo "<tr><th>$letter</th>";
            for ($col = 0; $col < $n; $col++) {
                if ($board[$row_index][$col] !== null) {
                    echo "<td style='background: {$board[$row_index][$col]};'></td>";
                } else {
                    echo "<td></td>";
                }
            }
            echo "</tr>";
        }
        echo '</table>';
    } else {
        echo "<p>No se pudieron colocar todos los barcos en el tablero después de 100 intentos.</p>";
    }
    ?>
    <script type="text/javascript" src="script.js"></script>
</body>
</html>