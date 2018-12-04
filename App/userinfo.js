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

      
    var idloc = location.search.substr(1).split("=")[1];

    //pasarle el email a la funcion
   //  alert("ID LOC"+idloc);

    //var userget = JSON.parse(localStorage.getItem('useridemail'));

   
    postListConnect(userinfo,idloc).then(response =>{
                 
                let {createdAt, email,id,name,posts}=response;
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
            
                document.getElementById("contenedor").innerHTML+=`<h1 class="htitulo">Información del Usuario..</h1>                        
                <h5>Nombre: <a href="../pages/comentarios.html"> <i class="fa fa-fw fa-user-plus"></i>
                   ${name} (<i class="fa fa-fw fa-envelope">${email})</i> </a>
                   
                </h5>                                                                                           
                <p >Created on: ${fecha} </p>                       
                <h5 class="hcoment">Posts :<i class="fa fa-fw fa-star">${posts}</i></h5>
                <hr>`;
            

               // document.getElementById("post").innerHTML+=`<h1 class="htitulo">Detalle de los Posts..</h1>`;
          
        
              console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }

/*
 function getuserid(pemail){

  var userinfo = JSON.parse(localStorage.getItem('token'));    
  let valor = 0;
   
  valor = postListConnectUserEmail(userinfo).then(response =>{
               
              let usuarios = {createdAt, email,id,name,posts}=response;
           
              let obj = usuarios.find(o => o.email === pemail);

              console.log(obj.id);   
              
              //alert("Esto es lo que me devuelve la fucion: "+obj.id);          

              return   obj.id;
             
   })       
       .catch(error =>{
           console.log('Error',error)
          // location.href="./registrarse.html";
          // return 0;
       });

     return valor;
}
*/

 let postListConnect=({token},userId)=>{

      console.log("USER ID: ",userId);
      
     return  fetch(`http://68.183.27.173:8080/users/${userId}`,{
        method:'GET', //or 'PUT'
      //  body: JSON.stringify(data),
        headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${token}`
        }
        
    }).then(
        res =>{
            console.log(res.ok,"ById ",userId)
            if(res.ok){
                return res.json();
            }
            throw Error("Error listando post")
        })
 }

 /*
 let postListConnectUserEmail=({token})=>{
  return  fetch("http://68.183.27.173:8080/users/",{
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

*/

 //get posts by user
 function getpostsbyuser(){

    var usuario = JSON.parse(localStorage.getItem('token'));
    var idloc = location.search.substr(1).split("=")[1];
    //pasarle el email a la funcion
    //var em = getuserid(idloc);
   // var userget = JSON.parse(localStorage.getItem('useridemail'));
    
    postListConnectUser(usuario,idloc).then(response =>{

            let obj=Object.keys(response).map(element=>{

                let  {body,comments,createdAt,id,liked,likes,tags,title,userEmail,userId,userName,views}=response[element];
              
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
                
                let categoria= [tags];
                let mostrarcat=[];
                  //para mostrar las categorias
                  for (i=0;i<categoria.length;i++){
                   // console.log(categoria[i]);
                    mostrarcat+=`<ul class="list-unstyled mb-0"><li><a href="#">`+(categoria[i])+`</a></li></ul>`;   
                  } 
                  
                  /*
                return `<h1 class="htitulo"> ${title}  <a href="../pages/blog.html"> <i class="fa fa-fw fa-pencil"></i> </a></h1>
                        <h4>${tags}</h4>                        
                        <h4>By: 
                           <a href="../pages/blog.html"><i class="fa fa-fw fa-user-o"></i> ${userName}</a> 
                           <a href="../pages/blog.html">(<i class="fa fa-fw fa-envelope">${userEmail})</i></a>                           
                        </h4>                                                                                           
                       
                        Posted on: ${fecha}                       
                        <h5 class="hcoment">
                                <p>
                                Likes: <i class="fa fa-fw fa-thumbs-o-up" id="likes">${likes}</i>    
                                | Views: <i class="fa fa-fw fa-eye" id="vistas">${views}</i>  
                                 </p>
                        </h5>
                        
                        <h5>${body}                           
                        </h5>
                        <h5><p class="liked">Liked: <a href="#"> <i class="fa fa-fw fa-thumbs-up"></i></a>
                        | Comments: <a href="../pages/comentarios.html"><i class="fa fa-fw fa-comments"></i> ${comments} </a></p>
                        </h5>`
                 */

                return `<!-- Page Content -->
                    <div class="row">
            
                    <!-- Post Content Column -->
                    <div class="col-lg-8">
            
                      <!-- Title -->
                      <h1 class="mt-4">${title} <a href="../pages/blog.html"> <i class="fa fa-fw fa-pencil"></i> </a></h1>
            
                      <!-- Author -->
                      <p class="lead">
                      by
                      <a href="../pages/userinfo.html"><i class="fa fa-fw fa-user-o"></i> ${userName} (<i class="fa fa-fw fa-envelope"></i>${userEmail})</a>
                      </p>
                        
                      <hr>
            
                      <!-- Date/Time -->
                      <p>Posted on ${fecha} </p>
                      <!--<i class="fa fa-fw fa-thumbs-o-up">-->
                      <p class="liked" id="liked">Liked: <a href="#"> <i class="fa fa-fw fa-thumbs-up" Onclick="getuserliked(${id},${liked})"></i></a>
                      <!-- Post Content -->
                      <p>${body}</p>
                      <blockquote class="blockquote">
                        <p class="mb-0"><i class="fa fa-fw fa-comments"> <a href="../pages/comentarios.html"> </i>Comments:${comments} </a></p>
                      </blockquote>
            
                      <p>
                      Likes:<a href="#" <i class="fa fa-fw fa-thumbs-o-up" Onclick="getuserliked(${id},${liked})">${likes}</i></a>    
                      | Views: <i class="fa fa-fw fa-eye" id="vistas">${views}</i>  
                       </p>

                      <hr>
            
                      <!-- Comments Form -->
                      <div class="card my-4">
                        <h5 class="card-header">Deja tu comentario</h5>
                        <div class="card-body">
                          <form>
                            <div class="form-group">
                              <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Enviar</button>
                          </form>
                        </div>
                      </div>
            
                      
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
           

            document.getElementById("contenedor").innerHTML+=obj;
        
           console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }


 let postListConnectUser=({token},userId)=>{
    console.log("token ",token, " userId: ",userId);
    
     return  fetch(`http://68.183.27.173:8080/post?userId=${userId}`,{
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

 
 //Funcion para Hacerle Liked
 function getuserliked(id,liked){

  var userinfo = JSON.parse(localStorage.getItem('token'));  
 
  postListConnectUserLiked(userinfo,id,liked).then(response =>{
 
       console.log('Muy Bien');
    
   })       
       .catch(error =>{
           console.log('Error',error)
          // location.href="./registrarse.html";
           
       });
}

 let postListConnectUserLiked=({token},id,liked)=>{
  console.log("token ",token, " PostID: ",id);
  
   return  fetch(`http://68.183.27.173:8080/post/${id}/like`,{
      method:(liked ? 'PUT':'DELETE'), //or 'PUT'
    //  body: JSON.stringify(data),
      headers:{
          'Content-Type':'Application/json',
          'Authorization':`Bearer ${token}`
      }
      
  }).then(
      res =>{
         // if(res.ok){
             // return res.json();
             console.log("Liked");
         // }
          //throw Error("Error listando post")
      })
}
// Hasta Aqui los Liked

 //EQUIVALENETE A DOCUMENT READY
 (function(){   
    getuserinfo();
    getpostsbyuser();
 })();

 