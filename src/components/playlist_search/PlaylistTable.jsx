import PropTypes from 'prop-types'

import {GridItem} from './barrel'

export default function PlaylistTable({playlists}) {

    return(
        <div className="static-grid">
            {playlists ? 
                <>
                    <div className="static-grid">
                        {playlists.map((playlist, index) =>
                            <GridItem 
                                key={playlist.id + index} 
                                item={playlist}
                            />  
                        )}
                    </div>
                </>
            :<h2>Loading playlists...</h2>
            }
        </div>
    )
}

PlaylistTable.propTypes = {
    playlists: PropTypes.object.isRequired
}