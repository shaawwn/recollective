import React, { useState, useEffect, useRef } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import useAuth from './hooks/useAuth'
// import Dashboard from './views/Dashboard'
import Dashboard from '../src/components/views/dashboard/Dashboard'
import Login from './components/Login';
import Navbar from './components/Navbar'
import Landing from './views/Landing'
import Registration from './views/Registration'


// const SERVER="<LINK TO LIVE SERVER>"
const SERVER="http://localhost:3001"
// const AUTH_SERVER="<LINK TO LIVE AUTH SERVER>"
const AUTH_SERVER="http://localhost:3000"

const SPOTIFY_URL="#"

// Context
export const ServerContext = React.createContext()

function App() {
  const [authenticated, setAuthenticated] = useState(false)
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
	useEffect(() => {

		// fetch('http://localhost:3000')
		// .then((response) => response.json())
		// .then((data) => {
		// 	console.log("DATA", data)
		// })
	}, [])

	return (
		
			<div className="App">
			<ServerContext.Provider value={{
				server:SERVER,
				auth_server: AUTH_SERVER

				}}>
				<Routes>
				<Route path="/" element={
					authenticated ? 
					<Dashboard 
						logout={logout}
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
