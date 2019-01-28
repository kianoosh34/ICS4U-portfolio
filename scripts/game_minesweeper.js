//KIANOOSH's VERISON OF MINESWEEPER
//YOU CAN NOW FLAG SQUARES

Cell = function(i, j, we) {
    this.w = we;
    this.i = i;              //x index of cell
    this.j = j;              //y index of cell
    this.x = i * this.w+this.w/2;          //x position of cell
    this.y = j * this.w+this.w/2;          //y position of cell
    this.neighborCount = 0;  

    this.mine = false;        //is this cell a mine?
    this.revealed = false;    //has this cell been revealed
    this.flagged = false;    //have I put a flag on it
}

Cell.prototype.draw = function() {
    stroke(0, 0, 0);  //black outlines
    strokeWeight(1);
    noFill();                                  //no fill
    rect(this.x, this.y, this.w, this.w);      //make a black outline of a square at
    if (this.revealed) {
        if (this.mine) {                    //if this has been revealed as a mine
            fill(255, 0, 0);    //make cell red 
            rect(this.x, this.y, this.w, this.w);
            fill(0);        //and draw black ball (mine)
            ellipse(this.x, this.y, this.w / 2, this.w / 2);
        } else {
            fill(200, 200, 200);                //if this has been revealed as not a mine
            rect(this.x, this.y, this.w, this.w);  //draw a different colored square
            if (this.neighborCount > 0) {
                fill(0, 0, 0);                      
                text(this.neighborCount, this.x, this.y); //and add a number if a mine is nearby
            }
        }
    }
    if (this.flagged) {
        stroke(0);
        strokeWeight(2);
        var frth_w = this.w/4 //a fourth of this.w
        var x1 = this.x-frth_w;
        var y1 = this.y;
        //flagpole
        line(x1, y1-frth_w, x1, y1+frth_w);
        //flag
        strokeWeight(1);
        fill(255,0,0);
        triangle(x1, y1-frth_w, this.x-this.w/4, y1, this.x+this.w/4, y1-frth_w/2);
    }
}

Cell.prototype.countMines = function() {
    if (this.mine) {
        this.neighborCount = -1;  //if this is a mine, the neighbor count is -1
        return;    //end the function early
    }

    var total = 0;    //total neighboring mines
    for (var xoff = -1; xoff <= 1; xoff++) {  //loop through the rows (row above this cell,
        var i = this.i + xoff;                // the row the cell is on, and the row under this cell)
        if (i < 0 || i >= cols) {        //dont go off limits(cols = global variable for # of columns)
            continue;
        }

        for (var yoff = -1; yoff <= 1; yoff++) {  //loop thru columns (above yours, yours, under yours)
            var j = this.j + yoff;
            if (j < 0 || j >= rows) {    //dont go off limits (rows = global variable for # of rows)
                continue;
            }

            var neighbor = grid[i][j];    //grid = global variable that holds all the cells
            if (neighbor.mine) {
                total++;                //if near a mine, add to neighbor count
            }
        }
    }
    this.neighborCount = total; 
}
Cell.prototype.contains = function(x, y) {    //if the mouse collides with a cell
    var w2 = this.w/2;
    return ((x > this.x-w2)&&(x < this.x+w2)&&(y > this.y-w2)&&(y < this.y+w2));
}

Cell.prototype.reveal = function() {
  this.revealed = true;    //set this to reveal
  if (this.neighborCount == 0) {
    // flood fill
    this.floodFill();    //if no neighbors activate floodfill
  }
}
Cell.prototype.floodFill = function() {    //floodfill reveals all cells touching each other with
  for (var xoff = -1; xoff <= 1; xoff++) {  //a neighbor count of 0
    var i = this.i + xoff;
    if (i < 0 || i >= cols) {
      continue;
    }

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) {
        continue;
      }
      var neighbor = grid[i][j];
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 20;

var totalMines = 30;

function setup() {
    createCanvas(400, 400);
    rectMode(CENTER);
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);

    var i = 0;
    var j = 0;
    //fill grid with empty cells
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }
    // Pick potential spots for mines
    var options = [];
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }
    //puts mines in spots on the grid
    for (var n = 0; n < totalMines; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var ii = choice[0];
        var jj = choice[1];
        // Deletes that spot so it's no longer an option
        options.splice(index, 1);
        grid[ii][jj].mine = true;
    }
    //
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j].countMines();
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
             grid[i][j].flagged = false;
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    grid[i][j].reveal();

                    if (grid[i][j].mine) {
                        
                        gameOver();
                    }

                }
            }
        }
    }
    if (mouseButton === RIGHT) {
        for (var i2 = 0; i2 < cols; i2++) {
            for (var j2 = 0; j2 < rows; j2++) {
                if (grid[i2][j2].contains(mouseX, mouseY)) {
                    if (grid[i2][j2].flagged) {
                      grid[i2][j2].flagged = false;
                    }
                    else {
                        grid[i2][j2].flagged = true;
                    }
                }
            }
        }
    }
  return false;
}

function draw() {
    background(255, 255, 255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].draw();
        }
    }
}
document.oncontextmenu = function() {  
    return false;  //stops the context menu from appearing when right clicking
}
