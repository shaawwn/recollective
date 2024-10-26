// import {useState, useEffect} from 'react'
import {getAuthUrl} from './utils/auth.js'
import {validateCode} from './utils/utils.js'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'

const code = validateCode(window.location.search)

const AUTH_URL = getAuthUrl()

import { UserProvider, AuthProvider, ApiProvider} from './context/barrel.js'

function App() {

	// UPDATES BETWEEN THESE LINES
	// const [user, setUser] = useState()// put user here, then check for user in some funciton.



	// UPDATES BEFORE
	return (
		<>
			{code ?
				<AuthProvider code={code}>
					<UserProvider>
						<ApiProvider>
							<Dashboard />
						</ApiProvider>
					</UserProvider>
				</AuthProvider>

			: <Login auth_url={AUTH_URL}/>
			}
		</>
	)
}

export default App
