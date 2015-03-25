<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_cliente = $_POST['id_cliente'];
$nombre_completo = $_POST['nombre_completo'];
$tipo_mantenimiento = $_POST['tipo_mantenimiento'];
$tipo_reparacion = $_POST['tipo_reparacion'];
$fecha_entrada = $_POST['fecha_entrada'];
$hora_entrada = $_POST['hora_entrada'];
$placa = $_POST['placa'];

$sql_query = "INSERT INTO cita (tipo_mantenimiento, tipo_reparacion, fecha_entrada, hora_entrada, placa_cita, id_cliente_cita) VALUES ('$tipo_mantenimiento', '$tipo_reparacion', '$fecha_entrada', '$hora_entrada', '$placa', '$id_cliente')";
if (mysqli_query($connection, $sql_query)) {
	echo "Registro añadido.";
} else {
	echo "No se pudo añadir el registro.";
}
mysqli_close($connection);
?>