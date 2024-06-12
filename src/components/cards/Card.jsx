import {useContext} from 'react';
import {PropTypes} from 'prop-types';
import {UserContext} from '../views/dashboard/Dashboard'
// import './card.css'
// import Chrono from '../../images/chrono.jpeg'
import DefaultImage from '../../images/default.png'

function Card({playlist}) {

    const setCurrentView = useContext(UserContext).setCurrentView
    function handleClick() {
        // clicking on a playlist should open the playlist
        setCurrentView({view: "playlist", id: playlist.id})
        console.log("Opening playlist...", playlist.id)
    }

    // function playPlaylist() {
    //     // there should be a small button to play the playlist that doesn't directly to the playlist page
    // }

    return(
        <div className="card" onClick={handleClick}>
            {/* Image */}
            {playlist.images !== null ? 
                <img className="card__image" src={playlist.images[0].url} /> 
                :<img className="card__image" src={DefaultImage} />}
            {/* Title */}
            <p className="card__tile">{playlist.name}</p>
        </div>
    )
}

Card.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.string,
        images: PropTypes.array,
        name: PropTypes.string,
    })
}
export default Card