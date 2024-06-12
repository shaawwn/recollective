import {useState, useEffect, useContext} from 'react';
import usePlayer from './usePlayer'
/*

    Manages playlist state and methods to pass tracks to usePlayer

*/
function usePlaylist(playlistID, appToken, spotifyAccessToken) {

    const [playlist, setPlaylist] = useState()
    const [currentPlaylist, setCurrentPlaylist] = useState()
    const [active, setActive] = useState(false) // true if PLAYING playlist or adding tracks, false if just browsing playlist
    const [owned, setOwned] = useState(true) // if playlist authoer, set true, can modify playlist
     const [album, setAlbum] = useState(false) // if album cannot modify

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

    function getSpotifyPlaylist() {
        // using spotify ID, get playlist, using app ID, get app specific playlist details
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
          headers: {
            'Authorization': `Bearer ${spotifyAccessToken}`
          }
        }).then((response) => response.json())
        .then((data) => {
          setPlaylist(data)
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

    function addTrack() {
        fetch(`https://api.spotify.com/v1/playlists/${'playlistid'}/tracks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Adding track to playlist", data)
        })
    }

    function removeTrack(playlistID, trackToRemove) {
        // trackToRemove is spotify URI of track spotify:track:trackToRemove
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            },
            body: JSON.stringify({tracks: [trackToRemove]})
        }).then((response) => response.json())
        .then((data) => {
            console.log("Removing track to playlist", data)
        })
    }
    useEffect(() => {
        if(playlistID) {
            // fetch playlist data
            // getPlaylist()
            getSpotifyPlaylist()
        }
    }, [playlistID])

    useEffect(() => {
        console.log("Playist in hook", playlist)
    }, [playlist])


    return [playlist, setActive, owned]

}

export default usePlaylist