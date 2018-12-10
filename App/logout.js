function logout(){
    localStorage.clear();
    redirectLogin();

}
function redirectLogin(){
    var token = JSON.parse(localStorage.getItem('token'));
    console.log({token}); 
    if (token==null){
      location.href="../pages/login.html";
      return   
    }
   
   }
  