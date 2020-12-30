//Create variables here
var rabbitImage;
var rabbitImage2;
var rabbit;
var database;
var food,foodImage,foodStock,foodRef;

function preload()
{
  //load images here
  rabbitImage = loadImage("images/rabbit.png");
  rabbitImage2 = loadImage("images/rabbit2.png");
  foodImage = loadImage("images/carrot.png");
}

function setup() {
  createCanvas(500, 500);
  rabbit = createSprite(350,250,50,50);
  rabbit.addImage(rabbitImage2);
  rabbit.scale = 0.3;

  food = createSprite(100,300,20,20);
  food.addImage(foodImage);
  food.scale = 0.2;

  database = firebase.database();

  //Reference for food
  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(50);
  
}


function draw() {  
  background(46,140,87);
  drawSprites();

  decreaseFood();

  textSize(32);
  fill("blue");
  text("Bones in the Stock: "+foodStock,50,100);

  if(foodStock === 0){
    textSize(32);
    fill("red");
    text("No More Food",50,300);
    food.visible = false;
  }
  

}
function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)&& foodStock>0){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  rabbit.addImage(rabbitImage);
  rabbit.scale = 0.7;
  
  textSize(28)
  fill("yellow");
  text("Thank you",10,50);
  // food.x = 350;
  // food.y = 200;
  food.visible = false;
  //food.scale = 0.1;

  }
  
  if(keyWentUp(UP_ARROW)){
    
    foodStock = foodStock;
    rabbit.addImage(rabbitImage2);
    rabbit.scale = 0.3;
    food.x = 100;
    food.y = 300;
    food.visible = true;
    //food.scale = 0.2;
    
  }
}



