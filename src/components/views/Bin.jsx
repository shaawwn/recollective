import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {StaticGrid, GridItem} from '../barrel'
import RecordBin from '../../assets/images/recordbin.png'
import {BinManager} from '../playlist_search/barrel'
import {ModalOverlay} from '../barrel'
import {useApiContext} from '../../context/ApiContext'
import {useBinContext} from '../../Dashboard'

const BinComponentContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useBinComponentContext() {
    return useContext(BinComponentContext)
}

export default function Bin({bin}) {

    const {addToBin} = useBinContext()


    function handleDragOver(e) {

        e.preventDefault()
        e.stopPropagation()
    }

    function handleDrop(e) {
        console.log("Drop", e.dataTransfer.getData('item'))
    }

    function dragItem(e, item) {
        console.log("item", item)
        const toAdd = {
            image: item.images[0].url,
            id: item.id,
            uri: item.uri,
            name: item.name
        }
        e.dataTransfer.setData('item', JSON.stringify(toAdd))
    }


    return(
        // Create a 'dropable zone' to add bins
        <section
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
        >

            {bin ? 
                <BinComponentContext.Provider value={{
                    // dragItem,
                    addToBin
                }}>
                    <BinHeader bin={bin}/>
                        {bin.overview.content ? 
                            <div className="static-grid">
                               <StaticGrid items={bin.overview.content} GridComponent={GridItem}/>
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

function BinHeader({bin}) {
    console.log("BIN", bin)
    const [editMode, setEditMode] = useState(false)
    const [isOwner, setIsOwner] = useState(true)
    const {recollectiveApi} = useApiContext()

    function toggleEditMode() {
        setEditMode(!editMode)
    }

    function deleteBin(e) {
        e.stopPropagation()
        // console.log("Deleting bin.", bin.overview._id)
        if(confirm("Are you sure you want to delete this bin?")) {
            console.log("Deleting bin")
            recollectiveApi.deleteBin(bin.overview._id)

            // need to refresh/reload the dashboard here
            // spotify refreshes dashboard on playlist delete as well.
        } 
    }

    return(
        <div className="view-header">
            {editMode === true ?
                <ModalOverlay toggle={toggleEditMode}>
                    <BinEditMenu 
                        id={bin.overview._id} 
                        image={''} 
                        title={bin.overview.name} 
                        closeMenu={toggleEditMode}/>
                </ModalOverlay>
            :null}

            <div className="flex">
                <img className="image--med" src={RecordBin}/> 

                <div className="flex flex-col">
                    <p>{bin.overview.name}</p>
                    {/* <p>{name}</p>
                    <p>{description}</p> */}
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

function BinEditMenu({id, image, title, closeMenu}) {

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
        const payload = {
            name
        }
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
    bin: PropTypes.object.isRequired
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