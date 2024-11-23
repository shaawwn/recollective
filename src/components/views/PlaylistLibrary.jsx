import {usePlaylistLibrary} from '../../hooks/barrel'
import {InfiniteScrollGrid, GridItem} from '../barrel'


export default function PlaylistLibrary() {
    
    const {playlists, getNext} = usePlaylistLibrary() || {}


    return(
        <div>
        <h1>Your saved Playlists</h1>
        {playlists.length > 0 ?
            <InfiniteScrollGrid 
                getNext={getNext}
                items={playlists} 
                GridComponent={GridItem}/>
            :null
        }
        </div>
    )
}

/**
 * 
 * 
 * So I would like this to display ALL of the users saved playlists. Maybe a filter for created ones like Spotify does
 * 
 * Gonna need to be some pagination handlign here with infinite scroll since the limit to returns is a max 50
 * 
 * Spotify includes a "next" paramater that give sthe next url for the next batch of playlists
 * 
 * In some ways, this is where the Bins could be really useful since there is no ordering of the playlists returned as I recall aside from "most recent"
 * 
 * Use a custom hook to handle pagination? As I recall, the issue was re-rendering which caused the component to have trouble rendering previous content. If I use a cusstom hook, the playlist array is easier to handle as it grows.
 */