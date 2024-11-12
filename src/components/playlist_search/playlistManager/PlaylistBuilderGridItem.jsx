import PropTypes from 'prop-types'
import {usePlaylistBuilderContext, useBinManagerContext} from '../barrel'
// import {useBinContext} from '../views/Bin'
import DefaultImage from '../../../assets/images/default.png'

// Named PlaylistBuilderGridItem to avoid confusion with GridItem

// 

export default function PlaylistBuilderGridItem({item}) {
    // item is the playlist or album 
    // console.log("PLAYLIST GRID ITEM", item)
    const binContext = useBinManagerContext()
    const playlistBuilderContext = usePlaylistBuilderContext()

    const {setBuilderView, setAlbumID, setPlaylistID, addPage} = binContext || playlistBuilderContext || {}


    // const {dragItem} = useBinContext()

    function handleClick() {
        // can be either playlist or album/compilation
        let type = item.type
        if(type === 'compilation') {
            type="album"
        }
        addPage(type, item.id)

        switch(type) {
            case 'playlist':
                setBuilderView('playlist')
                setPlaylistID(item.id) // this sets playlist from usePlaylist--NOT the dashboard level
                return
            case 'album':
                setBuilderView('albumTracks')
                setAlbumID(item.id)
        }
    }


    return(
        <div onClick={handleClick} className="static-grid--item">
            <img className="image--med rounded-[10px]" 
                src={item.images ?
                item.images[0].url : DefaultImage
                }
                alt={item.name}
                // draggable="true"
                // onDragStart={(e) => dragItem(e, item)}

            />
        </div>
    )
}

PlaylistBuilderGridItem.propTypes = {
    item: PropTypes.object.isRequired
}