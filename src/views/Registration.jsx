import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom'

import Navbar from '../components/Navbar'
import {ServerContext} from '../App'


function Registration({ setAuthenticated }) {
    const [redirect, setRedirect] = useState(false)
    const server = useContext(ServerContext).auth_server

    function register() {
        const username = document.getElementsByName('username')[0].value
        const email = document.getElementsByName('email')[0].value
        const password = document.getElementsByName('password')[0].value
        fetch(server + '/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then((response) => {
            if(!response.ok) {
                // throws a 409 error if user email exists in db
                throw new Error ("Error creating user")
            }
            return response.json()
        }).then(() => {
            fetch(server + '/login', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((response) => {
                if(!response.ok) {
                    throw new Error ("Error logging in after register")
                }
                return response.json()
            }).then(() => {
                setRedirect(true)
                setAuthenticated(true)
            }).catch((err) => {
                console.log("Error: ", err)
            })
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }

    function handleSubmit() {
        console.log("Handingling submit.")
        register()
    }

    if(redirect) {
        return <Navigate to="/" replace />
    }
    return(
        <div className="landing">
            <Navbar />
            
            {/* Below navbar there is a big container div split in two  with description in one, and login form in other*/}
            <div className="landing__content">
                <section className="landing__content-summary">
                    <p className="text-6xl font-bold">RECORD COLLECTIVE</p>
                    {/* <p className="text-6xl font-bold">RE:COLLECTIVE</p> */}
                    <div className="" style={{"width": "50%"}}>
                        <p className="landing__content-summary__text">Discover and share the soundtrack of your life with RECORDCOLLECTIVE, an app where you curate personal playlists, explore diverse musical collections, and connect with a community of music lovers. Create, discover, and share your favorite tunes in a vibrant, music-driven social network.</p>
                    </div>

                </section>
                <section className="landing__login-form">
                    <input className="text-3xl" name="username" type="text" placeholder="username"/>
                    <input className="text-3xl" name="email" type="text" placeholder="email" />
                    <input className="text-3xl" name="password" type="text" placeholder="password" />
                    <button onClick={handleSubmit}>Sign up!</button>
                    <p>Don&apost have an account? Register here!</p>
                </section>
            </div>

        </div>
    )
}

Registration.propTypes = {
    setAuthenticated: PropTypes.func.isRequired
}

export default Registration