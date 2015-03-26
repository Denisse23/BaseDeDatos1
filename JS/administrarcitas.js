$(document).ready(function(){
	var url="./PHP/confirmarCitas.php";
	$.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
		success: function(data)
		{
			var json=$.parseJSON(data);
			$num =0;
			while(json[$num]){
				$('#citas_sin_confirmar').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
				$num=$num+1;
			}
		
		}
	});
	var url="./PHP/asesorescita.php";
	$.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
		success: function(data)
		{
			var json=$.parseJSON(data);
			$num =0;
			while(json[$num]){
				$('#asesor').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
				$num=$num+1;
			}
		
		}
	});
	$("select[name=asesor]").change(function(){
	   var url="./PHP/mecanicoscita.php";
		$.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
		success: function(data)
		{
			var json=$.parseJSON(data);
			$num =0;
			while(json[$num]){
				$('#lista_mecanicos').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
				$num=$num+1;
			}	
		}
	   });
	 });
	
	$("select[name=citas_sin_confirmar]").change(function(){
	   var url="./PHP/infocitaconfirmar.php";
		$.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
		success: function(data)
		{
			var json=$.parseJSON(data);
			var partes = data.split("*");
			$('#id_cliente').val(partes[1]);
			$('#tipo').val(partes[2]);
			$('#entrada').val(partes[3]);
			$('#fecha_entrada').val(partes[4]);
			$('#hora_entrada').val(partes[5]);
		    $('#placa').val(partes[6]);
		}
	   });
		
    });
	$( "select[name=lista_mecanicos]" ).change(function() {
	  var antes = $('#mecanicos').val();
	  if(antes==""){
		  $('#mecanicos').val($('#lista_mecanicos').val());
	  }else{
	   $('#mecanicos').val(antes+","+$('#lista_mecanicos').val());
	  }
    });
});


function confirmarC(){
        var url= "./PHP/confirmar.php";
        $.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
            success: function(data)
            {
                alert("Cita confirmada");
				rellenar();
              
            }
        });
}

function rellenar(){
	while(document.getElementById("citas_sin_confirmar").length>0){
		document.getElementById("citas_sin_confirmar").remove(0);
	}
	var url="./PHP/confirmarCitas.php";
	$.ajax({type:"POST", url:url,data: $("#fr2").serialize(),
		success: function(data)
		{
			var json=$.parseJSON(data);
			$num =0;
			while(json[$num]){
				$('#citas_sin_confirmar').append('<option value='+json[$num]+'>'+json[$num]+'</option>');
				$num=$num+1;
			}
		
		}
	});
	
}


