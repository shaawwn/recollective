import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
import {useWebplayerContext} from '../Dashboard'


// I can use this in the playlist/album views as well with some modifications

// 1) Inside the playlist/album view, it needs to be exclusive to THAT view, so navigating to another album/playlist should NOT show as a pause (if playing)

// It also needs to START PLAYBACK if in a view. The button in webpalyer however, should not start playback if there is not current song.


export default function PlaybackButton({context}) {

    // direct access to the webplayer
    const {player, is_active, is_paused, current_track} = useWebplayerContext()


    // context is the playlist or album that is to be played

    // check between CURRENT PLAYING and whatever the context is, that is, if a playlist is current, an album view would not match context with current playing here

    function checkContext() {
        // if context matches currently playing content (playlist = playlist), thenr eflect that in the UI of the playlist view and features (can pause, play)

        // if it does NOT match, then display correctly in UI as NOT plying, and hitting the play button should begin a new playback of whatever the context is (if CURRENT is some palylist, but the view is some album, then hittin PLAY should begin palyback of that album)

        // can check album pretty easily I think, but playlist is more difficult.

        // OR can add an additional attribute to hooks for palylist, album, such as "ACTIVE" and if context matches ACTIVE, then add relevant features. Could work on bin playback as well.

        // for nmow I could just scrap this complexity, andjust use playback
        console.log("PLAYER", current_track)
    }

    function startPlayback() {
        // start playback on new content (album, playlist)
    }



    function togglePlayback() {
        // play/pause currently playing content
        if(is_paused === true) {
            // setPause icon
            player.current.resume()
            console.log("Need to resume progress here")
        } else {
            // set Play icon
            player.current.pause() 
            console.log("Need to pause progress here")
        }
    }

    return(
        <div className="w-[25px] text-center playback-btn-white">
            {is_active === false ? 
                <FontAwesomeIcon 
                icon={faPlay} 
                size="2x"/>
            :<FontAwesomeIcon 
                onClick={togglePlayback}
                icon={is_paused === true ? faPlay : faPause} 
                size="2x"/>
            }
        </div>
    )
}


PlaybackButton.propTypes = {
    context: PropTypes.object
}