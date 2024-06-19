
// import useSearch from '../../hooks/useSearch'
// import PlaylistGridPanel from '../panels/PlaylistGridPanel'

function SearchPanel() {

    return(
        <section>
            {/* <h1>Search Panel here with search results</h1> */}
            <SearchPanelResultsToggle />
            <SearchPanelTopResult />

            {/* If created Playlists in grid form 
                There should be some function that returns User Playlists? Need to search user playlists and return results which could match
            */}

            {/* Other playlists
                This is the default Spotify Search Results, returns top Playlists 
            */}

            {/* Albums 
                Default Spotify search results, but maybe filter for albums in users library?
            */}
        </section>
    )
}

function SearchPanelResultsToggle() {

    function handleClick(result) {
        console.log("Toggling results to: ", result)
    }
    return(
        <div>
            <button onClick={() => handleClick('tracks')}>Tracks</button>
            <button onClick={() => handleClick('albums')}>Albums</button>
            <button onClick={() => handleClick('artists')}>Artists</button>
            <button onClick={() => handleClick('playlists')}>Playlists</button>
        </div>
    )
}

function SearchPanelTopResult() {

    return(
        <section className="flex">
            <div>
                <p>Search Result</p>
                <p>Image for result here</p>
            </div>
            <div className="flex flex-col">
                <p>Result 1</p>
                <p>Result 2</p>
                <p>Result 3</p>
                <p>Reulst 4</p>
                <p>Result 5</p>
            </div>
        </section>
    )
}

// Playlist Grid Panel here?

export default SearchPanel