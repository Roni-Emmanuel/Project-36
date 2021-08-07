var dog,sadDog,happyDog;
var lastFed;
var foodS,foodStock;
var addFood;
var foodObj;
var db;
var getFoodStock;
var readStock;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  db = firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();

  foodStock = db.ref('Food');
  foodStock.on("value", readStock);
  db.ref('readStock/Food').set
  
  dog=createSprite(800,200,150,150);
  dog.addAnimation("sadDog", sadDog);
  dog.addAnimation("happyDog", happyDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  feed.addClass("button");

  addFood = createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  addFood.addClass("button");

}

function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = db.ref('FeedTime');
  fedTime.on("value", function (data){
      lastFed = data.val();
  })
  //write code to read fedtime value from the database 
  fill(255,255,254  );
  stroke("black");
  textSize(20); 
  if(lastFed>=12) {
    text("Last Feed : " + lastFed % 12 + "PM",300,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM",350,30);
  } else {
    text("Last Feed :" + hour() + "AM",350,30);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()+0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  db.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

})
}

//function to add food in stock
function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}
