class Player {

    constructor() {
        this.song = null;
        this.audio = null;
        this.playing = false;
        this.volume = 0;
        this.rectangle = {
            x: 690,
            y: 400,
            w: 190,
            h: 10
        }
        
        this.bola = {
            x: 690,
            y: 405,
            r: 15
        }
    }
    preload() {
       this.playButton = loadImage ('assets/play.png')
    }

    changeSong(song){
        this.song = song
        if(this.audio != null){
            this.audio.stop();
        }
        this.audio = createAudio(this.song.file.data)
        this.audio.play();
        this.playing = true;
    }

    setup() {
        let btnPath = 'assets/play.png';
        let playBtn = createImg(btnPath);
        playBtn.position(745,320)
        playBtn.mousePressed(a=>{
            if(this.song != null){
                
                if(this.playing){
                    this.audio.pause();
                    this.playing = false;
                } else {
                    this.audio.play();
                    this.playing = true;
                }

            }
        })

        
                
        
        this.activeSongTitle = createElement("div")
        this.activeSongTitle.position(500,100)
        this.activeSongTitle.style('color', '#FFFFFF')
        this.activeSongTitle.style('font-size', '18px')

        textSize(14)
        text("Time:",630,410)
        this.songTimer = createElement("div", "0:0 / 0:0")
        this.songTimer.position(900,397)
        this.songTimer.style('color', '#FFFFFF')
        this.songTimer.style('font-size', '14px')


        text("Volume:",630,450)
        this.volumeText = createElement("div", this.volume)
        this.volumeText.position(850,435)
        this.volumeText.style('color', '#FFFFFF')
        this.volumeText.style('font-size', '14px')

        this.volumeSlider = createSlider(0, 100,100);
        this.volumeSlider.position(690, 431);

    }

    show() {

        if (this.song != null) {
            this.activeSongTitle.html(this.song.name)
            let cur = this.audio.time()
            let curSec = Math.floor(cur%60) < 10 ? "0"+Math.floor(cur%60) : Math.floor(cur%60)

            let dur = this.audio.duration()
            let durSec = Math.floor(dur%60) < 10 ? "0"+Math.floor(dur%60) : Math.floor(dur%60)
            this.songTimer.html(Math.floor(cur/60)+":"+curSec+" / "+Math.floor(dur/60)+":"+durSec)
            
            const bonderies = {
                x1: this.rectangle.x,
                x2: this.rectangle.x + this.rectangle.w,
            }
            const head = map(this.audio.time(), 0, this.audio.duration(), bonderies.x1,bonderies.x2);

            this.bola.x = head;
        } else{
            this.songTimer.html("0:00 / 0:00")
        }

        this.volumeText.html(this.volumeSlider.value())
        if(this.song != null){
            this.audio.volume(this.volumeSlider.value()/100)
        }

        rectMode(CORNER);
        fill("#1c1c1c")
        stroke("#1c1c1c")
        rect(670,380,227,50)
        fill(255)
        rect(this.rectangle.x,this.rectangle.y,this.rectangle.w,this.rectangle.h)
        ellipseMode(CENTER)
        ellipse(this.bola.x,this.bola.y,this.bola.r*2)
    

    }

    mouseDragged(){
        if(dist(mouseX,mouseY, this.bola.x,this.bola.y) < this.bola.r){
            const bonderies = {
            x1: this.rectangle.x,
            x2: this.rectangle.x + this.rectangle.w,
            }
            const isInRange = mouseX > bonderies.x1 && mouseX < bonderies.x2;
            if(isInRange){
            this.bola.x = mouseX;
            if(this.song != null){
                const head = map(mouseX, bonderies.x1,bonderies.x2, 0,this.audio.duration());
                this.audio.time(head)
                //console.log(head)
            }
            
            /*if(OUTPUT === 'VOLUME') {
                const volume = map(mouseX, bonderies.x1,bonderies.x2, 0,100) / 100;
                this.song.setVolume(volume)
            } else if (OUTPUT === "HEAD") {
                
            }*/
        
            }
        }
    }

    mouseClicked(){
        const bonderies = {
            x1: this.rectangle.x,
            x2: this.rectangle.x + this.rectangle.w,
            y1: this.rectangle.y,
            y2: this.rectangle.y + this.rectangle.h
        }
        if( mouseX > bonderies.x1 && mouseX < bonderies.x2
            &&  mouseY > bonderies.y1 && mouseY < bonderies.y2){
                if(this.song != null){
                    const head = map(mouseX, bonderies.x1,bonderies.x2, 0,this.audio.duration());
                    this.audio.time(head)
                    //console.log(head)
                }
            }
    }

}