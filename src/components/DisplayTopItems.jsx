import PropTypes from 'prop-types';

export default function DisplayTopItems({items, type}) {

    return(
        <section className="panel">
            <h3 className="text-18[px] xl: text-3xl">Here are your top ten {type}</h3>
            {items.slice(0, 10).map((item, index) => 
                <p key={index + item.id}>{item.name}</p>
            )}
        </section>
    )
}


DisplayTopItems.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}