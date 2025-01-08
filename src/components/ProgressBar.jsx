import PropTypes from 'prop-types'

import {useEffect, useRef} from 'react'
import {useApiContext} from '../context/barrel'
import {msToMinutesAndSeconds} from '../utils/utils'
import {useWebplayerContext} from '../Dashboard'

export default function ProgressBar({current_track}) {
    const {spotifyPlayerApi} = useApiContext() || {}
    const current_track_ref = useRef(current_track)
    // const init = useRef(false)
    const {is_paused, activeDevices} = useWebplayerContext() || {}
    const t = useRef(0) // time progression counter
    const progressMs = useRef(0) // multiply by t to get current time
    const intervalRef = useRef()
    // const progress = useRef(0) // width % of slider, increment by % when checking the progress

    const bar = useRef() // empty value progress bar
    const progressTime = useRef() // progress bar relative to current progress of song.

    function calculatePercentage(progress) {
        // given the song lengh and the current progress, calculate the percentage 
        return Math.floor(((progress * 1000) / current_track.duration_ms) * 100)
    }


    function progressPercent(percentage=0,positionMs=0) {

        // updates progressbar width, default at 0%
        bar.current.style.width = `${percentage}%`

        // clears the interval counter which resets the track timer
        clearInterval(intervalRef.current)

        // sets a new initial time value (in seconds) that is incremented during the interval, default 0
        t.current = Math.floor(positionMs / 1000) 

        // updates UI to display current time in track
        progressTime.current.innerText = msToMinutesAndSeconds(positionMs)

        // updates the UI each second to reflect time location in track.
        intervalRef.current = setInterval(() => {
            t.current = t.current + 1
            progressMs.current = t.current * 1000 
            const percentVal = calculatePercentage(t.current)

            bar.current.style.width = `${percentVal}%`
            progressTime.current.innerText = msToMinutesAndSeconds(progressMs.current)
        }, 1000)
    }

    function handlePause() {
        if(is_paused === true) {
            clearInterval(intervalRef.current)
            return
        } else if(is_paused === false) {
            const percentage = Math.floor((t.current * 1000) / current_track.duration_ms * 100);
            progressPercent(percentage, t.current * 1000) 
            return
        }
    }

    function handleClick(e) {
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        
        // location of the click in the progress bar
        const clickLoc = e.clientX

        // // get width of bar
        // const {width} = e.currentTarget.getBoundingClientRect()

        // left boundary of progress bar relative to the viewport and width of progress bar
        const {width, left} = e.currentTarget.getBoundingClientRect() 

        // use this percentage to find where in the track
        const percentage = Math.round(((clickLoc - left) / width) * 100);

        // use raw * duration_ms to get the location to start playback
        const raw = Math.round(((clickLoc - left) / width) * 100) / 100

        const toSeek = Math.floor(raw * current_track.duration_ms)

        spotifyPlayerApi.seek(toSeek, activeDeviceID.id)
        progressPercent(percentage,toSeek)
    }


    useEffect(() => {

        if(current_track) {
            if(!current_track_ref.current) {
                // initializes as undefined, set when no longer undefined. This is the only time it will be undefined, it should have some value as soon as any playback starts
                current_track_ref.current = current_track
            }

            // if the current_track changes, need to reset t
            if(JSON.stringify(current_track.id) !== JSON.stringify(current_track_ref.current.id)) {
                // reset time values for progress bar for incoming song
                current_track_ref.current = current_track
                t.current = 0
                progressMs.current = 0
            }

            if(intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            handlePause()
        } 

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null; 
            }
        };

    }, [current_track, is_paused]) 

    
    return(
        <div role="progressbar" className="flex gap-[5px]">
        {current_track ?
        <>
            {/* Current time in track */}
            <p id="progress-current" ref={progressTime}>{msToMinutesAndSeconds(progressMs.current)}</p>
            <div className="flex flex-col justify-center w-full">
                {/* the actual progress bar, clickable */}
                <div className="progress-bar" onClick={(e) => handleClick(e)}>
                    {/* the dynamic progress that increases from a value of 0-100% during the course of the track */}
                    <div className="progress" ref={bar}></div>
                </div>
            </div>

            {/* Total time in track */}
            <p>{msToMinutesAndSeconds(current_track.duration_ms)}</p>

        </>
        :<div className="flex flex-col justify-center w-full">
        <div className="progress-bar">
            <div className="progress"></div>
        </div>
    </div>
        }
    </div>
    )
}


ProgressBar.propTypes = {
    // no need isRequired because a null playback state is expected behaviour on load
    player: PropTypes.object,
    current_track: PropTypes.object
}