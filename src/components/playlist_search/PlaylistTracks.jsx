import PropTypes from 'prop-types'

import {TrackTable} from '../barrel'
import {ContentHeader} from './barrel'

export default function PlaylistTracks({playlist}) {
    return(
        <div>
            {playlist ? 
                <>  
                    <ContentHeader content={playlist}/>
                    <TrackTable tracks={playlist.tracks} type="playlist"/>
                </>
            :<h2>Loading playlist...</h2>
            }
        </div>
    )
}

PlaylistTracks.propTypes = {
    playlist: PropTypes.object.isRequired
}
