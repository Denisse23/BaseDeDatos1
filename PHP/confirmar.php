<?php 
	$conn=mysqli_connect('localhost','root','1234','sistema_citas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	
	$idcita=$_POST['citas_sin_confirmar'];
	$fechaentrega=$_POST['fecha_entrega'];
	$asesor=$_POST['asesor'];
	$mecanicos=$_POST['mecanicos'];
	$meca = split(",",$mecanicos);
  
	$query = "update cita set fecha_entrega='$fechaentrega', id_jefe_cita='$asesor', confirmada=1 WHERE id_cita='$idcita'";
	for($i=0;$i<sizeof($meca);$i++){
		$query1 = "insert into cita_mecanicos (id_cita_mecanico,id_asesor_mecanico) values ('$idcita','$meca[$i]')";	
		mysqli_query($conn,$query1);
	}
	mysqli_query($conn,$query);
    echo "bien";
	mysqli_close($conn);

?> 
		