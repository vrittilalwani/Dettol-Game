
var bg, bgImage;
var player, playerImage;
var ground;
var bulletGroup;
var bulletImage;
var bulletSound;
var bulletCock;
var walking;
var germ1, germ1Image;
var germsGroup;
var b = 35;
var flag = 0;
var score;
var secondSprite, secondSpriteImage;
var dettolHandwash, dettolHandwashImage;
var dettolSanitizer, dettolSanitizerImage;
var dettolSoap, dettolSoapImage;
var germ, germImage;
var walking;
var gamestate = "stage1";
var s2;

var b1,b2,b3,b4,b5;
var score = 0;
var count = 0;



score = 0;

function preload(){
  bgImage = loadImage("background.jpg")
  playerImage = loadImage("gun sprite.png")
  bulletImage = loadImage("bullet.png")
  bulletSound = loadSound("shot.mp3")
  bulletCock = loadSound("gunCock.mp3")
  walking = loadSound("walking.mp3")
  germ1Image = loadImage("germ1.png")
  secondSpriteImage = loadImage("secondSprite.png")
  dettolHandwash = loadImage("dettolhandwash.png")
  dettolSanitizer = loadImage("dettolsanitizer.png")
  dettol1 = loadImage("dettolSoap.png")

  

    
  

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  bg = createSprite(600,300)
  bg.addImage(bgImage)

  player= createSprite(80,480)
  player.addImage(playerImage)
  bg.scale = 0.75
  ground= createSprite(displayWidth/2,displayHeight - 250,displayWidth,10);
  ground.visible = false;

  b1 = createSprite(displayWidth-200,50,20,10);
  b2 = createSprite(displayWidth-220,50,20,10);
  b3 = createSprite(displayWidth-240,50,20,10);
  b4 = createSprite(displayWidth-260,50,20,10);
  b5 = createSprite(displayWidth-280,50,20,10);

  b1.shapeColor = "green";
  b2.shapeColor = "green";
  b3.shapeColor = "green";
  b4.shapeColor = "green";
  b5.shapeColor = "green";

  s2 = createSprite(displayWidth/2,displayHeight/2);
  s2.addImage(dettolHandwash);
  s2.scale = 2;
  s2.visible =false;
  
  bulletGroup = new Group();
  germsGroup = new Group();

}

function draw() {
 background(0);

if(gamestate === "stage1"){
  bg.velocityX = -10;

  if (bg.x<100){
    bg.x = bg.width/2 - 470;
  }

  if(keyWentDown("u")&& player.y>475){
    player.velocityY = -10;
  }

  player.velocityY = player.velocityY + 0.6;
  console.log(player.y);

  player.collide(ground);


  /*for(var i = 0 ; i < 35; i ++){
    if(keyWentDown("b") && b > 0 && flag === 0){
      flag = 1;
      spawnBullets();
      bulletSound.play();
    }
    if(flag == 1){
      flag =0;
      b = b - i ;
    }
  }*/

  //if(score)

  if(keyWentDown("b")){
    spawnBullets();
    bulletSound.play();
  }


  /*
  Try creating game states
  collect all images animation and sound
  dettol soap, hand wash, liquid, sanitier,
  game state 2 images for player, background, bullets, germs
  */


  for(var j = 0;j<germsGroup.length;j++){
    for(var t=0;t<bulletGroup.length;t++){
      if(germsGroup.get(j).isTouching(bulletGroup.get(t))){
        germsGroup.get(j).destroy();
        bulletGroup.get(t).destroy();
        score = score + 2 ;
      }
    }
  }

  if(score <10){
    spawnGerms();
  }

  if(score === 10){
    s2.visible=true;
    gamestate = "stage2";
  }

}

if(gamestate === "stage2"){
  if(mousePressedOver(s2)){
    gamestate="stage3";
  }
}

if(gamestate=="stage3"){
  player.y = mouseY;
}
  drawSprites();

  textSize(25);
  fill(0)
  text(" Score  " + score, displayWidth - 200, 50)
  //text("Bullets left  " + b, displayWidth - 200 , 50 );
}

function spawnBullets(){
  var bullet = createSprite(player.x+100,player.y + 40);
  bullet.addImage(bulletImage);
  bullet.velocityX = 5;
  bullet.lifetime= 200;
  bullet.scale = 0.4;
  bulletGroup.add(bullet);
}

function spawnGerms(){
  if(frameCount % 80 === 0){
  var germ = createSprite(displayWidth,300);
  germ.addImage(germ1Image);
  germ.y = Math.round(random(displayHeight/2, displayHeight-300));
  germ.velocityX = -5;
  germ.lifetime= 200;
  germ.scale = 0.35;
  germsGroup.add(germ);
}
}

