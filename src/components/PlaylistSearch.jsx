import {useRef} from 'react'
import {useSearch} from '../hooks/barrel'
// import {TrackTable} from '../components/barrel'
import {TrackTableSearch} from '../components/playlist_search/barrel'


export default function PlaylistSearch() {
    //
    const {search, searchResults} = useSearch() 
    const delay = useRef()
    const query = useRef()


    // searchr esults should be tracks -> albums
    // no need playlist, no need artist outside of being able to click on artists inside the track table.
    function handleKeyPress(e) {
        query.current = e.target.value
        if(query.current === '') {
            clearTimeout(delay.current) 
            return false
        }

        if(delay.current) { // handles quick keypresses
            clearTimeout(delay.current)
        }

        delay.current = setTimeout(() => {
            search(query.current)
        }, 500)
    }

    return(
        <div className="searchbar playlist-track-search panel">
            <h2 className="xl:text-[24px]">Add to your playlist</h2>
            <input
                className="searchbar__input"
                onChange={(e) => handleKeyPress(e)}
                placeholder="Add some stuff to your playlist"
            ></input>
            {searchResults ? 
                <div>
                    {/* <TrackTable tracks={searchResults.tracks.items} /> */}
                    <TrackTableSearch tracks={searchResults.tracks.items} />
                </div>

            :null}
        </div>
    )
}

