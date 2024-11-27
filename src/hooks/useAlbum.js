import {useState, useEffect} from 'react'

import {useApiContext} from '../context/ApiContext'
// import {useAuthContext} from '../context/AuthContext'
import {useAuthContext} from '../App'

export default function useAlbum() {
    const [albumID, setAlbumID] = useState()
    const [album, setAlbum] = useState()
    const {accessToken} = useAuthContext() || {}
    const {spotifyApi} = useApiContext() || {}

    function clearAlbumState() {
        setAlbumID()
        setAlbum()
    }

    function _addAlbumToTrackObject(album, tracks) {
        // for each track object, add the ablum, which should make it more similar to how playlist track objects are structured
        const t = [...tracks]
        t.forEach((track) => {
            track['album'] = album
        })

        return t
    }
    useEffect(() => {
        if(accessToken && spotifyApi && albumID) {
            const fetchAlbum = async () => {
                const a = await spotifyApi.getAlbum(albumID)
                let t = _addAlbumToTrackObject(a, a.tracks.items)
 
                const newAlbum = {
                    overview: a,
                    tracks: t
                }
                setAlbum(newAlbum)
            }

            fetchAlbum()
        }

        return () => {
            clearAlbumState()
        }
    }, [accessToken, spotifyApi, albumID])

    return {setAlbumID, album, clearAlbumState}
}