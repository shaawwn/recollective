import PropTypes from 'prop-types'
import DefaultImage from '../../assets/images/default.png'

import {usePlaylistBuilderContext, useBinManagerContext} from './barrel'
import {useBinComponentContext} from '../views/Bin'

export default function ContentHeader({content}) {
    console.log("CONTENT", content)
    const binContext = useBinManagerContext()
    const playlistBuilderContext = usePlaylistBuilderContext()
    const binComponentContext = useBinComponentContext()
    const {setBuilderView, setArtistID, addPage} = binContext || playlistBuilderContext || {}
    const {addToBin} = binComponentContext || {}


    function handleClick() {
        addPage('artist', content.overview.artists[0].id)
        setArtistID(content.overview.artists[0].id)
        setBuilderView('artist')
    }
    //content.overview.type === playlist or album 
    return(
        <div>
            <img className="image--small" src={content.overview.images ? content.overview.images[0].url : DefaultImage} />
            <p>{content.overview.name}</p>

            {/* Content = album show artist name*/}
            {content.overview.type !== 'playlist' ? 
                <p className="link" onClick={handleClick}>{content.overview.artists[0].name}</p>
            :null
            }
            

            {binContext && <button 
                onClick={() => addToBin({
                    id: content.overview.id,
                    name: content.overview.name,
                    images: content.overview.images ? 
                    [{url: content.overview.images[0].url}] : {url: ''},
                    uri: content.overview.uri
                })}
                className="green">Add to bin</button>}
        </div>
    )
}

ContentHeader.propTypes = {
    content: PropTypes.object.isRequired
}
