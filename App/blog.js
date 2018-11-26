$(document).ready(function(){
    $("#btnsub").click(function(){
      btnsub();
    });
});


function btnsub(){
        let name = $("#fname").val();
        let createdAt = new Date().getDate();
        let email = $("#email").val();
        let posts = $("#subject").val();   

       // validar no esten en blanco
        if(name==""){
           alert("El campo User Name no Debe Estar en Blanco!");
           return;

        }else if(email==""){
            alert("El campo Email no Debe Estar en Blanco!");
            return;
        }else if(posts==""){
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
                'Content-Type':'Application/json',
                'Authorization':'Bearer ${token}'
            }
        }).then(res =>res.json())
        .then(response =>{
            localStorage.setItem('token',JSON.stringify(response));
            console.log('Sussess',JSON.stringify(response));
            //recorrer el localStorage
            
            for (i=0;i<localStorage.length;i++){
            let llave=localStorage.key(i);
            var datos = localStorage.getItem(llave);    
            console.log(datos);
          
            if(response.error==401){
                alert("Usuario No Autorizado");
                return;
            }

            }
        }).catch(error =>{
            console.log('Error',error);
            if(response.error==401){
                alert("Usuario No Autorizado");
                return;
            }
        });
        
                           
        
}