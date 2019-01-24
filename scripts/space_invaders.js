var ship;
var keys = [];
var aliens = [];
var cooldown = 0;
var shots = [];
var TOTAL_ALIENS = 7;
var ALIEN_SPEED = 1;
var BACKGROUND_COLOR = 50;  
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
//---------------------------------------------------------------
function setup() {
  var wid = document.getElementById('main-content').offsetWidth;
  var hig = document.getElementById('main-content').offsetHeight;
  var canvas = createCanvas(wid, hig);
  canvas.parent('main-content');
  ship = new Ship();
  for(var i = 0; i < TOTAL_ALIENS; i++){ 
    aliens[i]= new Alien(i * 80 + 80, 50);
  }
}
//--------------------------------------------------------------
function windowResized() {
  var wid = document.getElementById('main-content').offsetWidth;
  var hig = document.getElementById('main-content').offsetHeight;
  resizeCanvas(wid, hig);
}
//--------------------------------------------------------------
function draw() {
  background(BACKGROUND_COLOR);
  ship.show();
  if (keys[RIGHT_ARROW] && keys[LEFT_ARROW]) {
    ship.setDir(0);
  }
  if(keys[RIGHT_ARROW]) {
    ship.setDir(1);
  }
  else if(keys[LEFT_ARROW]) {
    ship.setDir(-1);
  }
  else {
    ship.setDir(0);
  }
  if(keys[32] && (cooldown === 0)){
      shots.push(new Bullet(ship.x + 10, 370));
      cooldown += 30;
  }
  cooldown--;
  if (cooldown < 0){
    cooldown = 0;
  }
  ship.movement();
  
  var moveRight = false;
  var moveLeft = false;
  
  for(var i = 0; i < aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
    if(aliens[i].x > SCREEN_WIDTH) {
      moveRight = true;
    }
    else if(aliens[i].x < 0) {
      moveLeft = true;
    }
  }
  if(moveRight){
     for(var i = 0; i < aliens.length; i++) {
       aliens[i].shiftDown();
       moveRight = false;
     }
  } 
  else if(moveLeft){
     for(var i = 0; i < aliens.length; i++) {
       aliens[i].shiftDown();
       moveLeft = false;
     }
  }
  
  //run the shots
  for(var i = 0; i < shots.length; i++) {
    shots[i].movement();
    shots[i].show();
    //if the alien was hit destroy the alien and the shot
    for(var j = 0; j < aliens.length; j++) { 
      if(shots[i].hits(aliens[j])){
        aliens[j].gone();
        shots[i].gone(); 
      }
    }
  }
  //checks if a shot object was deleted and removes it from the array
  for(var i = shots.length - 1; i >= 0; i--){
    if(shots[i].toDelete){
      shots.splice(i, 1);
    }
  }
  //checks if an alien was deleted and removes it from the array
  for(var i = aliens.length - 1; i >= 0; i--){
    if(aliens[i].toDelete){
      aliens.splice(i, 1);
    }
  }
  //adds more waves of aliens
  if (aliens.length === 0){
    for(var i = 0; i < TOTAL_ALIENS; i++){ 
    aliens[i]= new Alien(i * 80 + 80, 50);
    }
    ALIEN_SPEED += 1;
  }
}
//---------------------------------------------------------------
//EVERYTHING SHIP RELATED
function Ship(){
   this.x = SCREEN_WIDTH/2;
   this.xdir = 0;
     
   //FUNCTIONS THE SHIP PREFORMS
   this.show = function (){
     fill(200);
     rect(this.x , 370, 20, 20);
   }
   
   this.setDir = function(direction){
       this.xdir = direction;
   }
   
   this.movement = function(direction){
     this.x += this.xdir*5; 
   }
}
//---------------------------------------------------------------
function keyReleased() {
    keys[keyCode] = false;
}

//MOVEMENT OF THE SHIP
function keyPressed() {
  keys[keyCode] = true;
}   
//---------------------------------------------------------------
//EVERYTHING ALIEN RELATED
function Alien(x, y){
   this.x = x;
   this.y = y;
   this.r = 25;
   this.toDelete = false;
   this.xdir = 1;
   this.ydir = 0;
   
   
   //FUNCTIONS THE ALIEN PREFORMS
   this.show = function (){
     fill(34, 123, 233);
     ellipse(this.x, this.y, this.r * 2, this.r * 2);
   }
   
   this.gone = function() {
     this.toDelete = true;
   }
   this.move = function(){
     this.x = this.x + ALIEN_SPEED*this.xdir;
     this.y = this.y + this.ydir;
   }
   
   this.shiftDown = function(){
     this.xdir *= -1;
     this.y += this.r;
     
   }
}
//---------------------------------------------------------
//EVERYTHING BULLET RELATED
function Bullet(x, y){
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;
  
  this.show = function(){
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  
  this.movement = function() {
    this.y = this.y -= 4; 
  }
  
  this.hits = function(alien){
    var d = dist(this.x, this.y, alien.x, alien.y);
    if(d < this.r + alien.r){
      return true; 
    }else{
      return false; 
    }
  }
  
  this.gone = function() {
     this.toDelete = true;
   }
}
