function Ship() {
    this.pos = createVector(width / 2, height / 2);
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.r = 15;
    this.isBoosting = false;
    this.life = 3;
    this.cooldown = 0;
    //Shield
    this.shield = 100;
    this.shieldUp = false;
    this.shieldR = 60;
    
    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    this.render = function() {
        fill(255,255,255);
        strokeWeight(1);
        stroke(255,255,255);
        resetMatrix();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + (PI / 2));
        triangle(-this.r * 3 / 4, this.r, this.r * 3 / 4, this.r, 0, -this.r);
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }
    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }
    this.shieldhits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.shieldR + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.turn = function(ang) {
        this.heading += ang;
    }

    this.control = function() {
        if (keys[LEFT_ARROW] && keys[RIGHT_ARROW]) {
			//Don't turn
        } 
        else if (keys[LEFT_ARROW]) {
            ship.turn(-0.05);
        } 
        else if (keys[RIGHT_ARROW]) {
            ship.turn(0.05);
        }
        if (keys[UP_ARROW]) {
            this.isBoosting = true;
        } 
        else {
            this.isBoosting = false;
        }
        if (keys[90]) {		//Z
            if (this.cooldown === 0) {
            	lasers.push(new Laser(ship.pos, ship.heading));
                this.cooldown += 10;
            }
        }
        if (keys[32]) {		//Space
			this.shieldUp = true;
        }
        else {
            this.shieldUp = false;
        }
    }
    this.update = function() {
        if (this.isBoosting) {
            this.boost();
        }
        if (this.cooldown > 0){
        	this.cooldown -= 1;
        }
        if (this.shield < 120) {
            this.shield += 1;
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    this.runShield = function() {
        if (this.shieldUp) { 
        	if (this.shield === 120) {
                for (var j = asteroids.length - 1; j >= 0; j--) {
                if (this.shieldhits(asteroids[j])) {
                    asteroids.splice(j, 1);
                    this.shield = 0;
                }
                
            }
        	}
        }
    }
	this.renderShield = function() {
        resetMatrix();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        noFill();
        strokeWeight(5);
        var whiteness = map(this.shield,0,120,50,255);
        var fullness = map(this.shield,0,120,radians(4),radians(176));
        if (this.shieldUp) { 
        	if (this.shield === 120) {
            	stroke(255,255,255);
                ellipse(0,0,this.shieldR,this.shieldR);
        	}
            else {
            	stroke(255,0,0);
                arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
                scale(1,-1);
                arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
            }
        }
        else {
            stroke(255,whiteness,whiteness,70);
            arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
            scale(1,-1);
            arc(0,0,this.shieldR,this.shieldR,radians(4),fullness);
        }
        strokeWeight(1);
    }
    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
    this.run = function() {
        this.control();
        this.update();
        this.edges();
        this.render();
        this.runShield();
        this.renderShield();
    }
}

function Laser(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);
	this.prevpos = createVector(spos.x, spos.y);
    
    this.update = function() {
        this.prevpos = this.pos;
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }
	this.run = function() {
        this.update();
        this.render();
    }
    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < asteroid.r) {
            return true;
        } else {
            return false;
        }
    }

    this.offscreen = function() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }
        return false;
    }


}

function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(15, 50);
  }

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
      
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

}

var keys = [];
var score = 0;

var timesHit = 0;

var ship;
var asteroids = [];
var lasers = [];

function setup() {
	var wid = document.getElementById('main-content').offsetWidth;
	var hig = document.getElementById('main-content').offsetHeight;
	var canvas = createCanvas(wid, hig);
	canvas.parent('main-content');
    frameRate(60);
    ship = new Ship();
    textSize(26);
    textFont('monospace');
    ellipseMode(CENTER);
    for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}
function windowResized() {
  var wid = document.getElementById('main-content').offsetWidth;
  var hig = document.getElementById('main-content').offsetHeight;
  resizeCanvas(wid, hig);
}

function draw() {
    background(0,0,0);

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
        	timesHit++;
        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }
	if (asteroids.length <= 3) {
        var newAsteroidPos = createVector(random(-5,0), random(0,height),random(25,50));
        asteroids.push(new Asteroid(newAsteroidPos));
    }
    for (i = lasers.length - 1; i >= 0; i--) {
        lasers[i].run();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    score++;
                    break;
                }
                
            }
        }
    }
    ship.run();    
    //draw HUD
    resetMatrix();
    fill(255,255,255,100);
    stroke(255,255,255,100);
    textAlign(LEFT,CENTER);
    text("SCORE: " + score, 20,30);
    textAlign(RIGHT,CENTER);
    var timesHitsec = round((timesHit/60)*100)/100;
    text("SECONDS HIT: " + timesHitsec.toFixed(2), width-20,30);
}

keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};
