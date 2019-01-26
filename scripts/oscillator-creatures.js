function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    ellipseMode(CENTER);
    angleMode(DEGREES);
    //create and populate flies array
    flies = [];
    for (var i1 = 0; i1 < 20; i1++) {
        flies.push(new Fly(random(-50, 50)));
    }

    //create and populate flowers array
    flowers = [];
    for (var i2 = 0; i2 < 5; i2++) {
        flowers.push(new Flower());
    }


}


//Flower
Flower = function() {
    //random position
    this.pos = createVector(random(-100, 100), random(-100, 100));
    //mass affects attraction force
    this.mass = 20;
    //angle    
    this.ang = createVector();
    // velocity
    this.vel = createVector(random(-3, 3), random(-3, 3));
    //amplitude
    this.amp = createVector(random(50, 200), random(50, 200));
};

Flower.prototype.calcAttr = function(mover) {
    //Flowers are centered but Flies are independent objects, meaning the positon has to be adjusted
    var position = createVector(this.pos.x + 200, this.pos.y + 200);

    var force = position.sub(mover.pos);
    //finds distance between two objects
    var distance = force.mag();
    //get rid of extremes
    distance = constrain(distance, 5, 10);
    force.normalize();
    //attraction strength
    var strength = (this.mass * mover.mass) / (distance * distance);
    //strength * direction
    force.mult(strength / 1.2);
    return force;
};
Flower.prototype.update = function() {
    this.ang.add(this.vel);
    //x position = (sin(incrementing value)*amplitude)
    //y position = (cos(incrementing value)*amplitude)
    this.pos.set(sin(this.ang.x) * this.amp.x,
        cos(this.ang.y) * this.amp.y);
};
Flower.prototype.show = function() {
    //stem
    push();
    translate(width / 2, height / 2);
    stroke(0, 220, 0);
    strokeWeight(6);
    line(this.pos.x, this.pos.y, 0, 0);
    fill(255, 0, 0);
    noStroke();
    //using vectors to make petals
    var p1 = createVector(this.pos.x, this.pos.y);
    var p2 = createVector(0, -25);
    var po = 22; //petal offset
    //make all the petals
    for (var i = 0 + po; i < 360 + po; i += 60) {
        var rotated = p2.copy();
        rotated.rotate(i);
        var ex = p1.x + rotated.x;
        var ey = p1.y + rotated.y;
        ellipse(ex, ey, 25, 25);
    }
    //center of flower
    fill(255, 255, 0);
    ellipse(this.pos.x, this.pos.y, 50, 50);
    pop();
};


//Fly
Fly = function(x) {
    this.pos = createVector(120, 150 + x);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.mass = 1;
};
Fly.prototype.applyForce = function(force) {
    //a = f/m
    var a = force.div(this.mass);
    this.acc.add(a);
};
Fly.prototype.update = function() {
    //creat and add an "erratic" value
    var erra = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.acc.add(erra);
    this.vel.add(this.acc); //add accel
    this.pos.add(this.vel); //move fly
    this.acc.mult(0); //reset accel
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
};
Fly.prototype.show = function() {
    var fx = this.pos.x;
    var fy = this.pos.y;
    var fs = this.mass * 10;
    var ws = fs * 0.6;
    //wings
    stroke(0, 0, 0, 100);
    strokeWeight(1);
    fill(209, 219, 230, 50);
    ellipse(fx - 4, fy, ws, ws);
    ellipse(fx + 4, fy, ws, ws);
    //body
    noStroke();
    fill(0, 0, 0, 100);
    ellipse(fx, fy + 2, fs, fs);

};


draw = function() {
    background(0, 69, 32);
    //update flowers
    for (var i = 0; i < flowers.length; i++) {
        flowers[i].update();
        flowers[i].show();
    }
    //update flies
    for (var j = 0; j < flies.length; j++) {
        for (var k = 0; k < flowers.length; k++) {
            var flowerForce = flowers[k].calcAttr(flies[j]);
            flies[j].applyForce(flowerForce);
        }
        flies[j].update();
        flies[j].show();
    }


};