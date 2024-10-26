import PropTypes from 'prop-types'
import {GridItem} from './barrel'



export default function AlbumsTable({albums}) {

    return(
        <div className="static-grid">
            {albums.map((album, index) =>
                <GridItem key={album.id + index} item={album}/>
            )}
        </div>
    )
}

AlbumsTable.propTypes = {
    albums: PropTypes.object.isRequired
}

