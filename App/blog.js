$(document).ready(function(){
    $("#btnsub").click(function(){
      btnsub();
    });
});


function btnsub(){
        let title = $("#titulo").val();
        let tags = $("#tag").val();
        let body = $("#subject").val();   
        
        //let createdAt = new Date().toLocaleString();



       // validar no esten en blanco
        if(title==""){
           alert("El campo Titulo del Posts no Debe Estar en Blanco!");
           return;

        }else if(body==""){
            alert("El campo Cuerpo o comentario del Posts Estar en Blanco!");
            return;
        }else if(tags==""){
            alert("El campo Tags NO Debe Estar en Blanco!");
            return;
        
        }
        //let equivalente a var..esto es lo que se usa mas en la actualidad
        let data = {title,
            body,
            tags:[tags]
        };
        console.log(data);
       

        //para acceder a los valores gurdados en el localStorage
        var usuario = JSON.parse(localStorage.getItem('token'));
        console.log(usuario);

        
            
        fetch("http://68.183.27.173:8080/post",{
            method:'POST', //or 'PUT'
            body: JSON.stringify(data),                             
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${usuario.token}`
            }
        }).then(res =>res.json())
        .then(response =>{

            console.log('Sussess',JSON.stringify(response));   
                                
        }).catch(error =>{
            console.log('Error',error);           

        });
        
                           
        
}