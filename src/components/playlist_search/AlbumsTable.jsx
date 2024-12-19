import PropTypes from 'prop-types'
import {GridItem} from './barrel'


// make these draggable?  
export default function AlbumsTable({albums, draggable}) {



    return(
        <div className="static-grid">
            {albums.map((album, index) =>
                <GridItem 
                    key={album.id + index} 
                    item={album}
                    draggable={draggable}
                    />
            )}
        </div>
    )
}

AlbumsTable.propTypes = {
    albums: PropTypes.array.isRequired,
    draggable: PropTypes.bool
}

