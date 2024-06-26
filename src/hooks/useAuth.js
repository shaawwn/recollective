import {useState, useEffect, useRef} from 'react';


const SERVER="http://localhost:3001"
// const AUTH_SERVER="<LINK TO LIVE AUTH SERVER>"
const AUTH_SERVER="http://localhost:3000"

function useAuth(code) {
    const strictMode = useRef(false)
    const [appToken, setAppToken] = useState()
    const [refreshAppToken, setRefreshAppToken] = useState()
    const [spotifyAccessToken, setSpotifyAccessToken] = useState()
    const [spotifyRefreshToken, setSpotifyRefreshToken] = useState()
    const [spotifyTokenExpiresIn, setSpotifyTokenExpiresIn] = useState()
    const [authenticated, setAuthenticated] = useState(false)

    function handleStrictMode() {
        // development only to handle StrictMode re-renders and authorization
        // React will send duplicate requests to API server with Strict Mode on, using a one-time code for authorization, this will cause an error that can rewrite the access token to null since spotify will send an error response instead of token. This ensures that the access token is not rewritten.
        // setAccessToken((prevAccessToken) => prevAccessToken)
        // setRefreshToken((prevRefreshToken) => prevRefreshToken)
        // setExpiresIn((prevExpiresIn) => prevExpiresIn)
        console.log("Handling strict mode.")
        setSpotifyAccessToken((prevSpotifyAccessToken) => prevSpotifyAccessToken)
        setSpotifyRefreshToken((prevSpotifyRefreshToken) => prevSpotifyRefreshToken)
        setSpotifyTokenExpiresIn((prevSpotifyTokenExpiresIn) => prevSpotifyTokenExpiresIn)
    }

    function checkToken() {
        const token = localStorage.getItem('token');
        if(token) {
            fetch('http://localhost:3000/verifytoken', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                if(!response.ok) {
                    throw new Error('No valid token.')
                }
                setAppToken(token)
            }).catch((err) => {
                console.log("Error validating token", err)
            })
        }
    }

    function getAppToken() {
        // assuming user is authenticated
        fetch('http://localhost:3000/apptoken', {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error("Cannot get app token")
            }
            return response.json()
        }).then((data) => {
            // console.log("DATA", data)
            setAppToken(data.appToken)
            setRefreshAppToken(data.refreshAppToken)
        }).catch((err) => {
            console.log("ERR getting app token", err)
        })

    }

    function addSpotifyAccessToSession(accessToken, refreshToken, expiresIn) {
        fetch(`http://localhost:3000/sessions/spotifytoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: expiresIn
            }),
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Err adding spotify accessToken to user session")
            }
            return response.json()
        }).then((data) => {
            console.log("Token added to session object", data)
        }).catch((err) => {
            console.log("ERROR", err)
        })
    }
    
    useEffect(() => {
        if(!appToken) {
            getAppToken()
        }
    }, [])

    useEffect(() => {
        // Fetch auth server spotify/login route with code
        if(!code) {
            // check session for code
            fetch(`http://localhost:3000/sessions/spotifytoken`, {
                credentials: "include"
            }).then((response) => {
                if(!response.ok) {
                    throw new Error("No spotify token in session")
                }
                return response.json()
            }).then((data) => {
                // set accesstokens
                setSpotifyAccessToken(data.accessToken)
                setSpotifyRefreshToken(data.refreshToken)
                setSpotifyTokenExpiresIn(data.expiresIn)
            })
        } else {
            fetch(`http://localhost:3000/spotify/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    code: code
                })
            }).then((response) => response.json())
            .then((data) => {
                if(strictMode.current === true) {
                    handleStrictMode()
                } else {
                    // console.log("SPOTIFY FETCH", data)
                    setSpotifyAccessToken(data.accessToken)
                    setSpotifyRefreshToken(data.refreshToken)
                    setSpotifyTokenExpiresIn(data.expiresIn)
                    strictMode.current = true
                    addSpotifyAccessToSession(data.accessToken, data.refreshToken, data.expiresIn)
                    window.history.pushState({}, null, '/')
    
                    // I also want to add the accessToken to the app session object
                }
            }).catch((err) => {
                console.log("Error authenticating spotify", err)
            })
        }
    }, [code])

    // console.log("SPOTIFY TOKEN", spotifyAccessToken)
    return [appToken, spotifyAccessToken]
}

export default useAuth