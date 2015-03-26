<?php 
	$conn=mysqli_connect('localhost','root','1234','sistema_citas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	
	$idcita=$_POST['citas_estado'];
	$estado=$_POST['estado'];
  
	$query = "update cita set estado='$estado' WHERE id_cita='$idcita'";
	mysqli_query($conn,$query);
    echo "bien";
	mysqli_close($conn);

?> 
		