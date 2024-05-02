import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import '../containers/utility.css'
import {AuthContext} from '../../../App'
import PlaylistPanel from '../../panels/playlistpanel/PlaylistPanel'
import Panel from '../../panels/panel/Panel'
import SidebarPanel from '../../panels/sidebarpanel/Sidebar'

// any functions that need to be passed down to panel components
export const PanelFunctionContext = React.createContext()

function PanelContainer({children}) {
    const profile = useContext(AuthContext).profile
    const onboarding = true // profile.onboarding

    // return(
    //     <PanelFunctionContext.Provider 
    //         value={{
    //             // search: search
    //         }}
    //     >
    //         <section className="flex gap-4 bg-red-500 h-full">
    //                 {/* Direct to playlist creation on first login */}
    //                 {onboarding === true ?
    //                     <PanelContainerSub>
    //                         <PlaylistPanel />
    //                     </PanelContainerSub>
    //                     :
    //                     <PanelContainerSub>
    //                         <Panel />
    //                         <Panel />
    //                     </PanelContainerSub>
    //                 }
    //                 <SidebarPanel />
    //         </section>
    //     </PanelFunctionContext.Provider>
    // )

    return(
        <section className="panel-container flex gap-4 h-full">
            <div className="panel-container__wrapper">
                {children}
            </div>
            <SidebarPanel />
        </section>
    )
}

function PanelContainerSub({children}) {
    // what is panelcontainer sub....clearly a wrapper
    return(
        <section className="flex flex-col gap-4 w-full">
            {children}
        </section>
    )
}

PanelContainer.propTypes = {
    search: PropTypes.func
}

PanelContainerSub.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element)
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
}
export default PanelContainer