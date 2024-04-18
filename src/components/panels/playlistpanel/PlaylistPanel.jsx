import {useContext, useEffect, useState} from 'react';
// import {PropTypes} from 'prop-types';
import './playlist.css'
import DefaultPlaylistCover from '../../../images/default.png'

import SearchInput from '../../search/SearchInput'
import TrackTable from '../../tracktable/TrackTable'

import {PanelFunctionContext} from '../../utility/containers/PanelContainer'
import {UserContext} from '../../views/dashboard/Dashboard'
import {AuthContext} from '../../../App'

function PlaylistPanel() {
    const onboarding = true
    const profile = useContext(UserContext).profile
    return(
        <section className="panel panel__playlist">
            {onboarding === true ? <CreatePlaylistIntroduction 
                profile={profile}
            />
            :
            <CreatePlaylistMenu 
                profile={profile}
            />}
        </section>
    )
}

// These are sub components of the main playlist panel, and include the functionality of creating a new playlist
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

/*
    The meat of creating a playlist, includes inputs for name, description, adding tags, and a small search bar for adding songs
*/
function CreatePlaylistMenu({playlist}) {
    const search = useContext(PanelFunctionContext).search
    return(
        <section>
            {/* Header for metadata like in spotify */}
            <PlaylistHeader 
                playlist={playlist}
            />
            <SearchInput search={search}/>
            <TrackTable />

        </section>
    )
}

// this needs to take profile information
function PlaylistHeader({playlist}) {
    const profile = useContext(UserContext).profile
    console.log("PLAYLIST IN HEADER", playlist)
    return(
        <div id="playlist-meta"className="flex">
        <img className="panel__playlist__cover-image"src={DefaultPlaylistCover}></img>
        <div className="flex flex-col">
            <h2>{playlist.title}</h2>
            <p>
                Here is a user created playlist with a simple description
            </p>
            <p>{playlist.author}</p>
            <p>Ambient, ethereal, lofi</p>
        </div>
    </div>
    )
}

export default PlaylistPanel

// There are multiple states for a playlist panel, 