import {useState, useEffect} from 'react';
// import './card.css'
import Chrono from '../../images/chrono.jpeg'

function Card() {

    return(
        <div className="card">
            {/* Image */}
            <img className="card__image" src={Chrono} />
            {/* Title */}
            <p className="card__tile">Chrono Trigger</p>
        </div>
    )
}

export default Card