
$(document).ready(function(){
    $("#btnlogin").click(function(){
        
       btnlogin();
    });
});

function btnlogin(){
    var username = $("#txtuser").val();
    var password = $("#txtpwd").val();
    
    // validar no esten en blanco
    if(username==""){
        alert("El campo User Name no Debe Estar en Blanco!");
        return;
     }else if(password==""){
         alert("El campo Clave no Debe Estar en Blanco!");
         return;
     }else{
         alert("Puede Continuar con las Validaciones..!");                
     }

    if("willson"===username && "1234"===password){
        alert("Autorizado..!");

    }else{
      alert("NO Autorizado..!");

    }
}