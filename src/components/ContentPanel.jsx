import PropTypes from 'prop-types'

/**
 * 
 * Content planel is a view for displaying albums/playlists with a
 * 
 * Header
 *  details about artist/playlistcreator, etc
 * 
 * Modifiable content if the current user is the create
 * TrackTable
 *  List of tracks
 */

export default function ContentPanel({content, type}) {
    // type = playlist/album for determining if "Edit" content is available
    return(
        <section className="content-panel panel">
            <ContentPanelHeader 
                image={content.overview.images[0].url}
                title={content.overview.name}
                name={type === 'playlist' ? content.overview.owner.display_name : content.artists[0].name} 
            />
            {content.tracks.map((track, index) => 
                <p key={index + track.name}>{track.name}</p>
            )}
        </section>
    )
}

function ContentPanelHeader({image, title, name}) {
    return(
        <div className="content-panel__header">
            <div className="flex">
                <img className="image--med" src={image}/> 
                <div className="flex flex-col">
                    <p>{title}</p>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}

ContentPanel.propTypes = {
    content: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}   

ContentPanelHeader.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}