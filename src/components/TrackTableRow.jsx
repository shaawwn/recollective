
import PropTypes from 'prop-types'
import DefaultImage from '../assets/images/default.png'
import {msToMinutesAndSeconds} from '../utils/utils'
import {useApiContext} from '../context/ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {useDashboardContext, usePlaylistContext, useAlbumContext, useWebplayerContext} from '../Dashboard'

// I need to make this more robust in its check, because of the nested nature of the playlist tool, a PLAYLIST will exist, which triggers that.
export default function TrackTableRow({track, type}) {
    console.log("row track", track)
    const {spotifyPlayerApi} = useApiContext()
    const {activeDevices} = useWebplayerContext() || {}
    const {setAlbumView, setArtistView, addPage} = useDashboardContext()
    const {playlist, removeFromPlaylist} = usePlaylistContext() || {}
    const {album} = useAlbumContext() || {}

    
    function handleNavClick(type, id) {
        if(type === 'album') {
            // nav to album page
            setAlbumView(id)
            addPage('album', id)
        } else if(type === 'artist') {
            // nav to artist page
            setArtistView(id)
            addPage('artist', id)
        }
    }

    function play() {
        // ok so there is a difference between playing a single track, and starting an album

        // use recollective as default
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        let offset;
        let context;

        // so a -1 means it was NOT in the array
        // if(playlist) {
        //     console.log("Playlist TRCK")
        //     offset = playlist.tracks.indexOf(track)
        // } else if(album) {
        //     console.log("TRCK", track)
        //     offset = album.tracks.indexOf(track)
        // } 
        // console.log("OFFSET", track)

        switch (type) {
            case "playlist":
                console.log("playlist offset")
                if(playlist) {
                    context = playlist.overview.uri
                }
                offset = playlist.tracks.indexOf(track)
                break
            case "album":
                console.log("album offset", track.track_number)
                offset = track.track_number - 1 // offset works from 0 index, so album track - 1
                context = track.album.uri 
                break
            default:
                console.error("Unknown type, unable to calculate offset");
                break
                // return; // or handle error as needed
        }

        // another problem here

        // const context = playlist?.overview.uri || album?.overview.uri || ''

        spotifyPlayerApi.play(context, [], offset, activeDeviceID.id)
    }


    return(
        <div className="track-table-search__row">
            {playlist ? 
                <div className="track-table__cell flex flex-col justify-center">
                    <div className="track-table__cell flex gap-[10px]">
                        <FontAwesomeIcon 
                            onClick={() => play()}
                            icon={faPlay} 
                            className="p-5 text-white"/>
                        <img className="image--xs" src={track.album.images ? track.album.images[0].url : DefaultImage} />
                    </div>
                </div>
            :<div className="track-table__cell">
                <FontAwesomeIcon 
                    onClick={() => play()}
                    icon={faPlay} 
                    className="p-5 text-white"/>
            </div>
            }

            {/* Cells for track table */}
            <div className="track-table__cell vertical-center">
                <p>{track.name}</p>
            </div>

            <div className="track-table__cell vertical-center">
                <p onClick={() => handleNavClick("artist", track.artists[0].id)}className="track-table__cell-link">{track.artists[0].name}</p>
            </div>
            <div className="track-table__cell vertical-center">
                <p onClick={() => handleNavClick("album", track.album.id)}className="track-table__cell-link">{track.album.name}</p>
            </div>
            <div className="track-table__cell vertical-center" style={{"textAlign":"right"}}>
                <p>{msToMinutesAndSeconds(track.duration_ms)}</p>
            </div>

            {/* So if it is IN a playlist, include the Trashcan, if it is NOT in playlist (and not a bin) include add to playlist */}
            {playlist ? 
                <div className="track-table__cell vertical-center">
                    <FontAwesomeIcon 
                    icon={faTrashCan}
                    onClick={() => removeFromPlaylist({uri:track.uri})}
                    className="red"
                    size="1x"
                />
                </div>
            :null
            }
        </div>
    )
}


TrackTableRow.propTypes = {
    track: PropTypes.object.isRequired,
    // playlist: PropTypes.object.isRequired,
    type: PropTypes.string.activeDevices
}