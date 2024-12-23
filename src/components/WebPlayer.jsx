import PropTypes from 'prop-types'
import {useEffect, useState, useRef} from 'react'
import {useApiContext} from '../context/ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faForwardStep, faBackwardStep, faShuffle, faRepeat, faLaptop} from '@fortawesome/free-solid-svg-icons'
import DefaultImage from '../assets/images/default.png'

import {PlaybackButton} from './barrel'
import {useUserContext} from '../context/barrel'
import {useWebplayerContext} from '../Dashboard'
// import {useAuthContext} from '../context/AuthContext'


export default function WebPlayer() {

    const {webPlayback, player, is_paused, is_active, current_track, shuffle, toggleShuffle, appDeviceId, activeDevices} = useWebplayerContext()


    return(
        <div className="webplayer">
                <>
                    <TrackDetails track={current_track}/>
                    <WebplayerControls 
                        player={player?.current}
                        isActive={is_active}
                        toggleShuffle={toggleShuffle}
                        />
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

function WebplayerControls({player, isActive, toggleShuffle}) {

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
            player.nextTrack()
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

    function shuffle() {
        // shuffle player state
    }

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
            <div className="vertical-margin-center">
                <FontAwesomeIcon 
                    onClick={toggleShuffle}
                    icon={faShuffle} 
                    size="1x"/>
            </div>
            {/* <ProgressBar /> */}
        </div>            
            :<CustomAudioTag audioSource={'some url'}/>
            }
            <ProgressBar />
        </div>
    )
}

function ProgressBar() {
    const {current_track} = useWebplayerContext()
    // console.log("CURRENT_TRACK", current_track)
    return(
        <div className="flex gap-[5px]">
        <p>6:50</p>
        <div className="flex flex-col justify-center w-full">
            <div className="progress-bar">
                <div className="progress"></div>
            </div>
        </div>

        <p>7:30</p>
    </div>
    )
}

function TrackDetails({track}) {

    /**
     * 
     * Navigation needed here, navigate to album, artist page
     */
    // unneeded useEffect?
    // useEffect(() => {
    //     console.log("trACK", track)
    // }, [track])

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


function PlaybackMenu() {

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

    return(
        <div className="webplayer__section">
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <FontAwesomeIcon 
                        className="mx-auto cursor-pointer"
                        onClick={toggle}
                        icon={faLaptop} 
                        size="2x" 
                    />
                </div>

            </div>
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