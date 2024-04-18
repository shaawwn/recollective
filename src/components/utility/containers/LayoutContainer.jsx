// import {useContext} from 'react';
import PropTypes from 'prop-types'
// import {AuthContext} from '../../../App'

/*

    Layout container differs from PanelContainer in that Panel container is the container that directly holds panels, whereas layout container is a styling component that may contain multiple containers
*/

function LayoutContainer({children}) {
    // component which holds panel elements within the dashboard
    // const profile = useContext(AuthContext).profile
    return(
        <section className="w-full flex flex-col gap-4">
            {children}
        </section>
    )
}

LayoutContainer.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}
export default LayoutContainer