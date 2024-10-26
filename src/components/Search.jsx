import { useRef, useEffect, useState, useCallback } from 'react';
import {useDashboardContext} from '../Dashboard'



const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

export default function SearchInput() {

    const {addPage, search, setSearchResultsView, view} = useDashboardContext()
    const delay = useRef()
    const query = useRef()
    const [inputString, setInputString] = useState('')



    function handleKeyPress(e) {
        query.current = e.target.value
        setInputString(e.target.value)
        if(query.current === '') {
            clearTimeout(delay.current) 
            return false
        }

        if(delay.current) { // handles quick keypresses
            clearTimeout(delay.current)
        }

        delay.current = setTimeout(() => {
            // search(query.current)
            const doSearch = async () => {
                const results = await search(query.current)
    
                if(results) {
                    // console.log("SEARCH RESULTS", results)
                    setSearchResultsView()
                    addPage("search", null)
                }
            }
            doSearch()
        }, 500)
    }

    useEffect(() => {
        // clear the input 
        // console.log("reset", view)
        setInputString('')
    }, [view])

    return(
        <section className="searchbar panel">
            <input
                className="searchbar__input"
                // value={displayQuery}
                value={inputString}
                onChange={(e) => handleKeyPress(e)}
                placeholder="Search for music"
            ></input>
        </section>
    )
}

