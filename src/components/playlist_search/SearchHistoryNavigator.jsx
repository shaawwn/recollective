import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'

import {usePlaylistBuilderContext, useBinManagerContext} from './barrel'

export default function SearchHistoryNavigator({history,getPrevious, getNext, setCurrentHistory}) {
    // need to import the builderView setter

    const {setBuilderView} = useBinManagerContext() ? useBinManagerContext() : usePlaylistBuilderContext()
    // const {setBuilderView} = usePlaylistBuilderContext()

    
    function back() {

        let prev = getPrevious()
        if(prev !== null) {
            setBuilderView(prev.view)
            setCurrentHistory(prev)
        } 
    }

    function forward() {
        let next = getNext()
        if(next !== null) {
            setCurrentHistory(next)
            setBuilderView(next.view)
        }
    }

    return(
        <div className="flex">
            <FontAwesomeIcon onClick={back} icon={faCaretLeft} size="2x"/>

            {history.current['current'].next ?
                <FontAwesomeIcon onClick={forward} icon={faCaretRight} size="2x"/>
            :<FontAwesomeIcon className="invis" icon={faCaretRight} size="2x"/>
            }
        </div>
    )
}

SearchHistoryNavigator.propTypes = {
    history: PropTypes.object.isRequired,
    addPage: PropTypes.func.isRequired,
    getPrevious: PropTypes.func.isRequired,
    getNext: PropTypes.func.isRequired,
    setCurrentHistory: PropTypes.func.isRequired,
}