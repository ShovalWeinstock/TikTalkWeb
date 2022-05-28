/*
password validation, accordind to the folllowing:
 password must contain:
    - At least 8 characters
    - At least one lowercase
    - At least one uppercase
    - At least one number
*/
const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (regex.test(password)) {
        return true;
    }
    return false;
}


// check if username aleady exists
export async function usernameExists(username) {
    var str = "http://localhost:5051/api/User/" + username;

    try {
        let res = await fetch(str);
         if(res.status === 200){
             return true;
         }
     }
     catch (err) {
         console.error(err);
     }
     return false;
}


async function addUser(newUser){
    try {
        var res = await fetch("http://localhost:5051/api/User", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (res >= 400) {
            console.log("error connecting to server")
        }
     }
     catch (err) {
         console.error(err);
     }
}

export async function register(username, nickName, password, confirmation, profilePic){
    var validInfo = true;
    // username validation:
    if (username === '') {
        document.getElementById("usernameErrors").innerHTML = "Username required";
        validInfo = false;
    }
    var exists = await usernameExists(username);
    if (exists === true) {
        document.getElementById("usernameErrors").innerHTML = "Username already exists";
        validInfo = false;
    }
    // password validation:
    if (password === '') {
        document.getElementById("passwordErrors").innerHTML = "Password required";
        validInfo = false;
    }
    else if (!isValidPassword(password)) {
        document.getElementById("passwordErrors").innerHTML = "Invalid password";
        validInfo = false;
    }
    // password confirmation validation:
    if (confirmation === '') {
        document.getElementById("confirmationErrors").innerHTML = "Password confirmation required";
        validInfo = false;
    }
    else if (password !== confirmation) {
        document.getElementById("confirmationErrors").innerHTML = "Passwords don't match";
        validInfo = false;
    }
    // the info is valid. create the user:
    if (validInfo) {
        if (nickName === "") {
            nickName = username;
        }
        const newUser = { id: username, name: nickName, password: password, profilePic: profilePic, contacts: [] };
        await addUser(newUser);
        return newUser
    }
    return null
}
