import React, {useState, useEffect, useContext} from 'react'

// Centralized "Current playling" hook

/**
 * 
 * Regardless of what route/view or what components are currently displaying, etc. A user needs to have constant access to whatever song/playlist they are currently playing
 * 
 * 
 * If I tie playlists to the playlist panel component only, then that state is lost when navigating to other parts of the app.
 * 
 * 
 * By default, there is no currently playing items, with one exception: When a user is onboarding, the currentPlaylist needs to be set to the users only playlist (at the time)
 */

function usePlayer(appToken, spotifyAccessToken) {

    const [currentlyPlaying, setCurrentlyPlaying] = useState("Free bird")
    const [currentPlaylist, setCurrentPlaylist] = useState("My awesome playlist")

    function getPlaylist() {

    }


    useEffect(() => {
        if(appToken && spotifyAccessToken) {
            // do something
        }  
    }, [appToken, spotifyAccessToken])

    return [currentlyPlaying, currentPlaylist]
}

export default usePlayer