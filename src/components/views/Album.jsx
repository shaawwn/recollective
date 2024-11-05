import PropTypes from 'prop-types'
import {TrackTable} from '../barrel'
import {useDashboardContext} from '../../Dashboard'


export default function Album({album}) {
    
    return(
        <section className="content-panel panel">
            {album !== undefined ? 
                <>
                <AlbumHeader
                    artistID={album.overview.artists[0].id}
                    image={album.overview.images[0].url}
                    title={album.overview.name}
                    owner={album.overview.artists[0].name} 
                />
                <TrackTable 
                    content={album}
                    tracks={album.tracks} 
                    type="album"/>
                </>
            :<h1>Loading Album</h1>
            }
    </section>
    )
}

function AlbumHeader({artistID, image, title, owner}) {
    // for playlists, "owner" is the creator, for albums, "owner" is the artist
    const {setArtistView, addPage} = useDashboardContext()

    function handleClick() {
        setArtistView(artistID)
        addPage('artist', artistID)
    }

    return(
        <div className="content-panel__header">
            <div className="flex">
                <img className="image--med" src={image}/> 
                <div className="flex flex-col">
                    <p>{title}</p>

                    {/* Link to artist page/user profile */}
                    <p 
                        className="link"
                        onClick={handleClick}
                    >{owner}</p>
                </div>
            </div>
        </div>
    )
}


Album.propTypes = {
    album: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}   

AlbumHeader.propTypes = {
    artistID: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
}