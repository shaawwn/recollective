import {useContext} from 'react';

import {UserContext} from '../../views/dashboard/Dashboard'
import DefaultPlaylistCover from '../../../images/default.png'

/*

    There's more involved here than I though, I think this is where all the modifiable aspects of a playlist should be found. A playlist is created automatically with default attributes (name, genre, etc), which can then be changed here with an edit button.

*/

function PlaylistHeader({playlist}) {
    console.log("playlist", playlist)
    const profile = useContext(UserContext).profile

    return(
        <div id="playlist-meta" className="flex">
            <img className="panel__playlist__cover-image" src={DefaultPlaylistCover}></img>
            <div className="flex flex-col">
                <h2>{playlist ? playlist.name : 'null'}</h2>
                <p>
                    {playlist.description}
                </p>
                <p>{playlist ? playlist.author : 'null'}</p>
                <p>
                    {playlist.tags.map((tag, index) => 
                        <span key={index}>{tag} </span>
                    )}

                </p>
            </div>
        </div>
    )
}

export default PlaylistHeader