import PropTypes from 'prop-types'
import {createPortal} from 'react-dom'
// import DefaultImage from '../assets/images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {useApiContext} from '../context/barrel'
import {useWebplayerContext} from '../Dashboard'
import {BinPlaybackButton} from './barrel'




export default function InfoPopup({item, coords}) { // removed coords
    const {spotifyPlayerApi} = useApiContext() || {}
    const {activeDevices = []} = useWebplayerContext() || {}

    function handleClick(e) {
        e.stopPropagation()
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        if(!activeDeviceID) {
            alert("Error on playback: No active device.")
            return
        }
        // if(item.type === 'bin') {
        //     // const playlistPool = recollectiveApi.startBinPlayback(item)
        //     // console.log("Get all the uris for the bin and use that", item)

        //     // create
        //     // need to have some kind of method to get tracks for this.

        //     // method 1: Play sequentially with no shuffle, just play starting with the first item.

        //     // method 2: Create a list of 20 or so tracks at random, and just play that.

        //     // console.log("Play either straight through, or random shuffle by creating arrays of 20 or so songs at random.", item.content)

        //     // pick a small seletion of songs at random, then create that playback array. While those songs are playing, add a larger array.

        //     // the problem is spotify's rate limit.
        //     return
        // }
        // spotifyPlayerApi.play(item.uri, null, 0, activeDeviceID.id)

        // the reson there is no context here and offset = 0 is that THIS BUTTON essentially plays a playlist or album with the default setting (shuffle or straight through)

        // should probably have a shuffle option as well
        play(item.uri, null, 0, activeDeviceID.id)

    }

    function play(uri, context, offset, deviceID) {
        spotifyPlayerApi.play(uri, context, offset, deviceID)
    }

    function formatDate(date) {
        const formattedDate = date.split('-')[0]
        return formattedDate
    }

    function renderContent() {
        // album, bin, playlist

        switch(item.type) {
            case 'album':
                return (
                    <>
                        <p className="track-table__cell-link text-[14px]">{item.artists[0].name}</p>
                        <p>{formatDate(item.release_date)}</p>
                    </>
                )
            case 'playlist':
                return (
                    <>
                        <p className="track-table__cell-link text-[14px]">{item.owner.display_name}</p>
                        <p>{item.description}</p>
                    </>
                )
            case 'bin':
                return (
                    <>
                        <p className="track-table__cell-link text-[14px]">Bin Name</p>
                        <p>Bin tags or descriptiopn</p>
                    </>
                )
        }
    }

    return (
        <div 
            className="popup info-popup"
            // style={{top: `${coords.y}px`, left: `${coords.right + 5}px`}} for use with portal
            >
            <div className="flex">

                <div className="flex flex-col">
                    <p className="text-[12px]">{item.type === 'album' ? "Album" : "Playlist"}</p>
                    <p className="track-table__cell-link">{item.name}</p>
                    {renderContent()}
                    {item.type === 'bin' ? 
                        // Bin playback requires some extra steps than album/playlist
                        <BinPlaybackButton bin={item}/>
                    :<div 
                    onClick={(e) => handleClick(e)}
                    className="playback-btn play-btn"
                    >
                    <FontAwesomeIcon icon={faPlay} size="2x"/>
                </div>
                    }
                    <p>Track list here or other miscelania</p>
                </div>
            </div>

        </div>
    )
}

InfoPopup.propTypes = {
    item: PropTypes.object,
    coords: PropTypes.object // removed coords
}