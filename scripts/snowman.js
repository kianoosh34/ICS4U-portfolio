function setup() {
	var canv = createCanvas(400, 400);
	canv.parent('main-content');
	noStroke();
	angleMode(DEGREES);
	fill(148, 94, 0);
	quad(160,180,150,190,60,130,50,120);
	quad(240,180,250,190,340,130,350,120);

	// simple snowman
	stroke(0, 0, 0);
	fill(255, 255, 255);
	ellipse(200, 300, 150, 150);
	ellipse(200, 200, 100, 100);
	ellipse(200, 120, 75, 75);

	fill(255, 170, 0);
	ellipse(200,120,10,10);

	fill(0);
	ellipse(180,110,5,5);
	ellipse(220,110,5,5);

	for (var i = 0; i <= 5; i++)
	{
		var is = 15*sin(4.5*(i*8));
		ellipse(175+(i*10),125+is,6,4);   
	}
}