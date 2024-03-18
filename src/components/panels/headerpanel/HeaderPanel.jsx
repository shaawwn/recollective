import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard'
import {ServerContext} from '../../../App'
import './headerpanel.css'
import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'

function HeaderPanel({logout, code}) {

    const user = useContext(UserContext)
    const spotify = useContext(ServerContext).spotify_url
    return(
        <header className="header panel">
            <h1>Hello, {user.username}</h1>
            {code ? 
                <>
                    <p>Powered by Spotify</p> 
                    <a href="#">Logout of Spotify</a>
                </>
                :<a href={spotify}>Authorize Spotify</a>}
            <button className="btn" onClick={logout}>Logout</button>
        </header>
    )
}

export default HeaderPanel