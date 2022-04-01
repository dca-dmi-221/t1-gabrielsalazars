class App {

    constructor() {
        let defaultPlaylist = new Playlist("default")
        this.playlists = [defaultPlaylist]
        this.songs = []
        this.activePlaylist = 0
        this.activeSong = -1
        this.player = new Player ()
    }

    setup(){
        fill(255);
        textSize(18)
        text("Create playlist",30,140)
        text("View playlist",30,250)
        text("Playlist:",440,100)
        text("Songs:",440,125)


        this.activePlaylistTitle = createElement("div", this.playlists[this.activePlaylist].name)
        this.activePlaylistTitle.position(510,85)
        this.activePlaylistTitle.style('color', '#FFFFFF')
        this.activePlaylistTitle.style('font-size', '18px')

        let playlistInput =  createInput();
        playlistInput.position(20, 160);

        let button = createButton ("Crear Playlist");
        button.position(playlistInput.x + 190 , 160)

        button.mousePressed(a=>{
            this.createPlaylist(playlistInput.value());
            playlistInput.value("");
        }) 

        let playlistContainer = createDiv();
        playlistContainer.id("playlist-container");
        playlistContainer.position(20,260);

        let songsContainer = createDiv();
        songsContainer.id("songs-container");
        songsContainer.position(400,140);

        let fileInput = createFileInput(file => {

            
            this.playlists[this.activePlaylist].songs.push(new Song(file))

           

        });
        fileInput.position(12, 200)

        let nextBtn = createImg('assets/next.png');
        nextBtn.position(780,297)
        nextBtn.mousePressed(a=>{
            let numberOfSongs = this.playlists[this.activePlaylist].songs.length
            if(this.activeSong != -1){
                this.activeSong = (this.activeSong+numberOfSongs-1)%numberOfSongs
                this.player.changeSong(this.playlists[this.activePlaylist].songs[this.activeSong])
            }
        })

        let prevBtn = createImg('assets/back.png');
        prevBtn.position(660,297)
        prevBtn.mousePressed(a=>{
            let numberOfSongs = this.playlists[this.activePlaylist].songs.length
            if(this.activeSong != -1){
                this.activeSong = (this.activeSong+1)%numberOfSongs
                this.player.changeSong(this.playlists[this.activePlaylist].songs[this.activeSong])
            }
        })

        this.player.setup()
    }



    show() {
        this.activePlaylistTitle.html(this.playlists[this.activePlaylist].name)
        let playlistContainer = select("#playlist-container")
        playlistContainer.html("")
        for(let i = 0; i < this.playlists.length; i++){
            let playlist = this.playlists[i]
            let playlistDiv = createDiv(playlist.name)
            if(i == this.activePlaylist){
                playlistDiv.style('background-color', '#CA5353')
            } else {

                playlistDiv.style('background-color', '#FFE600')
            }
            playlistDiv.style('width', '200px')
            playlistDiv.style('height', '35px')
            playlistDiv.style('line-height', '35px')
            playlistDiv.style("border-radius", "60px");
            playlistDiv.style("padding-left","20px");
            playlistDiv.style("margin-bottom", "5px")

            playlistDiv.parent("playlist-container")
            playlistDiv.mousePressed(a=>{
                this.activePlaylist = i
            })
        }

        let songsContainer = select("#songs-container")
        songsContainer.html("")
        let currentPlaylist = this.playlists[this.activePlaylist]

        for(let i = 0; i <  currentPlaylist.songs.length; i++){
            let song = currentPlaylist.songs[i]
            let songDiv = createDiv(song.name)

            if(i == this.activeSong && this.activeSong != -1 && this.player.song == song){
                songDiv.style('background-color', '#CA5353')
            } else {

                songDiv.style('background-color', '#FFE600')
            }
            songDiv.style('width', '200px')
            songDiv.style('height', '35px')
            songDiv.style('line-height', '35px')
            songDiv.style("border-radius", "60px");
            songDiv.style("padding-left","20px");
            songDiv.style("margin-bottom", "5px")

            songDiv.parent("songs-container")
            songDiv.mousePressed(a=>{
                this.activeSong = i
                this.player.changeSong(song)
            })

        }

        this.player.show();
    }
    
    createPlaylist(name) {
        let newPlaylist = new Playlist(name);
        this.playlists.push(newPlaylist);
        
    }

}