// import {useState, useEffect, useContext} from 'react';
// import {UserContext} from '../../views/dashboard/Dashboard'
// import './navigationpanel.css'
import {PropTypes} from 'prop-types'
import {Link} from 'react-router-dom'



function NavigationPanel({setCurrentView}) {

    // const user = useContext(UserContext)
    
    function handleClick(view) {
        setCurrentView({view: view, id: null})
    }
    return (
        <div className="wrapper">
            <nav className="navigation panel">
                <Link to="/" className="text-3xl text-black cursor-pointer no-underline" onClick={() => handleClick('hub')}>Home</Link>
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

NavigationPanel.propTypes = {
    setCurrentView: PropTypes.func
}
export default NavigationPanel;