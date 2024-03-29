
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

function verifySpotifyAccess(spotifyRefreshToken, handleSpotifyRefresh) {
    if(spotifyRefreshToken) {
        fetch(`http://localhost:3000/spotify/refreshtoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                refreshToken: spotifyRefreshToken
            })
        }).then((response) => response.json())
        .then((data) => {
            handleSpotifyRefresh(data)
        }).catch((err) => {
            console.log("Error refreshing token", err)
        })
    } else {
        console.log("Need to perform spotify auth flow", spotifyRefreshToken)
    }

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
    verifySession,
    verifySpotifyAccess
}