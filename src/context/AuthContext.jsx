import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import useAuth from '../hooks/useAuth'


const AuthContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext)
}

export default function AuthProvider({children, code}) {

    const accessToken = useAuth(code)

    return(
        <AuthContext.Provider value={{
            accessToken
        }}>
            {children}
        </AuthContext.Provider>
    )

}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string.isRequired
};