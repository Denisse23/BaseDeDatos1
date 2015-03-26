<?php 
	$conn=mysqli_connect('localhost','root','lualmaca','SistemaCitas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	$idcita = $_POST['citas_estado'];
	$query1= "SELECT id_asesor_mecanico FROM cita_mecanicos WHERE id_cita_mecanico='$idcita'";
	$result1 = mysqli_query($conn,$query1);
	$valores=array();
	$tipo;
	$re;
	while($row=mysqli_fetch_array($result1)){
		$valores[] = $row['id_asesor_mecanico']; 
    }
			   
	echo json_encode($valores);
	mysqli_close($conn);
	
?> 
		