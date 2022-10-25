var bg,bgImg;
var player, shooterImg, shooter_shooting
var zombieWalking
var life = 3
var FORM = 1
var PLAY = 2
var gameState = FORM
var score = 0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieWalking = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  startImg = loadImage("assets/start.png")
  winMp3 = loadSound("assets/win.mp3")
  craigBossImg = loadImage("assets/bossCraig.gif")
  boulderRockImg = loadImage("assets/boulder.png") 
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  zombieGroup = new Group()
  bulletGroup = new Group()

  bg = createSprite(displayWidth/2+100,displayHeight/2,20,20)
    bg.addImage(bgImg)
    bg.scale = 1.2

  
 boulder = createSprite(displayWidth)
 heart1 = createSprite(displayWidth -100,40,20,20)
 heart2 = createSprite(displayWidth -150,40,20,20)
 heart3 = createSprite(displayWidth -144,40,20,20)
 start = createSprite(displayWidth /2, displayHeight /2)
 bottomGround = createSprite(displayWidth-displayWidth,displayHeight/2 + 300,800,20)
 topGround = createSprite(displayWidth-displayWidth,displayHeight/2 -300,800,20)
 heart1.addImage(heart1Img)
 heart2.addImage(heart2Img)
 heart3.addImage(heart3Img)
 start.addImage(startImg)
 heart1.scale = 0.4
 heart2.scale = 0.4
 heart3.scale = 0.4
 start.scale = 1.5
 heart1.visible = false
 heart2.visible = false
 topGround.visible = false
 bottomGround.visible = false



 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.setCollider("rectangle",0,0,300,300)
   player.visible = false


}

function draw() {
  background(0); 
  if(gameState == FORM){
    if(mousePressedOver(start)){
     gameState = PLAY
    }
   }
  if(gameState == PLAY){
    start.visible = false
    player.visible = true
    if(player.y>bottomGround.y){
      player.y = bottomGround.y
    }
    if(player.y<topGround.y){
      player.y = topGround.y
    }

  if(life == 3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  }
  if(life == 2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if(life == 1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }
  if(life == 0){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = true
    gameState = "lost"
  }

  if(score === 50){
    winMp3.play()
    winState()
  }

  
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}



if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  bullet = createSprite(player.x,player.y -30,20,10)
  bulletGroup.add(bullet)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 50
  bullet.lifetime = 800
}


else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(player)){
  for(var i=0; i < zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life-=1
    }
  }
}
zombieGroup.overlap(bulletGroup,(zombie,bullet)=>{
  zombie.destroy()
  bullet.destroy()
  score += 5
})
boulderRock()
zombieBoss()
zombieGaming()
}


drawSprites();
textSize(30)
text("Pontuação: "+score, displayWidth /2,displayHeight/2 -350)
if(gameState === "lost"){
 gameOver()
}

 
}
function zombieGaming(){
  
  if(frameCount%80 === 0){
    zombie = createSprite(width,random(500,height),40,40)
    zombie.addImage("zombie",zombieWalking)
    zombie.velocityX = -(6*2+score/15)
    zombie.scale = 0.15
    zombieGroup.add(zombie)
    zombie.lifetime = 800
  }
}
function gameOver() {
  swal({
    title: "Game Over",
    text: "Parece que os zombies foram mais rápidos!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  },
  function(confirm){
    if(confirm){
      location.reload()
    }
  }
  );
}
function winState() {
  swal({
    title: "Game Win",
    text: "Parece que os zumbies não conseguiram te alcançar!",
    imageUrl:
      "https://images.emojiterra.com/google/android-10/512px/1f44d.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  },
  function(confirm){
    if(confirm){
      location.reload()
    }
  }
  );
}function zombieBoss(){
  
  if (frameCount %100 === 0){
  //bossCraig = createImage()
  //image(craigBossImg,0,0,width,height)[
  var craig = createSprite(width,height/2,50,50)
  craig.addImage(craigBossImg)
  craig.scale = 0.5
 
  craig.velocityX =- 1
  }

}
function boulderRock() {
  if (frameCount %100 === 0){
  boulder = createSprite(width-100,600,20,20)
  boulder.velocityX = -15
  boulder.addAnimation("pedra", boulderRockImg)
  boulder.scale = .2
}}
