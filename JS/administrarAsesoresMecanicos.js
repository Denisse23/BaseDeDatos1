id_asesor_actual = "";
$(document).ready(function(){
	document.getElementById("lista_jefes").setAttribute("onchange", "actualizarAsesorActual()");
	document.getElementById("lista_asesores").setAttribute("onchange", "actualizarCamposDeMecanico()");
	$("#agregar_asesor").click(function(){
		var primer_nombre_tmp = $("#primer_nombre_asesor").val();
		var segundo_nombre_tmp = $("#segundo_nombre_asesor").val();
		var primer_apellido_tmp = $("#primer_apellido_asesor").val();
		var segundo_apellido_tmp = $("#segundo_apellido_asesor").val();
		var tipo_tmp = $("#tipo_asesor").val();
		var telefono_tmp = $("#telefono_asesor").val();
		var id_asesor_jefe_tmp = "";

		if (primer_nombre_tmp == "" && primer_apellido_tmp == "")
			alert("Se tiene que ingresar el primer nombre y el primer apellido.");
		else if (primer_nombre_tmp == "")
			alert("Tiene que ingresar el primer nombre.");
		else if (primer_apellido_tmp == "")
			alert("Tiene que ingresar el primer apellido.");
		else {
			if (confirm("Esta seguro de ingresar a este nuevo Asesor/Mecanico?")) {
				if (tipo_tmp == "Asesor")
					id_asesor_jefe_tmp = "null";
				else 
					id_asesor_jefe_tmp = "1";
				$.post("PHP/insertarAsesor.php", {
					primer_nombre: primer_nombre_tmp,
					segundo_nombre: segundo_nombre_tmp,
					primer_apellido: primer_apellido_tmp,
					segundo_apellido: segundo_apellido_tmp,
					tipo: tipo_tmp,
					telefono: telefono_tmp,
					id_asesor_jefe: id_asesor_jefe_tmp
				}, function(data) {
					alert(data);
				});
			}
		}
	});

	$("#modificar_asesor").click(function(){
		var mprimer_nombre_tmp = $("#mprimer_nombre_asesor").val();
		var msegundo_nombre_tmp = $("#msegundo_nombre_asesor").val();
		var mprimer_apellido_tmp = $("#mprimer_apellido_asesor").val();
		var msegundo_apellido_tmp = $("#msegundo_apellido_asesor").val();
		var mtipo_tmp = $("#mtipo_asesor").val();
		var mtelefono_tmp = $("#mtelefono_asesor").val();
		var mid_asesor_jefe_tmp = "";

		if (mprimer_nombre_tmp == "" && mprimer_apellido_tmp == "")
			alert("Se tiene que ingresar el primer nombre y el primer apellido.");
		else if (mprimer_nombre_tmp == "")
			alert("Tiene que ingresar el primer nombre.");
		else if (mprimer_apellido_tmp == "")
			alert("Tiene que ingresar el primer apellido.");
		else {
			var item_seleccionado = document.getElementById("lista_asesores");
			if (confirm("Esta seguro de modificar al Asesor/Mecanico con id " + item_seleccionado.options[item_seleccionado.selectedIndex].value + "?")) {
				if (mtipo_tmp == "Asesor")
					mid_asesor_jefe_tmp = "null";
				else 
					mid_asesor_jefe_tmp = "1";
				$.post("PHP/modificarAsesor.php", {
					id_asesor: item_seleccionado.options[item_seleccionado.selectedIndex].value,
					primer_nombre: mprimer_nombre_tmp,
					segundo_nombre: msegundo_nombre_tmp,
					primer_apellido: mprimer_apellido_tmp,
					segundo_apellido: msegundo_apellido_tmp,
					tipo: mtipo_tmp,
					telefono: mtelefono_tmp,
					id_asesor_jefe: mid_asesor_jefe_tmp
				}, function(data) {
					alert(data);
				});
			}
		}
	});
	
	$.post("PHP/cargarAsesores.php", {
	}, function(data){
		var asesores_array = [];
		if (data != "") {
			var asesores = data.split("%");
			var asesor, id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono;
			for (var index = 0; index < asesores.length - 1; index++) {
				asesor = asesores[index].split("@");
				id = asesor[0];
				primer_nombre = asesor[1];
				segundo_nombre = asesor[2];
				primer_apellido = asesor[3];
				segundo_apellido = asesor[4];
				tipo = asesor[5];
				telefono = asesor[6];
				asesores_array[asesores_array.length] = new Mecanico(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono);
			}
			for (var index = 0; index < asesores_array.length; index++){
				var new_option = document.createElement("option");
				new_option.setAttribute("value", asesores_array[index].id);
				new_option.innerHTML = asesores_array[index].id + " - " + asesores_array[index].primer_nombre + " " + " " + asesores_array[index].segundo_nombre + " " + asesores_array[index].primer_apellido + " " + asesores_array[index].segundo_apellido + " - " + asesores_array[index].tipo;
				document.getElementById("lista_jefes").appendChild(new_option);
			}
			actualizarAsesorActual();	
		}
	});
});

function Mecanico(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, tipo, telefono) {
	this.id = id;
	this.primer_nombre = primer_nombre;
	this.segundo_nombre = segundo_nombre;
	this.primer_apellido = primer_apellido;
	this.segundo_apellido = segundo_apellido;
	this.tipo = tipo;
	this.telefono = telefono;
}

function actualizarAsesorActual() {
	var asesores = document.getElementById("lista_jefes");
	id_asesor_actual = asesores.options[asesores.selectedIndex].value;
	actualizarMecanicosPorAsesor();
}

function actualizarMecanicosPorAsesor() {
	var mecas = document.getElementById("lista_asesores");
	while (mecas.options.length > 0)
		mecas.remove(0);

	$.post("PHP/cargarMecanicosPorAsesor.php", {
		id_asesor: id_asesor_actual
	}, function(data){
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
				document.getElementById("lista_asesores").appendChild(new_option);
			}
			actualizarCamposDeMecanico();
		}
	});
}

function actualizarCamposDeMecanico() {
	var mecas = document.getElementById("lista_asesores");
	var id_meca_tmp = mecas.options[mecas.selectedIndex].value;

	$.post("PHP/cargarDatosMecanico.php", {
		id_meca: id_meca_tmp
	}, function(data){
		if (data != "") {
			var mecanico = data.split("@");
			$("#mprimer_nombre_asesor").val(mecanico[0]);
			$("#msegundo_nombre_asesor").val(mecanico[1]);
			$("#mprimer_apellido_asesor").val(mecanico[2]);
			$("#msegundo_apellido_asesor").val(mecanico[3]);
			if (mecanico[4] == "Asesor")
				document.getElementById("mtipo_asesor").options[0].selected = true;
			else
				document.getElementById("mtipo_asesor").options[1].selected = true;
			$("#mtelefono_asesor").val(mecanico[5]);
		}
	});
}