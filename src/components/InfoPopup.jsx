import PropTypes from 'prop-types'
import DefaultImage from '../assets/images/default.png'
import {useApiContext} from '../context/barrel'
import {useWebplayerContext} from '../Dashboard'
import {BinPlaybackButton} from './barrel'


export default function InfoPopup({item, coords}) {
    const {spotifyPlayerApi, recollectiveApi} = useApiContext()
    const {activeDevices = []} = useWebplayerContext() || {}

    function handleClick(e) {
        e.stopPropagation()
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        if(!activeDeviceID) {
            alert("Error on playback: No active device.")
            return
        }
        if(item.type === 'bin') {
            const playlistPool = recollectiveApi.startBinPlayback(item)
            // console.log("Get all the uris for the bin and use that", item)

            // create
            // need to have some kind of method to get tracks for this.

            // method 1: Play sequentially with no shuffle, just play starting with the first item.

            // method 2: Create a list of 20 or so tracks at random, and just play that.

            // console.log("Play either straight through, or random shuffle by creating arrays of 20 or so songs at random.", item.content)

            // pick a small seletion of songs at random, then create that playback array. While those songs are playing, add a larger array.

            // the problem is spotify's rate limit.
            return
        }

        spotifyPlayerApi.play(item.uri, null, 0, activeDeviceID.id)

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

    return(
        <div 
            className="popup info-popup"
            >
            <div className="flex">

                <div className="flex flex-col">
                    <p className="text-[12px]">{item.type === 'album' ? "Album" : "Playlist"}</p>
                    <p className="track-table__cell-link">{item.name}</p>
                    {renderContent()}
                    {item.type === 'bin' ? 
                        <BinPlaybackButton bin={item}/>
                    :<button onClick={(e) => handleClick(e)}className="green">Play</button>
                    }
                    <p>Track list here or other miscelania</p>
                </div>
            </div>

        </div>
    )
}

InfoPopup.propTypes = {
    item: PropTypes.object,
    coords: PropTypes.array
}