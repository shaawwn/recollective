import {useState, useRef} from 'react'

import {msToMinutesAndSeconds} from '../utils/utils'


export default function ProgressBar({current_track}) {

    // const {current_track} = useWebplayerContext() || {}
    const [progressMs, setProgressMs] = useState(0)

    return(
        <div role="progressbar" className="flex gap-[5px]">
        {current_track ?
        <>
            {/* Current time in track */}
            <p>{msToMinutesAndSeconds(progressMs)}</p>
            <div className="flex flex-col justify-center w-full">
                <div className="progress-bar">
                    <div className="progress"></div>
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