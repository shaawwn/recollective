import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {TrackTable, ModalOverlay} from '../barrel' // PlaylistSearch

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

    return(
        <div className="content-panel__header">
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
                <div>
                    <p>Can modify playlist</p>
                    {editMode === true ? <p>Edit</p>: <p>No edit</p>} 
                    <button onClick={toggleEditMode}className="button green">Edit</button>
                </div>
            :null
            }
        </div>
    )
}

function PlaylistEditMenu({id, image, title, description, closeMenu}) {
    const {spotifyApi} = useApiContext()
    const {refreshPlaylist} = useDashboardContext()

    function handleClick(e) {
        e.stopPropagation()
    }

    function handleButtonClick(e) {
        e.stopPropagation()
        const name = document.getElementsByName('menu-title')[0].innerText
        const description = document.getElementsByName('menu-description')[0].innerText
        const payload = {
            name,
            description
        }
        saveUpdate(payload)
        closeMenu()
    }

    function saveUpdate(updatePayload) {
        spotifyApi.modifyPlaylistDetails(id, updatePayload)
        refreshPlaylist() // so I think it actually takes a little bit of time to modifications to set in
    }

    return (
        <div onClick={(e) => handleClick(e)}className="playlist-edit-menu">
            <img className="image--med" src={image ? image: DefaultImage}/>
            <div className="flex flex-col">
                <div className="playlist-edit-menu__input">
                    <p name="menu-title" contentEditable={true} >{title}</p>
                </div>
                <div className="playlist-edit-menu__input">
                    <p name="menu-description" contentEditable={true}>{description}</p>
                </div>
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

