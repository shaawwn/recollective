import PropTypes from 'prop-types'
import {createPortal} from 'react-dom'
// import DefaultImage from '../assets/images/default.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faShuffle} from '@fortawesome/free-solid-svg-icons'
import {useApiContext} from '../context/barrel'
import {useWebplayerContext} from '../Dashboard'
import {BinPlaybackButton} from './barrel'




export default function InfoPopup({item, coords}) { // removed coords
    const {spotifyPlayerApi} = useApiContext() || {}
    const {activeDevices = []} = useWebplayerContext() || {}

    function handleClick(e, shuffle=false) {
        e.stopPropagation()
        const activeDeviceID= activeDevices.find(device => device.name === "RecollectiveApp");

        if(!activeDeviceID) {
            alert("Error on playback: No active device.")
            return
        }


        //     // create
        //     // need to have some kind of method to get tracks for this.

        //     // method 1: Play sequentially with no shuffle, just play starting with the first item.

        //     // method 2: Create a list of 20 or so tracks at random, and just play that.

        //     // console.log("Play either straight through, or random shuffle by creating arrays of 20 or so songs at random.", item.content)

        //     // pick a small seletion of songs at random, then create that playback array. While those songs are playing, add a larger array.

        // should probably have a shuffle option as well
        if(shuffle) {
            // console.log("Start shuffle playback", item)

            // check currently playing against the item to play here
            const currentlyPlaying = async () => {
                const response = await spotifyPlayerApi.getPlaybackState()
                if(!response) {
                    // no currenly playing, start playback
                }
                


            }

            spotifyPlayerApi.setShuffle(true, activeDeviceID.id)
        } else {
            console.log("Start normal playback")
            play(item.uri, null, 0, activeDeviceID.id)   
        }
        // play(item.uri, null, 0, activeDeviceID.id)

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
                        // Bin playback requires some extra steps than album/playlist hence seperate comp
                        <BinPlaybackButton bin={item}/>
                    :<div className="flex gap-[10px]">
                        <div 
                            onClick={(e) => handleClick(e)}
                            className="playback-btn play-btn"
                            >
                            <FontAwesomeIcon icon={faPlay} size="2x"/>
                        </div>
                        <div 
                            onClick={(e) => handleClick(e, true)}
                            className="playback-btn"
                            >
                            <FontAwesomeIcon 
                                icon={faShuffle} 
                                size="2x"/>
                        </div>
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