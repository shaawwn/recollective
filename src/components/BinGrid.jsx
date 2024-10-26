import PropTypes from 'prop-types'




/**
 * 
 * This is for displaying BINS not the content of bins, bin content should still use StaticGrid like other parts of the app, since you are navigating albums/playlists
 */
export default function BinGrid({items}) {

    console.log("items", items)
    return (
        <section className="bin-grid panel">
            {/* {items.map((item, index) =>
                <h2></h2>
            )} */}
        </section>
    )
}

BinGrid.propTypes = {
    items: PropTypes.array.isRequired
}