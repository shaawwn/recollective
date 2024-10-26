import {useRef, useEffect} from 'react'


export default function useSearchHistory(defaultValue) {
    // defaultValue tracks or playlists depending on manager type (bin=playlists, playlist=tracks)
    const history = useRef({head: null, current: null, next: null})

    // search (tracks, artists, album) artist, album views
    function initHistory() {

        // bins set view to 'playlists, playlist set view='tracks
        const searchHome = {
            view: defaultValue,
            // data: null, // will be undefined on init as there are no searchResults
            previous: null,
            next: null
        }

        history.current['head'] = searchHome,
        history.current['current'] = searchHome
    }

    function addPage(view, id) {
        
        // failsafe against no history, even though it should have 'home' as a default head for history
        if (!history.current['current']) {
            history.current['current'] = { 
                view: 'tracks', 
                // data:searchResults, 
                previous: null, 
                next: null 
            }
            return
        }

        const page = {
            view: '',
            previous: history.current['current'],
            next: null
        }

        switch (view) {
            case 'tracks':
                page['view'] = 'tracks'
                break
            case 'albums':
                page['view'] = 'albums'
                break
            case 'artists':
                page['view'] = 'artists'
                break
            case 'album':
                page['view'] = 'albumTracks'
                page['data'] = id
                break
            case 'artist':
                page['view'] = 'artist'
                page['data'] = id
                break
            case 'playlists':
                page['view'] = 'playlists'
                break
            case 'playlist':
                page['view'] = 'playlist'
                page['data'] = id
                break
        }

        // make sure to not add the same page twice in a row
        // but also need to check it isn't a search page
        // if(history.current['current'].data === page.data) {
        //     return false
        // }

        // if(history.current['current'].view === page.view) {
        //     return false
        // }
        history.current['current'].next = page
        history.current['current'] = page
    }

    function getPrevious() {
        return history.current['current'].previous
    }

    function getNext() {
        return history.current['current'].next
    }

    function setCurrentHistory(page) {
        // set the 'current' page without modifying or adding new pages to history
        history.current['current'] = page
    }
    useEffect(() => {
        initHistory()
    }, [])


    // console.log("search history", history.current)
    return {history, addPage, getPrevious, getNext, setCurrentHistory}
}


/**
 * 
 * 
 * Logic should be the same, but the details are different. There is no "default history" other than null, and insteaf of an artist or playlist ID, it should just have the search results
 * 
 * 
 * Actually, this would take 'normal' history as well
 * 
 * The default is the search results, but as you click around it would take artist ids, album ids, etc
 * 
 * maybe take search as an object? {search: tracks} or {search: albums}, and then the other views {artist:null}
 * 
 * So default to {search: tracks}, when a user clicks on "albums", then it shoul dbe {search: albums}?
 * 
 * Or, I'm just making it more complicated, keep it search and just keep search results tracks, albums, artists data=searchResults, and if they click on artist or album set data to equal id
 */