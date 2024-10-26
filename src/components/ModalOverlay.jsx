import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'

export default function ModalOverlay({children, toggle}) {
    const [hidden, setHidden] = useState()
    // hide the modal when clicking outside, OR have cancel in menu
    function handleClick(e) {
        e.stopPropagation()
        console.log("Clicking modal")
        toggle()
    }

    return(
        <div onClick={(e) => handleClick(e)} className={`modal ${hidden}`}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node
}