import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'


// import SpotifyApi from '../utils/SpotifyApi'
// import RecollectiveApi from '../utils/RecollectiveApi'
// import {useAuthContext} from './AuthContext'
import {useAuthContext} from '../App'
const UserContext = React.createContext()


// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    return useContext(UserContext)
}


export default function UserProvider({children}) {

    // const accessToken = useAuthContext().accessToken 
    const {accessToken} = useAuthContext() || {}
    const [spotifyApi, setSpotifyApi] = useState()
    const [recollectiveApi, setRecollectiveApi] = useState()
    const [user, setUser] = useState()
    
    // Manage persistent user related state here? 
    const [playlists, setPlaylists] = useState([])
    const [albums, setAlbums] = useState([])
    const [bins, setBins] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [topArtists, setTopArtists] = useState([])

    
    // Spotify API does not support a follow users feature, so this will have to be implemented app side
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    async function getUserTopItems(type) {
        const {items} = await spotifyApi.getUserTopItems(type)
        if(type === 'tracks') {
            setTopTracks(items)
        } else if(type === 'artists') {
            setTopArtists(items)
        }
    }
    
    function _getAppUserAndInitApi(data) {

        fetch(`http://localhost:3001/users/me`, {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Failed to fetch Recollective user data")
            }
            return response.json()
        }).then((appData) => {

            setUser({
                spotify: data,
                recollective: appData
            })

            // const spotifyApi = new SpotifyApi(accessToken)
            // const recollectiveApi = new RecollectiveApi(data.id, appData._id)

            // can set state with given data
            // setSpotifyApi(spotifyApi)
            // setRecollectiveApi(recollectiveApi)
            // setBins(appData.bins)
            setFollowers(appData.followers)
            setFollowing(appData.following)

            return spotifyApi
        // }).then((spotifyApi) => {
        //     filter out items.owner.id which doesn't match spotifyID (id and display_name are not the same)
            // spotifyApi.getCurrentUserPlaylists().then((playlists) => {
            //     const userPlaylists = playlists.items.filter(playlist => playlist.owner.id === data.id)
            //     setPlaylists(userPlaylists)
            //     // setPlaylists(playlists.items) // get ALL playlists user has saved

            //     return spotifyApi.getUsersSavedAlbums()
            // }).then((albums) => {
            //     // remove added_at value from spotify return
            //     const formattedAlbums = albums.items.map(album => album.album)
            //     setAlbums(formattedAlbums)
            // })
        }).catch((err) => {
            console.log(err)
        })
    }




    function initUser() {
        // gets and sets spotify user data
        fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error('Failed to fetch user data')
            }
            return response.json()
        })
        .then((data) => {
            _getAppUserAndInitApi(data)
        }).catch((err) => {
            console.log("Error fetching user data", err)
        })
    }

    useEffect(() => {
        // handle startup
        if(accessToken && !user) {
            initUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, user])

    return(
        <>
            <UserContext.Provider value={{
                user,
                playlists,
                albums,
                bins,
                following,
                followers
                }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};