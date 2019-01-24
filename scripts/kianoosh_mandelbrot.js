
function setup() {
  // noprotect
  var canvas = createCanvas(600,400);
  canvas.parent('main-content');
  rectMode(CENTER);
  colorMode(HSB,255);
  //changing
  this.magnification = 0.005;
  this.x = 0.4;
  this.y = 0.2;
  //const
  this.maxIter = 120;
  this.reStart = this.x - this.magnification;
  this.reEnd = this.x + this.magnification;
  this.imStart = this.y - this.magnification;
  this.imEnd = this.y + this.magnification;
}

function draw() {  
  	this.reStart = 0.4 - this.magnification;
    this.reEnd = 0.4 + this.magnification;
    this.imStart = 0.2 - this.magnification;
    this.imEnd = 0.2 + this.magnification;
		background(0,0,0);
  	if (mouseIsPressed){
      if (mouseX <= 100) {
        this.x -= 4;
      }
      if ((width-mouseX) <= 100) {
        this.x += 4;
      }
      if (mouseY <= 100) {
        this.y -= 4;
      }
      if ((height-mouseY) <= 100) {
        this.y += 4;
      }
    }
    for (var x = 0; x < width; x+=2) {
      for (var y = 0; y < height; y+=2) {
        var m = mandelbrot(x+this.x,y+this.y);

        var hue = 255 * (m/this.maxIter);
        var saturation = 255;
        var bright = 255;

        if ((m === maxIter)||(m<20)) {
          bright = 0;
        }

        noStroke();
        fill(hue,saturation,bright);
        rect(x,y,2,2);
    	}
  }
}

function mandelbrot(x,y) {
  var a = map(x, 0, width, this.reStart, this.reEnd);
  var b = map(y, 0, height, this.imStart, this.imEnd);
  
  var ca = a;
  var cb = b;
  
  for (var n = 0; n < this.maxIter; n++) {
    var aa = a*a - b*b;
    var bb = 2*a*b;
    
    a = aa + ca;
    b = bb + cb;
    
    if (abs(a+b) > 16) {
      break;
    }
  }
  return (n + 1 - log(log(2) * abs(a+b)));
}
function mouseWheel(event) {
  this.magnification += event.delta/100000;
  this.magnification = constrain(this.magnification,0,100);
}
