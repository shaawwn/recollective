import PropTypes from 'prop-types'
import DefaultImage from '../../assets/images/default.png'

// import {GridItem} from './barrel'
import {usePlaylistBuilderContext, useBinManagerContext} from './barrel'

export default function ArtistTable({artists}) {

    const binContext = useBinManagerContext()
    const playlistBuilderContext = usePlaylistBuilderContext()

    const {setBuilderView, setArtistID, addPage} = binContext || playlistBuilderContext || {}

    function handleClick(id) {
        setArtistID(id)
        setBuilderView('artist')
    }

    return(
        <div className="static-grid">
            {artists ? 
                <>
                    {artists.map((artist, index) =>
                        <div key={artist.id + index} onClick={() => handleClick(artist.id)}className="flex flex-col">
                            <div className="static-grid--item">
                                <img className="image--med" src={artist.images[0] ?
                                    artist.images[0].url : DefaultImage} />
                            </div>
                            <p>{artist.name}</p>
                        </div>
                    )}
                </>
            :<h2>Loading artists...</h2>
            }
            
        </div>
    )
}

ArtistTable.propTypes = {
    artists: PropTypes.array.isRequired
}