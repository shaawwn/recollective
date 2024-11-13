import Vinyl from '../assets/images/vinyl.png'

export default function LoadingSpinner() {

    return(
        <div className="spinner-container">
            <img src={Vinyl} className="spinner image--med"/>
            <h1>Loading...</h1>
        </div>

    )
}