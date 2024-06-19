import {useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {UserContext} from '../../views/dashboard/Dashboard'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
// import './headerpanel.css'
// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
import {Link} from 'react-router-dom'
import SearchInput from '../../search/SearchInput'

function HeaderPanel({logout, search, setCurrentView}) {

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
                                <a className="logout-btn" href="https://www.spotify.com/logout">Logout of Spotify</a>
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
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const spotifyProfile = useContext(AuthContext).spotifyProfile
    
    function importSpotifyPlaylists() {
        // import a users spotify playlists, which creates playlist objects in the App db
        
        // get users playlists

        // create playlists in the app for that user
        fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("IMPORTING USERS PLAYLISTS", data)
            data.items.forEach((item) => {
                console.log("Playlist: ", item.name)
                fetch('http://localhost:3001/playlist', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${appToken}`
                    },
                    body: JSON.stringify({
                        spotifyID: item.id
                    })
                }).then((response) => response.json())
                .then((data) => {
                    console.log("Creating playlist", data.playlist._id)
                })
            })
        })
    }

    function createSpotifyPlaylist() {
        // need spotify userID
        fetch(`https://api.spotify.com/v1/users/${spotifyProfile.id}/playlists`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            },
            body: JSON.stringify({
                name: "My awesome playlist"
            })
        }).then((response) => response.json())
        .then((data) => {
            // successful response 201 returns created playlist
            console.log("Created Spotify Playlist", data)
            // createAppPlaylist(data.id)
        })
    }

    function createAppPlaylist(spotifyID) {
        fetch('http://localhost:3001/playlist', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${appToken}`
            },
            body: JSON.stringify({
                spotifyID: spotifyID
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log("Creating playlist", data.playlist._id)
            setCurrentView({view: 'playlist', id: data.playlist._id})
            // set viewport here before changing, and pass playlist ID data._id
        })
    }
    function _createAppPlaylist() {
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
        createSpotifyPlaylist()
        // setViewport('playlist')
        console.log("Creating playlist and opening")
    }

    function openCreateBin() {
        console.log("Creating bin and opening")
    }


    return(
        <div>
            <button className="btn" onClick={openCreatePlaylist}>+ Playlist</button>
            <button className="btn" onClick={openCreateBin}>+ Bin</button>
            <button className="btn" onClick={importSpotifyPlaylists}>Import Playlists</button>
        </div>
    )
}

HeaderPanel.propTypes = {
    logout: PropTypes.func,
    spotifyAccessToken: PropTypes.string,
    search: PropTypes.func,
    setCurrentView: PropTypes.func
}
export default HeaderPanel