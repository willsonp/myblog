
$(document).ready(function(){
    $("#btnlogin").click(function(){
       //alert("Hello...");
       btnlogin();
    });
});

function btnlogin(){
    var username = $("#txtuser").val();
    var password = $("#txtpwd").val();
    if("willson"===username && "perez"===password){
        console.log("Autorizado..!");

    }else{
      console.log("NO Autorizado..!");

    }
}