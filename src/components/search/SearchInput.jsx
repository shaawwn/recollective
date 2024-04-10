import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types'
import './search.css'


function SearchInput({search}) {

    const queryString = useRef()
    const queryDelay = useRef()
    function handleChange() {
        const inputVal = document.getElementById('search-input').value
        queryString.current = inputVal

        // Only call search after a small delay
        if(queryString.current === '') {
            if(queryDelay.current) {
                clearTimeout(queryDelay.current)
            }

            // set search results to nothing
            return false
        }
        if(queryDelay.current) {
            clearTimeout(queryDelay.current)
        }

        queryDelay.current = setTimeout(() => search(queryString.current), 500)
    }




    return(
        <>
            <input id="search-input" className="search__input" placeholder="What do you want to listen to?" onChange={handleChange}/>
        </>
    )
}

SearchInput.propTypes = {
    search: PropTypes.func
}
export default SearchInput