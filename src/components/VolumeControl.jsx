import {useState, useEffect, useRef} from 'react'
// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faVolumeHigh, faVolumeLow, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'
import {useWebplayerContext} from '../Dashboard'
import {useApiContext} from '../context/barrel'
import {Slider} from './barrel'


export default function VolumeControl() {
    
    const {activeDevices} = useWebplayerContext() || {}
    const {spotifyPlayerApi} = useApiContext() || {}

    const [volume, setVolume] = useState(0.5) 
    const muteRef = useRef() // hold the previous vlume when muting

    const delayRef = useRef()

    function adjustPlaybackVolume(percentage) {

        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        if(delayRef.current) {
            clearTimeout(delayRef.current)
        }

        delayRef.current = setTimeout(() => {
            try {
                const response = spotifyPlayerApi.setPlaybackVolume(percentage, activeDeviceID.id)
                if(!response) {
                    throw new Error ("There was an error adjsting the player volume")
                }

                setVolume(percentage / 100)
            } catch(err) {
                console.log("err: ", err)
            }

        }, 100) // small delay
    }

    function handleMute() {
        // if volume > 0: mute else, set to previous volume

        if(volume > 0) {
            muteRef.current = volume
            setVolume(0)
            adjustPlaybackVolume(0) // set vol to 0%
        } else if(volume === 0) {
            // setVolume to previous volume
            setVolume(muteRef.current)
            adjustPlaybackVolume(Math.round(muteRef.current * 100)) // set vol to previous * 100
        }
    }
    function renderVolumeStateIcon() {
        // ui representation of current volume level
        if(volume === 0) {
            return <FontAwesomeIcon 
                onClick={handleMute}
                icon={faVolumeXmark}/>
        } else if(volume < 0.5) {
            return <FontAwesomeIcon 
                onClick={handleMute}
                icon={faVolumeLow}/>
        } else if(volume >= 0.5) {
            return <FontAwesomeIcon 
                onClick={handleMute}            
                icon={faVolumeHigh}/>
        }
    }


    useEffect(() => {

    }, [volume])

    return(
        <div role="volumebar" className="webplayer__subsection bg-red-400">

        <div className="flex gap-[15px]">

            {renderVolumeStateIcon()}
            {activeDevices ? 
                <Slider 
                onIncrease={adjustPlaybackVolume}
                onDecrease={adjustPlaybackVolume}
                // onClick={adjustPlaybackVolume}
                value={volume}
                increment={10}
                    />
            :null
            }
        </div>
    </div>
    )
}

// Doesn't take any props
// VolumeControl.propTypes = {

// }