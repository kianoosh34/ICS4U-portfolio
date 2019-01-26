function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    background(89, 216, 255);
    
    drawFish(random(50, 350), random(50, 350), random(50, 200), random(25, 100), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));
    drawFish(random(50, 350), random(50, 350), random(50, 200), random(25, 100), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));
    drawFish(random(50, 350), random(50, 350), random(50, 200), random(25, 100), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));
    drawFish(random(50, 350), random(50, 350), random(50, 200), random(25, 100), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));
    drawFish(random(50, 350), random(50, 350), random(50, 200), random(75, 125), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));

}

drawFish = function(centerX, centerY, bodyLength, bodyHeight, bodyColor, tailColor, tw, th) {
    if (isNaN(tw)) {
        tw = 1;
    }
    if (isNaN(th)) {
        th = 1;
    }
    if (isNaN(tailColor)) {
        tailColor = bodyColor;
    }
    bodyLength /= 2;
    bodyHeight /= 2;
    noStroke();
    fill(bodyColor);
    // body
    ellipse(centerX, centerY, bodyLength, bodyHeight);
    // tail
    fill(tailColor);

    var tailWidth = (bodyLength / 4) * tw;
    var tailHeight = (bodyHeight / 2) * th;
    triangle(centerX - bodyLength / 2, centerY,
        centerX - bodyLength / 2 - tailWidth, centerY - tailHeight,
        centerX - bodyLength / 2 - tailWidth, centerY + tailHeight);
    // eye
    fill(33, 33, 33);
    ellipse(centerX + bodyLength / 4, centerY, bodyHeight / 5, bodyHeight / 5);
};

mousePressed = function() {
    drawFish(mouseX, mouseY, random(50, 200), random(75, 125), color(random(255), random(255), random(255)), color(random(255), random(255), random(255)), random(0.25, 2), random(0.25, 2));
};