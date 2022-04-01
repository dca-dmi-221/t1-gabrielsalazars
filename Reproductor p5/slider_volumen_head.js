const OUTPUT = "HEAD"; // VOLUME | HEAD

const WIDTH = 400;
const HEIGH = 400;

this.song;

this.rectangle = {
  x: WIDTH/8,
  y: HEIGH/2 - 5,
  w: WIDTH/8 * 6,
  h: 10
}

this.bola = {
  x: WIDTH/8,
  y: HEIGH/2,
  r: 15
}

function setup() {
  this.song = loadSound('lucky_dragons_-_power_melody.mp3', song => {
    song.play()
  });
  background(255);
  createCanvas(WIDTH, HEIGH);
}

function draw() {
  
  rectMode(CORNER);
  fill(0)
  rect(0,0,500,500)
  fill(255)
  rect(this.rectangle.x,this.rectangle.y,this.rectangle.w,this.rectangle.h)
  ellipseMode(CENTER)
  ellipse(this.bola.x,this.bola.y,this.bola.r*2)
}

function mouseDragged(){
  if(dist(mouseX,mouseY, this.bola.x,this.bola.y) < this.bola.r){
    const bonderies = {
      x1: this.rectangle.x,
      x2: this.rectangle.x + this.rectangle.w,
    }
    const isInRange = mouseX > bonderies.x1 && mouseX < bonderies.x2;
    if(isInRange){
      this.bola.x = mouseX;
      
      if(OUTPUT === 'VOLUME') {
        const volume = map(mouseX, bonderies.x1,bonderies.x2, 0,100) / 100;
        this.song.setVolume(volume)
      } else if (OUTPUT === "HEAD") {
        const head = map(mouseX, bonderies.x1,bonderies.x2, 0,this.song.duration());
        this.song.jump(head)
      }

    }
  }
}
