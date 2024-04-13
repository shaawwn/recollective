import {useState, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import './playlist.css'
import DefaultPlaylistCover from '../../../images/default.png'
function PlaylistPanel() {
    const onboarding = true

    return(
        <section className="panel panel__playlist">
            {onboarding === true ? <CreatePlaylistIntroduction />:<CreatePlaylistMenu />}
        </section>
    )
}

// These are sub components of the main playlist panel, and include the functionality of creating a new playlist
function CreatePlaylistIntroduction() {

    return(
        <section>
            <h1>Let's start by creating your first playlist!</h1>
            <CreatePlaylistMenu />
        </section>
    )
}

/*
    The meat of creating a playlist, includes inputs for name, description, adding tags, and a small search bar for adding songs
*/
function CreatePlaylistMenu() {
    return(
        <section>
            {/* Header for metadata like in spotify */}
            <PlaylistHeader />
            <TrackTable />

        </section>
    )
}

function PlaylistHeader() {

    return(
        <div id="playlist-meta"className="flex">
        <img className="panel__playlist__cover-image"src={DefaultPlaylistCover}></img>
        <div className="flex flex-col">
            <h2>My fancy new playlist header component</h2>
            <p>
                Here is a user created playlist with a simple description
            </p>
            <p>shawn</p>
            <p>Ambient, ethereal, lofi</p>
        </div>
    </div>
    )
}

function TrackTable() {

    return(
        <section id="track-table" className="bg-black w-full">
            <p className="text-white">Songs here in table</p>
        </section>
    )
}
export default PlaylistPanel

// There are multiple states for a playlist panel, 