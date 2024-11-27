import {useState, useEffect} from 'react'
import {useApiContext} from '../context/ApiContext'
// import {useAuthContext} from '../context/AuthContext'
import {useAuthContext} from '../App'


export default function useArtist() {
    const [artistID, setArtistID] = useState()
    const {accessToken} = useAuthContext() || {}
    const {spotifyApi} = useApiContext() || {}

    const [artist, setArtist] = useState()

    function clearArtistState() {
        setArtist()
    }

    useEffect(() => {
        if(accessToken && spotifyApi && artistID) {
            const fetchArtistAndAlbums = async () => {
                const art = await spotifyApi.getArtist(artistID)
                const artistAlbums = await spotifyApi.getArtistAlbums(artistID)
                const topTracks = await spotifyApi.getArtistTopTracks(artistID)
                const obj = {
                    artist: art,
                    albums: artistAlbums,
                    topTracks
                }

                setArtist(obj)
            }
            fetchArtistAndAlbums()
        }

    }, [accessToken, spotifyApi, artistID])

    return {artist, setArtistID, clearArtistState}
}