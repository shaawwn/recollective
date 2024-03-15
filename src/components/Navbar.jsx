import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
function Navbar() {

    return(
        <nav className="navbar">
                <Link style={{"textDecoration": "none", "fontSize": "2rem", "color": "white"}}to="/">Home</Link>
            <hr style={{"width":"100%"}}/>
        </nav>
    )
}

export default Navbar;