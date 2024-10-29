import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types'
import RecollectiveApi from '../utils/RecollectiveApi'
import SpotifyApi from '../utils/SpotifyApi'
import SpotifyPlayerApi from '../utils/SpotifyPlayerApi'
// import {useAuthContext} from './AuthContext'
import {useAuthContext} from '../App'
import {useUserContext} from './UserContext'

const ApiContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useApiContext() {
    return useContext(ApiContext)
}


export default function ApiProvider({children}) {

    const {accessToken} = useAuthContext() || {}
    const {user} = useUserContext()
    const [spotifyApi, setSpotifyApi] = useState()
    const [spotifyPlayerApi, setSpotifyPlayerApi] = useState()
    const [recollectiveApi, setRecollectiveApi] = useState()
    

    useEffect(() => {

        if(accessToken && user) {
            const spotify = new SpotifyApi(accessToken, user.spotify.id)
            setSpotifyApi(spotify)
            const spotifyPlayer = new SpotifyPlayerApi(accessToken, user.spotify.id)
            setSpotifyPlayerApi(spotifyPlayer)
            const recollective = new RecollectiveApi(user.spotify.id, user.recollective._id)
            setRecollectiveApi(recollective)
        }

    }, [accessToken, user])

    return(
        <>
            <ApiContext.Provider value={{
                spotifyApi, 
                recollectiveApi, spotifyPlayerApi}}>
                {children}
            </ApiContext.Provider>
        </>
    )
}

ApiProvider.propTypes = {
    children: PropTypes.node.isRequired
}