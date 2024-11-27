import PropTypes from 'prop-types'
import {useEffect, useRef} from 'react'



export default function InfiniteScrollGrid({getNext, items, GridComponent}) {
    // console.log("items", items)
    const currentPopup = useRef(false)
    const observerRef = useRef() // the ref that is attached to am element


    // function handleScroll(e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     console.log("Scrolling")
    //     // handled by the intersection observer, although may need later for adding css animations
    // }

    useEffect(() => {
        // create the observer, this is detached from anything as of right now and is literally just a floating observer object
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    getNext()
                }
            },
            { threshold: 0.7 } 
        );
    
        // observerRef.current is the DOM element to be observerd. At this point, on initial, is null
        const currentObserverRef = observerRef.current; 

        if (currentObserverRef) {
            observer.observe(currentObserverRef); // Observe the DOM element
        }
    
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef); // Clean up the observer
            }
        };
        
    }, [items]); // Dependency array ensures the effect runs when the ref changes

    return (
        <div>
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
        </div>
    )
}

InfiniteScrollGrid.propTypes = {
    getNext: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    GridComponent: PropTypes.elementType.isRequired
}