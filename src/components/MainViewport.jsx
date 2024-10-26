import PropTypes from 'prop-types'

export default function MainViewport({children}) {
    // the container for the primary content of the app, display albums, tracks, search results, playlist etc here

    // so for example, if it is an album, pass the ID and type here, and it will render a sub view for that 


    // needs to be able to change content from other locations

    // ie clicking "Playlists" on sidebar should change the content of MainViewport
    return(
        <main className="main-viewport">
            {children}
        </main>
    )
}



MainViewport.propTypes = {
    children: PropTypes.node.isRequired
}