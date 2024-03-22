import {useContext} from 'react';
import {PropTypes} from 'prop-types'
import {UserContext} from '../../views/dashboard/Dashboard'
import {ServerContext} from '../../../App'
import './headerpanel.css'
// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'

function HeaderPanel({logout, spotifyAccessToken}) {

    const user = useContext(UserContext)
    const spotify = useContext(ServerContext).spotify_url

    return(
        <header className="header panel">
            <h1>Hello, {user.username}</h1>
            {spotifyAccessToken ? 
                <>
                    {/* Add spotify logo around here */}
                    <p>Powered by Spotify</p>  

                    <a className="logout-btn" href="#">Logout of Spotify</a>
                </>
                :<a href={spotify}>Authorize Spotify</a>}
            <button className="btn" onClick={logout}>Logout</button>
        </header>
    )
}


HeaderPanel.propTypes = {
    logout: PropTypes.func,
    spotifyAccessToken: PropTypes.string
}
export default HeaderPanel