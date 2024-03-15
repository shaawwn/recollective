import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {ServerContext} from '../App'

import Navbar from '../components/Navbar'


function Landing({login}) {

    function register() {
        console.log("Registering account.")
    }

    function handleClick() {
        console.log("Clicking login button.")
        login()
    }
    return(
        <div className="landing">
            <Navbar />
            
            <div className="landing__content">
                <section className="landing__content-summary">
                    <p className="text-6xl font-bold">RECORD COLLECTIVE</p>
                    {/* <p className="text-6xl font-bold">RE:COLLECTIVE</p> */}
                    <div className="" style={{"width": "50%"}}>
                        <p className="landing__content-summary__text">Discover and share the soundtrack of your life with RECORDCOLLECTIVE, an app where you curate personal playlists, explore diverse musical collections, and connect with a community of music lovers. Create, discover, and share your favorite tunes in a vibrant, music-driven social network.</p>
                    </div>

                </section>
                <section className="landing__login-form">
                    <input className="text-3xl" type="text" id="username-login" placeholder="username"/>
                    <input className="text-3xl" type="text" id="username-password" placeholder="password" />
                    <button onClick={handleClick}>Login</button>
                    <p>Don't have an account? <Link to="/register">Register</Link> here!</p>
                </section>
            </div>

        </div>
    )
}

export default Landing