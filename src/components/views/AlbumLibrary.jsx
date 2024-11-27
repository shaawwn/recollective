import {useAlbumLibrary} from '../../hooks/barrel'
import {InfiniteScrollGrid, GridItem} from '../barrel'


export default function AlbumLibrary() {

    const {albums, getNext} = useAlbumLibrary() || {}

    // I think I am constantly rewriting the "next" albums, could be an async issue

    // Oh, you know what I think it is, the observer is only being applied to the last item in the initial list, so it only repeats on album (or playlist) #20 or whatever, 
    return(
        <div>
        <h1>Your saved Albums</h1>
        {albums.length > 0 ?
            <InfiniteScrollGrid 
                getNext={getNext}
                items={albums} 
                GridComponent={GridItem}/>
            :null
        }
        </div>
    )
}