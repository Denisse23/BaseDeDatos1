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

$sql_query = "SELECT placa FROM automovil where id_cliente_automovil = '$id_cliente'";

$retVal = "";
if (mysqli_num_rows($result = mysqli_query($connection, $sql_query)) > 0) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['placa'] . "@";
}

echo $retVal;

mysqli_close($connection);
?>