
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground;
var r, restart, bg, back;

play = 1;
end = 0;

gameState = play;

var score, survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_0.png");
  restart = loadImage("restart.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("jungle.bg.PNG");
  
  score = 0;
  survivalTime = 0;
}



function setup() {
 createCanvas(570,400);
  
 back = createSprite(350, 195, 20, 20);
 back.addImage(bg);
 back.scale = 1.3; 
 back.velocityX = -4;   
 
  monkey = createSprite(80, 315, 20, 20);
 monkey.addAnimation("running", monkey_running);
 monkey.addAnimation("stop", monkey_stop);
 monkey.scale = 0.06; 
  
 ground = createSprite(200, 350, 900, 10);
 ground.velocityX = -4;
  
 FoodGroup = createGroup();
 obstacleGroup = createGroup();
  
  r = createSprite(290, 200, 70, 10);
  r.addImage(restart); 
  r.scale = 0.5;
  

}


function draw() {
  background("white");
  
  
if(gameState === play){  
  
  
  if(ground.x < 100){
   ground.x = 400;
  } 
  
  if(back.x < 250){
   back.x = 400;
  } 
  
  
  monkey.collide(ground);
  
  r.visible = false;
  
 if(keyDown("space") && monkey.y > 310){
   monkey.velocityY = -15; 
  }
 monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnFoodObstacles();
  
  ground.visible = false;
  
  if(monkey.isTouching(FoodGroup)){
   FoodGroup.destroyEach(); 
   score = score + 1; 
  }
  
  switch(score){
    case 10: monkey.scale = 0.07 ;
    break;
    case 20: monkey.scale = 0.08;
    break;
    case 30: monkey.scale = 0.09;
    break;    
    case 40: monkey.scale = 0.010;
    break;
    case 50: monkey.scale = 0.011;
    break;  
    case 60: monkey.scale = 0.012;
    break; 
    case 70: monkey.scale = 0.013;
    break; 
    case 80: monkey.scale = 0.014;
    break;     
    case 90: monkey.scale = 0.015;
    break;     
    case 100: monkey.scale = 0.016;
    break;     
   }
  
  if(monkey.isTouching(obstacleGroup)){
   monkey.scale = 0.06;
  } 
  
  if(monkey.isTouching(obstacleGroup) && monkey.scale === 0.06){
   gameState = end;
  }  
  
}  

if(gameState === end){
  
   back.velocityX = 0;
  
  monkey.collide(ground);  
  spawnFoodObstacles();
  
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);    
  monkey.changeAnimation("stop", monkey_stop); 
  
  survivalTime = 0;
  
  r.visible = true;
  ground.visible = false;
  
  if(mousePressedOver(r)){
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();   
  gameState = play;
  score = 0;
  survivalTime = 0;
  monkey.changeAnimation("running", monkey_running);   
  }
  
  
  
}  
  
  drawSprites();
  
  fill("white");
  textSize(20);
  text("score:"+ score, 280, 20);
  
  fill("black");
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime, 245, 40);  

}

function spawnFoodObstacles(){
  
  if(frameCount % 150 === 0){
    banana = createSprite(610, Math.round(random(200,315)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -4;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  
    
  }
    
 if(frameCount % 90 === 0){ 
 obstacle = createSprite(610, Math.round(random(340,342)), 10, 10);
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.1;
 obstacle.velocityX = -4;
 obstacle.lifetime = 150;
 obstacle.setCollider("rectangle", 10, 10, 10, 15);  
 obstacle.debug = true;  
 obstacleGroup.add(obstacle);   
 } 

   
  
   
 
  
  
}






