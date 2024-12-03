import { useState, useEffect, useRef } from 'react'

function useAuth(code) {
//

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    const codeRef = useRef() 
    
    useEffect(() => {
        // Spotify uses a one-time use code, which causes problems with React Strict Mode, this ensures the code is only used once
        if(!code) {
            return
        }
        if(codeRef.current) { 
            return accessToken
        } else {
            codeRef.current = code
        }
     
        fetch(`https://auth-server-bold-sun-934.fly.dev/login`, {
        // fetch('http://localhost:3001/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({code: code})
        }).then((response) => {
            if(!response.ok) {
                throw new Error("error fetching spotify access tokens")
            }
            return response.json()
        }).then((data) => {
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            setExpiresIn(data.expiresIn)
            window.history.pushState({}, null, '/recollective/')
        }).catch((err) => {
            console.log("err", err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return

        const interval = setInterval(() => {
            // fetch('http://localhost:3001/refresh', {
            fetch('https://auth-server-bold-sun-934.fly.dev/refresh', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            }).then((response) => {
                if(!response.ok) {
                    throw new Error("error refreshing token")
                }
                return response.json()
            }).then((data) => {
                setAccessToken(data.accessToken)
                setExpiresIn(data.expiresIn)
            }).catch((err) => {
                console.log("err: ", err)
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth