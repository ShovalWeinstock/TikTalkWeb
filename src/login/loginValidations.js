async function findUser(username, password){
    var str = "http://localhost:5142/api/Users/"+username;
    var user;

    try {
        let res = await fetch(str);
         if(res.status == 200){
             user= await res.json();
         }
         else {
             user = null;
         }    
     }
     catch (err) {
         console.error(err);
     }
     if(user != null && user.password == password) {
         return user;
     }
     return null;
}

// if the user exists - return it. otherwise-return null
export async function login(username, password){
    // if the inpuft fields are empty
    if (username == '' || password == '') {
        document.getElementById("loginError").innerHTML = "Please fill all fileds";
        return null;
    }
    // if the user doesn't exist
    var user = await findUser(username, password);
    if (user == null) {
        document.getElementById("loginError").innerHTML = "Username or Password are invalid";
        return null;
    }
    else {
        return user;
    }
}
