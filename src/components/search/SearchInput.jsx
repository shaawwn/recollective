import {useRef, useContext, useEffect} from 'react';
import PropTypes from 'prop-types'
// import './search.css'

/*
    Two search Inputs:
         - in playlist
         - in headerpanel

    They return different things, playlist returns a track table with search results that can be added to the playlist
    Headerpanel search changes the view in the dashboard to the searchResults page

    Then again, it looks like all it is is a gui wrapper for the search functions and just calls search as needed
*/

import {UserContext} from '../views/dashboard/Dashboard'

function SearchInput({search}) {

    const queryString = useRef()
    const queryDelay = useRef()
    const currentView = useContext(UserContext).currentView

    function handleChange(value) {

        queryString.current = value
        // Only call search after a small delay
        if(queryString.current === '') {
            console.log("There is nothing to search.")
            if(queryDelay.current) {
                clearTimeout(queryDelay.current)
            }
            search(queryString.current)
            return false
        } else if(queryDelay.current) {
            clearTimeout(queryDelay.current)
        }

        queryDelay.current = setTimeout(() => search(queryString.current), 500)
    }

// Need to change from ID to whatever the search input is

    return(
        <>
            <input className="search__input" 
               placeholder="What do you want to listen to?" onChange={(event) => handleChange(event.target.value)}
               />
        </>
    )
}

SearchInput.propTypes = {
    search: PropTypes.func
}
export default SearchInput