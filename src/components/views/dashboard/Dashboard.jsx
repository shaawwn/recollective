import React, {useState, useEffect, useContext} from 'react';
import {PropTypes} from 'prop-types'
import {ServerContext} from '../../../App'
import {AuthContext} from '../../../App'
import useAuth from '../../../hooks/useAuth';
import './dashboard.css'

import NavigationPanel from '../../panels/navigationpanel/NavigationPanel';
import SidebarPanel from '../../panels/sidebarpanel/Sidebar'
import Panel from '../../panels/panel/Panel'
import HeaderPanel from '../../panels/headerpanel/HeaderPanel'
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

import {getCurrentUserProfile} from '../../../utils/spotifyGetters'


// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
export const UserContext = React.createContext()

function Dashboard({logout, code}) {
    const server = useContext(ServerContext).server
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const [profile, setProfile] = useState()

    function getUserProfile() {
        fetch(server + '/profiles/me', {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("No user data")
            }
            return response.json()
        }).then((data) => {
            console.log("User data", data)
            setProfile(data.user)
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }

    useEffect(() => {
        if(appToken) {
            getUserProfile()
        }
        if(spotifyAccessToken) {
            getCurrentUserProfile(spotifyAccessToken)
        }
    }, [appToken, spotifyAccessToken])


    return(
        // Create Context that can be used for all children elements
        <UserContext.Provider value={profile}>
            <main className="dashboard red gap-4">
                {profile ?
                <>
                    {/* <h1>Welcome to RE:COLLECTIVE, {profile.username}</h1>  */}
                    <div className="wrapper">
                        <NavigationPanel />
                    </div>
                    {/* <NavigationPanel /> */}

                    {/* Second container to hold vertical panels */}
                    <div className="w-full flex flex-col gap-4">
                        <HeaderPanel 
                            logout={logout}
                            />
                        {/* {profile.onboarding === true ? <h1>Create First Playlist</h1> : null} */}
                        <div className="flex gap-4">
                            {profile.onboarding === true ? 
                            <div className="flex flex-col gap-4">
                                <Panel />
                                <h1>Welcome to Re:Collective! Let's start by creating your first playlist!</h1>
                            </div>
                            :<div className="flex flex-col gap-4">
                                <Panel />
                                <Panel />
                            </div>
                            }
                            <SidebarPanel />
                        </div>
                        {/* <button onClick={logout}>Logout</button> */}
                        {/* <SidebarPanel /> */}
                    </div>
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