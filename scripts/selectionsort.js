//making shapes easier to draw
function setup() {
    var canvas = createCanvas(400,400);
    //canvas.parent('main-content');
    textAlign(CENTER,CENTER);
    rectMode(CENTER);
    textFont('monospace');
    textSize(10);
    //first array, positive numbers in order
    var array = [5,4,2,6,3,1];
    //second array, positive and negative numbers in order
    var array2 = [3,0,-1,2,1,-2,-3];
    //third array, random positive numbers
    var array3 = [floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9)),floor(random(1,9))];
    //fourth array, even though the third array is technically infinite, I just want the project evaluated man
    var array4 = [2,1];
    
    //draw background and dividers 
    background(255, 255, 255);
    strokeWeight(3);
    line(0,135,width,135);
    line(185,0,185,134);
    line(50,136,50,200);
    line(0,200,49,200);
    //do and draw the sorting
    selectionSort(array,30,40);
    selectionSort(array2,220,50);
    selectionSort(array3,80,175);
    selectionSort(array4,10,175);
}
//Display the array (Array name, Start x pos and y pos)
var displayArray = function(arr,x,y) {
    //draw line
    for (var i = 0; i < arr.length; i++) {
        //number x position
        var tx = i*25+x;
        //white box
        stroke(0);
        strokeWeight(1);
        fill(255);
        rect(tx,y-0.5,20,13,5);
        //black text
        fill(0);
        strokeWeight(0);
        text(arr[i],tx,y);
    }
}; 

//swap numbers
var swap = function(arr, firstIndex, secondIndex) {
    //store first value then switch
    var temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    //send if the numbers were swapped to control whether
    //the array should be drawn or not
    var swapped = true;
    if (arr[firstIndex] === temp) {
        swapped = false;
    }
    return swapped;
};

//draw a line between the old and new location of a value
var pointy = function(arr,mindex,i,y,xx) {
    var x = i*25+xx;
    stroke(173, 173, 66,150);
    strokeWeight(3);
    line(x,y,mindex*25+xx,y-20);
};

//find index of the smallest value
var indexOfMinimum = function(arr, startIndex) {
    var minValue = arr[startIndex];
    var minIndex = startIndex;
    //search through the whole thing and compare
    for(var i = minIndex + 1; i < arr.length; i++) {
        if(arr[i] < minValue) {
            minIndex = i;
            minValue = arr[i];
        }
    } 
    return minIndex;
}; 

//the whole thing (array, base x location, base y location)
var selectionSort = function(arr,xx,yy) {
    //ia only increases when numbers are swapped
    var ia = 0;
    //draw the first part of the array
    displayArray(arr,xx,ia*20+yy-20);
    //loop until array is sorted
    for (var i = 0; i < arr.length; i++) {
        //determine display y value
        var ay=ia*20+yy;
        //find index of minimum
        var mindex = indexOfMinimum(arr,i);
        //swap with i
        var swapped = swap(arr,i,mindex);
        //if the numbers actually changed
        if (swapped) {
            //increase ia
            ia++;
            //display the array
            displayArray(arr,xx,ay);
            //draw the swap line
            pointy(arr,mindex,i,ay,xx);
        }
    }
}; 
