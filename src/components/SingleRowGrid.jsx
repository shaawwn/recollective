import PropTypes from 'prop-types'
import DefaultImage from '../assets/images/default.png'
export default function SingleRowGrid({items}) {
    return(
        <section className="single-row-grid panel">
            {items.map((item, index) => 
                // <p key={index + item.id}>{item.name}</p>
                <GridItem item={item}/>
            )}
        </section>
    )
}

function GridItem({item}) {
    return(
        <div>
            <img className="image--med" src={
                item.images ?
                item.images[0].url : DefaultImage
                }/>
        </div>
    )
}

SingleRowGrid.propTypes = {
    items: PropTypes.array.isRequired,
}