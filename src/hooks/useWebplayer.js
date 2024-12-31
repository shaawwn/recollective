import {useState, useEffect, useRef} from 'react';

import {useApiContext, useUserContext} from '../context/barrel'
import {useAuthContext} from '../App'
/**
 * 
 * Web player needs to track multiple things:
 * 
 * Currently playing track
 * Currently playing album/playlist
 * Currently playing bin
 * 
 * Functions to handle playback
 * Syncing with the webpalyer component and it's controls ("player")
 * Access to the spotify queue ( think this is handled by spotify anyways)
 * 
 * Auth access to access both spotify and recollective
 * 
 * Track, album/playlist progress (pausing, etc)
 * 
 * Elements from the spotify radio I made would be a feature I would like to add later, like make a radio from this playlist etc.
 * 
 * This state needs to be passed to the Webplayer component created by spotify (which, or perhaps even created here?)
 * 
 * I guess I could init the player here and really centralize the controls, the webplayer component itself would only need to be passed the palyer object.
 */
export default function useWebplayer() {
    
    const {accessToken} = useAuthContext() || {}
    const {user} = useUserContext()
    const {spotifyApi, recollectiveApi, spotifyPlayerApi} = useApiContext()

    const [premium, setPremium] = useState(false)
    const [is_paused, setPaused] = useState(null)
    const [is_active, setActive] = useState(false)
    const [shuffle, setShuffle] = useState(false) // shuffle is a state that is either true or false, default false
    const [current_track, setTrack] = useState()
    const bufferTrackState = useRef()
    const [appDeviceId, setAppDeviceId] = useState()
    const [activeDevices, setActiveDevices] = useState()
    const [webPlayback, setWebplayback] = useState()

    const player = useRef()
    const firstLoad = useRef(true) // change to false after
    

    function disconnect() {
        // console.log("disconnecting webplayer")
        player.current.removeListener('ready')
        player.current.removeListener('not_ready')
        player.current.removeListener('player_state_changed') 
        player.current.disconnect()
        player.current = null
    }

    async function getActiveDevices() {
        const response = await spotifyPlayerApi.getDevices()
        if(!response) {
            console.log("No active devices")
        } else {
            // console.log("active device resposne", response)
            setActiveDevices(response.devices)
        }


    }

    function initWebplayer() {

 
        window.onSpotifyWebPlaybackSDKReady = () => {
            // console.log("Calling on webplayback ready")
            player.current = new window.Spotify.Player({
                name: 'RecollectiveApp',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });
     
            player.current.addListener('ready', ({ device_id }) => {
                // console.log('Ready with Device ID', device_id);
                setAppDeviceId(device_id)

                // fetch devices
                // spotifyPlayerApi.getDevices()
                getActiveDevices()

            });

            player.current.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            console.log("Init before listener")
            let debounceTimeout;

            player.current.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }

                clearTimeout(debounceTimeout)

                //
                // console.log('state change trigger', bufferTrackState.current)

                if(bufferTrackState.current && state.track_window.current_track) {
                    const bufferString = JSON.stringify(bufferTrackState.current)
                    const incomingString = JSON.stringify(state.track_window.current_track)
                    if(bufferString !== incomingString) {
                        bufferTrackState.current = null
                    }
                }
                debounceTimeout = setTimeout(() => {

                    // handling bin playlists
                    // if(state.track_window.next_tracks.length < 1) {
                    //     // generate more content from bins
                    //     // bins won't have a uri, but search result tracks ALSO won't have a uri, or next_track value
                    //     console.log("Need to generate more songs for the bin playback")
                    // }

                    // if(!bufferTrackState.current && state.track_window.current_track) {
                    //     // set the buffer state on init load
                    //     bufferTrackState.current = state.track_window.current_track
                    //     console.log("set buffer before setting state", bufferTrackState.current)
                    // } else if(bufferTrackState.current) {
                    //     const bufferString = JSON.stringify(bufferTrackState.current)
                    //     const incomingString = JSON.stringify(state.track_window.current_track)
                    //     console.log("buffer exists", bufferTrackState.current)
                    //     // because this event listener triggrers like 8 times, only update state one of those times. This is also why the if statement above is triggering, because I am setting buffer to null once again
                    //     if(bufferString === incomingString) {
                    //         // set track only?
                    //         // setTrack(state.track_window.current_track);

                    //         setTrack((prevTrack) => {
                    //             if(prevTrack?.name === state.track_window.current_track.name) {
                    //                 console.log("same track, not setting state new", prevTrack.name)
                    //                 return prevTrack
                    //             }
                    //             console.log("new track, setting state", state.track_window.current_track.name)
                    //             return state.track_window.current_track
                    //         })
                    //         bufferTrackState.current = null
                    //     }

                    // }

                    setTrack((prevTrack) => {
                        if(prevTrack?.name === state.track_window.current_track.name) {
                            return prevTrack
                        }
                        return state.track_window.current_track
                    })

                    // setPaused(state.paused); 
                    setPaused((prevPaused) => {
                        if(prevPaused === state.paused) {
                            return prevPaused
                        }
                        return state.paused
                    })

                    setShuffle((prevShuffle) => {
                        if(prevShuffle === state.shuffle) {
                            return prevShuffle
                        }
                        return state.prevShuffle
                    })
    
                    // setShuffle(state.shuffle) 
                
                    player.current.getCurrentState().then( state => { 
                        (!state)? setActive(false) : setActive(true) 
                    });
                }, 500)
                
                // here is after the debounce timer
            }));
            // console.log("Connecting player", player)
            player.current.connect();
        };
    }

    function toggleShuffle() {

        console.log("setting shuffle from:", shuffle, "to: ", !shuffle)

        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        spotifyPlayerApi.setShuffle(!shuffle, activeDeviceID.id)
        setShuffle(!shuffle)
    }

    useEffect(() => {

        const cleanup = () => {
            if (player.current) {
                disconnect(); // Ensure disconnect runs fully
            }
        };
        if(player.current) {
            disconnect()
        }

        // const webplayerScript = document.querySelector('#spotify-webplayer-sdk')
        if(user?.spotify.product === 'premium') {
            setPremium(true)
        } else {
            return
        }
        if(accessToken && spotifyPlayerApi) {

            const webplayerScript = document.querySelector('#spotify-webplayer-sdk')

            if(!webplayerScript.src) {
                webplayerScript.src = "https://sdk.scdn.co/spotify-player.js"; 
                webplayerScript.async = true
            }

            initWebplayer()

            // init webplayer sets the player to a ref, which means I may be able to create the object here?
            const p = {
                player,
                is_paused,
                current_track,
                shuffle,
                toggleShuffle,
                appDeviceId,
                activeDevices,
                spotifyPlayerApi,
                recollectiveApi
            }
            setWebplayback(p)
        }

        return cleanup
    }, [accessToken, spotifyPlayerApi])

    return {webPlayback, player, is_paused, is_active, current_track, shuffle, toggleShuffle, appDeviceId, activeDevices, setActiveDevices}
}
