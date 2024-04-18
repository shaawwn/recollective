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
import PlaylistPanel from '../../panels/playlistpanel/PlaylistPanel'
import LayoutContainer from '../../../components/utility/containers/LayoutContainer'
import PanelContainer from '../../../components/utility/containers/PanelContainer'
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

import {getCurrentUserProfile} from '../../../utils/spotifyGetters'


// import SpotifyLogo from '../../../images/Spotify_Logo_RGB_Black.png'
export const UserContext = React.createContext()

function Dashboard({logout, code, search}) {
    const server = useContext(ServerContext).server
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const profile = useContext(AuthContext).profile
    // const [profile, setProfile] = useState()

    useEffect(() => {
        if(appToken) {
            // getUserProfile()
        }
        if(spotifyAccessToken) {
            getCurrentUserProfile(spotifyAccessToken)
            // console.log("PROFILE", profile)
        }
    }, [appToken, spotifyAccessToken])


    return(
        // Create Context that can be used for all children elements
        <UserContext.Provider value={{
            profile
        }}>
            <main className="dashboard red gap-4"> 
                {profile ?
                <>
                    <NavigationPanel />
                    <LayoutContainer>
                        <HeaderPanel 
                            logout={logout}
                            search={search}
                        />
                        <PanelContainer
                            search={search}
                        />
                    </LayoutContainer>

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

// function PanelContainer({profile}) {

//     return(
//         <section className="flex gap-4 bg-red-500 h-full">
//                 {/* Direct to playlist creation on first login */}
//                 {profile.onboarding === true ?
//                 // This is the div wrapper for planels in dashboard 
//                 <div className="flex flex-col gap-4 w-full"> 
//                     <PlaylistPanel />
//                 </div>
//                 :<div className="flex flex-col gap-4 w-full">
//                     <Panel />
//                     <Panel />
//                 </div>
//                 }
//                 <SidebarPanel />
//         </section>
//     )
// }
// function LayoutContainer({logout, search}) {
//     // component which holds panel elements within the dashboard
//     const profile = useContext(AuthContext).profile
//     return(
//         <section className="w-full flex flex-col gap-4">
//             <HeaderPanel 
//                 logout={logout}
//                 search={search}
//                 />
//             <PanelContainer profile={profile} />
//         </section>
//     )
// }


Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    code: PropTypes.string
}

export default Dashboard;