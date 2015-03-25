$(document).ready(function(){
	$("#registro_automovil").click(function(){
		var id_cliente_tmp = $("#id_cliente_automovil").val();
		var nombre_cliente_tmp = $("#nombre_automovil").val();
		var placa_tmp = $("#placa_automovil").val();
		var modelo_tmp = $("#modelo_automovil").val();
		var numero_motor_tmp = $("#numero_motor_automovil").val();

		if (id_cliente_tmp == "")
			alert("Ingrese el ID del cliente.");
		else if (placa_tmp == "")
			alert("Debe ingresar la placa del automovil");
		else {
			$.post("PHP/comprobarClienteID.php", {
				id_cliente: id_cliente_tmp
			}, function(data) {
				if (data == "NO") {
					alert("El ID del cliente no existe.");
				} else {
					var campo_nombre = document.getElementById("nombre_automovil");
					campo_nombre.setAttribute("placeholder", data);
					campo_nombre.setAttribute("readonly", "");
					$.post("PHP/insertarAutomovil.php", {
						id_cliente: id_cliente_tmp,
						nombre_cliente: nombre_cliente_tmp,
						placa: placa_tmp,
						modelo: modelo_tmp,
						numero_motor: numero_motor_tmp
					}, function(data2) {
						alert(data2);
					});
				}
			});
		}//Final del else
	});
	
	$("#comprobar_automovil").click(function() {
		var id_cliente_tmp = $("#id_cliente_automovil").val();
		if (id_cliente_tmp == "")
			alert("Ingrese el ID del cliente.");
		else {
			$.post("PHP/comprobarClienteID.php", {
				id_cliente: id_cliente_tmp
			}, function(data) {
				if (data == "NO") {
					alert("El ID del cliente no existe."); 
				}
				else
					var campo_nombre = document.getElementById("nombre_automovil");
					campo_nombre.setAttribute("placeholder", data);
					campo_nombre.setAttribute("readonly", "");
					alert("El ID del cliente esta en la base de datos.");
			});
		}//Final del else
	});
});