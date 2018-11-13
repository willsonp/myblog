

 $(document).ready(function(){
        $("#btnregistrar").click(function(){
          // alert("Hello...");
          registrarse();
        });
    });

        
function registrarse(){
        var username = $("#txtname").val();
        var email = $("#txtmail").val();
        var password = $("#txtpwd").val();
        if(username==="willson" && email==="willvalentinpf@gmail.com" && password==="perez"){
            console.log("Registro Valido..!");

        }else{
            console.log("Registro NO Permitido..!");

        }
}