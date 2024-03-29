import React, { useState, useEffect, useRef} from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import Dashboard from '../src/components/views/dashboard/Dashboard'
import Landing from './views/Landing'
import Registration from './views/Registration'
import Profile from './views/profiles/Profile'
import NoUserProfile from './views/profiles/404'
import useAuth from '../src/hooks/_useAuth'

import {login, verifySession} from '../src/utils/authentication'

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
export const ProfileContext = React.createContext()

function App() {
	const [authenticated, setAuthenticated] = useState(false)
	const [appToken, spotifyAccessToken] = useAuth(code)
	const [profile, setProfile] = useState()

	const renderCount = useRef(0)

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

	function handleLogin() {
		const username = document.getElementById('username-login').value
        const password = document.getElementById('username-password').value
		login(username, password, handleLoginSuccess, handleLoginFailure)
	}

	function handleVerifySessionSuccess() {
		setAuthenticated(true)
	}

	function handleVerifySessionFailure() {
		// not verified, so do nothing?
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

	function getUserProfile() {
        fetch(SERVER + '/profiles/me', {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("No user data")
            }
            return response.json()
        }).then((data) => {
            console.log("User data", data)
            setProfile(data.user)
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }


	useEffect(() => {
		// verify a session on page load
		verifySession(handleVerifySessionSuccess)
	}, [])

	useEffect(() => {
		if(appToken) {
			getUserProfile()
		}
	}, [appToken])

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
					profile: profile
				}}>
					<ServerContext.Provider value={{
						server:SERVER,
						auth_server: AUTH_SERVER,
						spotify_url: SPOTIFY_URL
						}}>
						<Routes>
							<Route path="/" element={
								authenticated && profile ? // added profile conditional
								<Dashboard 
									logout={logout}
									code={code}
									/> 
								:<Landing 
									login={handleLogin}
									/>
								}/>
								{/* As is, profile is allowed to render even w/o a profile set */}
							<Route path={'/404'} element={<NoUserProfile />}/>
							<Route path={'/:profileID'} element={<Profile profile={profile}/>}/> 
							<Route path="/register" element={<Registration 
								setAuthenticated={setAuthenticated}
							/>} />
							<Route path="/404" />
						</Routes>
					</ServerContext.Provider>
				</AuthContext.Provider>
			</div>

	)
}

export default App
