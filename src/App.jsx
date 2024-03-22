import React, { useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
// import useAuth from './hooks/useAuth'
import Dashboard from '../src/components/views/dashboard/Dashboard'
// import Login from './components/Login';
// import Navbar from './components/Navbar'
import Landing from './views/Landing'
import Registration from './views/Registration'


// const SERVER="<LINK TO LIVE SERVER>"
const SERVER="http://localhost:3001"
// const AUTH_SERVER="<LINK TO LIVE AUTH SERVER>"
const AUTH_SERVER="http://localhost:3000"
const DEV_URI = 'http://localhost:5173'
// const PROD_URI = '#'
const SPOTIFY_URL= `https://accounts.spotify.com/authorize?client_id=634efc955c024f24bc4e1f409de20017&response_type=code&redirect_uri=${DEV_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const code = new URLSearchParams(window.location.search).get('code') 
// Context
export const ServerContext = React.createContext()

function App() {
  const [authenticated, setAuthenticated] = useState(false)
//   const [appToken, spotifyAccessToken] = useAuth(code)
//   const [authenticated, appToken, spotifyToken, login, logout] = useAuth()

    function login() {
        // login to app and get appToken
        const username = document.getElementById('username-login').value
        const password = document.getElementById('username-password').value
        fetch(AUTH_SERVER + '/login', {
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
			setAuthenticated(true)
			console.log("LOGIN DATA", data)
			if(data.onBoarding) {
				console.log("User has not set up their profile.", data.onBoarding)
				window.location.href=SPOTIFY_URL
			} else {
				console.log("User has set up their profile", data.onBoarding)
				window.location.href=SPOTIFY_URL
			}

        }).catch((err) => {
        console.log("ERR LOGIN", err, username, password)
        })
    }

	function logout() {
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

	function verifySession() {

		// verifies if there is an active session and redirects to user's dashboard if there is one
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
			// console.log("SESSION DATA", data)
			// window.location.href=SPOTIFY_URL
		}).catch((err) => {
			console.log("ERROR ", err)
		})	
	}

	// useEffect(() => {
	// 	if(authenticated !== true) {
	// 		verifySession()
	// 	}
	// }, [])

	useEffect(() => {
		if(code === null) {
			// console.log("Veryfing session with no code")
			verifySession()
		} else {
			// code exists, but still need to verify session
			fetch(`http://localhost:3000/verifysession`, {
				credentials: "include"
			}).then((response) => {
				if(!response.ok) {
					throw new Error ("error verifyiny session with code")
				}
				return response.json()
			}).then(() => {
				// session verified, authorized spotify
				setAuthenticated(true)
			}).catch((err) => {
				console.log("ERROR:", err)
			})
		}
	}, [])


	return (
		
			<div className="App">
			<ServerContext.Provider value={{
				server:SERVER,
				auth_server: AUTH_SERVER,
				spotify_url: SPOTIFY_URL
				}}>
				<Routes>
				<Route path="/" element={
					authenticated ? // somewhere between authenticated and dashboard needs to be Spotify Authorization
					// return code ? <Dashboard code={code} />: <Login authUrl={AUTH_URL}/>
					<Dashboard 
						logout={logout}
						code={code}
						/> 
					:<Landing 
						login={login}
						/>
					}/>
				<Route path="/users" />
				<Route path="/register" element={<Registration 
					setAuthenticated={setAuthenticated}
				/>} />
				</Routes>
			</ServerContext.Provider>
			</div>

	)
}

export default App
