import Card from '../cards/Card'


function PlaylistGridPanel({filterType}) {

    // also include followed playlist option or all option
    function dummyCards() {
        // align to center using invisible dummy cards

        return (
            <div className="dummy-card">

            </div>
        )
    }


    return(
        <section className="panel flex flex-col gap-4 bg-red-500">
            {filterType === 'user' ? <h1>Created Playlists</h1>:<h1>All Playlists</h1>}
 

            <div className="grid-view content-start">
                {/* <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card /> */}

            </div>
        </section>
    )
}

export default PlaylistGridPanel