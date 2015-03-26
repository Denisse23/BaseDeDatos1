<?php 
	$conn=mysqli_connect('localhost','root','1234','sistema_citas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	$idjefe=$_POST['asesor'];
	$query1= "SELECT id_asesor FROM asesor WHERE tipo='mecanico' AND id_jefe_asesor=$idjefe";
	$result1 = mysqli_query($conn,$query1);
	$valores=array();
	while($row=mysqli_fetch_array($result1)){
		$valores[]=$row['id_asesor'];
	}
	echo json_encode($valores);
	mysqli_close($conn);
	
?> 
		