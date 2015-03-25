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

$sql_query = "SELECT primer_nombre, segundo_nombre, primer_apellido, segundo_apellido FROM cliente WHERE id_cliente = '$id_cliente'";
$result = mysqli_query($connection, $sql_query);

$retVal = "";

if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['primer_nombre'] . " " . $row['segundo_nombre'] . " " . $row['primer_apellido'] . " " . $row['segundo_apellido'];
	echo $retVal;
} else {
	echo "NO";
}
mysqli_close($connection);
?>