import {useRef, useEffect} from 'react'
/**
 * 
 * Navigation for going backwards and maybe forwards when navigating
 * 
 * 
 * Keep track of view and any relevant ids so that when clicking nav arrows, those views with ids are called, eg
 * 
 * {'home': null} -> {'playlist', '128ej1982'} -> {'album', 'ajsncaks} where view/id calls the appropriate functiosn
 * 
 * 
 * keeps track of all views 'viewed', can move forward if same path, but if it diverges, create a new path, ie a linked list
 */

export default function useHistory() {

    const history = useRef({head: null, current: null})


    function initHistory() {
        const home = {
            view: 'home',
            id: null,
            previous: null,
            next: null
        }
        history.current['head'] = home
        history.current['current'] = home
    }

    function addPage(view, id) {
        
        // failsafe against no history, even though it should have 'home' as a default head for history
        if (!history.current['current']) {
            history.current['current'] = { view, id, previous: null, next: null }
            return
        }
        const page = {
            view,
            id,
            previous:history.current['current'],
            next: null
        }

        if(history.current['current'].id === page.id) {
            return false
        }
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


    return {history, addPage, getPrevious, getNext, setCurrentHistory}
}