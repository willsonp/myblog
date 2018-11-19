$(document).ready(function(){
    $("#btnregistrar").click(function(){
      registrarse();
    });
});


function registrarse(){
        var username = $("#txtname").val();
        var email = $("#txtmail").val();
        var password = $("#txtpwd").val();   

       // validar no esten en blanco
        if(username==""){
           alert("El campo User Name no Debe Estar en Blanco!");
           return;
        }else if(email==""){
            alert("El campo Email no Debe Estar en Blanco!");
            return;
        }else if(password==""){
            alert("El campo Clave no Debe Estar en Blanco!");
            return;
        }else{
            alert("Puede Continuar con las Validaciones..!");                
        }
        

        var data = {nusername: username,
            email: email,
            password: password
        }
        console.log(data);
        
        fetch("http://68.183.27.173:8080/registrarse",{
            method:'POST', //or 'PUT'
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'Application/json'
            }
        }).then(res =>res.json())
        .then(response =>
            console.log('Sussess',JSON.stringify(response)))
            .catch(error =>
                console.log('Error',error));           
        
}