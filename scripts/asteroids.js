/************************************
 *   Noosh - Project: Asteroids      *
 *   CONTROLS:                       *
 *       Left Arrow: Turn Left       *
 *       Right Arrow: Turn Right     *
 *       Z key: Thrust               *
 ************************************/
function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    angleMode(DEGREES); //I know
    rectMode(CENTER); //easier to draw rectangle
    Ship = function(xpos, ypos, mass) {
        this.pos = createVector(xpos, ypos); //position
        this.vel = createVector(0.001, 0); //velocity
        this.acc = createVector(0, 0); //acceleration
        this.topspeed = 7; //max speed
        this.keys = []; //keys being pressed
        this.angle = 0; //angle 
        this.lThrust = false; //player turning left?
        this.rThrust = false; //player turning right?
        this.thrust = false; //player thrust on?

        this.applyForce = function(force) {
            this.acc.add(force); //APPLY FORCE
        };

        this.update = function() {
            this.acc.div(2); //not sure what this line does
            //but it makes turning better
            this.vel.add(this.acc); //add acceleration
            this.vel.limit(this.topspeed); //limit speed
            //Apply drag
            var drag = createVector(0, 0);
            drag = this.vel.copy();
            drag.div(500);
            this.vel.sub(drag);
            //drag = velocity ÷ 500 (opposite direction)

            this.vel.limit(this.topspeed); //limit again just in case
            this.pos.add(this.vel); //change position
        };


        this.control = function() {
            this.lThrust = this.keys[37]; //get status of LEFT key
            this.rThrust = this.keys[39]; //get status of RIGHT key
            this.thrust = this.keys[90]; // get status of Z key
            if (this.lThrust) {
                this.angle -= 3; //if turning left turn CC
            }
            if (this.rThrust) {
                this.angle += 3; //if turning right turn C
            }
            if (this.thrust) {
                var thr = this.vel.copy();
                var vAngle = this.vel.heading();
                var dir = this.angle - vAngle; //direction of thrust=
                // visual angle
                //-velocity angle
                thr.rotate(dir); //apply rotation to
                //thrust
                thr.normalize();
                thr.div(5); //normalize and divide
                this.applyForce(thr); //apply thrust
            }

        };
        this.checkEdges = function(offscreenLimit) {
            //allow some space for the rocket to be fully ofscreen
            //left limit
            if (this.pos.x < (0 - offscreenLimit)) {
                this.pos.x = width + offscreenLimit - 10;
            }
            //right limit
            else if (this.pos.x > (width + offscreenLimit)) {
                this.pos.x = 0 - offscreenLimit + 10;
            }
            //top limit
            if (this.pos.y < (0 - offscreenLimit)) {
                this.pos.y = height + offscreenLimit - 10;
            }
            //bottom limit
            else if (this.pos.y > (height + offscreenLimit)) {
                this.pos.y = 0 - offscreenLimit + 10;
            }
        };

        this.show = function() {
            var rx = this.pos.x;
            var ry = this.pos.y;
            var angle = this.angle;
            push(); //for translation + rotation
            translate(rx, ry);
            rotate(angle + 90); //the drawing faces up but the 
            //actual angle is to the right,
            //which means the draw angle has 
            //to be an extra 90 degrees Cwise
            noStroke();
            if (this.lTrust) {
                fill(204, 96, 38);
            }
            fill(173, 173, 173);
            rect(-9, 20, 10, 10);
            rect(9, 20, 10, 10);
            fill(112, 112, 112);
            triangle(-20, 20, 0, -40, 20, 20);

            pop();
        };
    };
    rocket = new Ship(200, 200, 100);
}




draw = function() {
    background(0, 0, 30); //background,
    rocket.control(); //accept input,
    rocket.update(); //update,
    rocket.checkEdges(30); //check edges,
    rocket.show(); //then draw the rocket
};
//this way of accepting presses let multiple keys be 
//pressed at once.
keyPressed = function() {
    rocket.keys[keyCode] = true;
};
keyReleased = function() {
    rocket.keys[keyCode] = false;
};