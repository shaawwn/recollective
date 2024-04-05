import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard';

import Card from '../../cards/Card'

// So Panel(s) need to be more dynamic depending on the content.

/*
    Panel types:
        Playlist Cover Grid - user playlists in grid form showing art
        User Playlist's Table - User playlists organized in table form
        Playlist Tracks - All tracks in a playlist in table form (like spotify)
        Spotify Search - Responsive search as you type
            - Spotify completely refreshes the entire window as you search, with top result showing as a card

*/

function Panel() {
    const user = useContext(UserContext)
    return(
        <section className="panel flex flex-col gap-4">
            <h1>Your Playlists</h1>
            <div className="flex flex-wrap">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}

export default Panel