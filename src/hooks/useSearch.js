import {useState, useEffect, useRef} from 'react';


/*
    Several types of search results with different ways of handling  them.
        - Tracks
        - Aritsts
        - Albums
        - Playlists
        - App users

*/

function useSearch() {

    const [searchResults, setSearchResults] = useState([])
    const [tokens, setTokens] = useState()

    const searchTypes = ["album", "artist", "playlist", "track"]

    function search(queryString) {
        // 
        // console.log("Tokens used in search", tokens.appToken, tokens.spotifAccessToken)
        searchSpotify(queryString)
        // searchApp(queryString)
    }

    function searchSpotify(queryString) {
        console.log("Querying spotify database...", queryString)
        fetch(`https://api.spotify.com/v1/search?q=${queryString}&type=${searchTypes}`, {
            headers: {
                "Authorization": `Bearer ${tokens.spotifyAccessToken}`,
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Search results: ", data)
            setSearchResults(data)
        }).catch((err) => {
            console.log("Err on search", err)
        })
    }

    function searchApp(queryString) {
        console.log("Querying app database...", queryString)
    }


    useEffect(() => {
        // console.log("Loading useSearch...", tokens)
        
    }, [tokens])

    return [search, setTokens]
}

export default useSearch;