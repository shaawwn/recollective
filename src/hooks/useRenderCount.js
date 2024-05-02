import {useRef, useEffect} from 'react'

function useRenderCount(component) {

    const renderCount = useRef(0)
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
        console.log(`Rendered ${renderCount.current} times in ${component}`)

    })
    return renderCount
}

export default useRenderCount