<?php 
	$conn=mysqli_connect('localhost','root','lualmaca','SistemaCitas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	$query = "SELECT id_cita FROM cita where confirmada=1";
	$result = mysqli_query($conn,$query);
	$valores=array();

	while($row=mysqli_fetch_array($result)){
		$valores[]= $row['id_cita'];
	}
	
	echo json_encode($valores);
	
	mysqli_close($conn);	
	
	
?> 
		