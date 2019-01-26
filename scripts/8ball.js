function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('main-content');
    fill(0, 0, 0);
    ellipse(200, 200, 375, 375);
    fill(60, 0, 255);
    triangle(200, 104, 280, 280, 120, 280);
    fill(255, 255, 255);
    var answer = floor(random(1, 5));
    if (answer === 1) {
        text("MAYBE", 176, 200);
        text("EVENTUALLY", 159, 229);
    } else if (answer === 2) {
        text("503 service unavailable", 176, 200);
        text(" servers may be overloaded or under maintainence", 159, 229);
    } else if (answer === 3) {
        text("YES", 190, 200);
        text("DEFINATELY", 165, 229);
    } else if (answer === 4) {
        text("NAH.", 185, 200);
        text("DON'T THINK SO.", 150, 235);
    } else if (answer === 5) {
        text("EH.", 176, 200);
        text("", 159, 229);
    } else {
        text("ERROR", 176, 200);
        text("", 159, 229);
    }

}