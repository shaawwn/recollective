import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
import {useWebplayerContext} from '../Dashboard'


export default function PlaybackButton() {

    const {player, is_active, is_paused} = useWebplayerContext()

    function togglePlayback() {
        if(is_paused === true) {
            // setPause icon
            player.current.resume()
        } else {
            // set Play icon
            player.current.pause() 
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

