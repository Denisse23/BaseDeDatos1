<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$primer_nombre = $_POST['primer_nombre'];
$segundo_nombre = $_POST['segundo_nombre'];
$primer_apellido = $_POST['primer_apellido'];
$segundo_apellido = $_POST['segundo_apellido'];

$sql_query = "SELECT id_cliente FROM cliente WHERE primer_nombre = '$primer_nombre' AND segundo_nombre = '$segundo_nombre' AND primer_apellido = '$primer_apellido' AND segundo_apellido = '$segundo_apellido'";
$result = mysqli_query($connection, $sql_query);

$retVal = "";

if (mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);
	$retVal .= $row['id_cliente'];
	echo $retVal;
} else {
	echo "NO";
}
mysqli_close($connection);
?>