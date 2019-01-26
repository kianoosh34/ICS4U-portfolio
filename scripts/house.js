function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    background(219, 255, 255);

    fill(174, 180, 214);
    triangle(200, 28, 350, 150, 50, 150);

    //wall
    //y
    fill(201, 87, 0);
    rect(60, 150, 280, 210);
    var shft = false;
    for (var i = 150; i < 360; i += 15) {
        //x
        if (shft) {
            rect(60, i, 20, 15);
            for (var j = 60; j < 340; j += 40) {
                rect(j, i, 40, 15);
            }
            shft = false;
        } else {
            for (var k = 80; k < 320; k += 40) {
                rect(k, i, 40, 15);
            }
            shft = true;
        }
    }


    //door
    fill(120, 80, 19);
    rect(180, 280, 40, 80);

}