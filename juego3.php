<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dungeons & Cats</title>
    <style>
        body { margin: 0; }
    </style>
    <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type ="importmap">
    {
        "imports":{
            "three": "https://unpkg.com/three@v0.155.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.155.0/examples/jsm/"
        }
    }
</script>
</head>

<body>
    
    <script>
var nombre = "<?php echo isset($_SESSION['nombre']) ? $_SESSION['nombre'] : ''; ?>";
var score = "<?php echo isset($_SESSION['score']) ? $_SESSION['score'] : ''; ?>";
var bunny1 = "<?php echo isset($_SESSION['bindsbunny1']) ? $_SESSION['bindsbunny1'] : ''; ?>";
var bunny2 = "<?php echo isset($_SESSION['bindsbunny2']) ? $_SESSION['bindsbunny2'] : ''; ?>";
var wolf1 = "<?php echo isset($_SESSION['bindswolf1']) ? $_SESSION['bindswolf1'] : ''; ?>";
var wolf2 = "<?php echo isset($_SESSION['bindswolf2']) ? $_SESSION['bindswolf2'] : ''; ?>";

// Pasar las variables al archivo JavaScript externo
window.nombre = nombre;
window.score = score;
window.bunny1 = bunny1;
window.bunny2 = bunny2;
window.wolf1 = wolf1;
window.wolf2 = wolf2;

    </script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-timer@1.0.5/jquery.timer.min.js"></script> <!-- jQuery Timer plugin -->
    <script type ="module" src="js/lvl3.js"></script>
    
</body>

</html>