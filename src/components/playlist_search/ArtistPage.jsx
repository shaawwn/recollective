import PropTypes from 'prop-types'
import {GridItem} from './barrel'

import {usePlaylistContext, useWebplayerContext} from '../../Dashboard'
import {useApiContext} from '../../context/ApiContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

export default function ArtistPage({artist}) {

    return(
        <div>
            {artist ? 
                <>
                    {/* <ArtistPageTopTracks tracks={artist.topTracks.tracks}/> */}
                    <ArtistPageGrid artist={artist}/>
                </>            
            :<h2>Loading artist details....</h2>
            }
        </div>
    )
}

function ArtistPageTopTracks({tracks}) {

    const {addToPlaylist} = usePlaylistContext()
    const {spotifyPlayerApi} = useApiContext() || {}
    const {activeDevices} = useWebplayerContext() || {}

    // no need context, it is just the track to play

    function play(uri) {
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        spotifyPlayerApi.play(null, [uri], null, activeDeviceID)
    }

    return(
        <div>
            <div className="flex flex-col">
                {tracks.map((track, index) =>
                    <div key={track.id + index}className="flex">
                        {/* container for play btn plus track name */}
                        <div className="flex w-1/2">
                            <div className="track-table__cell justify-right">
                            <FontAwesomeIcon 
                                onClick={() => play()}
                                icon={faPlay} 
                                className="p-5 playback-btn--small"/>
                            </div>
                            <div className="track-table__cell vertical-center bg-red-400">
                                <p>{track.name}</p>
                            </div>
                        </div>
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