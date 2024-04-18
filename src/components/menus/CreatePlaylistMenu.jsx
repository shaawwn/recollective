import {useContext} from 'react'

// Playlist Header
import SearchInput from '../../components/search/SearchInput'
// Track Table

import {UserContext} from '../../App'
import {AuthContext} from '../../App'
import {PanelFunctionContext} from '../../components/utility/containers/PanelContainer'

function CreatePlaylistMenu({playlist}) {
    const search = useContext(PanelFunctionContext).search
    const profile = useContext(UserContext).profile
    const appToken = useContext(AuthContext).appToken
    const onboarding = true // remove for profile.onboarding

    function onboardingCreatePlaylist() {
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
            console.log("CREATING PLAYLIST TEST", data.playlist)
            // setPlaylist(data.playlist)
            // set onboarding to equal false
        }).catch((err) => {
            console.log("ERR", err)
        })
    }
    useEffect(() => {
        // handle onboarding playlist creation
        if(onboarding === true) {
            onboardingCreatePlaylist()
        }
    }, [])
    return(
        <section>
            {/* Header for metadata like in spotify */}
            {onboarding === true ? 
                <h1>Let&apos;s start by creating your first playlist!</h1>
            : null
            }
            <PlaylistHeader 
                playlist={playlist}
            />
            <SearchInput search={search}/>
            <TrackTable />

        </section>
    )
}

function CreatePlaylistIntroduction() {
    const profile = useContext(UserContext).profile
    const appToken = useContext(AuthContext).appToken
    // need to create a defauilt playlist
    const [playlist, setPlaylist] = useState()

    useEffect(() => {
        if(!playlist) {
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
                console.log("CREATING PLAYLIST TEST", data.playlist)
                setPlaylist(data.playlist)
                // set onboarding to equal false
            }).catch((err) => {
                console.log("ERR", err)
            })
        } 
    })
    return(
        <section>
            <h1>Let&apos;s start by creating your first playlist!</h1>
            {playlist ? <CreatePlaylistMenu playlist={playlist} />: null}
        </section>
    )
}

export default CreatePlaylistIntroduction