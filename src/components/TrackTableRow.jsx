import {useRef} from 'react'
import PropTypes from 'prop-types'
import DefaultImage from '../assets/images/default.png'
import {msToMinutesAndSeconds} from '../utils/utils'
import {useApiContext} from '../context/ApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faTrashCan, faCirclePlus, faPause} from '@fortawesome/free-solid-svg-icons'

import {useDashboardContext, usePlaylistContext, useWebplayerContext} from '../Dashboard'

// import {usePlaylistBuilderContext} from '../components/playlist_search/playlistManager/PlaylistBuilder'


// I need to make this more robust in its check, because of the nested nature of the playlist tool, a PLAYLIST will exist, which triggers that.

// I think it is an error here to load playlist from context, if I just passed the relevant information as props, this wouldn' tbe a problem.

export default function TrackTableRow({context, track, type, offset}) {
    // console.log("TRACK", track)
    // type = album, playlist, explore (explore tracks are found in search results and can be added to playlists)
    const {spotifyPlayerApi, spotifyApi} = useApiContext()
    const {activeDevices, current_track, is_paused} = useWebplayerContext() || {} // is_paused can be null if no playback
    const {setAlbumView, setArtistView, addPage, activeContent} = useDashboardContext()

    const active = useRef('playback-btn--small')
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

    async function handlePlayback(track, activeDeviceID) {
        // just play the track
        console.log("track", track, activeDeviceID)
        try {
            // const activeDeviceID = activeDevices.find(device => device.name === "RecollectiveApp")

            // no context jsut the track
            spotifyPlayerApi.play(null, [track.uri], null, activeDeviceID.id)
        } catch (err) {
            alert("No active devices")
        }
    }

    function play() {
        // use recollective as default
        // const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        try {
            const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");
            if(type === 'search') {
                // in this case, just check of the current track is playing "in the wild"
                handlePlayback(track, activeDeviceID)
            } else {
                // set the playlist, album or bin content the "active", that is, setActiveID() to create the active content
    
                activeContent.current = context
                // console.log("ACTIVE CONTENT", activeContent.current)
                spotifyPlayerApi.play(context, [], offset, activeDeviceID.id)
            }
        } catch (err) {
            alert("No active devices")
        }
        // // here is where I need to set the active
        // if(type === 'search') {
        //     // in this case, just check of the current track is playing "in the wild"
        //     handlePlayback(track)
        // } else {
        //     // set the playlist, album or bin content the "active", that is, setActiveID() to create the active content

        //     activeContent.current = context
        //     // console.log("ACTIVE CONTENT", activeContent.current)
        //     spotifyPlayerApi.play(context, [], offset, activeDeviceID.id)
        // }
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
                        className="red delete-button"
                        size="1x"
                />
                </div>
                )
            case "explore":
                // render add button
                // return
                return (                
                    <div className="track-table__cell vertical-center" style={{"textAlign": "center"}}>
                        <FontAwesomeIcon 
                            icon={faCirclePlus}
                            onClick={() => addToPlaylist(track.uri)}
                            className="add-button"
                        />
                    </div>
                )
            case "search":
                return
        }
    }

    function checkCurrent() {
        if(context === activeContent.current) {
            if(current_track.id === track.id) {
                active.current = 'playback-btn--small--current'
            } else {
                active.current = ''
            }
        }
    }

    function renderPlaybackButton() {
        const isCurrentTrack = current_track?.id === track.id;
        const playbackIcon = is_paused === null || is_paused === true ? faPlay : faPause;
        return (
            <div className="track-table__cell flex gap-[10px]">
                <FontAwesomeIcon 
                    onClick={() => play()} 
                    icon={isCurrentTrack && activeContent.current === context? playbackIcon : faPlay} 
                    className={`p-5 ${active.current}`}
                />
                {/* for playlists only, show a small album cover image (make it a link?) */}
                {playlist ? 
                    <img 
                    className="image--xs hover" 
                    src={track.album?.images?.[0]?.url || DefaultImage}
                    alt="Album Art"
                    onClick={() => handleNavClick("album", track.album.id)}
                />
                :null
                }
            </div>
        );

    }
    
    if(context && activeContent?.current) {
        checkCurrent()
    }
    // checkCurrent()

    return(
        <div className="track-table-search__row">
            {playlist ? 
                <div className="track-table__cell flex flex-col justify-center">
                    {renderPlaybackButton()}
                </div>
            :<div className="track-table__cell justify-right">
                {renderPlaybackButton()}
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
    context: PropTypes.string, // not required because some tracks do not have context (search results)
    track: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    offset: PropTypes.number // albums include a track_number value, but offset is still needed for playlists
}

