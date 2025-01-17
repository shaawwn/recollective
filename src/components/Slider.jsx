import PropTypes from 'prop-types'
import {useRef, useEffect} from 'react'



export default function Slider({onIncrease, onDecrease, value, increment}) {

    // value is 0.0-1.0 percentage value. 

    // const valueRef = useRef(value) // useRef to handle changes but not re-render (unneeded)

    const sliderTrack = useRef()
    const sliderContainer = useRef()
    const sliderKnob = useRef()
    const changeValue = useRef(0)

    function handleIncrease(percentVal) {
        onIncrease(percentVal)
    }

    function handleDecrease(percentVal) {
        onDecrease(percentVal)
    }

    function handleSlide(e) {
        const sliderRect = sliderContainer.current.getBoundingClientRect()
        const sliderTrackRect = sliderTrack.current.getBoundingClientRect()
        const startX = e.clientX

        const currentPercent = sliderTrackRect.width / sliderRect.width
        if(changeValue.current > 0) {
            changeValue.current = 0
        }
        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX

                if(moveEvent.clientX < sliderRect.x) {
                    // console.log("Exceeding lower bounds")
                    onDecrease(0)
                    return
                } else if(moveEvent.clientX > sliderRect.x + sliderRect.width) {
                    // console.log("Exceeding upper bounds")
                    onIncrease(100)
                    return
                }

                const percentageChange = Math.abs(deltaX) / sliderRect.width

                if(deltaX < 0) {
                    // reduce volume
                    changeValue.current = Math.round(percentageChange * 10) / 10
                    if(changeValue.current < 0) {
                        // ensure there is not neg change
                        changeValue.current = 0
                    }

                    sliderTrack.current.style.width = `${(currentPercent - changeValue.current) * 100}%`


                    handleDecrease((currentPercent - changeValue.current) * 100)

                } else if(deltaX > 0) {
                    // increase volume
                    changeValue.current = Math.round(percentageChange * 10) / 10

                    if(changeValue.current > 1) {
                        changeValue.current = 1
                    }

                    sliderTrack.current.style.width = `${(currentPercent + changeValue.current) * 100}%`

        
                    handleIncrease((currentPercent + changeValue.current) * 100)

                }
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

            changeValue.current = _handleIncrementCalc(diff, sliderRect.width)
            sliderTrack.current.style.width = `${changeValue.current * 100}%`
            handleIncrease(changeValue.current * 100)

        } else if(diff < currentRect.width) {
            changeValue.current = _handleIncrementCalc(diff, sliderRect.width)
            sliderTrack.current.style.width = `${changeValue.current * 100}%`

            onDecrease(changeValue.current * 100)
        } else {
            // console.log("Do nothing", diff, currentRect.width)
        }

        
    }


    function renderTrackWidth() {
        // handle the width of the track on change
        sliderTrack.current.style.width = `${value * 100}%`
    }

    function _handleIncrementCalc(diff, width) {
        let toChange;
        if(increment === 10) {
            // console.log("increment by 10")
            toChange = Math.ceil((diff / width) * 10) / 10
        } else {
            // console.log("increment by 1")
            toChange = Math.round((diff / width) * 100) /100
        }
        return toChange
    }

    useEffect(() => {
      
        if(value >= 0) {
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
    // onClick: PropTypes.func.isRequired, // not needed
    value: PropTypes.number.isRequired,
    increment: PropTypes.number.isRequired
}

