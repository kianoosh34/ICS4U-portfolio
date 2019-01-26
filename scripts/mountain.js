function setup() {
    noStroke();
    var canvas = createCanvas(400, 400);
  	canvas.parent('main-content');
}
var Clouds = [{x:20,y:80,spd:1},{x:40,y:30,spd:1},{x:60,y:30,spd:1},{x:80,y:30,spd:1},{x:100,y:30,spd:1},{x:120,y:30,spd:1},{x:140,y:30,spd:1},{x:160,y:30,spd:1},{x:180,y:30,spd:1},{x:200,y:30,spd:1}];  //clouds
var iterate = 0.00;
var drawRange = function(iter) {
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) { //back mountain
        var n1 = noise(t+iter+1000);
        fill(131, 156, 137);
        var y = map(n1, 0, 1, 0, height/2);
        rect(t*600, height-y-70, 6, y); //multiplying t makes the mountains go faster, but you need to mutliply the width too
    }
    var incAmount2 = 0.01;
    for (t = 0; t < incAmount2*width; t += incAmount2) { //center mountain
        var n2 = noise(t+iter+1255);
        fill(57, 71, 69);
        var y2 = map(n2, 0, 1, 0, height/2-10);
        rect(t*300, height-y2-40, 3, y2); //multiplying t makes the "graph" decompress
    }
    var incAmount3 = 0.01;
    for (t = 0; t < incAmount3*width; t += incAmount3) { //foreground mountain
        var n3 = noise(t+iter);
        fill(19, 31, 23);
        var y3 = map(n3, 0, 1, 15, height/2);
        rect(t*100, height-y3, 1, y3);  
    }
};
var drawClouds = function(iter) {
    for (var i = 0; i < Clouds.length; i++) //move clouds
    {
        fill(255, 255, 255);
        Clouds[i].x -= Clouds[i].spd;
        ellipse(Clouds[i].x+10,Clouds[i].y-10,20,20);
        ellipse(Clouds[i].x,Clouds[i].y,20,20);
        ellipse(Clouds[i].x+10,Clouds[i].y+2,20,20);
        ellipse(Clouds[i].x+20,Clouds[i].y-13,20,20);
        ellipse(Clouds[i].x+25,Clouds[i].y,20,20);
        ellipse(Clouds[i].x+33,Clouds[i].y-7,20,20);
        if (Clouds[i].x < -50) {
            Clouds[i].x = random(430,500);
            Clouds[i].y = random(30,80);
            Clouds[i].spd = random(0.30,0.80);
        }
    }
};
draw = function() {
    background(110, 221, 255);
    drawRange(iterate);
    drawClouds(iterate);
    iterate+=0.01;
};

