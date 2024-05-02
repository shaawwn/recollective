import Card from '../cards/Card'
function PlaylistGridView() {

    return(
        <section className="flex flex-col gap-4 bg-red-500">
            <h1>Your created playlists</h1>
            <div className="grid-view content-start">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        </section>
    )
}

export default PlaylistGridView