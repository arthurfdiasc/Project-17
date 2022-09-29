var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOverImg, GameOver

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Movendo plano de fundo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 23;


//criar menino correndo 
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.04;

//criar o fim de jogo
GameOver = createSprite(200,200, 20, 20);
GameOver.addImage(gameOverImg);


  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  GameOver.visible = false;
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 400 ){
    path.y = height/2;
  }  else if (gameState === END) {
    GameOver.visible = true;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      //aumente a treasureCollection para 50
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            //aumente a treasureCollection para 100
            treasureCollection = treasureCollection + 100
   
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            //aumente a treasureCollection para 150
            treasureCollection = treasureCollection + 150

          }
    else{
      if(swordGroup.isTouching(boy)) {
//Mude o gameState (estado do jogo) para End
gameState = 0;
//destrua todos os grupos
cashG.destroyEach();
diamondsG.destroyEach();
jwelleryG.destroyEach()
// defina setvelocityEach como 0 para todos os grupos
cashG.setVelocityEach(0);
diamondsG.setVelocityEach(0);
jwelleryG.setVelocityEach(0);

    }

  }
  
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
  }
drawSprites();
  
}

function createCash() {
  if (World.frameCount % 30 == 0) {
  var cash = createSprite(Math.round(random(50, 350),100, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 20;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 60 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),100, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 20;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 50 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),100, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 20;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 15 == 0) {
  var sword = createSprite(Math.round(random(50, 350),100, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 30;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
