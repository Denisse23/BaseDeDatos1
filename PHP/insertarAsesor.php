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
$tipo = $_POST['tipo'];
$telefono = $_POST['telefono'];
$id_jefe_asesor = $_POST['id_asesor_jefe'];

$sql_query = "INSERT INTO asesor (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono, id_jefe_asesor) VALUES ('$primer_nombre', '$segundo_nombre', '$primer_apellido', '$segundo_apellido', '$tipo', '$telefono', '$id_jefe_asesor')";

if ($id_jefe_asesor == "null")
	$sql_query = "INSERT INTO asesor (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono, id_jefe_asesor) VALUES ('$primer_nombre', '$segundo_nombre', '$primer_apellido', '$segundo_apellido', '$tipo', '$telefono', NULL)";


if (mysqli_query($connection, $sql_query)) {
	echo "Registro añadido.";
} else {
	echo "No se pudo añadir el registro.";
}
mysqli_close($connection);
?>