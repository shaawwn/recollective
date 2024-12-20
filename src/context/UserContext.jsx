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

    const {accessToken} = useAuthContext() || {} // ## ON LOAD there is no accessToken here, meaning that the spotify data is not being fetched at the time 
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
        }).catch((err) => {
            console.log(err)
        })
    }


    async function getSpotifyUser() {
        console.log("Fetching spotify user data with acess token", accessToken)
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("error getting spotify user in context", accessToken)
            }
            return response.json()
        })
        .then((data) => {
            console.log("DATA", data)
            return data
        }).catch((err) => {
            console.log("Err", err)
        })
    }

    async function getRecollectiveUser() {
        return fetch(`https://auth-server-bold-sun-934.fly.dev/users/me`, {
            credentials: "include"
        }).then((response) => {
            if(!response.ok) {
                throw new Error
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("Error fetching users from recollective api", err)
        })
    }

    // create a user object, then set the user data with the repsonses from both APIs

    // ah, the problem was that the API depends on this
    async function initUser() {
        // create a user object
        let userObj = {
            spotify: {}, // set spotify return data here
            recollective: {} // set recollective return data here
        }
        // fetch spotify user data
        try {
            // console.log("ACCESS TOKEN", accessToken)
            // const [spotifyResponse, recollectiveResponse] = await Promise.all([
            //     getSpotifyUser(),
            //     getRecollectiveUser()
            // ]);

            const spotifyResponse = await getSpotifyUser()
            const recollectiveResponse = await getRecollectiveUser()

            console.log("API RESPONSES", spotifyResponse, recollectiveResponse)
            if(!spotifyResponse) {
                throw new Error ("error getting spotify user in context")
            }
            if(!recollectiveResponse) {
                throw new Error ("error getting recollective user in context")
            }


            console.log("RECOLLECTIVE RESPONSE", recollectiveResponse)
            // using the spotify response, set the user to spitify attr
 
            userObj['spotify'] = spotifyResponse
            userObj['recollective'] = recollectiveResponse
        } catch (err){
            console.log("ACCESS TOKEN IN ERR", accessToken)
            console.log("err in init user", err)
        }

        // set both to the created user object
        setUser(userObj)
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