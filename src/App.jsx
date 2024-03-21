import React, { useState, useEffect, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import useAuth from './hooks/useAuth'
import Dashboard from '../src/components/views/dashboard/Dashboard'
import Login from './components/Login';
import Navbar from './components/Navbar'
import Landing from './views/Landing'
import Registration from './views/Registration'


// const SERVER="<LINK TO LIVE SERVER>"
const SERVER="http://localhost:3001"
// const AUTH_SERVER="<LINK TO LIVE AUTH SERVER>"
const AUTH_SERVER="http://localhost:3000"
const DEV_URI = 'http://localhost:5173'
const PROD_URI = '#'
const SPOTIFY_URL= `https://accounts.spotify.com/authorize?client_id=634efc955c024f24bc4e1f409de20017&response_type=code&redirect_uri=${DEV_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const code = new URLSearchParams(window.location.search).get('code') 
// Context
export const ServerContext = React.createContext()

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [spotifyAuthorized, setSpotifyAuthorized] = useState(false)
//   const [appToken, spotifyAccessToken] = useAuth(code)
//   const [authenticated, appToken, spotifyToken, login, logout] = useAuth()

	function checkAuth() {
		fetch(AUTH_SERVER + '/verifysession', {
			credentials: "include"
		}).then((response) => {
			if(!response.ok) {
				throw new Error("No session")
			}
			setAuthenticated(true)
		}).catch((err) => {
			console.log("Error", err)
		})
	}

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
		}).then((data) => {
			setAuthenticated(true)
			// console.log("Verified", data, code)
			window.location.href=SPOTIFY_URL
			// if it gets to this point, verified, it then needs to verify spotify somehow

			// however, it needs to only do it once, so if authenticated false => true, then and only then authorized spotify, I don't want it to run everytime something changes in the app

			// on previous apps, this would be the Login page for Spotify, however, since there is an added layer for this app, that is no longer possible, but I still need to check/store the spotify accessTokens somehow
		}).catch((err) => {
			console.log("ERROR ", err)
		})	
	}

	function verifySpotify() {

	}

	// If code, then the app has been redirected from spotify with successful authorization, the existence of the code itself is a sign of having been redirected (however, code=somenonsense) will also trigger this. So authorization should really only exist if a valid spotify accesstoken is granted.

	useEffect(() => {
		if(code === null) {
			console.log("Veryfing session with no code")
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
			}).then((data) => {
				// session verified, authorized spotify
				console.log("Session is verified with spotify access grant code")
				setAuthenticated(true)
			}).catch((err) => {
				console.log("ERROR:", err)
			})
		}
		// if(authenticated !== true) {
		// 	verifySession()
		// }
	})

	// useEffect(() => {

	// 	if(code) {
	// 		// it has been redirected from Spotify URL, however, it still needs to authorize, because can't assume that session is verified
			
	// 		// verify session without changing state
	// 		fetch(`http://localhost:3000/verifysession`, {
	// 			credentials: "include"
	// 		}).then((response) => {
	// 			if(!response.ok) {
	// 				throw new Error("Cannot verify session")
	// 			}
	// 			return response.json()
	// 		}).then((data) => {
	// 			// verified and authorizing spotify
	// 			console.log("Authorizing spotify....")
				

	// 			// session with APP is verified, continue to dashboard with code, if code is valid, no problem, if not, then spotify is not authorized and shoult then be reauthorized

	// 			// howver, it should still only get to this point if the session has been authorized

	// 		}).catch((err) => {
	// 			console.log("Error:", err)
	// 		})

	// 	} 
	// }, [])

	// useEffect(() => {
	// 	fetch('http://localhost:3000/sessions/spotifytoken', {
	// 		method: "POST",
	// 		credentials: "include"
	// 	})
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		console.log("sessiond ata", data)
	// 	}).catch((err) => {
	// 		console.log("Erro getting session route data")
	// 	})
	// }, [])

	// useEffect(() => {
	// 	// when authenticated, everytime the app reloads it needs to verify spotify access

	// }, [])

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
