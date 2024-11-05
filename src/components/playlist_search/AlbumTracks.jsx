import PropTypes from 'prop-types'
import {TrackTable} from '../barrel'
import {ContentHeader} from './barrel'
import {TrackTableSearchRow} from './TrackTableSearch'

export default function AlbumTracks({album}) {
    return(
        <div>
            {album ? 
                <>  
                    <ContentHeader content={album}/>
                    <TrackTable 
                        content={album}
                        tracks={album.tracks} 
                        type="explore"
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

