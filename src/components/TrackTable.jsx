import PropTypes from 'prop-types'
// import {msToMinutesAndSeconds} from '../utils/utils'
// import DefaultImage from '../assets/images/default.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faPlay, faPause, faTrashCan} from '@fortawesome/free-solid-svg-icons'

// import {useDashboardContext, usePlaylistContext} from '../Dashboard'

// here is the crux of the issue, I think I just need to pass the object directly to trackTable. 

import {TrackTableRow} from './barrel'

export default function TrackTable({content, type}) {

    // removed tracks prop
    // const {playlist} = usePlaylistContext() || {} // this is for checking if playlist exists, which needs extra functionality like adding/removing 

    return(
        <section className="track-table">
            <hr></hr>
            <div className="track-table__rows">
                {content.tracks.map((track, index) => 
                    <TrackTableRow 
                        key={track.name + index}
                        context={content.overview?.uri}
                        track={track} 
                        type={type}
                        offset={content.tracks.indexOf(track)}
                    />
                )}
            </div>

        </section>
    )
}



TrackTable.propTypes = {
    type: PropTypes.string.isRequired,
    tracks: PropTypes.array.isRequired
}


// HEADER FOR TABLE, REMOVED FOR STYLING AND LAYOUT ISSUES BUT MAY ADD AGAIN LATER
{/* <div className="track-table__header">
    <div className="track-table__cell">
        <p>Play</p>
    </div>
    <div className="track-table__cell">
        <p>Track</p>
    </div>
    <div className="track-table__cell">
        <p>Artist</p>
    </div>
    <div className="track-table__cell">
        <p>Album</p>
    </div>
    <div className="track-table__cell" style={{"textAlign":"right"}}>
        <p>Duration</p>
    </div>
    {type === 'playlist' || type === 'explore' ? 
        <div className="track-table__cell">
        <p>  </p>
        </div>
    :null}
</div> */}