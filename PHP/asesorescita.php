<?php 
	$conn=mysqli_connect('localhost','root','lualmaca','SistemaCitas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	
	$query1= "SELECT id_asesor FROM asesor WHERE tipo='Asesor'";
	$result1 = mysqli_query($conn,$query1);
	$valores=array();
	while($row=mysqli_fetch_array($result1)){
		$valores[]=$row['id_asesor'];
	}
	echo json_encode($valores);
	mysqli_close($conn);
	
?> 
		