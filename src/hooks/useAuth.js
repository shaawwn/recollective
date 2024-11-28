import { useState, useEffect, useRef } from 'react'

function useAuth(code) {
//

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    const codeRef = useRef() 
    
    useEffect(() => {
        // Spotify uses a one-time use code, which causes problems with React Strict Mode, this ensures the code is only used once

        // ERR message
        // @react-refresh:267 Warning: useEffect must not return anything besides a function, which is used for clean-up. You returned: BQAeJM-c6XKm1kn2ZanqSmJ3JVNe80UjhkMGu6bekQ8dJ0tGwzXpstHSQA_OdxDIv6WLkQICUjL44Ni0Wd8ZUhqUNueJa_9Q2sskLqynXN-1msMPvcBRmWsEUmaPGoKlfRz7DS8bg_jl6tpTlCiq1E7I1m3fvtjWxrYwED3q3JbuVnnk3K_3n9Q9_3dfg_MMRe22BO1ex1gwxUsUXBTv4ugikUkk6f0aEDzyfoae70MyYGVhQo7R9dpmEX-t68exoB1ujQ9WwJwAGUX0YSXXdFfsGBHl09U4NF2NIgdXZmgPryu_uaKgtAiO Error Component Stack
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
            window.history.pushState({}, null, '/')
        }).catch((err) => {
            console.log("err", err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return

        const interval = setInterval(() => {
            // fetch('http://localhost:3001/refresh', {
            fetch('https://auth-server-bold-sun-934.fly.dev:3001/refresh', {
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