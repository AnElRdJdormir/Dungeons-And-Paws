<?php 

class ConexionDB {
    private $host = "localhost:3308";
    private $usuario = "root";
    private $contrasena = "";
    private $base_datos = "gcw";
    private $conexion;

    public function __construct() {
        try {
            $this->conexion = new mysqli($this->host, $this->usuario, $this->contrasena, $this->base_datos);
            
            if ($this->conexion->connect_error) {
                throw new Exception("Error de conexión: " . $this->conexion->connect_error);
            }
        } catch (Exception $e) {
            die("Error en la conexión: " . $e->getMessage());
        }
    }

    public function getConexion() {
        return $this->conexion;
    }
    
    public function ejecutarConsulta($consulta) {
        try {
            $resultado = $this->conexion->query($consulta);
            if ($resultado === false) {
                throw new Exception("Error en la consulta: " . $this->conexion->error);
            }
            return $resultado;
        } catch (Exception $e) {
            die("Error en la consulta: " . $e->getMessage());
        }
    }

    public function cerrarConexion() {
        $this->conexion->close();
    }
}

?>
