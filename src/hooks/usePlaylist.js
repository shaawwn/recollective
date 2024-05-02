import {useState, useEffect, useContext} from 'react';

/*

    Manages playlist state and methods to pass tracks to usePlayer

*/
function usePlaylist(playlistID, appToken, spotifyAccessToken) {

    const [currentPlaylist, setCurrentPlaylist] = useState()

    function getPlaylist() {
        fetch(`http://localhost:3001/playlist/${playlistID}`, {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Current palylist Data", data)
        })
    }

    function selectTrack() {
        // clicking on a track will start to play it
    }

    function shuffle() {

    }

    function repeat() {

    }

    function repeatSingleTrack() {

    }

    function loop() {

    }

    useEffect(() => {
        if(playlistID) {
            // fetch playlist data
            getPlaylist()
        }
    }, [playlistID])

    return {
        selectTrack
    }

}

export default usePlaylist