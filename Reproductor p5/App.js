class App {

    constructor() {
        let defaultPlaylist = new Playlist("default")
        this.playlists = [defaultPlaylist]
        this.activePlaylist = 0
    }

    setup(){
        fill(255);
        this.activePlaylistTitle = createElement("div", this.playlists[this.activePlaylist].name)
        this.activePlaylistTitle.position(10,10)
        this.activePlaylistTitle.style('color', '#FFFFFF')
        this.activePlaylistTitle.style('font-size', '30px')

        let playlistInput =  createInput();
        playlistInput.position(20, 50);

        let button = createButton ("Crear Playlist");
        button.position(playlistInput.x + 200 , 50)

        button.mousePressed(a=>{
            this.createPlaylist(playlistInput.value());
            playlistInput.value("");
        }) 

        let playlistContainer = createDiv()
        playlistContainer.id("playlist-container")
        playlistContainer.position(20,100)

        let fileInput = createFileInput(file => {
            this.playlists[this.activePlaylist].songs.push(new Song(file))
        });
        fileInput.position(300, 300)
    }

    show() {
        this.activePlaylistTitle.html(this.playlists[this.activePlaylist].name)
        let playlistContainer = select("#playlist-container")
        playlistContainer.html("")
        for(let i = 0; i < this.playlists.length; i++){
            let playlist = this.playlists[i]
            let playlistDiv = createDiv(playlist.name)
            if(i == this.activePlaylist){
                playlistDiv.style('background-color', '#FF9900')
            } else {

                playlistDiv.style('background-color', '#ABBAEA')
            }
            playlistDiv.style('width', '200px')
            playlistDiv.style('height', '35px')
            playlistDiv.style('line-height', '35px')
            playlistDiv.style('text-align', 'center')
            playlistDiv.parent("playlist-container")
            playlistDiv.mousePressed(a=>{
                this.activePlaylist = i
            })
        }

    }
    
    createPlaylist(name) {
        let newPlaylist = new Playlist(name);
        this.playlists.push(newPlaylist);
        
    }

}