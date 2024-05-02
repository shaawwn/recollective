import {useState, useEffect} from 'react';


function useProfile(appToken, server) {

    const [profile, setProfile] = useState()

    function getUserProfile() {
        fetch(server + '/profiles/me', {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("No user data", response.json())
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
    }, [appToken])

    return profile
}

export default useProfile