import { useState } from 'react'
// import {useAuthContext} from '../context/AuthContext'

import {useAuthContext} from '../App'

export default function useSearch(setSearchResultsView) {
    const {accessToken} = useAuthContext() || {}
    const [searchResults, setSearchResults] = useState()
    const searchTypes = ['track', 'artist', 'playlist', 'album']

    async function search(queryString) {
        return fetch(`https://api.spotify.com/v1/search?q=${queryString}&type=${searchTypes}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => {
            data.playlists.items = data.playlists.items.filter(Boolean)
            setSearchResults(data) 
            return data
            // add Bin/User search after getting those set up
        }).catch((err) => {
            console.log("Err on search", err)
        })
    }


    return {search, searchResults}
}