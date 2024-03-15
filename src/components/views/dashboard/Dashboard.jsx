import React, {useState, useEffect, useContext} from 'react';
import {ServerContext} from '../../../App'
import useAuth from '../../../hooks/useAuth';
import './dashboard.css'

import NavigationPanel from '../../panels/navigationpanel/NavigationPanel';
import Panel from '../../panels/panel/Panel'
import HeaderPanel from '../../panels/headerpanel/HeaderPanel'
import DashboardSkeleton from '../../skeletons/DashboardSkeleton';

export const UserContext = React.createContext()

function Dashboard({logout}) {
    const server = useContext(ServerContext).server
    const [appToken, spotifyToken] = useAuth()
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
            // console.log("User data", data)
            setProfile(data.user)
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }

    useEffect(() => {

        // console.log("CONTEXT", server)
        // console.log("App and spot", appToken, spotifyToken)
        if(appToken) {
            getUserProfile()
        }
    }, [appToken, spotifyToken])

    useEffect(() => {
        if(profile) {
            console.log("PROFILE", profile)
        }
    }, [profile])

    return(
        // Create Context that can be used for all children elements
        <UserContext.Provider value={profile}>
                    <main className="dashboard red gap-4">
                        {profile ?
                        <>
                            {/* <h1>Welcome to RE:COLLECTIVE, {profile.username}</h1>  */}
                            <NavigationPanel />

                            {/* Second container to hold vertical panels */}
                            <div className="w-full flex flex-col gap-4">
                                <HeaderPanel logout={logout}/>
                                <Panel />
                                <Panel />
                                {/* <button onClick={logout}>Logout</button> */}
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

export default Dashboard;