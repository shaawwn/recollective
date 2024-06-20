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

        if(queryString === '') {
            setSearchResults([])
        } else {
            searchApp(queryString)
            searchSpotify(queryString)
        }
        // searchApp(queryString)
        // searchSpotify(queryString)

        // take the results from both queries and return them as a single object
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
            console.log("Search results from Spotify: ", data)
            setSearchResults(data)
        }).catch((err) => {
            console.log("Err on search", err)
        })
    }

    function searchApp(queryString) {
        console.log("Querying app database...why is it different", queryString)
        fetch(`http://localhost:3001/profiles/search?q=${queryString}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Search results from app", data)
        }).catch((err) => {
            console.log("Err searching app", err, queryString)
        })
    }


    useEffect(() => {
        // console.log("Loading useSearch...", tokens)
        
    }, [tokens])
    // console.log("SEARCH RESULTS AT RETURN", searchResults)
    return [search, setTokens, searchResults]
}

export default useSearch;