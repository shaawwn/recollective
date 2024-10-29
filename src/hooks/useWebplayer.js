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
    const [current_track, setTrack] = useState()
    const [appDeviceId, setAppDeviceId] = useState()
    const [activeDevices, setActiveDevices] = useState()
    const [webPlayback, setWebplayback] = useState()
    const player = useRef()
    

    function disconnect() {
        console.log("disconnecting webplayer")
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
            console.log("active device resposne", response)
            setActiveDevices(response.devices)
        }


    }

    function initWebplayer() {

        if(window.Spotify || window.onSpotifyWebPlaybackSDKReady) {
            player.current = new window.Spotify.Player({
                name: 'RecollectiveApp',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });
            console.log("init webplayer", player)
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

            player.current.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused); // pause on switch

            
                player.current.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));
            console.log("Connecting player", player)
            player.current.connect();
        }
        // window.onSpotifyWebPlaybackSDKReady = () => {

        //     player.current = new window.Spotify.Player({
        //         name: 'RecollectiveApp',
        //         getOAuthToken: cb => { cb(accessToken); },
        //         volume: 0.5
        //     });
        //     console.log("init webplayer", player)
        //     player.current.addListener('ready', ({ device_id }) => {
        //         // console.log('Ready with Device ID', device_id);
        //         setAppDeviceId(device_id)

        //         // fetch devices
        //         // spotifyPlayerApi.getDevices()
        //         getActiveDevices()

        //     });

        //     player.current.addListener('not_ready', ({ device_id }) => {
        //         console.log('Device ID has gone offline', device_id);
        //     });

        //     player.current.addListener('player_state_changed', ( state => {
        //         if (!state) {
        //             return;
        //         }
        //         setTrack(state.track_window.current_track);
        //         setPaused(state.paused); // pause on switch

            
        //         player.current.getCurrentState().then( state => { 
        //             (!state)? setActive(false) : setActive(true) 
        //         });
            
        //     }));
        //     console.log("Connecting player", player)
        //     player.current.connect();
        // };
    }

    useEffect(() => {
        const webplayerScript = document.querySelector('#spotify-webplayer-sdk') // this has been hardcoded into the base html file, so it will always exist
        if(user?.spotify.product === 'premium') {
            setPremium(true)
        } else {
            return
        }


        if(player.current) {
            // player.current *can* = undefined, so need to make this check more robust
            console.log("disconnecting player")
            disconnect() 
        }

        if(accessToken && spotifyPlayerApi) {

            webplayerScript.src = "https://sdk.scdn.co/spotify-player.js"; 
            webplayerScript.async = true
            initWebplayer()

            // init webplayer sets the player to a ref, which means I may be able to create the object here?
            const p = {
                player,
                is_paused,
                current_track,
                appDeviceId,
                activeDevices,
                spotifyPlayerApi,
                recollectiveApi
            }
            setWebplayback(p)
        }


    }, [accessToken, spotifyPlayerApi])

    return {webPlayback, player, is_paused, is_active, current_track, appDeviceId, activeDevices, setActiveDevices}
}
