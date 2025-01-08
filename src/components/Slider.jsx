import PropTypes from 'prop-types'
import {useRef, useEffect} from 'react'





export default function Slider({onIncrease, onDecrease, onClick, value, increment}) {

    // value is 0.0-1.0 percentage value. 

    const valueRef = useRef(value) // useRef to handle changes but not re-render

    const sliderTrack = useRef()
    const sliderContainer = useRef()
    const sliderKnob = useRef()
    const changeValue = useRef(0)

    function handleIncrease(percentVal) {
        console.log("Increasing volume to: ", percentVal)
        onIncrease(percentVal)
    }

    function handleDecrease(percentVal) {
        console.log("Decreaseing volume to: ", percentVal)
        onDecrease(percentVal)
    }

    function handleSlide(e) {

        // the entire point of the increment is to reduce the number of api requests for minute changes in things like volume (don't make 100 requests going from 1.0 -> 0.0 for example)
        const sliderRect = sliderContainer.current.getBoundingClientRect()
        const sliderTrackRect = sliderTrack.current.getBoundingClientRect()
        const startX = e.clientX

        const currentPercent = sliderTrackRect.width / sliderRect.width
        // console.log("Current percent", currentPercent)

        if(changeValue.current > 0) {
            changeValue.current = 0
        }
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX
            // console.log("DELTA", deltaX)
            
            

            // const incrementValue = Math.floor(sliderRect.width / 10)

            // if(deltaX % increment === 0) {
                // console.log("Increment slider on increment value", deltaX)
                
                if(moveEvent.clientX < sliderRect.x) {
                    console.log("Exceeding lower bounds")
                    onDecrease(0)
                    return
                } else if(moveEvent.clientX > sliderRect.x + sliderRect.width) {
                    console.log("Exceeding upper bounds")
                    onIncrease(100)
                    return
                }

                const percentageChange = Math.abs(deltaX) / sliderRect.width

                if(deltaX < 0) {
                    // reduce volume
                    // let toChange =  Math.round(percentageChange * 10) / 10

                    changeValue.current = Math.round(percentageChange * 10) / 10
                    // console.log("Decrease on slide", changeValue.current)

                    // the toChange amount is the amount to add/sub from the current volume
                    // adjust the current track -toChange
                    sliderTrack.current.style.width = `${(currentPercent - changeValue.current) * 100}%`
                    handleDecrease(changeValue.current * 100)
                } else if(deltaX > 0) {
                    // increase volume

                    changeValue.current = Math.round(percentageChange * 10) / 10

                    sliderTrack.current.style.width = `${(currentPercent + changeValue.current) * 100}%`
                    handleIncrease(changeValue.current * 100)
                }
            // }
        }

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.remo
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    function handleClick(e) {
        // need to get the *approximate* location of the slider click, this is where increment might be important again. if icnrement = 10, then round UP to the nearest 10, if one, then round to nearest 1

        // depending on clickLoc, call the appropriate function

        // check click location relative to current

        const sliderRect = sliderContainer.current.getBoundingClientRect()
        const currentRect = sliderTrack.current.getBoundingClientRect()

        const clickLoc = e.clientX
        const diff = clickLoc - sliderRect.x

        if(changeValue.current > 0) {
            changeValue.current = 0
        }
        if(diff > currentRect.width) {
            // call onIncrease
            // const toChange = _handleIncrementCalc(diff, sliderRect.width)
            changeValue.current = _handleIncrementCalc(diff, sliderRect.width)
            // console.log("Increase", changeValue.current)
            sliderTrack.current.style.width = `${changeValue.current * 100}%`
            handleIncrease(changeValue.current * 100)

        } else if(diff < currentRect.width) {
            // const toChange = _handleIncrementCalc(diff, sliderRect.width)

            changeValue.current = _handleIncrementCalc(diff, sliderRect.width)
            // console.log("decrease", changeValue.current)
            sliderTrack.current.style.width = `${changeValue.current * 100}%`

            onDecrease(changeValue.current * 100)
        } else {
            console.log("Do nothing", diff, currentRect.width)
        }

        
    }


    function renderTrackWidth() {
        // handle the width of the track on change

        sliderTrack.current.style.width = `${value * 100}%`
    }

    function _handleIncrementCalc(diff, width) {
        let toChange;
        if(increment === 10) {
            console.log("increment by 10")
            toChange = Math.ceil((diff / width) * 10) / 10
        } else {
            console.log("increment by 1")
            toChange = Math.round((diff / width) * 100) /100
        }
        return toChange
    }

    useEffect(() => {

      
        if(value) {
            renderTrackWidth()   
        }

    }, [value])

    useEffect(() => {
     
        const slider = sliderContainer.current

        if(!slider) {
            return
        }

        slider.addEventListener('click', handleClick)
        return () => {
            slider.removeEventListener('click', handleClick)
        }
    }, [])

    return(
        <div id="" className="slider-container vertical-margin-center" ref={sliderContainer}>
            <div id="" ref={sliderTrack} className="slider-track">
                <div 
                    ref={sliderKnob} 
                    className="slider-knob"
                    onMouseDown={handleSlide}
                    ></div>
            </div>
        </div>
    )
}

Slider.propTypes = {
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    increment: PropTypes.number.isRequired
}


/**
 * 
 * Slider allows for sliding left/right as well as click on location to set some state value for whatever the slider is for.
 * 
 * Knob exists as a UI element to guide users to where the slider is clickable
 * 
 * Slider-track is a dynamic element that matches with whatever the state is the slider is being used for. That is, as the state changes, the slider-track will also need to change in real time to match that state.
 * 
 * For volume, this is straightforward as you generally just set volume and nothing else. For progress in a song, however, the slider-track needs to update along with the track progress. 
 * 
 * Work on volume for now with considerations for how to add progress in the future.
 * 
 * That is, the slider itself does not handle any of the state that is being passed to it, it is only a UI element that renders some state.
 * 
 */