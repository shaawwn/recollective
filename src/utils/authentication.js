
function login(username, password, handleLoginSuccess, handleLoginFailure) {
    // login to app and get appToken
    console.log("Logging in from dedicated file")
    fetch("http://localhost:3000" + '/login', {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
    }).then((response) => {
    if(!response.ok) {
        throw new Error ("Error logging in.")
    }
    return response.json()
    }).then((data) => {
        handleLoginSuccess(data)
    }).catch((err) => {
        handleLoginFailure(err)
    })
}

function logout() {
    // TODO
}

function verifySession(handleVerifySessionSuccess) {
    fetch('http://localhost:3000/verifysession', {
        credentials: "include"
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error ("Cannot verify session")
        }
        return response.json()
    }).then(() => {
        handleVerifySessionSuccess()
    }).catch((err) => {
        console.log("ERROR ", err)
    })	
}


export {
    login,
    logout,
    verifySession
}