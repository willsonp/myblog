// const express = require('express');
// const server = express();
// server.get('/',function(req,res){
//     res.send('<h1>Prueba con express</h1>');
//     res.end();
// });
// server.listen(3000,function(){
//     console.log('Server port on: 3000')
// });
  
function getuserinfo(){

    var userinfo = JSON.parse(localStorage.getItem('token'));       
    
     postListConnect(userinfo).then(response =>{
         //una forma
        //  response.forEach(element => {
        //      let {title, userEmail}=element;
        //     document.getElementById("post").innerHTML+=`<h4>${title}</h4>
        //                                                 <h5>${userEmail}</h5>`;
        
        //otra forma REACT
          
           /*   let obj=Object.keys(response).map(element=>{

                let {createdAt, email,id,name,posts}=response[element];
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
                

                return `<h1 class="htitulo">Información del Usuario..</h1>                        
                        <h5>ID : ${id}</h5>                        
                        <h5>Nombre: 
                           ${name}
                           Posted on: ${fecha} 
                        </h5>                                                                                           
                        <a href="./registrarse.html"><i class="fa fa-fw fa-envelope">${email}</i></a>                       
                        <h4 class="hcoment"><i class="fa fa-fw fa-star">${posts}</i></h4>`                     
                        
                 
            })*/
          
                let {createdAt, email,id,name,posts}=response;
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
            
                document.getElementById("inf").innerHTML+=`<h1 class="htitulo">Información del Usuario..</h1>                        
                <h5>ID : ${id}</h5>                        
                <h5>Nombre: 
                   ${name}
                   Posted on: ${fecha} 
                </h5>                                                                                           
                <a href="./blog.html"><i class="fa fa-fw fa-envelope">${email}</i></a>                       
                <h4 class="hcoment">Posts :<i class="fa fa-fw fa-star">${posts}</i></h4>`;
            

                document.getElementById("post").innerHTML+=`<h1 class="htitulo">Detalle de los Posts..</h1>`;
          
        
           console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }


 let postListConnect=({token})=>{
     return  fetch("http://68.183.27.173:8080/users/me",{
        method:'GET', //or 'PUT'
      //  body: JSON.stringify(data),
        headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${token}`
        }
        
    }).then(
        res =>{
            if(res.ok){
                return res.json();
            }
            throw Error("Error listando post")
        })
 }
 //EQUIVALENETE A DOCUMENT READY
 (function(){
    getuserinfo();
 })();