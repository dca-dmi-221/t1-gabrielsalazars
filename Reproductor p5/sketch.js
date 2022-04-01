let app;
let bGImage; 
let titleImage;

function preload() {
  bGImage = loadImage('assets/bg.png');
  titleImage = loadImage('assets/title.png')
  default1 = loadImage ('assets/default1.png')


  app = new App
  app.player.preload()

}

//-------------------


function setup (){
  createCanvas(1000, 500);


  
  image(bGImage, 0, 0);
  image(titleImage,30,50)
  image(default1, 670, 90)
  


  app.setup()
}

function draw() {
  
  app.show();

}

function mouseDragged(){
  app.player.mouseDragged()
}

function mouseClicked() {
  app.player.mouseClicked()
}