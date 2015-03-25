$(document).ready(function(){
	$("#registro_cliente").click(function(){
		var primer_nombre_tmp = $("#primer_nombre_cliente").val();
		var segundo_nombre_tmp = $("#segundo_nombre_cliente").val();
		var primer_apellido_tmp = $("#primer_apellido_cliente").val();
		var segundo_apellido_tmp = $("#segundo_apellido_cliente").val();
		var direccion_tmp = $("#direccion_cliente").val();
		var telefonos_tmp = $("#telefonos_cliente").val();
		var correo_tmp = $("#corre_cliente").val();

		if (primer_nombre_tmp == "")
			alert("El nombre no puede estar vacio.");
		else if (primer_apellido_tmp == "")
			alert("El apellido no puede estar vacio.");
		else {
			$.post("PHP/insertarCliente.php", {
				primer_nombre: primer_nombre_tmp,
				segundo_nombre: segundo_nombre_tmp,
				primer_apellido: primer_apellido_tmp,
				segundo_apellido: segundo_apellido_tmp,
				direccion: direccion_tmp,
				telefonos: telefonos_tmp,
				correo: correo_tmp
			}, function(data) {
				alert(data);
			});
		}
	})
});