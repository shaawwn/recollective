import React, { useState, useEffect, useRef} from 'react'
import {Routes, Route} from 'react-router-dom'
// import './style.css'
import './styles/style.css'
import './styles/components.css'
import './styles/utility.css'
import Dashboard from '../src/components/views/dashboard/Dashboard'
import Landing from './views/Landing'
import Registration from './views/Registration'
import Profile from './views/profiles/Profile'
import NoUserProfile from './views/profiles/404'
import useAuth from '../src/hooks/_useAuth'
import useSearch from '../src/hooks/useSearch'
import usePlayer from '../src/hooks/usePlayer'
import useProfile from '../src/hooks/useProfile'

// import NavigationPanel from './components/panels/navigationpanel/NavigationPanel'
import {login, logout, verifySession, handleLoginSuccess, handleLoginFailure} from '../src/utils/authentication'
import {getCurrentUserProfile} from '../src/utils/spotifyGetters'

const SERVER="http://localhost:3001"
const AUTH_SERVER="http://localhost:3000"

const DEV_URI = 'http://localhost:5173'
const SPOTIFY_URL=`https://accounts.spotify.com/authorize?client_id=634efc955c024f24bc4e1f409de20017&response_type=code&redirect_uri=${DEV_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public%20playlist-read-private`

const code = new URLSearchParams(window.location.search).get('code') 
// Context
export const ServerContext = React.createContext()
export const AuthContext = React.createContext()
export const ProfileContext = React.createContext()
export const SearchContext = React.createContext()
export const PlayerContext = React.createContext()

// import {AuthProvider} from '../src/context/AuthProvider'

function App() {
	const [authenticated, setAuthenticated] = useState(false)
	const [appToken, spotifyAccessToken] = useAuth(code)
	const [search, setTokens] = useSearch()
	// const [profile, setProfile] = useState()
	const profile = useProfile(appToken, SERVER)
	const [spotifyProfile, setSpotifyProfile] = useState()
	const [currentlyPlaying, currentPlaylist] = usePlayer(appToken, spotifyAccessToken)

	const renderCount = useRef(0)

	const handleLogin = () => {
		const username = document.getElementById('username-login').value
		const password = document.getElementById('username-password').value
		login(username, password, handleLoginSuccess, handleLoginFailure)
	}

	const handleLogout = () => {
		logout(setAuthenticated)
	}

	const handleVerifySession = () => {
		verifySession(setAuthenticated)
	}

	useEffect(() => {
		// verify a session on page load
		handleVerifySession()
	}, [])

	useEffect(() => {
		if(appToken && spotifyAccessToken) {
			setTokens({
				appToken: appToken,
				spotifyAccessToken: spotifyAccessToken
			})
			getCurrentUserProfile(spotifyAccessToken, setSpotifyProfile)
		} 
	}, [appToken, spotifyAccessToken])

	useEffect(() => {
		renderCount.current = renderCount.current + 1;
		console.log(`Rendered ${renderCount.current} times`); // uncomment for render count
	}, []); 

	return (
		
			<div className="App">

				<AuthContext.Provider value={{
					appToken:appToken,
					spotifyAccessToken:spotifyAccessToken,
					profile: profile,
					spotifyProfile: spotifyProfile
				}}>
					<ServerContext.Provider value={{
						server:SERVER,
						auth_server: AUTH_SERVER,
						spotify_url: SPOTIFY_URL
						}}>
						<PlayerContext.Provider value={{
							currentlyPlaying:currentlyPlaying,
							currentPlaylist:currentPlaylist
						}}>
						<Routes>
							<Route path="/" element={
								authenticated && profile && spotifyProfile ? // added profile conditional
								<Dashboard 
									logout={handleLogout}
									code={code}
									search={search}
									/> 
								:<Landing 
									login={handleLogin}
									/>
								}/>
							<Route path={'/404'} element={<NoUserProfile />}/>
							<Route path={'/:profileID'} element={<Profile profile={profile}/>}/> 
							<Route path="/register" element={<Registration 
								setAuthenticated={setAuthenticated}
							/>} />
							<Route path="/404" />
						</Routes>
						</PlayerContext.Provider>
					</ServerContext.Provider>
				</AuthContext.Provider>
			</div>

	)
}

export default App
