import {useState, useEffect, useRef} from 'react'
// import {useAuthContext, useApiContext} from '../context/barrel'
import {useApiContext} from '../context/ApiContext'
// import {useAuthContext} from '../context/AuthContext'
import {useUserContext} from '../context/UserContext'

import {useAuthContext} from '../App'

export default function useBinsPlaylistsAlbums() {
    const {accessToken} = useAuthContext() || {}
    const {user} = useUserContext()
    const {spotifyApi, recollectiveApi} = useApiContext() || {}
    const [bins, setBins] = useState()
    const [playlists, setPlaylists] = useState()
    const [albums, setAlbums] = useState()

    // next urls for paginated results
    const nextPlaylists = useRef()
    const nextAlbums = useRef()
    const nextBins = useRef() // currently no "next" url for bins

    async function getBins() {
        try {
            const response = await recollectiveApi.getUserBins()
            if(!response) {
                throw new Error ("Error getting bins from api")
            }
            setBins(response.bins)
        } catch (err) {
            console.log("Err: ", err)
        }
    }

    async function getPlaylists() {
        try {
            const response = await spotifyApi.getCurrentUserPlaylists('', '') 
            if(!response) {
                throw new Error ("error getting playlists from spotify")
            }
            // format playlists
            const userPlaylists = response.items.filter(playlist => playlist?.owner.id === user.recollective.spotifyID) 

            console.log("SETTING PLAYLISTS TO USER PLAYLISTS", userPlaylists, response, user, accessToken) // ### User is empty at this point
            setPlaylists(userPlaylists)
        } catch (err) {
            console.log("err: ", err)
        }
    }

    async function getAlbums() {
        try {
            const response = await spotifyApi.getUsersSavedAlbums('','')
            if(!response) {
                throw new Error ("error getting albums from spotify")
            }
            const formattedAlbums = response.items.map(album => album.album)
            console.log("SETTING ALBUMS", formattedAlbums, accessToken)
            setAlbums(formattedAlbums)
        } catch (err) {
            console.log("Err: ", err)
        }
    }



    // so now, I just need to refresh this when I add new bins, albums, or playlists
    useEffect(() => {
        if(user && accessToken && spotifyApi && recollectiveApi) {
            console.log("USER", user)
            if(user.spotify?.id) {
                getBins()
                getPlaylists()
                getAlbums()
            }
            // getBins()
            // getPlaylists()
            // getAlbums()
        } 
    }, [user, accessToken, spotifyApi, recollectiveApi])

    return {bins, playlists, albums, getBins, getAlbums, getPlaylists}
}