import PropTypes from 'prop-types';
import {SingleRowGrid, StaticGrid} from '../barrel'
// import {GridItem} from '../StaticGrid'
import {GridItemBin, GridItem} from '../barrel'

// Home is the default view for a user that displays
/**
 * 
 * Recent playlists
 * 
 * Bins
 * 
 * Playlists
 * 
 * Should not even get to here if playlists is not > 0
 */
export default function Home({playlists, albums, bins}) {

    // can derive recent playlists
    return(
        <>
            {playlists ? 
                <>
                    {bins.length > 0 ? 
                        <>
                            <h3 className="panel__title">Bins</h3>
                            <StaticGrid items={bins} GridComponent={GridItemBin}/>
                        </>
                    :null
                    }

                    <h3 className="panel__title">Playlists</h3>
                    <StaticGrid items={playlists} GridComponent={GridItem}/>
                    <h3 className="panel__title">Albums</h3>
                    <StaticGrid items={albums} GridComponent={GridItem}/>

                    {/* Bins should be visually distinct I think */}
                </>
            :<LoadingSpinner />
            }
        </>
    )
}

function LoadingSpinner() {

    return(
        <div>
            <img src={Vinyl} className="spinner image--med"/>
        </div>
    )
}

Home.propTypes = {
    playlists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    bins: PropTypes.array.isRequired
}