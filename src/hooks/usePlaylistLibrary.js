import {useState, useEffect, useRef} from 'react'
import {useApiContext} from '../context/ApiContext'

/** Hold the saved playlists state in this hook
 * 
 * To be used with scroll, as the user scrolls their playlist library, continously add to this playlist array as long as there is content (infinite scroll)
 * 
 * Lets just get the first round of playlists to populate the grid
 * 
 */
export default function usePlaylistLibrary() {
    const {spotifyApi} = useApiContext() || {}
    const [playlists, setPlaylists] = useState([])
    const nextUrl = useRef()
    const offset = useRef()

    async function getPlaylists() {
        // get the first round only for now

        try {
            const response = await spotifyApi.getCurrentUserPlaylists('', '')
            if(!response) {
                throw new Error ("Error getting user playlists")
            }
            // console.log("playlist response", response)
            setPlaylists(response.items)
            nextUrl.current = response.next
            // offset.current = response.offset
        } catch(err) {
            console.log("err", err)
        }
    }

    async function getNext() {
        // if next in the playlists, use that next url to fetch the paginated playlists. 

        // I think this works by using that as the fetch URL, and includes both limit and offset

        if(nextUrl.current) {
            try {
                const response = await spotifyApi.getCurrentUserPlaylists(50, 50)

                if(!response) {
                    throw new Error ('error fetching next elements')
                }
                setPlaylists([...playlists, ...response.items]);
                nextUrl.current = response.next
                // console.log("response", response)
            } catch (err) {
                console.log("Err", err)
            }
        } else {
            // do nothing
        }
    }    
    useEffect(() => {
        if(spotifyApi) {
            // console.log("Spotify api accessed")
            getPlaylists()
        }
    }, [])


    return {playlists, getNext}
}

