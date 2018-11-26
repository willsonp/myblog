$(document).ready(function(){
    $("#btnsub").click(function(){
      btnsub();
    });
});


function btnsub(){
        let name = $("#fname").val();
        let ape = $("#lname").val();        
        let email = $("#email").val();
        let subject = $("#subject").val();   

       // validar no esten en blanco
        if(name==""){
           alert("El campo User Name no Debe Estar en Blanco!");
           return;
        }if(ape==""){
            alert("El campo Apellido no Debe Estar en Blanco!");
            return;
        }else if(email==""){
            alert("El campo Email no Debe Estar en Blanco!");
            return;
        }else if(subject==""){
            alert("El campo Clave no Debe Estar en Blanco!");
            return;
        
        }

        /* valores que retorna del Json
        Sussess {"createdAt":0,"email":"wilson.test@test.com","id":151,"name":"willson","password":"1234","posts":0}
        */

        //let equivalente a var..esto es lo que se usa mas en la actualidad
        let data = {createdAt,
            email,
            name,
            posts
        }
        console.log(data);
        
        fetch("http://68.183.27.173:8080/post",{
            method:'POST', //or 'PUT'
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'Application/json'
            }
        }).then(res =>res.json())
        .then(response =>{
            console.log('Sussess',JSON.stringify(response))
            //recorrer el localStorage
            for (i=0;i<localStorage.length;i++){
            let llave=localStorage.key(i);
            var datos = localStorage.getItem(llave);    
            console.log(datos);
            }
        }).catch(error =>
                console.log('Error',error));           
        
}