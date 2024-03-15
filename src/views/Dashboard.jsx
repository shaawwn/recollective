import {useState, useEffect, useContext} from 'react';
import {ServerContext} from '../App'
import useAuth from '../hooks/useAuth';

import NavigationPanel from '../components/panels/NavigationPanel';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';

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
        <>
            {profile ?
            <>
                <h1>Welcome to RE:COLLECTIVE, {profile.username}</h1> 

                {/* Dashboard is a container that holds all Panel elements for a user
                
                    The Dashboard itself is a flexbox that holds the navigation Panel on the left, and main content on the right.

                    // Navigation Panel is collapsable

                    // Main panel is a flexbox that holds content vertically
                */}
            </>
            :<DashboardSkeleton />}
            <button onClick={logout}>Logout</button>
            
        </>
    )
}

export default Dashboard;