<?php
$servername = "localhost";
$username = "root";
$password = "lualmaca";
$dbname = "SistemaCitas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_asesor = $_POST['id_asesor'];
$primer_nombre = $_POST['primer_nombre'];
$segundo_nombre = $_POST['segundo_nombre'];
$primer_apellido = $_POST['primer_apellido'];
$segundo_apellido = $_POST['segundo_apellido'];
$tipo = $_POST['tipo'];
$telefono = $_POST['telefono'];
$id_jefe_asesor = $_POST['id_asesor_jefe'];

$sql_query = "UPDATE asesor SET primer_nombre = '$primer_nombre', segundo_nombre = '$segundo_nombre', primer_apellido = '$primer_apellido', segundo_apellido = '$segundo_apellido', tipo = '$tipo', telefono = '$telefono', id_jefe_asesor = '$id_jefe_asesor' WHERE id_asesor = '$id_asesor'";

if ($id_jefe_asesor == "null")
	$sql_query = "UPDATE asesor SET primer_nombre = '$primer_nombre', segundo_nombre = '$segundo_nombre', primer_apellido = '$primer_apellido', segundo_apellido = '$segundo_apellido', tipo = '$tipo', telefono = '$telefono', id_jefe_asesor = NULL WHERE id_asesor = '$id_asesor'";


if (mysqli_query($connection, $sql_query)) {
	echo "Registro modificado.";
} else {
	echo "No se pudo modificar el registro.";
}
mysqli_close($connection);
?>