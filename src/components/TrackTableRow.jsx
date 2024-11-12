
import PropTypes from 'prop-types'
import DefaultImage from '../assets/images/default.png'
import {msToMinutesAndSeconds} from '../utils/utils'
import {useApiContext} from '../context/ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faTrashCan, faCirclePlus} from '@fortawesome/free-solid-svg-icons'

import {useDashboardContext, usePlaylistContext, useWebplayerContext} from '../Dashboard'

import {usePlaylistBuilderContext} from '../components/playlist_search/playlistManager/PlaylistBuilder'


// I need to make this more robust in its check, because of the nested nature of the playlist tool, a PLAYLIST will exist, which triggers that.

// I think it is an error here to load playlist from context, if I just passed the relevant information as props, this wouldn' tbe a problem.

export default function TrackTableRow({context, track, type, offset}) {

    // type = album, playlist, explore (explore tracks are found in search results and can be added to playlists)
    const {spotifyPlayerApi} = useApiContext()
    const {activeDevices} = useWebplayerContext() || {}
    const {setAlbumView, setArtistView, addPage} = useDashboardContext()

    // this is getting the APP level playlist. Where TrackTable is being passed a playlist
    const {playlist, removeFromPlaylist, addToPlaylist} = usePlaylistContext() || {}



    // this is unnecessary as type is checked in props and album/playlist track rendering is the same
    // const {album} = useAlbumContext() || {}

    
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
        // use recollective as default
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
        // let offset;
        // let context;


        // switch (type) {
        //     case "playlist":
        //         // use _offset
        //         offset = _offset
        //         // context = 
        //         break
        //     case "album":
        //         // use album track number
        //         offset = track.track_number - 1
        //         context = track.album.uri
        //         break
        //     case "explore":
        //         console.log("Explore case", track)
        //         if(track?.track_number) {
        //             offset = track.track_number - 1
        //             context = track.album.uri
        //         } else {
        //             offset = playlist.tracks.indexOf(track)
        //             context = playlist.overview.uri
        //         } break

        // }

        // switch (type) {
        //     case "playlist":
        //         console.log("playlist offset", playlist.tracks, track)
        //         // this doesn't work because in a vacuum there is no playlist meta data for an individual track
        //         if(playlist) {
        //             context = playlist.overview.uri
        //         }
        //         offset = playlist.tracks.indexOf(track)
        //         break
        //     case "album":
        //         // console.log("album offset", track.track_number)
        //         // this works because track object has data for the album
        //         offset = track.track_number - 1 
        //         context = track.album.uri 
        //         break
        //     case "explore":
        //         // explore, for now, is limited to Albums, but I should consider it for playlist
        //         console.log("Explore case", track)
        //         if(track?.track_number) {
        //             offset = track.track_number - 1
        //             context = track.album.uri
        //         } else {
        //             offset = playlist.tracks.indexOf(track)
        //             context = playlist.overview.uri
        //         } break
        //     default:
        //         console.error("Unknown type, unable to calculate offset");
        //         break
        // }


        spotifyPlayerApi.play(context, [], offset, activeDeviceID.id)
    }

    function renderAddRemoveButton() {
        switch (type) {
            case "album":
                // do nothing
                return
            case "playlist":
                // render trashcan
                return(
                    <div className="track-table__cell vertical-center">
                    <FontAwesomeIcon 
                    icon={faTrashCan}
                    onClick={() => removeFromPlaylist({uri:track.uri})}
                    className="red"
                    size="1x"
                />
                </div>
                )
            case "explore":
                // render add button
                return (                
                    <div className="track-table__cell vertical-center" style={{"text-align": "center"}}>
                        <FontAwesomeIcon 
                            icon={faCirclePlus}
                            onClick={() => addToPlaylist(track.uri)}
                            className="add-button"
                        />
                    </div>
                )
        }
    }

    return(
        <div className="track-table-search__row">
            {playlist ? 
                <div className="track-table__cell flex flex-col justify-center">
                    <div className="track-table__cell flex gap-[10px]">
                        <FontAwesomeIcon 
                            onClick={() => play()}
                            icon={faPlay} 
                            className="p-5 playback-btn--small"/>
                        <img className="image--xs" src={track.album.images ? track.album.images[0].url : DefaultImage} />
                    </div>
                </div>
            :<div className="track-table__cell justify-right">
                <FontAwesomeIcon 
                    onClick={() => play()}
                    icon={faPlay} 
                    className="p-5 playback-btn--small"/>
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

            {renderAddRemoveButton()}
            <p className="vertical-center">SpotifyLink</p>
        </div>
    )
}


TrackTableRow.propTypes = {
    context: PropTypes.string, //uri of album or playlist may not need to beRequired, 
    track: PropTypes.object.isRequired,
    type: PropTypes.string.activeDevices,
    offset: PropTypes.number // albums include a track_number value, but offset is still needed for playlists
}

