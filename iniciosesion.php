<?php
// Incluye el archivo de conexión
include 'conexion.php';

$log_name = $_POST['log_name'];

class IniciarSesion {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function iniciarSesion($log_name) {
        // Verificar si el nombre existe en la base de datos
        $consulta = "SELECT * FROM score WHERE nombre = '$log_name'";
        $resultado = $this->conexion->ejecutarConsulta($consulta);
        if ($resultado->num_rows > 0) {
            // El nombre existe, iniciar sesión
            session_start();
            $_SESSION['nombre'] = $log_name;

            $fila = $resultado->fetch_assoc();
            $_SESSION['score'] = $fila['score'];
            $_SESSION['bindsbunny1'] = $fila['bindsbunny1'];
            $_SESSION['bindsbunny2'] = $fila['bindsbunny2'];
            $_SESSION['bindswolf1'] = $fila['bindswolf1'];
            $_SESSION['bindswolf2'] = $fila['bindswolf2'];
            
           header("Location: index.html"); // Redirigir a la página de menú principal
        } else {
            echo "<script>alert('El nombre es incorrecto');</script>";
            echo "<script>window.location.href = 'login.html';</script>"; // Redirigir a login.html después de mostrar el alert
            exit;
            
        }
    }
}

$conexion = new ConexionDB();
$iniciarSesion = new IniciarSesion($conexion);

$iniciarSesion->iniciarSesion($log_name);

$conexion->cerrarConexion();
?>
