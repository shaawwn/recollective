import PropTypes from 'prop-types'
import {useEffect, useRef} from 'react'



export default function InfiniteScrollGrid({getNext, items, GridComponent}) {
    // console.log("items", items)
    const currentPopup = useRef(false)
    const observerRef = useRef() // set this to the final element in the array of elements, so when it is rendered (visible) on the page, it hten triggers the fetch to get the next batch of elements


    function handleScroll(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log("Scrolling")

        // the other thing is it should only trigger at the BOTTOM of the current playlists, this triggers when any scroll happens.
    }

    function fetchNextItems() {
        // get the next items in the array from spotifyApi

    }
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log("Trigger scroll in observer");
                    getNext()
                    // Add your scroll handling logic here, e.g., load more items

                }
            },
            { threshold: 0.7 } 
        );
    
        const currentObserverRef = observerRef.current; 
        console.log(observerRef.current)
    
        if (currentObserverRef) {
            observer.observe(currentObserverRef); // Observe the DOM element
        }
    
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef); // Clean up the observer
            }
        };
        
    }, [observerRef]); // Dependency array ensures the effect runs when the ref changes
    
    return (
        <section 
        className="scroll-grid panel"
        >
        {items.map((item, index) => {
            const isLastItem = index === items.length - 1
            return <GridComponent
            currentPop={currentPopup.current}
            key={index + item.name}
            item={item}
            ref={isLastItem ? observerRef : null}
            />

        }
        )}
        
    </section>
    )
}

InfiniteScrollGrid.propTypes = {
    getNext: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    GridComponent: PropTypes.elementType.isRequired
}