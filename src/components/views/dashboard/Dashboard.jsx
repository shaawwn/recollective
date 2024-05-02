import React, {useState, useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
import {PlayerContext} from '../../../App'
import './dashboard.css'

import HubPanel from '../../panels/HubPanel'
import PlaylistGridView from '../../panels/PlaylistGridView'
import NavigationPanel from '../../panels/navigationpanel/NavigationPanel';
import SidebarPanel from '../../panels/sidebarpanel/Sidebar'
import Panel from '../../panels/panel/Panel'
import HeaderPanel from '../../panels/headerpanel/HeaderPanel'
import PlaylistPanel from '../../panels/playlistpanel/PlaylistPanel'
import VerticalFlexContainer from '../../utility/containers/VerticalFlexContainer'
import PanelContainer from '../../../components/utility/containers/PanelContainer'
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

import {getCurrentUserProfile} from '../../../utils/spotifyGetters'


// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
export const UserContext = React.createContext() // this is redundant since AuthContext alreeady provides Profile

function Dashboard({logout, code, search}) {
    const server = useContext(ServerContext).server
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const profile = useContext(AuthContext).profile
    const currentlyPlaying = useContext(PlayerContext).currentlyPlaying

    function handleOnboarding() {
        // onboarding a user involves prompting them for additional details, as well as creating their first playlist
        fetch('http://localhost:3001/playlist', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${appToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: "My awesome test playlist"
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log("CREATING PLAYLIST IN DASHBOARD ONBOARDING", data.playlist)
            // setPlaylist(data.playlist)
            // set onboarding to equal false
        }).catch((err) => {
            console.log("ERR", err)
        })
    }

    // As for what renders in Dashboard, this needs to be refined.

    function toRender() {
        // What should be rendered in Dashboard? panels can change depending on what a user has selected. Default View is Users recent playlists, followed by all playlists, followed by users followed playlists and so on. However, clicking on a playlist in a panel should then bring up that playlist.

        // it is still in the dashboard, however, instead of playlist panels, it would display the playlistPanel instead.
    }


    useEffect(() => {
        if(appToken) {
            console.log("App token")
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

        // Get Spotify profile data
        if(spotifyAccessToken) {
            console.log("Spotify access")
            // getCurrentUserProfile(spotifyAccessToken)
        }

    }, [appToken, spotifyAccessToken])

    return(
        <UserContext.Provider value={{
            profile
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
                        />
                        <PanelContainer>
                            {profile.onboarding === false ?
                                <>
                                    <PlaylistPanel />
                                </>   
                            :
                                <>
                                    <HubPanel />
                                    {/* <SidebarPanel /> */}
                                    {/* <PlaylistGridView /> */}
                                </>
                        }
                        </PanelContainer>

                    </VerticalFlexContainer>

                    {/* Dashboard is a container that holds all Panel elements for a user
                    
                        The Dashboard itself is a flexbox that holds the navigation Panel on the left, and main content on the right.

                        // Navigation Panel is collapsable

                        // Main panel is a flexbox that holds content vertically
                    */}
                </>
                :<DashboardSkeleton />}
            
        </main>
        </UserContext.Provider>
    )
}



Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    code: PropTypes.string
}

export default Dashboard;