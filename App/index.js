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
         
    
     postListConnect(usuario).then(response =>{
         //una forma
        //  response.forEach(element => {
        //      let {title, userEmail}=element;
        //     document.getElementById("post").innerHTML+=`<h4>${title}</h4>
        //                                                 <h5>${userEmail}</h5>`;
        //otra forma REACT

            let obj=Object.keys(response).map(element=>{

                let {title, userEmail,userName,id,tags,post,comments,createdAt,like,body}=response[element];
                let fecha = new Date(createdAt).toLocaleDateString('es-RD');

                return `<h1 class="htitulo">Lista de Posts..</h1>
                        <h4 class="htitle"> ${title}  <a href="./blog.html"> <i class="fa fa-fw fa-pencil"></i> </a>                          
                        </h4>
                        <h5>${tags}</h5>                        
                        <h5>By: 
                           <a href="./userinfo.html"><i class="fa fa-fw fa-user-o"></i>${userName}</a> 
                           Posted on: ${fecha} 
                        </h5>                                                                                           
                        <a href="./userinfo.html"><i class="fa fa-fw fa-envelope">${userEmail}</i></a>                       
                        <h4 class="hcoment"><i class="fa fa-fw fa-star">${comments}</i></h4>
                        <h5>${body}</h5>
                        `
                 
            })
           

            document.getElementById("post").innerHTML=obj;
        
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
 //EQUIVALENETE A DOCUMENT READY
 (function(){
    getposts();
 })();