<?php
// Incluye el archivo de conexión
include 'conexion.php';

$reg_name = $_POST['reg_name'];

class RegistrarUsuario {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function registrarUsuario($reg_name) {

        $consulta = "SELECT * FROM score WHERE nombre = '$reg_name'";
        $resultado = $this->conexion->ejecutarConsulta($consulta);
        if ($resultado->num_rows > 0) {

            echo "<script>alert('El nombre ya esta en uso');</script>";
            echo "<script>window.location.href = 'login.html';</script>"; // Redirigir a login.html después de mostrar el alert
            exit;
         
        }

        // El nombre no está en uso, insertar en la tabla
        $consulta = "INSERT INTO score (nombre,bindsbunny1,
        bindsbunny2,bindswolf1,bindswolf2
        ) VALUES ('$reg_name','W','S','I','K')";
        if ($this->conexion->ejecutarConsulta($consulta)) {
            header("Location: login.html");
        } else {
            echo "Error al registrar los datos: " . $this->conexion->conexion->error;
        }
    }
}

$conexion = new ConexionDB();
$registrarUsuario = new RegistrarUsuario($conexion);

$registrarUsuario->registrarUsuario($reg_name);

$conexion->cerrarConexion();
?>
