$(document).ready(function(){
	$("#registrar_cita").click(function(){
		var id_cliente_tmp = $("#id_cliente_cita").val();
		var nombre_completo_tmp = $("#nombre_completo_cita").val();
		var tipo_mantenimiento_tmp = $("#tipo_mantenimiento").val();
		var tipo_reparacion_tmp = $("#tipo_reparacion").val();
		var fecha_entrada_tmp = $("#fecha_entrada_cita").val();
		var hora_entrada_tmp = $("#hora_entrada_cita").val();
		var placa_tmp = $("#placa_cita").val();

		if (id_cliente_tmp == "" && nombre_completo_tmp != "" || id_cliente_tmp != "" && nombre_completo_tmp == "") {
			
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

				}
			});
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

		// alert("id: " + id_cliente + 
		// 	"\nnombre completo: " + nombre_completo +
		// 	"\nopcion: " + opcion +
		// 	"\ntipo mantenimiento: " + tipo_mantenimiento +
		// 	"\ntipo_reparacion: " + tipo_reparacion +
		// 	"\nfecha entrada: " + fecha_entrada +
		// 	"\nhora_entrada: " + hora_entrada +
		// 	"\nplaca: " + placa);
	})
});