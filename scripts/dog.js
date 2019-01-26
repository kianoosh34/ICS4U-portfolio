function setup() {
    var canv = createCanvas(400, 400);
	canv.parent('main-content');
    var bodyX = 163;
    var bodyY = 255;
    var bodyH = 77;
    var bodyW = bodyH * 2.5;
    background(207, 254, 255);
    fill(242, 194, 97);
    stroke(0, 0, 0);
    //BODY
    ellipse(bodyX - 70, bodyY + 50, bodyW / 6, bodyH);
    ellipse(bodyX + 70, bodyY + 50, bodyW / 6, bodyH);
    ellipse(bodyX, bodyY, bodyW, bodyH);
    //FACE
    ellipse(bodyX + 60, bodyY - 30, bodyH / 3, bodyH / 2);
    ellipse(bodyX + 140, bodyY - 30, bodyH / 3, bodyH / 2);
    ellipse(bodyX + 100, bodyY - 40, bodyH, bodyH);
    //eyes
    fill(0, 0, 0);
    ellipse(bodyX + 80, bodyY - 40, bodyH / 7, bodyH / 7);
    ellipse(bodyX + 120, bodyY - 40, bodyH / 7, bodyH / 7);
    //tongue
    fill(252, 91, 91);
    ellipse(bodyX + 100, bodyY - 24, bodyH / 7, bodyH / 5);
    //nose
    fill(242, 194, 97);
    ellipse(bodyX + 94, bodyY - 28, bodyH / 7, bodyH / 7);
    ellipse(bodyX + 106, bodyY - 28, bodyH / 7, bodyH / 7);
    stroke(0);
    fill(0, 0, 0);
    ellipse(bodyX + 100, bodyY - 30, bodyH / 9, bodyH / 10);
}