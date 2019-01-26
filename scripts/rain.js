function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    xPositions = [200];
    yPositions = [0];
}


function draw() {
    background(204, 247, 255);

    for (var i = 0; i < xPositions.length; i++) {
        noStroke();
        fill(0, 200, 255);
        ellipse(xPositions[i], yPositions[i], 10, 10);
        yPositions[i] += 5;
        if (yPositions[i] > 400) {
            yPositions[i] = 0;
            xPositions[i] = random(0, 400);
        }
    }
    if (xPositions.length <= 80) {
        xPositions.push(random(0, 400));
        yPositions.push(0);
    }
}