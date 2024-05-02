// import {useContext} from 'react';
import PropTypes from 'prop-types'
// import './utility.css'
// import {AuthContext} from '../../../App'

/*

    Layout container differs from PanelContainer in that Panel container is the container that directly holds panels, whereas layout container is a styling component that may contain multiple containers

    All LayoutContainer is is a flex column container to holder Header and Main page content, that's IT.
*/


function VerticalFlexContainer({children}) {

    return(
        <section className="vertical-flex-container w-full flex flex-col gap-4">
            {children}
        </section>
    )
} 

VerticalFlexContainer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}
export default VerticalFlexContainer