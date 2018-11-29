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
    var userId=JSON.parse(localStorage.getItem('id'));       
     
    postListConnect(userinfo,userId).then(response =>{
                 
                let {createdAt, email,id,name,posts}=response;
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');
            
                document.getElementById("inf").innerHTML+=`<h1 class="htitulo">Información del Usuario..</h1>                        
                <h5>ID : ${id}</h5>                        
                <h5>Nombre: <i class="fa fa-fw fa-user-plus"></i>
                   ${name}
                   Posted on: ${fecha} 
                </h5>                                                                                           
                <a href="./blog.html"><i class="fa fa-fw fa-envelope">${email}</i></a>                       
                <h5 class="hcoment">Posts :<i class="fa fa-fw fa-star">${posts}</i></h5>`;
            

                document.getElementById("post").innerHTML+=`<h1 class="htitulo">Detalle de los Posts..</h1>`;
          
        
           console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }


 let postListConnect=({token,id})=>{
     return  fetch("http://68.183.27.173:8080/users/"+id,{
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

 //get posts by user
 function getpostsbyuser(){

    var usuario = JSON.parse(localStorage.getItem('token'));
    var userId=JSON.parse(localStorage.getItem('id'));            
    
    postListConnectUser(usuario,userId).then(response =>{

            let obj=Object.keys(response).map(element=>{

                let {body,comments,createdAt,id,liked,likes,tags,title,userEmail,userId,userName,views}=response[element];
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');

                return `<h1 class="htitulo">Detalle de Posts..</h1>
                        <h4 class="htitle"> Post ID : ${id},  ${title}  <a href="./blog.html"> <i class="fa fa-fw fa-pencil"></i> </a>                          
                        </h4>
                        <h5>${tags}</h5>                        
                        <h5>By: ${userId}
                           <a href="./userinfo.html"><i class="fa fa-fw fa-user-o"></i> ${userName}</a> 
                           Posted on: ${fecha}                            
                        </h5>                                                                                           
                        <a href="./userinfo.html"><i class="fa fa-fw fa-envelope">${userEmail}</i></a>                       
                        <h6 class="hcoment">
                                <p>
                                Likes: <i class="fa fa-fw fa-thumbs-o-up" id="likes">${likes}</i>    
                                | Views: <i class="fa fa-fw fa-eye" id="vistas">${views}</i>  
                                 </p>
                        </h6>
                        
                        <h5>${body}                           
                        </h5>
                        <h6><p class="liked">Liked: <a href="#"> <i class="fa fa-fw fa-thumbs-up"></i></a>
                        | Comments: <a href="./blog.html"><i class="fa fa-fw fa-comments"></i> ${comments} </a></p>
                        </h6>`
                 
            })
           

            document.getElementById("post").innerHTML=obj;
        
           console.log('Sussess',JSON.stringify(response));
         
     })       
         .catch(error =>{
             console.log('Error',error)
            // location.href="./registrarse.html";
             
         });
 }


 let postListConnectUser=({token,id})=>{
     return  fetch("http://68.183.27.173:8080/post?userId="+id,{
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
    getpostsbyuser();
 })();