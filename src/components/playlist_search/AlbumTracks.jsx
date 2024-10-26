import PropTypes from 'prop-types'
import {TrackTable} from '../barrel'
import {ContentHeader} from './barrel'

export default function AlbumTracks({album}) {
    return(
        <div>
            {album ? 
                <>  
                    <ContentHeader content={album}/>
                    <TrackTable tracks={album.tracks}
                    />
                </>
            :<h2>Loading album....</h2>
            }

        </div>
    )
}

AlbumTracks.propTypes = {
    album: PropTypes.object.isRequired
}

