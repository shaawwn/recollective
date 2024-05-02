import {useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {UserContext} from '../../views/dashboard/Dashboard'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
// import './headerpanel.css'
// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
import {Link} from 'react-router-dom'
import SearchInput from '../../search/SearchInput'

function HeaderPanel({logout, search}) {

    // const user = useContext(UserContext)
    const profile = useContext(AuthContext).profile
    const spotify = useContext(ServerContext).spotify_url
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken

    useEffect(() => {
        // if(profile) {
        //     console.log("User")
        // } else {
        //     console.log("No user")
        // }
    }, [profile])

    return(
        <header className="header panel">
            {profile ? 
                <>  
                    <h1>Hello, {profile.username}</h1>
                        {spotifyAccessToken ? 
                        <>
                            {/* Add spotify logo around here */}
                            <SearchInput search={search}
                            />
                            <div className="flex-col">
                                <p>Powered by Spotify</p>  
                                <a className="logout-btn" href="#">Logout of Spotify</a>
                            </div>
                        </>
                        :<a href={spotify}>Authorize Spotify</a>}
                        <button className="btn" onClick={logout}>Logout</button>
                </>
                : <button className="btn" onClick={'#'}>Login</button>}

            {/* {spotifyAccessToken ? 
                <>
                    <p>Powered by Spotify</p>  

                    <a className="logout-btn" href="#">Logout of Spotify</a>
                </>
                :<a href={spotify}>Authorize Spotify</a>} */}
            {/* <button className="btn" onClick={logout}>Logout</button> */}
        </header>
    )
}


HeaderPanel.propTypes = {
    logout: PropTypes.func,
    spotifyAccessToken: PropTypes.string
}
export default HeaderPanel