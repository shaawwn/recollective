// import {useState, useEffect, useContext} from 'react';
// import {UserContext} from '../../views/dashboard/Dashboard'
// import './navigationpanel.css'
import {Link} from 'react-router-dom'



function NavigationPanel() {

    // const user = useContext(UserContext)
    return (
        <div className="wrapper">
            <nav className="navigation panel">
                <Link to="/" className="text-3xl text-black cursor-pointer no-underline">Home</Link>
                <p className="navigation__item">Your Profile</p>
                <p className="navigation__item">Library</p>
                <p className="navigation__item">Bins</p>
                <p className="navigation__item">Playlists</p>
                <p className="navigation__item">Created Playlists</p>
                <p className="navigation__item">Followed Playlists</p>
            </nav>
        </div>

    )
}

export default NavigationPanel;