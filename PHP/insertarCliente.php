<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "sistema_citas";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
	die("CONNECTION_ERROR");
}

$id_cliente = $_POST['id_cliente'];

$primer_nombre = $_POST['primer_nombre'];
$segundo_nombre = $_POST['segundo_nombre'];
$primer_apellido = $_POST['primer_apellido'];
$segundo_apellido = $_POST['segundo_apellido'];
$direccion = $_POST['direccion'];
$telefonos = $_POST['telefonos'];
$correo = $_POST['correo'];

$sql_query = "INSERT INTO cliente (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo) VALUES ('$primer_nombre', '$segundo_nombre', '$primer_apellido', '$segundo_apellido', '$direccion', '$correo')";

if (mysqli_query($connection, $sql_query)) {
	echo "Registro añadido.";
} else {
	echo "No se pudo añadir el registro.";
}
mysqli_close($connection);
?>