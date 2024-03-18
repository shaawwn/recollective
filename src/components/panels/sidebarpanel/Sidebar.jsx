import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard'
import './sidebar.css'

function SidebarPanel() {

    const user = useContext(UserContext)
    return (
        <nav className="sidebar panel">
            <h1>Feed Sidebar</h1>
            <p className="navigation__item">Your Profile</p>
            <p className="navigation__item">Library</p>
            <p className="navigation__item">Bins</p>
            <p className="navigation__item">Playlists</p>
            <p className="navigation__item">Created Playlists</p>
            <p className="navigation__item">Followed Playlists</p>
        </nav>
    )
}

export default SidebarPanel;