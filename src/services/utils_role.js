export default  function  isAdmin(){
    const role = document.cookie;
  
    if (role.toString() == "role=ADMIN") {
       
        return true;
    }

    return false;

}

export function isAdminOrVendedor(){
    const role = document.cookie;
   
    if (role.toString() == "role=ADMIN" ||  role.toString() == "role=VENDEDOR") {
    
        return true;
    }

    return false;

}