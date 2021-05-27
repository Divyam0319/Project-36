var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var feedDog;
var sleeping;
var howling;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
sleepingDog=loadImage("sleepingDog.png")
howlingDog=loadImage("howlingDog.png")
dogHowling=loadSound("dogHowling.mp3")
dogDrinking=loadSound("dogDrinking.mp3")
foodAdding=loadSound("foodAdding.mp3")



}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  //create feed the dog button here

  feedD=createButton("Feed The Dog");
  feedD.position(1300,95);
  feedD.mousePressed(feedDog);

  sleeping=createButton("Sleep Now");
  sleeping.position(1300,370);
  sleeping.mousePressed(sleep);

  howling=createButton("  Howl  ");
  howling.position(1500,300);
  howling.mousePressed(howl);




}

function draw() {
  background("green");
  foodObj.display();

  
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
      lastFed = data.val();
  });

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  if(lastFed >= 12) {
    fill("orange")
    textSize(20)
    text("Last Feed : "+lastFed % 12+"PM",400,30);
}
else if(lastFed === 0) {
  fill("purple")
    textSize(20)
    text("Last Feed : 12 AM",400,30);
}
else {
  fill("red")
    textSize(20)
    text("Last Feed : "+lastFed+"AM",400,30)
}

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  dog.y=200
  dog.scale=0.15;
  dogDrinking.play();
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        fedTime: hour()
    })


}

//function to add food in stock
function addFoods(){
  foodAdding.play();
  foodObj.updateFoodStock(foodObj.getFoodStock() + 1);
  database.ref('/').update({
      Food: foodObj.getFoodStock(),
    })
  }

  function sleep(){
    dog.addImage(sleepingDog);
    dog.y=225  
    dog.scale=0.8;
  


  }

  function howl(){
    dog.addImage(howlingDog);
    dog.y=205  
    dog.scale=0.8;
    dogHowling.play();

    

  }
