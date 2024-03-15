import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard'
import './navigationpanel.css'
function NavigationPanel() {

    const user = useContext(UserContext)
    return (
        <nav className="navigation panel">
            <p className="navigation__item">Your Profile</p>
            <p className="navigation__item">Library</p>
            <p className="navigation__item">Bins</p>
            <p className="navigation__item">Playlists</p>
            <p className="navigation__item">Created Playlists</p>
            <p className="navigation__item">Followed Playlists</p>
        </nav>
    )
}

export default NavigationPanel;