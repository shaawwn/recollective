import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard';

import Card from '../../cards/Card'

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