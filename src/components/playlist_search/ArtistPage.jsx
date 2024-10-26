import PropTypes from 'prop-types'
import {GridItem} from './barrel'

import {usePlaylistContext} from '../../Dashboard'

export default function ArtistPage({artist}) {

    return(
        <div>
            {artist ? 
                <>
                    <ArtistPageTopTracks tracks={artist.topTracks.tracks}/>
                    <ArtistPageGrid artist={artist}/>
                </>            
            :<h2>Loading artist details....</h2>
            }
        </div>
    )
}

function ArtistPageTopTracks({tracks}) {

    const {addToPlaylist} = usePlaylistContext()
    console.log("")
    return(
        <div>
            <div className="flex flex-col">
                {tracks.map((track, index) =>
                    <div key={track.id + index}className="flex justify-between">
                        <p >{track.name}</p>
                        <button onClick={() => addToPlaylist(track.uri)} className="green">_Add</button>
                    </div>
                )}
            </div>
        </div>   
    )
}

function ArtistPageGrid({artist}) {

    return(
        <div className="static-grid">
            {artist.albums.items.map((album, index) =>
                <GridItem key={album.id + index} item={album}/>
            )}
        </div>
    )
}

ArtistPage.propTypes = {
    artist: PropTypes.object.isRequired
}

ArtistPageTopTracks.propTypes = {
    tracks: PropTypes.array.isRequired,
}

ArtistPageGrid.propTypes = {
    artist: PropTypes.object.isRequired
}