import {useState, useEffect} from 'react';
// import './panels.css'
import Card from '../cards/Card'
import PlaylistGridView from './PlaylistGridView'

function HubPanel() {


    return (
        <section className="hub-panel panel flex flex-col gap-4">
            {/* <h1>Recently or Popular playlists</h1> */}
            <RecentlyPlayed />
            <PlaylistGridView />
        </section>
    )
}

function RecentlyPlayed() {

    return(
        <section className="recently-played flex flex-col gap-4">
            <h1>Recently played</h1>
            <div className="scroll-container">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

                {/* This is where the break is */}
                <Card />
                {/* <Card />
                <Card />
                <Card /> */}
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