// const express = require('express');
// const server = express();
// server.get('/',function(req,res){
//     res.send('<h1>Prueba con express</h1>');
//     res.end();
// });
// server.listen(3000,function(){
//     console.log('Server port on: 3000')
// });


    
function getposts(){

    var usuario = JSON.parse(localStorage.getItem('token'));
    var userId = JSON.parse(localStorage.getItem('id'));
   
    postListConnect(usuario,userId).then(response =>{
         //una forma
        //  response.forEach(element => {
        //      let {title, userEmail}=element;
        //     document.getElementById("post").innerHTML+=`<h4>${title}</h4>
        //                                                 <h5>${userEmail}</h5>`;
        //otra forma REACT

            let obj=Object.keys(response).map(element=>{

                let {title, userEmail,userName,id,tags,post,comments,createdAt,like,body,userId}=response[element];
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
                let categoria= [tags];
                let mostrarcat=[];
                  //para mostrar las categorias
                  for (i=0;i<categoria.length;i++){
                   // console.log(categoria[i]);
                    mostrarcat+=`<ul class="list-unstyled mb-0"><li><a href="#">`+(categoria[i])+`</a></li></ul>`;   
                  }
               /* return `<h1 class="htitulo">${title}  <a href="../pages/blog.html"> <i class="fa fa-fw fa-pencil"></i> </a> </h1>
                        <h4>${tags}</h4>                        
                        <h5 id="test">By: 
                           <a  id="test" href="../pages/userinfo.html"><i class="fa fa-fw fa-user-o"></i>${userName}</a> 
                           Posted on: ${fecha} 
                        </h5>                                                                                           
                        <a  id="test" href="../pages/userinfo.html"><i class="fa fa-fw fa-envelope">${userEmail}</i></a>                       
                        <h4 class="hcoment"><i class="fa fa-fw fa-star">${comments}</i></h4>
                        <h5>${body}</h5>
                        `
                        */

                   return `<div class="row">

                   <!-- Post Content Column -->
                   <div class="col-lg-8">
               
                     <!-- Title -->
                     <h1 class="mt-4">${title} <a href="#"><i class="fa fa-fw fa-pencil"></i> </a></h1>
               
                     <!-- Author -->
                     <p class="lead" id="userId">
                       by
                       <a href="../pages/userinfo.html?id=${userId}"><i class="fa fa-fw fa-user-o"></i> ${userName} (${userEmail})</a>
                     </p>
               
                     <hr>
               
                     <!-- Date/Time -->
                     <p>Posted on ${fecha} </p>
               
                     
                     <!-- Post Content -->
               
                     <p>${body}
                     
                     <blockquote class="blockquote">
                       <p class="mb-0"><i class="fa fa-fw fa-star"></i>${comments}</p>
                     </blockquote>
                     <hr>
                    </div>
                   

                   <!-- Sidebar Widgets Column -->
                   <div class="col-md-4">
               
                     <!-- Search Widget -->
                     <div class="card my-4">
                       <h5 class="card-header">Buscar</h5>
                       <div class="card-body">
                         <div class="input-group">
                           <input type="text" class="form-control" placeholder="Buscar por...">
                           <span class="input-group-btn">
                             <button class="btn btn-secondary" type="button">Go!</button>
                           </span>
                         </div>
                       </div>
                     </div>
               
                     <!-- Categories Widget -->
                     <div class="card my-4">
                       <h5 class="card-header">Categorias</h5>
                       <div class="card-body">
                         <div class="row">
                           <div class="col-lg-6">

                             ${mostrarcat}               
                             
                           </div>                           
                         </div>
                       </div>
                     </div>
                   </div>
               
                 </div>
                 <!-- /.row -->
               
                   `     
                 
            })
           

            document.getElementById("contenedor").innerHTML=obj;
        
           console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }


 let postListConnect=({token})=>{
     return  fetch("http://68.183.27.173:8080/post",{
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

 function redirectLogin(){
  var token = JSON.parse(localStorage.getItem('token'));
  console.log({token}); 
  if (token==null){
    location.href="../pages/login.html";
    return   
  }
 
 }


//WEB Socket
var {token} = JSON.parse(localStorage.getItem('token'));
console.log("TOKEN :"+token);

let websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);

websocket.onopen =function(evt){
  console.log(evt);
}

websocket.onclose =function(evt){
  console.log(evt);
}

websocket.onmessage =function(evt){
  console.log(evt);
}
websocket.onoerror =function(evt){
  console.log(evt);
}

var liked = true;

function websocketConnect(token){
    let websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);

  websocket.onopen =function(evt){
    console.log(evt);
  }

  websocket.onclose =function(evt){
    console.log(evt);
  }

  websocket.onmessage =function(evt){
    //TODO nombrar los span con los respectivos nombres
    var data=JSON.parse(evt.data);
    console.log(evt);
    let xuser;
    switch (data.type){
      case "disconnect":console.log("User name :"+data.userName + "User Email :"+ data.userEmail);
      break;
     
      case "user-connetec": console.log("User name :"+data.userName + "User Email :"+ data.userEmail);
      break;
    }
    //console.log("User name :"+data.userName + "User Email :"+ data.userEmail);
    

  }
  websocket.onoerror =function(evt){
     console.log(evt);   
  }
  
}

//WebSocket


 //EQUIVALENETE A DOCUMENT READY
 (function(){
    redirectLogin();
    getposts();   

 })();

 