import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {StaticGrid, GridItem} from '../barrel'
import RecordBin from '../../assets/images/recordbin.png'
import {BinManager} from '../playlist_search/barrel'
import {ModalOverlay, BinPlaybackButton} from '../barrel'
import {useApiContext} from '../../context/ApiContext'
import {useDashboardContext, useBinContext} from '../../Dashboard'
import {useUserContext} from '../../context/UserContext'

const BinComponentContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useBinComponentContext() {
    return useContext(BinComponentContext)
}

export default function Bin({bin}) {

    const {addToBin} = useBinContext()
    const {user} = useUserContext() || {}

    function handleDragOver(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDrop(e) {
        // only handle drops in drop zone
        const dropZone = document.querySelector('.drop-zone') // there is only one drop zone

        const item = JSON.parse(e.dataTransfer.getData('application/json'))
        // console.log("Dropped item", item.id, item.name, item.images, item.uri)
        addToBin({
            id: item.id,
            name: item.name,
            images: item.images ? [{url: item.images[0].url}] : {url: ''},
            uri: item.uri
        })

        // adding to bin takes id, name, images, and uri
    }



    return(
        // Create a 'dropable zone' to add bins
        <section
        >

            {bin ? 
                <BinComponentContext.Provider value={{
                    // dragItem,
                    addToBin
                }}>
                    <BinHeader 
                        bin={bin}
                        isOwner={bin.overview.user === user.recollective._id}
                        />
                        {bin.overview.content ? 
                            <div className="static-grid drop-zone"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e)}
                            >
                               <StaticGrid 
                                    items={bin.overview.content} 
                                    GridComponent={GridItem}
                                    />
                            </div>

                        :<h2>Loading or no bins...</h2>
                        }
                    <BinManager />
                </BinComponentContext.Provider>
            :<h2>Loading bin</h2>
            }

        </section>
    )
}

function BinHeader({bin, isOwner}) {


    const [editMode, setEditMode] = useState(false)
    const {recollectiveApi} = useApiContext()
    const {setHomeView, removePage} = useDashboardContext() || {}
    const {getBins} = useBinContext() || {}

    function toggleEditMode() {
        setEditMode(!editMode)
    }


    function deleteBin(e) {
        e.stopPropagation()
        // console.log("Deleting bin.", bin.overview._id)
        if(confirm("Are you sure you want to delete this bin?")) {
            console.log("Deleting bin")
            recollectiveApi.deleteBin(bin.overview._id)
            removePage()

            setTimeout(() => {
                // reload recollective api bins
                getBins()
                setHomeView()
            }, 1000)

        } 
    }

    return(
        <div className="view-header">
            {editMode === true ?
                <ModalOverlay toggle={toggleEditMode}>
                    <BinEditMenu 
                        id={bin.overview._id} 
                        // image={''} TODO?
                        title={bin.overview.name} 
                        closeMenu={toggleEditMode}/>
                </ModalOverlay>
            :null}

            <div className="flex">
                <img className="image--med" src={RecordBin}/> 

                <div className="flex flex-col">
                    <p>{bin.overview.name}</p>
                    <BinPlaybackButton bin={bin.overview}/>
                </div>
            </div>

            {isOwner === true ?
                <div className="view-header__buttons">
                    <button onClick={toggleEditMode}className="button green">Edit</button>
                    <div onClick={(e) => deleteBin(e)}>
                        <FontAwesomeIcon 
                            icon={faTrashCan} size="1x"
                            className="red"
                            />
                    </div>
                </div>
            :null}
        </div>
    )

}

function BinEditMenu({id, title, closeMenu}) {

    const {recollectiveApi} = useApiContext()
    // refresh Bin function like playlist
    const [titleInputVal, setTitleInputVal] = useState(title)

    function handleClick(e) {
        // this is to stop the click from going through the menu
        e.stopPropagation()
    }

    function handleButtonClick(e) {
        e.stopPropagation() // one more for good measure
        const name = document.getElementsByName('menu-title')[0].value
        // const payload = {
        //     name
        // }
        saveUpdate(id, name)
        closeMenu()

    }

    function saveUpdate(id, name) {
        // make a call to recollective API to change save bin edits
        recollectiveApi.modifyBinDetails(id, name)
    }

    function handleTitleChange(e) {
        setTitleInputVal(e.target.value)
    }

    return(
        <div onClick={(e) => handleClick(e)} className="playlist-edit-menu">
            <div className="flex flex-col w-full">
                <img className="image--med" src={RecordBin} />
                <button>Upload Image</button>
            </div>

            <div className="flex flex-col w-full max-w-full gap-[10px]">
                <input 
                    name="menu-title"
                    className="playlist-edit-menu__title"
                    onChange={(e) => handleTitleChange(e)}
                    value={titleInputVal}
                />
                {/* Bins don't have a desc for now */}
                {/* <textarea 
                    name="menu-description"
                    maxLength="160"
                    className="playlist-edit-menu__textarea">
                    {description ? description : "Enter a description of your playlist"
                    }
                </textarea> */}

<               button 
                    onClick={(e) => handleButtonClick(e)}
                    className="button green">Save</button>
            </div>
        </div>
    )
}


Bin.propTypes = {
    bin: PropTypes.shape({
        overview: PropTypes.shape({
            _id: PropTypes.string.isRequired, 
            name: PropTypes.string, 
            user: PropTypes.string.isRequired,
            content: PropTypes.arrayOf(PropTypes.object)
        }).isRequired, 
        // content: PropTypes.arrayOf(PropTypes.object), 
    }).isRequired 
};

BinHeader.propTypes = {
    bin: PropTypes.shape({
        overview: PropTypes.shape({
            _id: PropTypes.string.isRequired, 
            name: PropTypes.string, 
        }).isRequired, 
    }).isRequired,
    isOwner: PropTypes.bool.isRequired
}
BinEditMenu.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    closeMenu: PropTypes.func.isRequired
}

/**So what goes into a bin? A list of playlists and albums? in a static-grid?
 * 
 * 
 * Bin features, aside from the obvious
 * 
 * Play the whole bin as one big playlist
 * 
 * Create a smaller palylist with tracks from the bin content
 * 
 * Something similar to the PlaylistBuilder, where you can search for albums and playlists to add to the bin (but not individual tracks)
 */