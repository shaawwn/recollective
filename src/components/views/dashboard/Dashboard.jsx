import React, {useState, useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
// import {AuthContext} from '../../../context/AuthProvider'
import {PlayerContext} from '../../../App'
import './dashboard.css'

import HubPanel from '../../panels/HubPanel'
import PlaylistGridView from '../../panels/PlaylistGridPanel'
import NavigationPanel from '../../panels/navigationpanel/NavigationPanel';
import SidebarPanel from '../../panels/sidebarpanel/Sidebar'
import Panel from '../../panels/panel/Panel'
import HeaderPanel from '../../panels/headerpanel/HeaderPanel'
import PlaylistPanel from '../../panels/playlistpanel/PlaylistPanel'
import VerticalFlexContainer from '../../utility/containers/VerticalFlexContainer'
import PanelContainer from '../../../components/utility/containers/PanelContainer'
import SearchPanel from '../../search/SearchPanel'
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

import {getCurrentUserProfile} from '../../../utils/spotifyGetters'

import usePlaylist from '../../../hooks/usePlaylist'
import useSearch from '../../../hooks/useSearch'
// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
export const UserContext = React.createContext() // this is redundant since AuthContext alreeady provides Profile

function Dashboard({logout, code}) {

    // State and context
    const server = useContext(ServerContext).server
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const profile = useContext(AuthContext).profile
    const spotifyProfile = useContext(AuthContext).spotifyProfile
    const [currentView, setCurrentView] = useState({view: 'hub', id: null}) // view: '<playlist/profile/album>', 'id': '<profile/playlistID>'

    const [mainPanel, setMainPanel] = useState()

    // hub, playlist, grid content, etc
    const [viewport, setViewport] = useState(currentView.view)

    // the currently playling playlist/album
    const [playlist, setPlaylistID, setActive, owned, removeTrackFromPlaylist, addTracksToPlaylist] = usePlaylist(appToken, spotifyAccessToken)
    const [search, setTokens, searchResults] = useSearch()
    



    // Methods and functions

    function displayViewport() {
        if(viewport === 'hub') {
            // display hub
        } else if(viewport === 'playlist') {
            // display playlist w/ playlist ID
        } else if(viewport === 'myPlaylists') {
            // display users playlists in grid view
        }
    }


    function renderPanels() {
        //hub
        if(currentView.view === 'hub') {
            return renderHubPanel()
        } else if(currentView.view === 'playlist') {
            return renderPlaylist()
           
        } else if(currentView.view === 'search') {
            return renderSearchPanel()
        } else {
            return(
                <div>
                    <h1>Render something here</h1>
                </div>
            )
        }
    }

    function renderHubPanel() {
        return(
            <HubPanel mainPanel={mainPanel}/>
        )
    }

    function renderPlaylist() {
        // Don't even render this unless playlist exists
        if(playlist) {
            return <PlaylistPanel playlist={playlist} />
        }
    }

    function renderSearchPanel() {

        // when there are searchResults in the header panel, render search Panel
        return(
            <SearchPanel />
        )
    }
    useEffect(() => {
        if(appToken) {
            // console.log("Profile with APP token", profile)
            // if(profile.onboarding === true) {
            //     fetch('http://localhost:3001/playlist', {
            //         headers: {
            //             'Authorization': `Bearer ${appToken}`
            //         }
            //     }).then((response) => response.json())
            //     .then((data) => {
            //         console.log("User playlists? ", data)
            //     }).catch((err) => {
            //         console.log("Error fetchign user playlists from app.", err)
            //     })
            // }
        }

        if(spotifyAccessToken) {
            // getCurrentUserProfile(spotifyAccessToken)
        }

        if(appToken && spotifyAccessToken) {
            setTokens({
                appToken,
                spotifyAccessToken
            })
        }

    }, [appToken, spotifyAccessToken])

    useEffect(() => {
        if(Object.keys(searchResults).length > 0) {
            setCurrentView({view: "search", id: null})
            // renderSearchPanel()
        } else {
            console.log("Search results in ELSE", searchResults)
        }
    }, [searchResults])

    return(
        <UserContext.Provider value={{
            profile,
            setCurrentView,
            playlist,
            setPlaylistID,
            setActive,
            removeTrackFromPlaylist,
            addTracksToPlaylist
        }}>
            {/* main here IS Dashboard */}
            <main className="dashboard red gap-4"> 
                {profile ?
                <>
                    <NavigationPanel />

                    <VerticalFlexContainer>
                        <HeaderPanel 
                            logout={logout}
                            search={search}
                            setCurrentView={setCurrentView}
                        />

                        <PanelContainer>
                            {profile.onboarding === false ?
                                <>
                                    <SwitchViews setViewport={setViewport}/>
                                    <PlaylistPanel />
                                </>   
                            :
                            // Normal view
                                <>
                                <SwitchViews setCurrentView={setCurrentView}/>


                                {renderPanels(currentView.view)}
                                {/* {viewport === 'hub' ? <HubPanel mainPanel={mainPanel} /> : null} */}
                                
                                </>
                        }
                        </PanelContainer>

                    </VerticalFlexContainer>

                </>
                :<DashboardSkeleton />}
            
        </main>
        </UserContext.Provider>
    )
}


// This is just for testing
// eslint-disable-next-line react/prop-types
function SwitchViews({setCurrentView}) {
    // on the click of a button switch the hub hasboard panel view
    // hub, playlist, profile, search, bins, artist

    function handleClick(view) {
        console.log("Changing to: ", view)
        setCurrentView({view: view, id: "664faf85e74d227435a9e4d5"})
    }
    return(
        <div className="flex">
            <button className="btn" onClick={() => handleClick('hub')}>Hub</button>
            <button className="btn" onClick={() => handleClick('playlist')}>Playlist</button>
            <button className="btn" onClick={() => handleClick('album')}>Album</button>
            <button className="btn" onClick={() => handleClick('artist')}>Artist</button>
            <button className="btn" onClick={() => handleClick('profile')}>Profile</button>
            <button className="btn" onClick={() => handleClick('bin')}>Bin</button>
            <button className="btn" onClick={() => handleClick('search')}>Search Result</button>
        </div>
    )
}


Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    code: PropTypes.string
}

export default Dashboard;