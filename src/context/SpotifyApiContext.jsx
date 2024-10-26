import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types'
import SpotifyApi from '../utils/SpotifyApi'
import {useAuthContext} from './AuthContext'

const SpotifyApiContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useSpotifyApiContext() {
    return useContext(SpotifyApiContext)
}

export default function SpotifyApiProvider({children}) {

    const accessToken = useAuthContext().accessToken
    const [spotifyApi, setSpotifyApi] = useState()

    useEffect(() => {
        if(accessToken) {
            const api = new SpotifyApi(accessToken)
            setSpotifyApi(api)
        }
    }, [accessToken])

    return(
        <>
            <SpotifyApiContext.Provider value={{spotifyApi}}>
                {children}
            </SpotifyApiContext.Provider>
        </>
    )
}

SpotifyApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
};