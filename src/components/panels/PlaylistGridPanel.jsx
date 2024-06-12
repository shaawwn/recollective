import {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../../App'

import Card from '../cards/Card'


function PlaylistGridPanel({filterType, spotifyProfile}) {

    const spotifyAccessToken = useContext(AuthContext).spotifyAccessToken
    const [playlists, setPlaylists] = useState([])



    // also include followed playlist option or all option
    function dummyCards() {
        // align to center using invisible dummy cards

        return (
            <div className="dummy-card">

            </div>
        )
    }
    

    function getCurrentUsersPlaylists() {
        fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                'Authorization': `Bearer ${spotifyAccessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            setPlaylists(data.items)
        })
    }

    useEffect(() => {
        if(spotifyAccessToken) {
            getCurrentUsersPlaylists()
        }
    }, [])
    return(
        <section className="panel flex flex-col gap-4 bg-red-500">
            {filterType === 'user' ? <h1>Created Playlists</h1>:<h1>All Playlists</h1>}
 

            <div className="grid-view content-start">
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}
                {playlists.length > 0 ? 
                    <>
                        {playlists.map((playlist, index) =>
                        
                            <Card 
                                key={index}
                                playlist={playlist}
                                />
                        )}
                    </>
                : <p>Add Some playlists!</p>
                }
            </div>
        </section>
    )
}

export default PlaylistGridPanel