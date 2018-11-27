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

                let {title, userEmail,userName,Id,post,comments,createdAt,like,body}=response[element];
                return `
                        <h3>${title}</h3>
                        <h4>${userName}</h4>
                        <h5>${userEmail}</h5>
                        <h3>${comments}</h3>
                        <h3>${body}</h3>
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