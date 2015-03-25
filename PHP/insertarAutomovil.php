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
$nombre_cliente = $_POST['nombre_cliente'];
$placa = $_POST['placa'];
$modelo = $_POST['modelo'];
$numero_motor = $_POST['numero_motor'];

$sql_query = "INSERT INTO automovil (placa, modelo, numero_motor, id_cliente_automovil) VALUES ('$placa', '$modelo', '$numero_motor', '$id_cliente')";

if (mysqli_query($connection, $sql_query)) {
	echo "Registro añadido.";
} else {
	echo "No se pudo añadir el registro.";
}
mysqli_close($connection);
?>