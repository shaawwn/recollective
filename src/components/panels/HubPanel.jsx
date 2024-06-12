import {useState, useEffect, useContext} from 'react';
// import './panels.css'
import Card from '../cards/Card'
import PlaylistGridView from './PlaylistGridPanel'
import BinPanel from './BinPanel'
import {AuthContext} from '../../App'
// Need Spotify user account id for here
function HubPanel({mainPanel}) {
    const spotifyProfile = useContext(AuthContext).spotifyProfile

    useEffect(() => {
        // console.log("Hub profile", spotifyProfile)
    }, [])
    return (
        <section className="hub-panel panel flex flex-col gap-4">
            {/* If recently Play, render, else recommend */}

            {/* Or, have the panel or null that gets placed at the top */}
            {mainPanel ? <h1>Main Panel</h1> : <RecentlyPlayed />}
            {/* <RecentlyPlayed /> */}
            <BinPanel />

            {/* If user playlists display, otherwise recommendations */}
            <PlaylistGridView 
                filterType={'user'}
                spotifyProfile={spotifyProfile}
            />
            <PlaylistGridView 
                filterType={'all'}
            />

        </section>
    )
}

function RecentlyPlayed() {

    return(
        <section className="recently-played panel flex flex-col gap-4">
            <h1>Recently played</h1>
            <div className="scroll-container">
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}

                {/* This is where the break is */}
                {/* <Card /> */}
            </div>

        </section>
    )
}


// function PlaylistGridView() {

//     return(
//         <section className="flex flex-col gap-4">
//             <h1>Your created playlists</h1>
//             <div className="flex flex-wrap">
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//                 <Card />
//             </div>
//         </section>
//     )
// }

export default HubPanel