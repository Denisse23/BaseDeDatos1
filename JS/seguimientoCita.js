$(document).ready(function(){
	$("#mostrar").click(function(){
		var id_cita_tmp = $("#id_seguimiento").val();
		if (id_cita_tmp == "")
			alert("El id de la cita no puede estar vacia;.");
		else {
			$.post("PHP/comprobarCita.php", {
				id_cita: id_cita_tmp
			}, function(data) {
				if (data != "NO") {
					datos = data.split("#");
					insertarDatosBasicos(datos);
				} else {
					alert("No existe una cita con el ID: " + id_cita_tmp);
				}
			});
		}
	});
});

function insertarDatosBasicos(datos) {
	$("#tipo").val("Mantenimineto");
	$("#entrada").val(datos[0]);
	if (datos[0] == "0"){
		$("#tipo").val("Reparacion");
		$("#entrada").val(datos[1]);
	}
	$("#fecha_entrada").val(datos[3]);
	$("#hora_entrada").val(datos[4]);
	$("#placa").val(datos[6]);
	$("#fecha_entrega").val(datos[2]);
	$("#estado").val(datos[5]);
	insertarNombreCompleto(datos[8]);
	insertarNombreAsesor(datos[7]);
	insertarMecanicos(datos[7]);
}

function insertarNombreCompleto(id_cliente_tmp) {
	$.post("PHP/comprobarClienteID.php", {
		id_cliente: id_cliente_tmp
	}, function(nombre_completo) {
		$("#nombre_completo").val(nombre_completo);
	});
}

function insertarNombreAsesor(id_asesor_tmp) {
	$.post("PHP/CargarNombreAsesor.php", {
		id_asesor: id_asesor_tmp
	}, function(data) {
		$("#asesor").val(data);
	});
}

function insertarMecanicos(id_asesor_tmp) {
	$.post("PHP/cargarMecanicosPorAsesor.php", {
		id_asesor: id_asesor_tmp
	}, function(data){
		alert(data);
		var mecanicos_array = [];
		if (data != "") {
			var mecanicos = data.split("%");
			var mecanico, id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono;
			for (var index = 0; index < mecanicos.length - 1; index++) {
				mecanico = mecanicos[index].split("@");
				id = mecanico[0];
				primer_nombre = mecanico[1];
				segundo_nombre = mecanico[2];
				primer_apellido = mecanico[3];
				segundo_apellido = mecanico[4];
				tipo = mecanico[5];
				telefono = mecanico[6];
				mecanicos_array[mecanicos_array.length] = new Mecanico(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono);
			}
			
			for (var index = 0; index < mecanicos_array.length; index++){
				var new_option = document.createElement("option");
				new_option.setAttribute("value", mecanicos_array[index].id);
				new_option.innerHTML = mecanicos_array[index].id + " - " + mecanicos_array[index].primer_nombre + " " + " " + mecanicos_array[index].segundo_nombre + " " + mecanicos_array[index].primer_apellido + " " + mecanicos_array[index].segundo_apellido + " - " + mecanicos_array[index].tipo;
				document.getElementById("mecaninos").appendChild(new_option);
			}
		}
	});
}

function Mecanico(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono) {
	this.id = id;
	this.primer_nombre = primer_nombre;
	this.segundo_nombre = segundo_nombre;
	this.primer_apellido = primer_apellido;
	this.segundo_apellido = segundo_apellido;
	this.tipo = tipo;
	this.telefono = telefono;
}