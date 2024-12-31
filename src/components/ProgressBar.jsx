import {useState, useEffect, useRef} from 'react'

import {msToMinutesAndSeconds} from '../utils/utils'
import {useWebplayerContext} from '../Dashboard'

export default function ProgressBar({player, current_track}) {

    const current_track_ref = useRef(current_track)
    const init = useRef(false)
    const {is_paused} = useWebplayerContext() || {}
    const t = useRef(0) // time progression counter
    const progressMs = useRef(0) // multiply by t to get current time
    const intervalRef = useRef()
    const progress = useRef(0) // width % of slider, increment by % when checking the progress

    const bar = useRef() // empty value progress bar
    const progressTime = useRef() // progress bar relative to current progress of song.

    function calculatePercentage(progress) {
        // given the song lengh and the current progress, calculate the percentage 
        return Math.floor(((progress * 1000) / current_track.duration_ms) * 100)
    }


    

    function progressPercent() {

        intervalRef.current = setInterval(() => {
            t.current = t.current + 1
            progressMs.current = t.current * 1000 // this can persist outside of interval
            const percentVal = calculatePercentage(t.current)

            bar.current.style.width = `${percentVal}%`
            progressTime.current.innerText = msToMinutesAndSeconds(progressMs.current)
        }, 1000)
    }

    function handlePause() {
   
        if(is_paused === true) {
            clearInterval(intervalRef.current)
            // console.log("Paused, stop timer", t.current)
            return
        } else if(is_paused === false) {
            // console.log("Resume, start time from: ", t.current, init.current)
            progressPercent() 
            return
        }
    }

    useEffect(() => {

        if(current_track) {
            if(!current_track_ref.current) {
                // initializes as undefined, set when no longer undefined. This is the only time it will be undefined, it should have some value as soon as any playback starts
                current_track_ref.current = current_track
            }

            // if the current_track changes, need to reset t
            if(JSON.stringify(current_track.id) !== JSON.stringify(current_track_ref.current.id)) {
                // console.log("different songs, reset", current_track.name)
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
                <div className="progress-bar" >
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

// So the question here is, how can I track progress in real time without constantly making network requests to the server?


// example current track
// {
//     "id": "273mbu6N6W9SMUY6mqquqz",
//     "uri": "spotify:track:273mbu6N6W9SMUY6mqquqz",
//     "type": "track",
//     "uid": "ba0fff777bfc1430",
//     "linked_from": {
//         "uri": null,
//         "id": null
//     },
//     "media_type": "audio",
//     "track_type": "audio",
//     "name": "Spinach Rag",
//     "duration_ms": 136133,
//     "artists": [
//         {
//             "name": "Nobuo Uematsu",
//             "uri": "spotify:artist:3V79CTgRnsDdJSTqKitROv",
//             "url": "https://api.spotify.com/v1/artists/3V79CTgRnsDdJSTqKitROv"
//         }
//     ],
//     "album": {
//         "name": "FINAL FANTASY VI Original Soundtrack",
//         "uri": "spotify:album:76XVjMzhQNv2pOQF3WVmeY",
//         "images": [
//             {
//                 "url": "https://i.scdn.co/image/ab67616d00001e02108a0a766eead40065e0723f",
//                 "height": 300,
//                 "width": 300,
//                 "size": "UNKNOWN"
//             },
//             {
//                 "url": "https://i.scdn.co/image/ab67616d00004851108a0a766eead40065e0723f",
//                 "height": 64,
//                 "width": 64,
//                 "size": "SMALL"
//             },
//             {
//                 "url": "https://i.scdn.co/image/ab67616d0000b273108a0a766eead40065e0723f",
//                 "height": 640,
//                 "width": 640,
//                 "size": "LARGE"
//             }
//         ]
//     },
//     "is_playable": true,
//     "metadata": {}
// }