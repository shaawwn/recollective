import React, {useState, useEffect, useContext} from 'react'
import {getAuthUrl} from './utils/auth.js'
import {validateCode} from './utils/utils.js'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'

import useAuth from './hooks/useAuth.js'

const AuthContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
	return useContext(AuthContext)
}
const code = validateCode(window.location.search)

const AUTH_URL = getAuthUrl()

import { UserProvider, ApiProvider} from './context/barrel.js' // removed AuthProvider

function App() {

	const accessToken = useAuth(code)

	return (
		<>
			<AuthContext.Provider value={{accessToken}}>
				<UserProvider>
					<ApiProvider>
						{accessToken ? 
							<Dashboard />
						:<Login auth_url={AUTH_URL} />
						}
					</ApiProvider>
				</UserProvider>
			</AuthContext.Provider>
		</>
	)
}


export default App
