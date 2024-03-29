import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {AuthContext} from '../../App'
import {ServerContext} from '../../App'
import NoUserProfile from './404'

import HeaderPanel from '../../components/panels/headerpanel/HeaderPanel'

function Profile({profile}) {
    const params = useParams()
    const currentUserProfile = useContext(AuthContext).profile
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const server = useContext(ServerContext).server

    // console.log("APP AND SPOT", appToken, spotifyAccessToken)
    function getProfile(profileID) {
        fetch(server + `/profiles/${profileID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Profile page profile: ", data)
        }).catch((err) => {
            console.log("Error getting profile data for page")
        })
    }
    useEffect(() => {

        // you should be able to view a profile even if you aren't authenticated, you just can't interact with it
        const profileID = params.profileID
        // getProfile()
        if(profileID) {
            getProfile(profileID)
        }
        // fetch user profile with profileID, if no profile is found, rediret to 404 page
        if(currentUserProfile) {
            console.log("Checking profile status")
            if(profileID === currentUserProfile._id) {
                console.log("On own profile page")
            } else {
                console.log("On another users profile page")
            }
        }
        // 

    }, [profile])

    // 3 states to a Profile page:
        // Need to check in this order:
    // Current User's page - whcih grants additional access rights
    // User Profile but not current users
    // Any Profile while unauthenticated, which allows for no interaction (as there is no credentials, user details, etc)
    return (
        <>
            <HeaderPanel />
            <h1>User Profile Page</h1>
        </>
    )
}

export default Profile