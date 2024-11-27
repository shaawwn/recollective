import {useState, useEffect, useRef} from 'react'
import {useApiContext} from '../context/ApiContext'


export default function useAlbumLibrary() {
    const {spotifyApi} = useApiContext() || {}
    const [albums, setAlbums] = useState([])
    const nextUrl = useRef()
    const offset = useRef() 

    async function getAlbums() {
        try {
            const response = await spotifyApi.getUsersSavedAlbums(50, 0)
            if(!response) {
                throw new Error ("Error getting albums")
            }

            const formattedAlbums = response.items.map(album => album.album)
            // setAlbums(response.items)
            setAlbums(formattedAlbums)
            nextUrl.current = response.next
        } catch(err) {
            console.log("err", err)
        }
    }

    async function getNext() {
        if(nextUrl.current) {
            try {
                const response = await spotifyApi.fetchNextUrl(nextUrl.current)
                if(!response) {
                    throw new Error ('error fetching next elements')
                }
                const formattedAlbums = response.items.map(album => album.album)
                setAlbums([...albums, ...formattedAlbums])
                // setAlbums([...albums, ...response.items]);
                nextUrl.current = response.next
            } catch (err) {
                console.log("Err", err)
            }
        } else {
            // do nothing
        }
    }

    useEffect(() => {
        if(spotifyApi) {
            getAlbums() 
        }
    }, [])

    return {albums, getNext}    
}