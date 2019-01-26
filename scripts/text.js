function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    taa = 0;
    textSize(100);
    angleMode(DEGREES);
    frequency = 2;
}
draw = function() {
    taa = taa + 1;
    var red1 = sin(frequency * taa + 0) * 127 + 128;
    var green1 = sin(frequency * taa + 120) * 127 + 128;
    var blue1 = sin(frequency * taa + 240) * 127 + 128;

    var red2 = sin(frequency * taa + 0 + 45) * 127 + 128;
    var green2 = sin(frequency * taa + 120 + 45) * 127 + 128;
    var blue2 = sin(frequency * taa + 240 + 45) * 127 + 128;

    var red3 = sin(frequency * taa + 0 + 90) * 127 + 128;
    var green3 = sin(frequency * taa + 120 + 90) * 127 + 128;
    var blue3 = sin(frequency * taa + 240 + 90) * 127 + 128;

    var red4 = sin(frequency * taa + 0 + 135) * 127 + 128;
    var green4 = sin(frequency * taa + 120 + 135) * 127 + 128;
    var blue4 = sin(frequency * taa + 240 + 135) * 127 + 128;

    var y1 = 20 * sin(frequency * taa - 0) + 200;
    var y2 = 20 * sin(frequency * taa - 30) + 200;
    var y3 = 20 * sin(frequency * taa - 60) + 200;
    var y4 = 20 * sin(frequency * taa - 90) + 200;

    background(255);
    fill(red1, blue1, green1);
    text("T", 60, y1);
    fill(red2, blue2, green2);
    text("E", 120, y2);
    fill(red3, blue3, green3);
    text("X", 190, y3);
    fill(red4, blue4, green4);
    text("T", 260, y4);
};