import React, { useState, useEffect, useRef} from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import Dashboard from '../src/components/views/dashboard/Dashboard'
import Landing from './views/Landing'
import Registration from './views/Registration'
import useAuth from '../src/hooks/_useAuth'

import {login} from '../src/utils/authentication'

const SERVER="http://localhost:3001"
const AUTH_SERVER="http://localhost:3000"
// const AUTH_SERVER = "http://localhost:3000"

const DEV_URI = 'http://localhost:5173'
// const PROD_URI = import.meta.env.VITE_PROD_URI
// const SPOTIFY_URL=import.meta.env.VITE_SPOTIFY_URL
const SPOTIFY_URL=`https://accounts.spotify.com/authorize?client_id=634efc955c024f24bc4e1f409de20017&response_type=code&redirect_uri=${DEV_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const code = new URLSearchParams(window.location.search).get('code') 
// Context
export const ServerContext = React.createContext()
export const AuthContext = React.createContext()

function App() {
	const [authenticated, setAuthenticated] = useState(false)
	const [appToken, spotifyAccessToken] = useAuth(code)
	const renderCount = useRef(0)

	const handleLoginSuccess = (data) => {
		if(data.onBoarding) {
			console.log("User has not created profile")
			window.location.href=SPOTIFY_URL
		} else {
			console.log("User has set up their profile")
			window.location.href=SPOTIFY_URL
		}
	}

	const handleLoginFailure = (data) => {
		console.log("Error logging in.", data)
	}

	function handleLogin() {
		const username = document.getElementById('username-login').value
        const password = document.getElementById('username-password').value
		login(username, password, handleLoginSuccess, handleLoginFailure)
	}

	function logout() {
		// console.log("AUTH SERVER", AUTH_SERVER)
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
		}).catch((err) => {
			console.log("ERROR ", err)
		})	
	}

	useEffect(() => {
		// verify a session on page load
		verifySession()
	}, [])

	// RENDERING TEST
	useEffect(() => {
		renderCount.current = renderCount.current + 1;
		console.log(`Rendered ${renderCount.current} times`);
	}, []); 

	return (
		
			<div className="App">
				<AuthContext.Provider value={{
					appToken:appToken,
					spotifyAccessToken:spotifyAccessToken,
				}}>
					<ServerContext.Provider value={{
						server:SERVER,
						auth_server: AUTH_SERVER,
						spotify_url: SPOTIFY_URL
						}}>
						<Routes>
						<Route path="/" element={
							authenticated ? 
							<Dashboard 
								logout={logout}
								code={code}
								/> 
							:<Landing 
								login={handleLogin}
								/>
							}/>
						<Route path="/users" />
						<Route path="/register" element={<Registration 
							setAuthenticated={setAuthenticated}
						/>} />
						</Routes>
					</ServerContext.Provider>
				</AuthContext.Provider>
			</div>

	)
}

export default App
