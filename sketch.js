var man, score, box, boxGroup, ground;
var gameState = "play"
var manImg;
var edges;
function preload(){
 manImg = loadAnimation("runner1.png","runner2.png","runner3.png",
            "runner4.png","runner5.png","runner6.png");
}

function setup() {

    createCanvas(900,400);
    man = createSprite(100,200,20,20);
    man.addAnimation("man",manImg);
    ground = createSprite(400,370,800,100);
    boxGroup = new Group();
    score = 0;
    ground.lifetime = 2000;
    edges = createSprite(0,400,900,4);
    edges.visible = false;
}

function draw() {
    background("blue");
    fill("orange");
    strokeWeight(0);
    rect(0,290,900,150);
    text("Score :"+score,100,50);
    if (gameState === "play"){
        score += 1;
        man.velocityY += 0.5;
        ground.velocityX = -1.25 - (score/200);

        if (keyDown("space") && man.y > 280){
            man.velocityY = -11.5;    
        }
        ground.displace(man)
        boxGroup.displace(man)
        spawnBox();
        if (man.collide(edges)){
            gameState = "end";
        }
    }
    if (gameState === "end"){
        man.destroy();
        ground.lifetime = -1;
        boxGroup.setLifetimeEach(-1);
        ground.velocityX = 0;
        textAlign(CENTER,CENTER);
        textSize(40);
        text("GAME OVER",450,200);
    }
    boxGroup.setVelocityXEach(ground.velocityX);
    drawSprites();
}
function spawnBox(){
    if (frameCount % 100 === 0 || frameCount === 0){

        box = createSprite(random(800,820) + score/200,310,random(50,80),random(50,100));
        box.lifetime = 1000;
        boxGroup.add(box);
    }
}