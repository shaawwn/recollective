import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import {useApiContext} from '../context/ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faForwardStep, faBackwardStep, faShuffle, faRepeat, faLaptop, faVolumeHigh, faVolumeLow, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'
import DefaultImage from '../assets/images/default.png'

import {PlaybackButton, ProgressBar, VolumeControl} from './barrel'
import {useUserContext} from '../context/barrel'
import {useWebplayerContext} from '../Dashboard'
// import {useAuthContext} from '../context/AuthContext'


export default function WebPlayer() {

    const {webPlayback, player, is_paused, is_active, current_track, shuffle, toggleShuffle, appDeviceId, activeDevices} = useWebplayerContext()

    useEffect(() => {

    }, [current_track])


    return(

        // so I want this to update as CLOSE AS POSSIBLE with playback changes.
        <div className="webplayer">
                <>
                    <TrackDetails track={current_track}/>
                    <WebplayerControls 
                        player={player?.current}
                        isActive={is_active}
                        isPaused={is_paused}
                        toggleShuffle={toggleShuffle}
                        shuffle={shuffle}
                        current_track={current_track}
                        />

                        {/* This needs to be a new comp I think or, the volume needs to be in the playback menu */}
                    {/* <div className="flex w-full justify-center">
                        <VolumeControl />
                        <PlaybackMenu device={activeDevices}/>
                    </div> */}
                    {/* <VolumeControl /> */}
                    <PlaybackMenu device={activeDevices}/>
                </>
        </div>
    )
}

function CustomAudioTag({audioSource}) {

    return(
        <>  
            <audio controls>
                <source src={audioSource} />
            </audio>
        </>
    )
}

function WebplayerControls({player, isActive, isPaused, toggleShuffle, shuffle, current_track}) {

    /**
     * 
     * The player state holds various information regarding shuffle, volume, selecting track location (skip to middle of song)
     */

    // add volume

    // add playbar

    // playbar needs to tick each second, and needs to show dynamic progress (renders each second)

    // which means, I probably need the track
    // const [playback, setPlayback] = useState(false)
    const playback = useRef(false)

    function togglePlayback() {

        if(playback.current === true) {
            player.pause()
        } else {
            player.resume()
        }
        // setPlayback(!playback)
        playback.current = !playback.current
    }

    function forward() {
        try {
            player.nextTrack() // nextTrack() built in webplayer SDK, same with rpevious
        } catch (err) {
            console.log("cannot advance track")
        }
    }

    function back() {
        try {
            player.previousTrack()
        } catch (err) {
            console.log("cannot go back")
        }
    }

    // function shuffle() {
    //     // shuffle player state
    // }

    useEffect(() => {
        if(player) {
            // when playbacks starts, update the playback.current
            
        }
    }, [player])

    return(
        <div className="webplayer__section">
            {player ? 
            <div className="webplayer__controls">
            <div className="vertical-margin-center">
                <FontAwesomeIcon 
                    icon={faRepeat} 
                    size="1x"/>
            </div>
                <FontAwesomeIcon 
                    onClick={back}
                    icon={faBackwardStep} 
                    size="2x"/>
                <PlaybackButton />
                <FontAwesomeIcon 
                    onClick={forward}
                    icon={faForwardStep} 
                    size="2x"/>
            <div className={shuffle === true ? "text-green vertical-margin-center" :"vertical-margin-center"}>
                <FontAwesomeIcon 
                    onClick={toggleShuffle}
                    icon={faShuffle} 
                    size="1x"/>
            </div>
        </div>            
            :<CustomAudioTag audioSource={'audio source url in audio tag'}/>
            }

            {player ? 
                <ProgressBar 
                    player={player}
                    isPaused={isPaused}
                    current_track={current_track}
                />
            :<ProgressBar 
                current_track={current_track}
            />
            }
        </div>
    )
}

function TrackDetails({track}) {

    return(
        <div className="webplayer__section">
            {track?.album ? 
                <div className="flex">
                    <img className="image--small" src={track.album.images ? track.album.images[0].url : DefaultImage}/>
                    <div className="flex flex-col">
                        <p>{track.name}</p>
                        <p>{track.artists[0].name}</p>
                    </div>
                </div>
            :<img className="image--small" src={DefaultImage} />
            }
        </div>
    )
}

function DeviceMenu() {
    const {activeDevices, setActiveDevices} = useWebplayerContext() || {}
    const {spotifyPlayerApi} = useApiContext() || {}
    const [toggleMenu, setToggleMenu] = useState(true)

    function toggle() {
        setToggleMenu(!toggleMenu)
    }

    async function transferDevices(id) {
        try {
            const transfer = await spotifyPlayerApi.transferPlayback(id)
            if(transfer === true) {
                setTimeout(async () => {
                    try {
                        const response = await spotifyPlayerApi.getDevices()
                        if(!response) {
                            throw new Error ('error getting devices')
                        }
                        setActiveDevices(response.devices)
                    } catch(err) {
                        console.log("err", err)
                    }
                }, 500)
            } 
        } catch(err) {
            console.log("err transfering devices", err)
        }
    }  

    return (
        <div className="webplayer__subsection">
            <FontAwesomeIcon 
                className="mx-auto cursor-pointer"
                onClick={toggle}
                icon={faLaptop} 
                size="1x" 
            />

            {toggleMenu === false ? 
                <div className="device-menu">
                    {activeDevices ? 
                        <>
                            {activeDevices.map((device) => 
                            <div key={device.id}
                                // set active
                                className={device.is_active? 'text-green' : ''}
                            >
                                    <FontAwesomeIcon 
                                        className="cursor-pointer"
                                        icon={faLaptop} 
                                        size="3x" 
                                        onClick={() => transferDevices(device.id)}

                                        />
                                    <p>{device.name}</p>
                                </div>                          
                            )}
                        </>
                    :null
                    }
                </div>
                :null}
        </div>
    )
}
function PlaybackMenu() {

    return(
        // I Want the section to take up equal space in the bar, but the actual items to take up much less space
        <div className="webplayer__section">
            <div className="flex justify-center">
                <VolumeControl />
                <DeviceMenu />
            </div>
        </div>
    )
}

// function VolumeControl() {
//     // set with default volume that is stored in playbackback state

//     // I guess volum control could be independent of any current_tracks that are playing?

//     const [volume, setVolume] = useState(0.5) // default volume for spotify playback

//     // volume increments in tenths

//     function volumeUp() {

//     }

//     function volumeDown() {

//     }

//     function volumeMute() {

//     }

//     function renderVolumeLevel() {
//         if(volume === 0) {
//             return <FontAwesomeIcon icon={faVolumeXmark}/>
//         } else if(volume < 0.5) {
//             return <FontAwesomeIcon icon={faVolumeLow}/>
//         } else if(volume >= 0.5) {
//             return <FontAwesomeIcon icon={faVolumeHigh}/>
//         }
//     }

//     return(
//         <div role="volumebar" className="webplayer__subsection">

//             <div className="flex gap-[5px]">

//                 {renderVolumeLevel()}
//                 {/* <FontAwesomeIcon icon={faVolumeLow} size="1x"/> */}

//                 {/* the bar with a fixed width */}
//                 <div id="volumebar" className="bar vertical-margin-center">
//                     <div id="current-volume" className="w-1/2">

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


TrackDetails.propTypes = {
    track: PropTypes.object
}

WebplayerControls.propTypes = {
    player: PropTypes.object
}

PlaybackMenu.propTypes = {
    devices: PropTypes.array
}

CustomAudioTag.propTypes = {
    audioSource: PropTypes.string
}