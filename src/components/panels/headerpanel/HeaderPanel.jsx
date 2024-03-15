import {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../views/dashboard/Dashboard'
import './headerpanel.css'

function HeaderPanel({logout}) {

    const user = useContext(UserContext)
    
    return(
        <header className="header panel">
            <h1>Hello, {user.username}</h1>
            <button className="btn" onClick={logout}>Logout</button>
        </header>
    )
}

export default HeaderPanel