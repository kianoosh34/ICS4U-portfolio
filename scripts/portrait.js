//Credit to Winston
function setup() {
	var canv = createCanvas(400, 400);
	canv.parent('main-content');
	fill(0, 0, 0);
	textSize(50);
	text("I AM WINSTON",25,60);

	fill(255, 255, 33);
	noStroke();
	ellipse(200,230,300,300);

	fill(0, 0, 0);
	ellipse(300,165,40,40);
	ellipse(150,175,40,40);

	fill(255, 60, 60);
	ellipse(250,260,110,130);
}