import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {TrackTable, ModalOverlay} from '../barrel' // PlaylistSearch

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

import {PlaylistBuilder} from '../playlist_search/barrel'
import DefaultImage from '../../assets/images/default.png'
import {useDashboardContext, usePlaylistContext} from '../../Dashboard'
import {useApiContext} from '../../context/ApiContext'

export default function Playlist({playlist}) {
    //I have the play list ID here
    // const {playlist, addToPlaylist, removeFromPlaylist} = usePlaylistContext()
    
    return(
        <section className="content-panel panel">
            {playlist !== undefined ? 
                <>
                <PlaylistHeader
                    id={playlist.overview.id}
                    image={playlist.overview.images ? playlist.overview.images[0].url: DefaultImage}
                    title={playlist.overview.name}
                    name={playlist.overview.owner.display_name} 
                    description={playlist.overview.description}
                    isOwner={playlist.isOwner}
                />
                <TrackTable tracks={playlist.tracks} type="playlist"/>
                <PlaylistBuilder />
                </>

            :<h1>Loading playlist</h1>
            }
        </section>
    )   
}

function PlaylistHeader({id, image, title, name, description, isOwner}) {
    const [editMode, setEditMode] = useState(false)


    function toggleEditMode() {
        setEditMode(!editMode)
    }

    function deletePlaylist(e) {
        e.stopPropagation()
        console.log("Deleting playlist")
    }
    return(
        <div className="view-header">
            {editMode === true ? 
            
            <ModalOverlay toggle={toggleEditMode}>
                <PlaylistEditMenu id={id} image={image} title={title} description={description} closeMenu={toggleEditMode}/>
            </ModalOverlay>

            :null}
            <div className="flex">
                <img className="image--med" src={image}/> 
                <div className="flex flex-col">
                    <p>{title}</p>
                    <p>{name}</p>
                    <p>{description}</p>
                </div>
            </div>
            {isOwner === true ?
                <div className="view-header__buttons">
                    <button onClick={toggleEditMode}className="button green">Edit</button>
                    <div onClick={(e) => deletePlaylist(e)}>
                        <FontAwesomeIcon 
                            icon={faTrashCan} size="1x"
                            className="red"
                            />
                    </div>
                </div>
            :null
            }
        </div>
    )
}

function PlaylistEditMenu({id, image, title, description, closeMenu}) {
    const {spotifyApi} = useApiContext()
    const {refreshPlaylist} = useDashboardContext()
    const [titleInputVal, setTitleInputVal] = useState(title)

    function handleClick(e) {
        e.stopPropagation()
    }

    function handleButtonClick(e) {
        e.stopPropagation()
        const name = document.getElementsByName('menu-title')[0].value
        const description = document.getElementsByName('menu-description')[0].value
        const payload = {
            name,
            description
        }

        // may need to check for empty strings or invalid characters

        saveUpdate(payload)
        closeMenu()
    }

    function saveUpdate(updatePayload) {
        spotifyApi.modifyPlaylistDetails(id, updatePayload)
        refreshPlaylist() // so I think it actually takes a little bit of time to modifications to set in

        // some notification that it may take a few minutes for updates to take effect
    }

    function handleTitleChange(e) {
        setTitleInputVal(e.target.value)
    }
    return (
        <div onClick={(e) => handleClick(e)}className="playlist-edit-menu">
            <div className="flex flex-col w-full">
                <img className="image--med" src={image ? image: DefaultImage}/>
                <button>Upload image</button>
            </div>


            <div className="flex flex-col w-full max-w-full gap-[10px]">
                <input 
                    name="menu-title"
                    className="playlist-edit-menu__title"
                    onChange={(e) => handleTitleChange(e)} 
                    value={titleInputVal}/>
                <textarea 
                    name="menu-description"
                    maxLength="160"
                    className="playlist-edit-menu__textarea">
                    {description ? description : "Enter a description of your playlist"
                    }
                </textarea>

                {/* Add tags later? */}

                {/* Button should be its own thing maybe */}
                <button onClick={(e) => handleButtonClick(e)}className="button green">Save</button>
            </div>
        </div>
    )
}

Playlist.propTypes = {
    playlist: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}   

PlaylistHeader.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    isOwner: PropTypes.bool.isRequired
}

PlaylistEditMenu.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    closeMenu: PropTypes.func.isRequired
}

