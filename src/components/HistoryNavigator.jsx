
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import {useDashboardContext} from '../Dashboard'


export default function HistoryNavigator() {
    const {history, getPrevious, getNext, setHomeView, setPlaylistView, setAlbumView, setBinView, setArtistView, setSearchResultsView, setCurrentHistory} = useDashboardContext()

    function back() {
        let prevPage = getPrevious()
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
            }
        } catch(err) {
            // there may not be a next page, do nothing
            console.log("No next page")
        }

    }
    return(
        <div className="flex">
            <FontAwesomeIcon onClick={back} icon={faCaretLeft} size="2x"/>

            {history.current['current']?.next ?
                <FontAwesomeIcon onClick={forward} icon={faCaretRight} size="2x" />
            :<FontAwesomeIcon className="invis" icon={faCaretRight} size="2x"/>
            }

        </div>
    )
}