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
   
        ob_start();//comando para no imprimir todo los echos hasta llamar a la funcion posteriormente; lo almacena y despues lo debuelve

            // Definimos el tamaño del tablero
            $column_board = 10; 
            $row_board=10 ;
            // declaramos los identificadores
            $letter_id=65;
            $number_id=1;
           

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
                $cell_id =  $j - 1 . "_" . ($i-1); // Generamos el ID de la celda
                $color = isset($board_array[$i - 1][$j - 1]) ? $board_array[$i - 1][$j - 1] : ''; // Si la celda tiene un barco, aplicamos el color
                echo "<td id='$cell_id' style='background-color:$color'>  </td>";
            }
        }

        echo "</tr>";
    }

    echo "</table>";
    return ob_get_clean(); // Devolver el HTML del tablero
}

// Definir los barcos
$ships = [
    "fragata" => [[], 2, "#C70039", 1],
    "submarí" => [[], 3, "#0057C7", 1],
    "destructor" => [[], 4, "#00C745", 1],
    "portaavions" => [[], 5, "#EFDF23", 1]
];

// Función para colocar un barco
function placeShip(&$board, &$ship) {
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
            $ship[0] = $ship_positions;
            return true;
        }

        $attempts++;
    }

    return false;
}

// Iniciar el tablero vacío
$board = array_fill(0, 10, array_fill(0, 10, ''));



// Colocar los barcos en el tablero
foreach ($ships as &$ship) {
    for ($i = 0; $i < $ship[3]; $i++) {
        if (!placeShip($board, $ship)) {
            echo "<p>Error al colocar el barco: {$ship[2]}</p>";
        }
    }
}

// Generar el tablero con los barcos colocados
$board_html = generateBoard($board);

// Mostrar el tablero generado
echo $board_html;





    
    /*


   
    function generateBoard()
    {


            
        
        // creamos el tablero
        echo"<table>";

            for($i = 0; $i <= $column_board; $i++){
                echo "<tr>";
                


                //crear bulce en horizontal mientras que i sea menor o igual a n
                for($j = 0; $j <= $row_board; $j++){

                
                    if($i==0 && $j==0){ //primer espacio sin imprimir nada
                        echo "<td   style='border: 1px solid black; border-collapse: collapse;'></td>";
                        
                        
                        
                    
                    }
                    elseif($i==0 ){ //en la primera columna solo queremos imprimir letras
                        echo "<td style='border: 1px solid black; border-collapse: collapse;'>".chr($letter_id)."</td>";
                        $letter_id++;
                    
                        

                    }
                    elseif($j!=0){
                        $cell_id = $letter_id ."_". $number_id;
                        echo "<td id=$cell_id style='border: 1px solid black; border-collapse: collapse;'>   </td>";
                        echo"$cell_id";
                        $letter_id++;

                    
                    }
                    else{
                        echo "<td style='border: 1px solid black; border-collapse: collapse;'> $number_id </td>";
                    
                        
                        
                    }
                    
                }
                $number_id++;
                $letter_id=65;



            //variacion del inicio de columna, forzandoa valor a empezar añadiendo un numero
            
            echo "</tr>";
            }

    
        echo"</table>";

        return ob_get_clean(); // debuelve toda la estructura de la funcion

    }

    $board=generateBoard();



    echo $board;
   
    $ships = [
        "fragata" => [[], 2, "#C70039", 1],
        "submarí" => [[], 3, "#0057C7", 1],
        "destructor" => [[], 4, "#00C745", 1],
        "portaavions" => [[], 5, "#EFDF23", 1]
    ];
  


    

    function placeShip(&$board, &$ship) {
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

    */
    ?>

    <script type="text/javascript" src="script.js"></script>
</body>
</html>