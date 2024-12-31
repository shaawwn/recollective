
export function msToMinutesAndSeconds(ms) {

    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function validateCode(searchParams) {
    // ensure that the code that is passed to the url on launch is valid

    // should be a string
    const params = new URLSearchParams(searchParams)
    const code = params.get('code')

    if(!code || typeof code !== 'string') {
        return null
    }


    return code
}

export function getRandomNumberSet(min, max, size) {

    const rangeSize = max - min + 1;

    if (size > rangeSize) {
        throw new Error(`Cannot generate ${size} unique numbers from a range of ${rangeSize}`);
    }

    let randoms = new Set()

    while(randoms.size < size) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min
        randoms.add(num)
    }

    return randoms
}

export function parseSpotifyId(uri) {
    return uri.split(':')[2]
}

export function parseUriType(uri) {
    // return the uri type album or playlist
    return uri.split(":")[1]
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}

export async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
}
