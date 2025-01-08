import {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faForwardStep, faBackwardStep, faShuffle, faRepeat, faLaptop, faVolumeHigh, faVolumeLow, faVolumeXmark} from '@fortawesome/free-solid-svg-icons'
import {useWebplayerContext} from '../Dashboard'
import {useApiContext} from '../context/barrel'
import {Slider} from './barrel'


export default function VolumeControl() {
    
    const {activeDevices} = useWebplayerContext() || {}
    const {spotifyPlayerApi} = useApiContext() || {}

    const [volume, setVolume] = useState(0.5) // default volume set by spotify
    const volumeRef = useRef(0.5) // default value
    const volBar = useRef() // the actual volume bar
    const currentVolBar = useRef() // current vol state
    const volumeKnob = useRef() // draggable UI element
    const delayRef = useRef()

    // function volumeUp() {

    //     const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

    //     if(delayRef.current) {
    //         clearTimeout(delayRef.current)
    //     }

    //     delayRef.current = setTimeout(() => {
    //         try {
    //             const response = spotifyPlayerApi.setPlaybackVolume(percentage, activeDeviceID.id)
    //             if(!response) {
    //                 throw new Error ("There was an error adjsting the player volume")
    //             }

    //             console.log("adjusting volume successfully")

    //         } catch(err) {
    //             console.log("err: ", err)
    //         }
    //         console.log("Volume up")
    //     }, 100) // small delay
    // }

    // function volumeDown() {

    // }

    // function volumeMute() {

    // }

    function adjustPlaybackVolume(percentage) {
        // console.log("active devices", activeDevices)
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        // console.log("Adjisting by: ", percentage + '%')
        console.log(spotifyPlayerApi.setPlaybackVolume)
        if(delayRef.current) {
            console.log("Clearing timeout")
            clearTimeout(delayRef.current)
        }

        delayRef.current = setTimeout(() => {
            try {
                const response = spotifyPlayerApi.setPlaybackVolume(percentage, activeDeviceID.id)
                if(!response) {
                    throw new Error ("There was an error adjsting the player volume")
                }

                console.log("adjusting volume successfully")
                
            } catch(err) {
                console.log("err: ", err)
            }

        }, 100) // small delay
    }

    function renderVolumeStateIcon() {
        // ui representation of current volume level
        if(volume === 0) {
            return <FontAwesomeIcon icon={faVolumeXmark}/>
        } else if(volume < 0.5) {
            return <FontAwesomeIcon icon={faVolumeLow}/>
        } else if(volume >= 0.5) {
            return <FontAwesomeIcon icon={faVolumeHigh}/>
        }
    }


    // function handleSlide(e) {
    //     const sliderRect = volBar.current.getBoundingClientRect()
    //     const currentVolumeRect = currentVolBar.current.getBoundingClientRect(); 
    //     const startX = e.clientX; // the click point (current vol)
    //     const incrementValue = Math.floor(sliderRect.width / 10)
        

    //     const onMouseMove = (moveEvent) => {
       
    //         // change in volume
    //         const deltaX = moveEvent.clientX - startX;

    //         if(deltaX % incrementValue === 0) {
    //             if(Math.abs(deltaX) > sliderRect.width / 2) {
    //                 return false
    //             }

    //             const percentageChange = Math.abs(deltaX) / sliderRect.width

    //             if(deltaX < 1) {
    //                 //reduce volume
    //                 if((Math.ceil(percentageChange * 10) * 10)) {

    //                     let toChange =  Math.round(percentageChange * 10) / 10
    
    //                     volumeRef.current = Math.round(Math.max(0.0, Math.min(1.0, volumeRef.current - toChange)) * 10) / 10


    //                     const newWidth = (volumeRef.current - 0.1) * 100
    //                     console.log("New width", newWidth)

    //                     currentVolBar.current.style.width = `${newWidth}%` 
    //                 } 
    //             } else if(deltaX > 0) {
    //                 // increase volume

    //                 if((Math.ceil(percentageChange * 10) * 10)) {

    //                     let toChange =  Math.round(percentageChange * 10) / 10
    
    //                     volumeRef.current = Math.round(Math.max(0.0, Math.min(1.0, volumeRef.current + toChange)) * 10) / 10
                        
    //                     const newWidth = (volumeRef.current + 0.1) * 100
    //                     console.log("New width", newWidth, currentVolBar.current.style.width)

    //                     currentVolBar.current.style.width = `${newWidth}%`

    //                     // currentVolBar.current.style.width = `${(Math.round(Math.max(0.0, Math.min(1.0, volumeRef.current + toChange)) * 10) / 10) * 10}%`
    //                 } 
    //             }
    //         }
    //     };


    //     const onMouseUp = () => {
    //         document.removeEventListener("mousemove", onMouseMove);
    //         document.removeEventListener("mouseup", onMouseUp);

    //         // setvolume
    //         console.log("Setting volume from: ", volume, "to: ", volumeRef.current)
    //         setVolume(volumeRef.current)
    //     };

    //     document.addEventListener("mousemove", onMouseMove);
    //     document.addEventListener("mouseup", onMouseUp);

    // }


    // function renderDynamicVolumeLevel() {

    //     return(
    //         <div id="current-volume" ref={currentVolBar}className="w-1/2">
    //             <div 
    //                 id="volume-knob" 
    //                 ref={volumeKnob}
    //                 onMouseDown={(e) => handleSlide(e)}
    //                 ></div>
    //         </div>
    //     )
    // }

    // handles dynamic volume changes in the ui


    // useEffect(() => {
    //     console.log("Current volume: ", volumeRef.current, volume)
    //     if(currentVolBar.current) {
    //         if(volume < 0.0) {
    //             // currentVolBar.current.style.width = `10%`
    //         } else {
    //             // currentVolBar.current.style.width = `${volume * 100}%`
    //         }
    //     }
    // }, [volume])

    return(
        <div role="volumebar" className="webplayer__subsection bg-red-400">

        <div className="flex gap-[15px]">

            {renderVolumeStateIcon()}
            {activeDevices ? 
                <Slider 
                onIncrease={adjustPlaybackVolume}
                onDecrease={adjustPlaybackVolume}
                onClick={adjustPlaybackVolume}
                value={volume}
                increment={10}
                    />
            :null
            }
            {/* <Slider 
                onIncrease={adjustPlaybackVolume}
                onDecrease={adjustPlaybackVolume}
                onClick={adjustPlaybackVolume}
                value={volume}
                increment={10}
            /> */}
            {/* the bar with a fixed width */}
            {/* <div id="volumebar" ref={volBar} className="bar vertical-margin-center"> */}
                {/* {renderDynamicVolumeLevel()} */}
            {/* </div> */}
        </div>
    </div>
    )
}