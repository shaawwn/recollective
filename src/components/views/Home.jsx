import PropTypes from 'prop-types';
import {SingleRowGrid, StaticGrid} from '../barrel'
// import {GridItem} from '../StaticGrid'
import {GridItemBin, GridItem} from '../barrel'
import { useUserContext } from '../../context/UserContext';
// Home is the default view for a user that displays
/**
 * 
 * Recent albums, playlists, with bins.
 * 
 * 
 */
export default function Home({playlists, albums, bins}) {

    const {user} = useUserContext() || {}

    return(
        <>
            {user ? 
                <>
                    {bins.length > 0 ? 
                        <>
                            <h3 className="panel__title">Bins</h3>
                            <StaticGrid items={bins} GridComponent={GridItemBin}/>
                        </>
                    :null
                    }

                    <h3 className="panel__title">Recent Playlists</h3>
                    <StaticGrid items={playlists} GridComponent={GridItem}/>
                    <h3 className="panel__title">Recent Albums</h3>
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