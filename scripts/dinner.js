function setup() {
    var canvas = createCanvas(400, 400);
  	canvas.parent('main-content');

    background(186, 145, 20); // wooden table
    ellipse(200, 200, 350, 350); // plate
    ellipse(200, 200, 300, 300);

    fill(255, 213, 0);
    triangle(160, 300, 250, 100, 100, 100);

    fill(224, 187, 0);
    ellipse(150, 150, 30, 30);
    ellipse(200, 150, 20, 20);
    fill(230, 192, 0);
    ellipse(160, 230, 20, 20);

}