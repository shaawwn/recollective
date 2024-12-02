import {useState, useRef, forwardRef} from 'react'
import PropTypes from 'prop-types'
import {parseUriType} from '../utils/utils'
import {InfoPopup} from './barrel'
import DefaultImage from '../assets/images/default.png'

import {useDashboardContext} from '../Dashboard'


function GridItemComponent({item}, ref) {
    const {setPlaylistView, setAlbumView, setBinView, setArtistView, addPage} = useDashboardContext() || {}

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
        // console.log("IMAGE COORDS", imageCoords.current)
        return <InfoPopup item={item} coords={imageCoords.current}/>
    }

    function getImageCoords() {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            return rect
        }
    }

   

    function handleClick() {

        // check if item.type, if not, use parseUriType, otherwise go to the switch
        let type;
        if(!item.type) {
            // item.spotifyID is the id for bin content
            type = parseUriType(item.uri)

        } else {
            type = item.type
        }
        switch(type) {
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
            case 'artist':
                setArtistView(item.id)
                addPage('artist', item.id)
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
            className="static-grid--item"
            id={item.id}
            ref={ref}>
            <img 
                ref={imageRef}
                className="image--med rounded-[2px] hover" 
                src={
                item.images ?
                item.images[0]?.url : DefaultImage
            }/>
            {isHovered &&
                renderPopup()
            }
        </div>
    )
}

const GridItem = forwardRef(GridItemComponent)
export default GridItem

GridItemComponent.propTypes = {
    item: PropTypes.object.isRequired
}

