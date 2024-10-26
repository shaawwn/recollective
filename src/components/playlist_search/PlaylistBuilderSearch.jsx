import PropTypes from 'prop-types'

import {useRef, useState, useEffect} from 'react'

export default function PlaylistBuilderSearch({setBuilderView, builderView, search}) {
 
    const delay = useRef()
    const query = useRef()
    const [inputString, setInputString] = useState('')

    function handleKeyPress(e) {
        query.current = e.target.value
        setInputString(e.target.value)
        if(query.current === '') {
            clearTimeout(delay.current) 
            return
        }

        if(delay.current) { 
            clearTimeout(delay.current)
        }

        delay.current = setTimeout(() => {
            search(query.current)
        }, 500)
    }

    useEffect(() => {
        setInputString('')
    }, [builderView])

    return(
        <>
            <h2 className="xl:text-[24px]">Browse for content to add</h2>
            <input
                className="searchbar panel"
                value={inputString}
                onChange={(e) => handleKeyPress(e)}
                placeholder="Add some stuff to your playlist"
            ></input>
        </>
    )
}

PlaylistBuilderSearch.propTypes = {
    setBuilderView: PropTypes.func.isRequired,
    builderView: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired
}