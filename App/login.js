
$(document).ready(function(){
    $("#btnlogin").click(function(){
      
       btnlogin();
    });
});

function btnlogin(){
    let email = $("#txtuser").val();
    let password = $("#txtpwd").val();
    
    // validar no esten en blanco
    if(email==""){
        alert("El campo User Name no Debe Estar en Blanco, por favor registrar su correo Electronico!");
        return;
     }else if(password==""){
         alert("El campo Clave no Debe Estar en Blanco!");
         return;
         
     }

    //let equivalente a var..esto es lo que se usa en la actualidad ECMAScript
    let data = {
        email : email,
        password: password
    }
    console.log(data);
    
    fetch("http://68.183.27.173:8080/login",{
        method:'POST', //or 'PUT'
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'Application/json'
        }
        
    }).then(res =>res.json())
    .then(response =>{
        //almacenamos el valor de la clave en token
        localStorage.setItem('token',JSON.stringify(response));
        console.log('Sussess',JSON.stringify(response));
        // getposts();     
    
            location.href='index.html';
        //console.log(JSON.parse(localStorage.getItem('token')));
    })       
        .catch(error =>{
            console.log('Error',error)
           // location.href="./registrarse.html";
            
        });
           
        
            
}