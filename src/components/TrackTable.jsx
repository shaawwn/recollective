import PropTypes from 'prop-types'
import {msToMinutesAndSeconds} from '../utils/utils'
import DefaultImage from '../assets/images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {useDashboardContext, usePlaylistContext} from '../Dashboard'

import {TrackTableRow} from './barrel'

export default function TrackTable({tracks}) {
    const {playlist} = usePlaylistContext()

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
                    <TrackTableRow key={track.name + index}track={track} playlist={playlist}/>
                )}
            </div>

        </section>
    )
}



TrackTable.propTypes = {
    tracks: PropTypes.array.isRequired
}
