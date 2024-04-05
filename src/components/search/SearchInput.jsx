import {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types'
import './search.css'


function SearchInput({search}) {

   
     function handleChange() {
        const inputVal = document.getElementById('search-input').value

        // Only call search after a small delay
        search(inputVal)
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