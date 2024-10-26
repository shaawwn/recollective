import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {StaticGrid} from '../barrel'
import DefaultImage from '../../assets/images/default.png'
import {BinManager} from '../playlist_search/barrel'

import {useApiContext} from '../../context/ApiContext'
import {useBinContext} from '../../Dashboard'

const BinComponentContext = React.createContext()

export function useBinComponentContext() {
    return useContext(BinComponentContext)
}

export default function Bin({bin}) {

    // console.log("BIN COMP", bin.overview.content)
    const {addToBin} = useBinContext()


    function handleDragOver(e) {

        e.preventDefault()
        e.stopPropagation()
    }

    function handleDrop(e) {
        console.log("Drop", e.dataTransfer.getData('item'))
    }

    function dragItem(e, item) {
        console.log("item", item)
        const toAdd = {
            image: item.images[0].url,
            id: item.id,
            uri: item.uri,
            name: item.name
        }
        e.dataTransfer.setData('item', JSON.stringify(toAdd))
    }


    return(
        // Create a 'dropable zone' to add bins
        <section
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
        >

            {bin ? 
                <BinComponentContext.Provider value={{
                    // dragItem,
                    addToBin
                }}>
                    <BinHeader bin={bin}/>
                        {bin.overview.content ? 
                            <div className="static-grid">
                               <StaticGrid items={bin.overview.content}/>
                            </div>

                        :<h2>Loading or no bins...</h2>
                        }
                    <BinManager />
                </BinComponentContext.Provider>
            :<h2>Loading bin</h2>
            }

        </section>
    )
}

function BinHeader({bin}) {

    return <div className="flex w-full">
        <img className="image--med" src={DefaultImage} />
        <div className="flex flex-col">
            <h2>{bin.overview.name}</h2>
            <p>By Shawn</p>
        </div>
        
    </div>
}


Bin.propTypes = {
    bin: PropTypes.object.isRequired
}

/**So what goes into a bin? A list of playlists and albums? in a static-grid?
 * 
 * 
 * Bin features, aside from the obvious
 * 
 * Play the whole bin as one big playlist
 * 
 * Create a smaller palylist with tracks from the bin content
 * 
 * Something similar to the PlaylistBuilder, where you can search for albums and playlists to add to the bin (but not individual tracks)
 */