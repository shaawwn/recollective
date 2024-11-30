import {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {useDashboardContext} from '../Dashboard'
import DefaultImage from '../assets/images/default.png'
import RecordBin from '../assets/images/recordbin.png'
import {InfoPopup} from './barrel'
/**
 * 
 * Static grid is for non infinitely scrolling purposes
 * 
 * Add an option for "see more" or "browse all" that then changes to a new view with an infinitel scrolling grid
 */

export default function StaticGrid({items, GridComponent, draggable}) {

    // set grids size with 'size' (20, 30, 10, etc)

    // const [popup, setPopup] = useState(false) // only have 1 popup at a time

    const currentPopup = useRef(false) // grid item ref


    const itemsNum = Math.min(items.length, 24)


    return(
        <section className="static-grid panel">
            {items.slice(0, itemsNum).map((item, index) => 
                <GridComponent
                    currentPop={currentPopup.current}
                    key={index + item.name}
                    item={item}/>
            )}
        </section>
    )
}

// export function GridItem({item}) {

//     const {setPlaylistView, setAlbumView, setBinView, addPage} = useDashboardContext() || {}

//     // there can only be on popupat a time, so if a grid item is NOT hovered over, it should be logically impossible for a popup to appear

//     const [isHovered, setIsHovered] = useState(false)
//     const imageRef = useRef()
//     const delay = useRef()
//     const imageCoords = useRef()

//     function togglePopup() {

//         const rect = getImageCoords()

//         imageCoords.current = rect

//         if(delay.current) {
//             clearTimeout(delay.current)
//         }

//         delay.current = setTimeout(() => {
//             //
//             setIsHovered(true)
//         }, 500)
//     }

//     function clearPopup() {
//         clearTimeout(delay.current)
//         setIsHovered(false)
//     }

//     function renderPopup() {
//         // get x/y coords of image
//         return <InfoPopup item={item} coords={imageCoords.current}/>
//     }

//     function getImageCoords() {
//         if (imageRef.current) {
//             const rect = imageRef.current.getBoundingClientRect();
//             return rect
//         }
//     }

   

//     function handleClick() {
//         switch(item.type) {
//             case 'playlist':
//                 setPlaylistView(item.id)
//                 addPage('playlist', item.id)
//                 return
//             case 'album':
//                 setAlbumView(item.id)
//                 addPage('album', item.id)
//                 return
//             case 'bin':
//                 setBinView(item._id)
//                 addPage('bin', item._id)
//                 return
//             default:
//                 alert("Error")
//                 return
//         }
//     }

//     return(
//         <div 
//             onClick={handleClick} 
//             onMouseEnter={togglePopup}
//             onMouseLeave={clearPopup}
//             className="static-grid--item">
//             <img 
//                 ref={imageRef}
//                 className="image--med rounded-[10px] hover" 
//                 src={
//                 item.images ?
//                 item.images[0].url : DefaultImage
//             }/>
//             {isHovered &&
//                 renderPopup()
//             }
//         </div>
//     )
// }

StaticGrid.propTypes = {
    items: PropTypes.array.isRequired,
    GridComponent: PropTypes.node.isRequired,
    draggable: PropTypes.bool
}

// GridItem.propTypes = {
//     item: PropTypes.object.isRequired
// }