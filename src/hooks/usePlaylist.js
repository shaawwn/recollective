import React, {useState, useEffect, useContext} from 'react'
import {useApiContext} from '../context/ApiContext'
// import {useAuthContext} from '../context/AuthContext'
import {useAuthContext} from '../App'
/**
 * 
 * Playlist holds a playlist *object* as well as a list of tracks in that playlist
 * 
 * Handles playlist related funcitons and methods, as well as pagination for longer playlists (max return value is 100 so pagination after 100 tracks)
 * 
 * Playlists are similar to Albums, so there may be some overlap here
 * 
 * 
 * What does it return? Playlist object, as well as a mutable set of tracks
 * 
 * playlist object has a layer above the actual track, which are the details of the track pertaining to the playlist, that is playlist.tracks = [{playlistTrack}] => playlistTrack = {addedAt, addedBy, *track*}, where *track* is the actual track details
 */



// 1CmY1RsnvCxQYeHm8l4Qc8
// 2kOD9QzcUkeT57RJkNvQpH




export default function usePlaylist() {
    const [playlistID, setPlaylistID] = useState()
    const [playlist, setPlaylist] = useState()
    const {accessToken} = useAuthContext() || {}
    const {spotifyApi} = useApiContext()
    const [refresh, setRefresh] = useState(false)

    // const [isOwner, setIsOwner] = useState(false) // set true if owner

    function clearPlaylistState() {
        setPlaylist()
        setPlaylistID()
    }

    // function handlePagination() {
    //     // for longer track lists, add the additional tracks to the track state
    // }

    async function fetchPlaylist() {
        const p = await spotifyApi.getPlaylist(playlistID)
        const formattedTracks = p.tracks.items.map((track) => track.track)
        
        // eslint-disable-next-line no-unused-vars
        const {available_markets, ...filteredPlaylist} = p

        const newPlaylist = {
            overview: filteredPlaylist,
            tracks: formattedTracks,
            isOwner: _checkIsOwner(p)
        }
        setPlaylist(newPlaylist)
    }

    function _checkIsOwner(playlist) {
        if(playlist.owner.id === spotifyApi.getUserID()) {
            return true
        }
        return false
    }

    function refreshPlaylist() {
        console.log("Refreshing palylist")
        if(refresh === true) {
            setRefresh(false)
        } else if(refresh === false) {
            setRefresh(true)
        }
    }

    async function addToPlaylist(tracks) {
        // an array of one or more tracks
        if(tracks.length < 1) {
            alert("Please select a track to add")
            return
        }
        const payload = {
            uris: [tracks]
        }
        try {
            const response = await spotifyApi.addTracksToPlaylist(playlistID, payload)
            if(!response) {
                throw new Error ("err in application adding to playlist")
            }
            fetchPlaylist()
        } catch(err) {
            console.log("Err: ", err)
        }
    }

    async function removeFromPlaylist(uris) {
        // uris is an array of spotify uris
        // now uris is a single uri string "spotify:track:alksnckanc"
        if(uris.length < 1) {
            alert("Please select a track to remove")
            return
        }
        const payload = {
            tracks: [uris],
            snapshot_id: playlist.overview.snapshot_id
        }
        try {
            const response = await spotifyApi.removeTracksFromPlaylist(playlistID, payload)
            if(!response) {
                throw new Error ("err in application removing from playlist")
            }
            fetchPlaylist()
        } catch(err) {
            console.log("Err: ", err)
        }
    }


    useEffect(() => {
        if(accessToken && spotifyApi && playlistID) {
            fetchPlaylist()
        }

    }, [accessToken, spotifyApi, playlistID, refresh])

    return {setPlaylistID, playlist, refreshPlaylist, addToPlaylist, removeFromPlaylist, clearPlaylistState}
}

