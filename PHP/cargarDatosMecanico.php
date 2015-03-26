<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_meca = $_POST['id_meca'];
$sql_query = "SELECT * FROM asesor WHERE id_asesor = '$id_meca'";
$retVal = "";

if ($result = mysqli_query($connection, $sql_query)) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['primer_nombre'] . "@" . $row['segundo_nombre'] . "@" . $row['primer_apellido'] . "@" . $row['segundo_apellido'] . "@" . $row['tipo'] . "@" . $row['telefono'];
	echo $retVal;
} 

mysqli_close($connection);
?>