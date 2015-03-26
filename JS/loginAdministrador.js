$(document).ready(function(){
	$("#entrar_administrador").click(function(){
		var username = $("#usuario_administrador").val();
		var password = $("#contrasena_administrador").val();

		if (username != "Admin" && password != "1234")
			alert("Usuario y contraseña incorrectos.");
		else if (username != "Admin")
			alert("Usuario incorrecto.");
		else if (password != "1234")
			alert("Contraseña incorrecta.");
		else {
			window.location = "administrador.html";
		}
	});
});