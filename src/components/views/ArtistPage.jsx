import PropTypes from 'prop-types'
import {StaticGrid, GridItem} from '../barrel'
export default function ArtistPage({artist}) {



    return(
        <section>
            {artist ? 
                <>
                    <ArtistPageHeader image={artist.artist.images[0].url} name={artist.artist.name}/>

                    <h2>{artist.artist.name}'s albums</h2>
                    <StaticGrid items={artist.albums.items} GridComponent={GridItem}/>
                </>
            :<h1>Loading</h1>}
           
        </section>//
    )
}

function ArtistPageHeader({image, name}) {

    return(
        <div className="artist-page__header">
            <img className="image--med" src={image} />
            <p>{name}</p>
        </div>
    )
}

ArtistPage.propTypes = {
    artist: PropTypes.object.isRequired
}

ArtistPageHeader.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}