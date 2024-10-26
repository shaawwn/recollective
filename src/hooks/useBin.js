import{useState, useEffect} from 'react'
import {useAuthContext, useApiContext} from '../context/barrel'



export default function useBin() {

    const [bin, setBin] = useState()
    const [binID, setBinID] = useState()
    const {accessToken} = useAuthContext()
    const {spotifyApi, recollectiveApi} = useApiContext()

    async function fetchBin() {
        // get the bin from recollective db
        const response = await recollectiveApi.getBin(binID)
        if(response) {
            const newBin = {
                overview: response.bin,
                playlists: [] // bin.overview.content does this
            }
            setBin(newBin)
        } else {
            console.log("error getting bin")
        }
    }
     
    async function addToBin(payload) {
        //id is playlist/album id
        // bin.overview._id is binID
        console.log("adding to bin")
        try {
            const response = await recollectiveApi.addToBin(bin.overview._id, payload)
            if(!response) {
                throw new Error ("error adding to bin")
            }
            fetchBin()
        } catch(err) {
            console.log("error: ", err)
        }
    }

    async function removeFromBin(id) {
        // id is playlist/album id
        console.log("Removing from bin", id)
    }

    useEffect(() => {
        if(binID) {
            fetchBin()
        }
    }, [accessToken, recollectiveApi, binID])

    return {bin, setBinID, addToBin, removeFromBin}
}