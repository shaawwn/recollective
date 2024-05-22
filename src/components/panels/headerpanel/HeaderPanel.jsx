import {useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {UserContext} from '../../views/dashboard/Dashboard'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
// import './headerpanel.css'
// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
import {Link} from 'react-router-dom'
import SearchInput from '../../search/SearchInput'

function HeaderPanel({logout, search,setCurrentView}) {

    // const user = useContext(UserContext)
    const profile = useContext(AuthContext).profile
    const spotify = useContext(ServerContext).spotify_url
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken

    useEffect(() => {

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
                        <ControlPanel setCurrentView={setCurrentView}/>
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

function ControlPanel({setCurrentView}) {
    // hub component for buttons to create playlists/bins modify content, etc
    const appToken = useContext(AuthContext).appToken

    function createPlaylist() {
        // post request to create a playlist
        
        fetch('http://localhost:3001/playlist', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Creating playlist", data.playlist._id)
            setCurrentView({view: 'playlist', id: data.playlist._id})
            // set viewport here before changing, and pass playlist ID data._id
        })
    }

    function openCreatePlaylist() {
        createPlaylist()
        setViewport('playlist')
        console.log("Creating playlist and opening")
    }

    function openCreateBin() {
        console.log("Creating bin and opening")
    }

    function handleCreatePlaylist() {

        createPlaylist()
    }
    return(
        <div>
            <button className="btn" onClick={openCreatePlaylist}>+ Playlist</button>
            <button className="btn" onClick={openCreateBin}>+ Bin</button>
        </div>
    )
}
HeaderPanel.propTypes = {
    logout: PropTypes.func,
    spotifyAccessToken: PropTypes.string
}
export default HeaderPanel