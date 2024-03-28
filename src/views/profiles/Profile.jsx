import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {AuthContext} from '../../App'

function Profile({profile}) {
    const params = useParams()
    const currentUserProfile = useContext(AuthContext).profile
    const appToken = useContext(AuthContext).appToken
    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken

    // console.log("APP AND SPOT", appToken, spotifyAccessToken)

    useEffect(() => {

        // you should be able to view a profile even if you aren't authenticated, you just can't interact with it
        const profileID = params.profileID
        console.log("PROFILEID: ", profileID, "CURRENT USER", currentUserProfile)
        // fetch the profile, but check if it is the current use
        if(profileID === currentUserProfile._id) {
            console.log("same user")
        } else {
            console.log("Not the Same user")
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
            <h1>User Profile Page</h1>
        </>
    )
}

export default Profile