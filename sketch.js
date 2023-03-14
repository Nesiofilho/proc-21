// declaração das variáveis 

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var   spookySound;



var gameState = "play"




// carregamento de imagens

function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}



// função estática -> carregado 1x 

function setup(){
  createCanvas(600,600);

  spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  // new Group | CreateGroup ***
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  
}


//estar em looping

function draw(){
  
        background(0);
        
        if (gameState === "play") {
          if(keyDown("left_arrow")){
            ghost.x = ghost.x - 3;
          }
          
          if(keyDown("right_arrow")){
            ghost.x = ghost.x + 3;
          }
          
          if(keyDown("space")){
            ghost.velocityY = -10;
          }
          
          ghost.velocityY = ghost.velocityY + 0.8
          
          if(tower.y > 400){
            tower.y = 200
          }
          spawnDoors();

          
          //climbersGroup.collide(ghost);
          if(climbersGroup.isTouching(ghost)){
            ghost.velocityY = 0;
          }
          if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
            ghost.destroy();
            gameState = "end";
          }
          
          drawSprites();
          
        }  
        
        if (gameState === "end"){
          stroke("yellow");
          fill("yellow");
          textSize(30);
          text("Fim de Jogo", 230,250)
        }

} // isso gera erro 





function spawnDoors() {
  
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);


    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    


    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
   
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    
    doorsGroup.add(door);
    // invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    
  }
}


