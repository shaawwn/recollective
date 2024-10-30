import PropTypes from 'prop-types'
import {msToMinutesAndSeconds} from '../utils/utils'
import DefaultImage from '../assets/images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {useDashboardContext, usePlaylistContext} from '../Dashboard'

import {TrackTableRow} from './barrel'

export default function TrackTable({type, tracks}) {
    const {playlist} = usePlaylistContext() || {} // this is for checking if playlist exists, which needs extra functionality like adding/removing 
    console.log("Track table tracks", tracks)
    return(
        <section className="track-table">
            <div className="track-table__header">
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
                {playlist ? 
                    <div className="track-table__cell">
                    <p>  </p>
                    </div>
                :null}
            </div>
            <hr></hr>
            <div className="track-table__rows">
                {tracks.map((track, index) => 
                    <TrackTableRow key={track.name + index}track={track} type={type}/>
                )}
            </div>

        </section>
    )
}



TrackTable.propTypes = {
    type: PropTypes.string.isRequired,
    tracks: PropTypes.array.isRequired
}
