// draw the axes
function setup() {
	var canvas = createCanvas(400, 400);
	canvas.parent('main-content');
    background(255);
	stroke(148, 148, 148);
	line(0, 200, 400, 200);
	line(200, 0, 200, 400);
	angleMode(DEGREES);
	strokeWeight(2);
	stroke(0, 173, 23);
    angle = -200;
	rate = 0;
}

var draw = function() {
    var y = -100*(1+rate/10) * sin(angle);
    point(angle + 200, y + 200);

    angle += 5;
    if (angle > 200)
    {
        rate++;
        angle = -200;
    }
    if (rate > 10)
    {
        rate = -10;
    }
};
