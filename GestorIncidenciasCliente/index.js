$(document).ready(function(){

    getIncidencias();
});

function getIncidencias(){

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "https://api-curso-udemy.herokuapp.com/api/getIncidents",
        success: function(data){
            data = JSON.parse(data);
            mostrarIncidencias(data);
        }
    });
}


function filtrarEstado(completed){

    $.ajax({i
        type: "GET",
        
        url: "https://api-incidencias-udemy.herokuapp.com/api/getIncidentsByState?completed="+completed,
        
        success: function(data){
            mostrarIncidencias(data);
        }
    });
}

function filtrarSeveridad(severity){
    $.ajax({
        type: "GET",
       
        url: "https://api-incidencias-udemy.herokuapp.com/api/getIncidentsBySeverity?severity="+severity,
        
        success: function(data){
            mostrarIncidencias(data);
        }
    });
}

function mostrarIncidencias(incidencias){

    
    let contenido = "";

    if (incidencias.length > 0){
        
    

        $.each(incidencias, function(index, incidencia){
            
            contenido += '<tr ';
            if (incidencia.completed){
                contenido += ' style="background-color:lightskyblue">';
            }
            else{
                contenido += ' style="background-color:lightyellow">';
            }
            contenido += '<td>' + incidencia._id + '</td>'
                        + '<td>' + incidencia.title + '</td>'
                        + '<td>' + incidencia.description + '</td>'
                        + '<td>' + incidencia.user + '</td>'
                        + '<td>' + incidencia.severity + '</td>';
            if (incidencia.completed){
                contenido += '<td>Si</td>';
            }
            else{
                contenido += '<td>No</td>';
            }
            let date = new Date(incidencia.create_at);
            contenido += '<td>' + date.toLocaleDateString()+" "+date.toLocaleTimeString() + '</td>';

            contenido += '<td><button onclick="cambiarEstado(\'' + incidencia._id + '\',' +  incidencia.completed + ');" ' +
            'class="btn btn-success">';
            if (incidencia.completed){
                contenido += 'Descompletar</button></td>';
            }
            else{
                contenido += 'Completar</button></td>';
            }
            contenido += '<td><button onclick="eliminar(\'' + incidencia._id + '\');" ' +
            'class="btn btn-danger">Eliminar</button></td></tr>';
        
        });
    }

    $("#incident-tbody").html(
		contenido
	);
}

function eliminar(id){

    $.ajax({
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "id":id
        }),
        url: "https://api-incidencias-udemy.herokuapp.com/api/deleteIncident",
        
        success: function(data){
            getIncidencias();
        }
    });
}

function cambiarEstado(id,completed){

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "id":id,
            "completed":!completed
        }),
        url: "https://api-incidencias-udemy.herokuapp.com/api/updateIncident",
        
        success: function(data){
            getIncidencias();
        }
    });
}

function nuevaIncidencia(){
    let titulo = $("#titulo").val();
    let usuario = $("#usuario").val();
    let descripcion = $("#descripcion").val();
    let severidad = $('#severidad option:selected').val();
    if (titulo!="" && usuario!="" && descripcion!=""){
        
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "title":titulo,
                "description":descripcion,
                "user": usuario,
                "severity": severidad
            }),
            url: "https://api-incidencias-udemy.herokuapp.com/api/createIncident",
            //url: "http://localhost:3600/api/createIncident",
            
            success: function(data){
                location.href="index.html";
            }
        });
    }

}