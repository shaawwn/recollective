import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function Login({setAuthenticated}) {
    function test() {
        fetch('http://localhost:3000/test', {
            credentials: "include"
        }).then((response) => response.json())
        .then((data) => {
            console.log("TEST", data)
        }).catch((err) => {
            console.log("TEST ERR", err)
        })
    }
    function login() {
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;
        fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json())
        .then((data) => {
            setAuthenticated(true)
            console.log("LOGGED IN", data)
        }).catch((err) => {
            console.log("ERR LOGGING IN", err)
        })
    }

    function register() {
        const username = document.getElementById('username-register').value
        const password = document.getElementById('password-register').value
        const email = document.getElementById('email-register').value
        fetch(`http://localhost:3000/register`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("Error registering user.")
            } 
            return response.json()
        }).then((data) => {
            // set some authentication here, or rather, login using credentials
            console.log("User registered.", data)
        }).catch((err) => {
            console.log("ERROR", err)
        })
    }
    return(
        <>
            <div className="flex flex-col w-96">
                <div className="flex flex-col">
                    <input type="text" id="username-register" placeholder="Enter username"/>
                    <input type="text" id="password-register" placeholder="Enter password"/>
                    <input type="text" id="email-register" placeholder="Enter email"/>
                    <button onClick={register}>Register</button>
                </div>
                <div className="flex flex-col">
                    <input type="text" id="username-login" placeholder="Enter username"/>
                    <input type="text" id="password-login" placeholder="Enter password"/>
                    <button onClick={login}>Login</button>
                </div>
                {/* <button onClick={logout}>Logout</button> */}
                <button onClick={test}>Test auth</button>
            </div>
        
        </>
    )
}

export default Login