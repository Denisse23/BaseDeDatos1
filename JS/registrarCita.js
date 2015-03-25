$(document).ready(function(){
	$("#comprobar_cliente").click(function(){
		var id_cliente_tmp = $("#id_cliente_cita").val();
		var nombre_completo_tmp = $("#nombre_completo_cita").val();

		if (id_cliente_tmp == "" && nombre_completo_tmp != "") {
			var nombres = nombre_completo_tmp.split(" ");
			$.post("PHP/comprobarClienteNombre.php", {
				primer_nombre: nombres[0],
				segundo_nombre: nombres[1],
				primer_apellido: nombres[2],
				segundo_apellido: nombres[3]
			}, function(data){
				if (data == "NO") {
					alert("No se encuentra el cliente con el nombre " + nombre_completo_tmp);
				} else {
					document.getElementById("id_cliente_cita").value = data;
					$.post("PHP/obtenerPlacasPorCliente.php", {
						id_cliente: data
					}, function(data2){
						addPlacas(data2);
					});
				}
				
			});
		} else if ((id_cliente_tmp != "" && nombre_completo_tmp == "") || (id_cliente_tmp != "" && nombre_completo_tmp != "")) {
			$.post("PHP/comprobarClienteID.php", {
				id_cliente: id_cliente_tmp
			}, function(data){
				if (data != "NO") {
					document.getElementById("nombre_completo_cita").value = data;
					$.post("PHP/obtenerPlacasPorCliente.php", {
						id_cliente: id_cliente_tmp
					}, function(data2){
						addPlacas(data2);
					});
				} else 
					alert("No se encuentra el cliente con el id " + id_cliente_tmp);
			});
		} else {

		}
	});

	$("#registrar_cita").click(function(){
		var id_cliente_tmp = $("#id_cliente_cita").val();
		var nombre_completo_tmp = $("#nombre_completo_cita").val();
		var tipo_mantenimiento_tmp = $("#tipo_mantenimiento").val();
		var tipo_reparacion_tmp = $("#tipo_reparacion").val();
		var fecha_entrada_tmp = $("#fecha_entrada_cita").val();
		var hora_entrada_tmp = $("#hora_entrada_cita").val();
		var placa_tmp = $("#placa_cita").val();

		if (id_cliente_tmp == "") {
			alert("El campo de id esta vacio.");
		} else if (nombre_completo_tmp == "")
			alert("El nombre esta vacio.");
		else {
			$.post("PHP/comprobarClienteID.php", {
				id_cliente: id_cliente_tmp
			}, function(data) {
				if (data == "NO")
					alert("El ID del cliente no existe.");
				else {
					$.post("PHP/insertarCita.php", {
						id_cliente: id_cliente_tmp,
						nombre_completo: nombre_completo_tmp,
						tipo_mantenimiento: tipo_mantenimiento_tmp,
						tipo_reparacion: tipo_reparacion_tmp,
						fecha_entrada: fecha_entrada_tmp,
						hora_entrada: hora_entrada_tmp,
						placa: placa_tmp
					}, function(data) {
						alert(data);
					});
				}
			});
			
		}
	})
	$("select[name=opcion_cita]").change(function(){
		while(document.getElementById("tipo_mantenimiento").length>0){
		document.getElementById("tipo_mantenimiento").remove(0);
		}
		while(document.getElementById("tipo_reparacion").length>0){
		document.getElementById("tipo_reparacion").remove(0);
		}
		 if($("select[name=opcion_cita]").val()=='2'){
			$('#tipo_mantenimiento').append('<option value='+'5000'+'>'+'5000'+'</option>');
			$('#tipo_mantenimiento').append('<option value='+'10000'+'>'+'10000'+'</option>');
			$('#tipo_mantenimiento').append('<option value='+'15000'+'>'+'15000'+'</option>');
		 }else{
			$('#tipo_reparacion').append('<option value='+'fallo del motor de arranque'+'>'+'fallo del motor de arranque'+'</option>');
			$('#tipo_reparacion').append('<option value='+'fallo en el tren delantero'+'>'+'fallo en el tren delantero'+'</option>');
			$('#tipo_reparacion').append('<option value='+'ruido cerca del motor'+'>'+'ruido cerca del motor'+'</option>'); 
		 }
     });

});



function addPlacas(data) {
	var placas_cliente = data.split("@");
	for (index = 0; index < placas_cliente.length - 1; index++) {
		var new_option = document.createElement('option');
		new_option.setAttribute("value", placas_cliente[index]);
		new_option.innerHTML = placas_cliente[index];
		document.getElementById("placa_cita").appendChild(new_option);
	}
};

function RevisarHoras(){
	
	while(document.getElementById("hora_entrada_cita").length>0){
		document.getElementById("hora_entrada_cita").remove(0);
	}
	if(document.getElementById("fecha_entrada_cita").value!="" && document.getElementById("fecha_entrada_cita").value.length==10){
		$num =0;
		var fechaactual = new Date();
		var añoactual = fechaactual.getFullYear();
		var mesactual= fechaactual.getMonth()+1;
		var diaactual = fechaactual.getDate();
		var horaactual = fechaactual.getHours()+1;
		if(parseInt(mesactual)<10){
			mesactual="0"+(fechaactual.getMonth()+1);
		}
		if(parseInt(diaactual)<10){
			diaactual="0"+fechaactual.getDate();
		}
		var fechacampo = document.getElementById("fecha_entrada_cita").value;
		var añocampo = parseInt(fechacampo.charAt(0)+fechacampo.charAt(1)+fechacampo.charAt(2)+fechacampo.charAt(3));
		var mescampo;
		var diacampo;
		if(fechacampo.charAt(5)!='0'){
			mescampo=parseInt(fechacampo.charAt(5)+fechacampo.charAt(6));
		}else{
			mescampo=parseInt(fechacampo.charAt(6));
		}
		if(fechacampo.charAt(8)!='0'){
			diacampo=parseInt(fechacampo.charAt(8)+fechacampo.charAt(9));
		}else{
			diacampo=parseInt(fechacampo.charAt(9));
		}
			
		var hayerror=false;
		if(añocampo<parseInt(añoactual) || añocampo>2020){
			hayerror=true;
		}
		if(mescampo<parseInt(mesactual) && añocampo==parseInt(añoactual)){
			hayerror=true;
		}
		if(diacampo<parseInt(diaactual) && mescampo==parseInt(mesactual) && añocampo==parseInt(añoactual)){
			hayerror=true;
		}
		
		if(hayerror==false){
			var url="./PHP/insertarCitahora.php";
			$.ajax({type:"POST", url:url,data: $("#fr").serialize(),
				success: function(data)
				{
					
					var json=$.parseJSON(data);
					if(json[0]!="No hay hora"){
						
						while(json[$num]){
							if(json[$num].charAt(0)!=0){
								var horavalor = parseInt(json[$num].charAt(0)+json[$num].charAt(1));
								if(!(horavalor<parseInt(horaactual) && (fechacampo==(añoactual+"-"+mesactual+"-"+diaactual)))){
									$('#hora_entrada_cita').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
								}
							}else{
								var horavalor = parseInt(json[$num].charAt(1));
								if(!(horavalor<parseInt(horaactual) && (fechacampo==(añoactual+"-"+mesactual+"-"+diaactual)))){
									$('#hora_entrada_cita').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
								}
							}
							
							$num=$num+1;
						}
						
					}else{
						$('#hora_entrada_cita').append('<option value="no">No hay hora disponible para esta fecha</option>');
					}
				  
				  
				}
			});
			
		}
		
		
	}
	
}//fin de la funcion