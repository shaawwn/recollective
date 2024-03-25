

function getCurrentUserProfile(accessToken) {
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log("USER PROFILE", data)
    })
}



export {
    getCurrentUserProfile
}