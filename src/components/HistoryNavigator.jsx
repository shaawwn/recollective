
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import {useDashboardContext} from '../Dashboard'


export default function HistoryNavigator() {
    const {history, getPrevious, getNext, setHomeView, setPlaylistView, setAlbumView, setBinView, setArtistView, setPlaylistLibraryView, setAlbumLibraryView, setSearchResultsView, setCurrentHistory} = useDashboardContext() || {}



    function back() {
        let prevPage = getPrevious()
        console.log("prev", prevPage)
        try {
            switch(prevPage.view) {
                case "home":
                    setCurrentHistory(prevPage)
                    setHomeView()
                    return
                case "playlist":
                    setCurrentHistory(prevPage)
                    setPlaylistView(prevPage.id)
                    return
                case "playlists":
                    setCurrentHistory(prevPage)
                    setPlaylistLibraryView()
                    return
                case "search":
                    setCurrentHistory(prevPage)
                    setSearchResultsView()
                    return
                case "artist":
                    setCurrentHistory(prevPage)
                    setArtistView(prevPage.id)
                    return
                case "album":
                    setCurrentHistory(prevPage)
                    setAlbumView(prevPage.id)
                    return
                case "bin":
                    setCurrentHistory(prevPage)
                    setBinView(prevPage.id)
                    return
                case "albums":
                    setCurrentHistory(prevPage)
                    setAlbumLibraryView()
                    return
            }
        } catch (err) {
            // some error, default home
            setHomeView()
        }
    }

    function forward() {
        let nextPage = getNext()
        try {
            switch(nextPage.view) {
                case "home":
                    setCurrentHistory(nextPage)
                    setHomeView()
                    return
                case "playlist":
                    setCurrentHistory(nextPage)
                    setPlaylistView(nextPage.id)
                    return
                case "search":
                    setCurrentHistory(nextPage)
                    setSearchResultsView()
                    return
                case "album": 
                    setCurrentHistory(nextPage)
                    setAlbumView(nextPage.id)
                    return
                case "artist":
                    setCurrentHistory(nextPage)
                    setArtistView(nextPage.id)
                    return
                case "playlists":
                    setCurrentHistory(nextPage)
                    setPlaylistLibraryView()
                    return
                case "albums":
                    setCurrentHistory(nextPage)
                    setAlbumLibraryView()
                    return
            }
        } catch(err) {
            // there may not be a next page, do nothing
            console.log("No next page")
        }

    }

    return(
        <div className="flex">
            {history.current['current']?.previous ?
                <FontAwesomeIcon onClick={back} icon={faCaretLeft} size="2x" aria-label="Go Back"/>
            :<FontAwesomeIcon icon={faCaretLeft} className="text-grey" size="2x" aria-label="Go Back"/>
            }

            {history.current['current']?.next ?
                <FontAwesomeIcon onClick={forward} icon={faCaretRight} size="2x" aria-label="Go Forward"/>
            :<FontAwesomeIcon className="text-grey" icon={faCaretRight} size="2x" aria-label="Go Forward"/>
            }

        </div>
    )
}