<?php 
	$conn=mysqli_connect('localhost','root','1234','sistema_citas');
	if (!$conn) {
		die("CONNECTION_ERROR");
    }

	
	$fecha =$_POST['fecha_entrada_cita'];
	$listahoras = array("08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00");
    	$valores=array();
	$query = "SELECT hora_entrada FROM cita WHERE fecha_entrada='$fecha'";
	$result = mysqli_query($conn,$query);
	
	if(mysqli_num_rows($result)==0){
		echo json_encode($listahoras);
	}else{
		while($row=mysqli_fetch_array($result)){
			for($i=0;$i<10;$i++){
				if($listahoras[$i]==$row['hora_entrada']){
					$listahoras[$i]="";
					break 1;
				}
			}
		}
		for($i=0;$i<10;$i++){
			if($listahoras[$i]!=""){
				$valores[]=$listahoras[$i];
			}
		}
		if(sizeof($valores)==0){
			$valores[]="No hay hora";
		}
		echo json_encode($valores);
	}
	
?> 
		