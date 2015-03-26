<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_jefe = $_POST['id_asesor'];

$sql_query = "SELECT * FROM asesor WHERE id_jefe_asesor = '$id_jefe'";

$retVal = "";
$num_rows = mysqli_num_rows($result = mysqli_query($connection, $sql_query));
for ($index = 0; $index < $num_rows; $index++) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['id_asesor'] . "@" . $row['primer_nombre'] . "@" . $row['segundo_nombre'] . "@" . $row['primer_apellido'] . "@" . $row['segundo_apellido'] . "@" . $row['tipo'] . "@" . $row['telefono'];		
	$retVal .= "%"; 
}
echo $retVal;
mysqli_close($connection);
?>