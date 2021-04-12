var dogImg, happyImg;
var dog;
var database;
var foodCount;
var count;
function preload(){
  dogImg = loadImage("Dog.png");
  happyImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(800,400);

  database = firebase.database();

  dog = createSprite(400,200,50,50);
  dog.addImage(dogImg)
  dog.scale = 0.2;

  foodCount = database.ref('Food');
  foodCount.on("value",readFood)

  
}

function draw() {
  background("green"); 

  if(keyWentDown(UP_ARROW)){
    writeFood(count);
    dog.addImage(happyImg)

  }
  if(keyWentDown(DOWN_ARROW)){
    dog.addImage(dogImg)
  }
  fill("yellow")
  textSize(15);
  text("The remain food count is: "+count,200,30);



  
  

  drawSprites();
}

function readFood(data){
  count = data.val()

}

function writeFood(num){
  if(num<=0){
    num=0;
  }
  else{
    num= num-1;
  }
  database.ref('/').update({
    Food:num
  })


}