import {useState, useEffect} from 'react';


const SERVER="http://localhost:3001"
// const AUTH_SERVER="<LINK TO LIVE AUTH SERVER>"
const AUTH_SERVER="http://localhost:3000"

function useAuth() {

    const [appToken, setAppToken] = useState()
    const [refreshAppToken, setRefreshAppToken] = useState()
    const [spotifyToken, setSpotifyToken] = useState('spotify access token')
    const [authenticated, setAuthenticated] = useState(false)

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
            console.log("DATA", data)
            setAppToken(data.appToken)
            setRefreshAppToken(data.refreshAppToken)
        }).catch((err) => {
            console.log("ERR", err)
        })

    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        if(!appToken) {
            getAppToken()
        }
    }, [])

    return [appToken, spotifyToken]
}

export default useAuth