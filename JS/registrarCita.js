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