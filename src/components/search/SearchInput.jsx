import {useRef} from 'react';
import PropTypes from 'prop-types'
// import './search.css'


function SearchInput({search}) {

    const queryString = useRef()
    const queryDelay = useRef()

    function handleChange(value) {

        queryString.current = value
        // Only call search after a small delay
        if(queryString.current === '') {
            if(queryDelay.current) {
                clearTimeout(queryDelay.current)
            }

            return false
        }
        if(queryDelay.current) {
            clearTimeout(queryDelay.current)
        }

        queryDelay.current = setTimeout(() => search(queryString.current), 500)
    }

// Need to change from ID to whatever the search input is


    return(
        <>
            <input className="search__input" placeholder="What do you want to listen to?" onChange={(event) => handleChange(event.target.value)}/>
        </>
    )
}

SearchInput.propTypes = {
    search: PropTypes.func
}
export default SearchInput