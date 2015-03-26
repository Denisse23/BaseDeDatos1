<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_cita = $_POST['id_cita'];

$sql_query = "SELECT tipo_mantenimiento, tipo_reparacion, fecha_entrega, fecha_entrada, hora_entrada, estado, placa_cita, id_jefe_cita, id_cliente_cita, confirmada FROM cita WHERE id_cita = '$id_cita'";

$retVal = "";

if ($result = mysqli_query($connection, $sql_query)) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['tipo_mantenimiento'] . "#";
	$retVal .= $row['tipo_reparacion'] . "#";
	$retVal .= $row['fecha_entrega'] . "#";
	$retVal .= $row['fecha_entrada'] . "#";
	$retVal .= $row['hora_entrada'] . "#";
	$retVal .= $row['estado'] . "#";
	$retVal .= $row['placa_cita'] . "#";
	$retVal .= $row['id_jefe_cita'] . "#";
	$retVal .= $row['id_cliente_cita'];
	echo $retVal;
} else {
	echo "NO";
}
mysqli_close($connection);
?>