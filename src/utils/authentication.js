const SERVER="http://localhost:3001"
const AUTH_SERVER="http://localhost:3000"

const DEV_URI = 'http://localhost:5173'
const SPOTIFY_URL=`https://accounts.spotify.com/authorize?client_id=634efc955c024f24bc4e1f409de20017&response_type=code&redirect_uri=${DEV_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

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

const handleLoginSuccess = (data) => {
    if(data.onBoarding) {
        console.log("User has not created profile")
        window.location.href=SPOTIFY_URL
    } else {
        console.log("User has set up their profile")
        window.location.href=SPOTIFY_URL
    }
    console.log("User Profile set: ", data)
}

const handleLoginFailure = (data) => {
    console.log("Error logging in.", data)
}

function logout(setAuthenticated) {
    fetch(AUTH_SERVER + '/logout', {
        method: "POST",
        credentials: "include"
    }).then((response) => {
        if(!response.ok) {
            throw new Error ("There was an error logging out")
        }
        setAuthenticated(false)
    }).catch((err) => {
        console.log("ERROR:", err)
    })
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

function verifySession(setAuthenticated) {
    fetch('http://localhost:3000/verifysession', {
        credentials: "include"
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error ("Cannot verify session")
        }
        return response.json()
    }).then(() => {

        setAuthenticated(true)
        // handleVerifySessionSuccess()
    }).catch((err) => {
        console.log("ERROR ", err)
    })	
}


export {
    login,
    logout,
    verifySession,
    verifySpotifyAccess,
    handleLoginSuccess,
    handleLoginFailure
}