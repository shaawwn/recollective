import {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {InfoPopup} from './barrel'
import RecordBin from '../assets/images/recordbin.png'

import {useDashboardContext} from '../Dashboard'

export default function GridItemBin({item}) {

    const {setPlaylistView, setAlbumView, setBinView, addPage} = useDashboardContext() || {}

    // there can only be on popupat a time, so if a grid item is NOT hovered over, it should be logically impossible for a popup to appear

    const [isHovered, setIsHovered] = useState(false)
    const imageRef = useRef()
    const delay = useRef()
    const imageCoords = useRef()

    function togglePopup() {

        const rect = getImageCoords()

        imageCoords.current = rect

        if(delay.current) {
            clearTimeout(delay.current)
        }

        delay.current = setTimeout(() => {
            //
            setIsHovered(true)
        }, 500)
    }

    function clearPopup() {
        clearTimeout(delay.current)
        setIsHovered(false)
    }

    function renderPopup() {
        // get x/y coords of image
        return <InfoPopup item={item} coords={imageCoords.current}/>
    }

    function getImageCoords() {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            return rect
        }
    }

   

    function handleClick() {
        switch(item.type) {
            case 'playlist':
                setPlaylistView(item.id)
                addPage('playlist', item.id)
                return
            case 'album':
                setAlbumView(item.id)
                addPage('album', item.id)
                return
            case 'bin':
                setBinView(item._id)
                addPage('bin', item._id)
                return
            default:
                alert("Error")
                return
        }
    }

    return(
        <div 
            onClick={handleClick} 
            onMouseEnter={togglePopup}
            onMouseLeave={clearPopup}
            className="static-grid--item">
            <img 
                ref={imageRef}
                className="image--med rounded-[10px] hover" 
                src={RecordBin}/>
            <p>{item.name}</p>
            {isHovered &&
                renderPopup()
            }
        </div>
    )
}

GridItemBin.propTypes = {
    item: PropTypes.object.isRequired
}