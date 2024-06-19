import {useState, useEffect, useContext} from 'react';
import usePlayer from './usePlayer'
/*

    Manages playlist state and methods to pass tracks to usePlayer

*/
function usePlaylist(appToken, spotifyAccessToken) {

    const [playlist, setPlaylist] = useState()
    const [currentPlaylist, setCurrentPlaylist] = useState()
    const [playlistID, setPlaylistID] = useState()
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

    function addTracksToPlaylist(playlistID, tracksToAdd, position) {
        // tracksToAdd is a list of spotify track URIS to add to the playlist, position is where in the playlist to add tracks

        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            },
            body: JSON.stringify({
                uris: tracksToAdd,
                position: position
            })
        }).then((response) => response.json())
        .then((data) => {
            // responds with a snapshot ID of the playlist if successful
            console.log("Adding track to playlist", tracksToAdd[0], data)
            getSpotifyPlaylist()
        })
    }

    function removeTrackFromPlaylist(playlistID, trackToRemove, snapshotID) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            },
            body: JSON.stringify(
                {tracks: [
                    {"uri": trackToRemove}
                ],
                snapshot_id: snapshotID
            }
        )
        }).then((response) => response.json())
        .then((data) => {
            console.log("Removing track to playlist", data)
            getSpotifyPlaylist()
            // need to set the updated playlist to be current playlist 

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


    return [playlist, setPlaylistID, setActive, owned, removeTrackFromPlaylist, addTracksToPlaylist]

}

export default usePlaylist