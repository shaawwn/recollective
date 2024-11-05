import PropTypes from 'prop-types'

import {TrackTable} from '../barrel'
import {ContentHeader} from './barrel'

export default function PlaylistTracks({playlist}) {
    
    console.log("PLAYLIST", playlist)

    // from here, it needs to hold and pass playlist data or at least the palylist URI to the play function

    // So the PLAYLIST here needs to have some identifier
    return(
        <div>
            {playlist ? 
                <>  
                    <ContentHeader content={playlist}/>
                    <TrackTable 
                        content={playlist}
                        tracks={playlist.tracks} 
                        type="playlist"/>
                </>
            :<h2>Loading playlist...</h2>
            }
        </div>
    )
}

PlaylistTracks.propTypes = {
    playlist: PropTypes.object.isRequired
}
