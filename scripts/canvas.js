/**
 * *** Follwing part was modified from Simon Sarris ***
 * The CanvasState method was copied and modified
 * The CanvasState helper methods were inspired by the guide, but written by me
 * All other methods were were written by me, and modified to work with the CanvasState method
 * Source: https://github.com/simonsarris/Canvas-tutorials/blob/master/shapes.js
 */


/**
 * *Canvass State Object
 * Contains all the information on the state of the canvass and
 * adds action listeners for the shapes
 * @param canvas the HTML canvass to add functionality to
 */


function CanvasState(canvas) {
    //sets instance variables
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    //this is the instance variable for the "context" object in a HTML Canvass.
    this.ctx = canvas.getContext('2d');
    //instance variables storing the state:
    this.shapes = [];  // the collection shapes

    this.dragging = false; // Keep track of when we are dragging
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;


    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    var myState = this;

    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = myState.shapes;
        var l = shapes.length;
        for (var i = l-1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)
                myState.dragoffx = mx - mySel.x;
                myState.dragoffy = my - mySel.y;
                myState.dragging = true;
                myState.selection = mySel;
                myState.valid = false;
                return;
            }
        }
        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        if (myState.selection) {
            myState.selection = null;
        }
    }, true);

    //adds the action listener for the mouse moving
    canvas.addEventListener('mousemove', function(e) {
        if (myState.dragging){
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw
        }
    }, true);
    canvas.addEventListener('mouseup', function(e) {
        myState.dragging = false;
    }, true);

    this.interval = 30;
    setInterval(function() { myState.draw(); }, myState.interval);
}



/**
 * Sub-Method(?) of CanvasState that adds a Shape to the array of type Shape "shapes'
 */
CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
}

/**
 * Sub-Method(?) of CanvasState that clears the canvass
 */
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}


/**
 * Sub-Method(?) of CanvasState that draws the ojbects on the canvas
 */
CanvasState.prototype.draw = function() {
    //instance variables
    var ctx = this.ctx;
    var shapes = this.shapes;
    //clears the current canvass
    this.clear();

    for (var x = 0; x <= this.width; x += 40) {
        this.ctx.moveTo(0.5 + x, 0);
        this.ctx.lineTo(0.5 + x, this.height);
    }

    for (var x = 0; x <= this.height; x += 40) {
        this.ctx.moveTo(0, 0.5 + x);
        this.ctx.lineTo(this.width, 0.5 + x);
    }
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    // draws all shapes
    var numShapes = shapes.length;
    for (var i = 0; i < numShapes; i++) {
        shapes[i].draw(ctx);
    }
}


/**
 * Sub-Method(?) of CanvasState that return the current mouse coridinates
 * @return a hash table of the mouse cooridinatss
 */
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    mx = e.pageX - element.offsetLeft;;
    my = e.pageY - element.offsetTop;
    return {x: mx, y: my};
}




//gets everything started
var s = new CanvasState(document.getElementById('canvas1'));

/**
 * A data scructure for the objects on the canvass
 * Right now it is just a rectange
 * @param x the x-coridinate of the object
 * @param y the y-coridinate of the object
 * @param w the width of the object
 * @param h the height of the object
 * @param fill the color to fill the object
 */
function Shape(x, y, w, h, fill) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
}

/**
 * Sub-method(?) of Shape() that draws the shape onto the canvass
 * @param ctx the context of the canvas
 */
Shape.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

/**
 * Sub-method(?) of Shape() to determine if a mouse-coridinate is within a shape
 * @param mx the x-corridinate of the mouse
 * @param my the y-corridinate of the mouse
 */
Shape.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
}


//Buttons!!!
function button1() {
    s.addShape(new Shape(10,10,60,60, 'red'));
}

function button2() {
    s.addShape(new Shape(10,10,40,60, 'blue'));
}

function button3() {
    s.addShape(new Shape(10,10,60,40, 'green'));
}

function button4() {
    s.addShape(new Shape(10,10,40,40, 'yellow'));
}

//function button5() {
//    s = new CanvasState(document.getElementById('canvas1'));
//}