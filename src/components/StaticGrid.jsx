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

StaticGrid.propTypes = {
    items: PropTypes.array.isRequired,
    GridComponent: PropTypes.elementType.isRequired,
    draggable: PropTypes.bool
}

