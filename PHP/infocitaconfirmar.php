<?php 
	$conn=mysqli_connect('localhost','root','lualmaca','SistemaCitas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	$idcita = $_POST['citas_sin_confirmar'];
	$query1= "SELECT * FROM cita WHERE id_cita='$idcita'";
	$result1 = mysqli_query($conn,$query1);
	$valores;
	$tipo;
	$re;
	while($row=mysqli_fetch_array($result1)){
		if(is_null($row['tipo_reparacion'])){
			$re=$row['tipo_mantenimiento'];
			$tipo='tipo_mantenimiento';
		}else{
			$tipo='tipo_reparacion';
			$re=$row['tipo_reparacion'];
		}
		$valores = "*".$row['id_cliente_cita'] . "*" .$tipo. "*" .$re. "*" . $row['fecha_entrada']. "*" .$row['hora_entrada']. "*" . 
				   $row['placa_cita']."*";
    }
			   
	echo json_encode($valores);
	mysqli_close($conn);
	
?> 
		