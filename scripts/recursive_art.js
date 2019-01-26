function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    //center shapes and coordinates
    ellipseMode(CENTER);
    rectMode(CENTER);
    translate(width / 2, height / 2);
    //setup angle mode and color mode
    angleMode(DEGREES);
    colorMode(HSB);
    //background
    background(0, 0, 255);
    //start the recursive loop
    drawShape(createVector(0.5, 0), 4, 0);
}


var drawShape = function(vec, rot, hue) {
    //draw solid color shapes
    noStroke();
    fill(hue, 200, 200);
    ellipse(vec.x, vec.y, 20, 20);
    //change rotation amount and hue 
    var newRot = rot * 1.0001;
    var newHue = (hue + 3) % 255;
    //move ellipse location forward
    vec.setMag(vec.mag() + 0.14);
    //rotate ellipse location (around center)
    vec.rotate(newRot);
    //stop drawing if it goes too far
    if (rot <= 6) {
        drawShape(vec, newRot, newHue);
    }
};