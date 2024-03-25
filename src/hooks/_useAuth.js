import {useState, useEffect, useRef} from 'react'



function useAuth(code) {

    const strictMode = useRef(false)
    const [appToken, setAppToken] = useState()
    const [refreshAppToken, setRefreshAppToken] = useState()
    const [spotifyAccessToken, setSpotifyAccessToken] = useState()
    const [spotifyRefreshToken, setSpotifyRefreshToken] = useState()
    const [spotifyTokenExpiresIn, setSpotifyTokenExpiresIn] = useState()
    const [authenticated, setAuthenticated] = useState(false)


    function handleStrictMode() {
        console.log("Handling strict mode.")
        setSpotifyAccessToken((prevSpotifyAccessToken) => prevSpotifyAccessToken)
        setSpotifyRefreshToken((prevSpotifyRefreshToken) => prevSpotifyRefreshToken)
        setSpotifyTokenExpiresIn((prevSpotifyTokenExpiresIn) => prevSpotifyTokenExpiresIn)
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
        console.log("ADDING TOKEN TO SESSION")
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
    
    function refreshSpotifyToken() {
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
            // console.log("REFRESH DATA", data)
            setSpotifyAccessToken(data.accessToken)
            setSpotifyTokenExpiresIn(data.expiresIn)
        }).catch((err) => {
            console.log("Error refreshing token", err)
        })
    }

    useEffect(() => {
        if(!appToken) {
            console.log("Refreshing app token")
            getAppToken()
        }
    }, [])

    useEffect(() => {
        if(!spotifyRefreshToken || !spotifyTokenExpiresIn) return
        const interval = setInterval(() => {
            refreshSpotifyToken()
        }, (spotifyTokenExpiresIn - 60) * 1000) // set to expiresIn
    }, [spotifyRefreshToken, spotifyTokenExpiresIn])

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
                    setSpotifyAccessToken(data.accessToken)
                    setSpotifyRefreshToken(data.refreshToken)
                    setSpotifyTokenExpiresIn(data.expiresIn)
                    strictMode.current = true
                    addSpotifyAccessToSession(data.accessToken, data.refreshToken, data.expiresIn)
                    window.history.pushState({}, null, '/')
                }
            }).catch((err) => {
                console.log("Error authenticating spotify", err)
            })
        }
    }, [code])


    return [appToken, spotifyAccessToken]

}

export default useAuth