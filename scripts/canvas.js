const dragged_object = {
    NONE: -1,
    INPUTS: {
        INPUT1: 1,
        INPUT2: 2
    },
    OUTPUTS: {
        OUTPUT1: 3,
        OUTPUT2: 4
    },
    GATES: {
        GATE1: 5,
        GATE2: 6
    },
    PLACEHOLDER: 7
}

//let dragged_object = dragged_object.NONE;

var canvas = new fabric.Canvas('c', { });
canvas.selection.resize = false;

var width = canvas.width;
var height = canvas.height;
var grid = 50;


var input1_image =  document.getElementById("input1_image");
var input2_image = document.getElementById("input2_image");
var output1_image = document.getElementById("output1_image");
var output2_image = document.getElementById("output2_image");
var gate1_image = document.getElementById("gate1_image");
var gate2_image = document.getElementById("gate2_image");
var placeholder = document.getElementById("placeholder1_image");

function input1() {let dragged_object = dragged_object.INPUTS.INPUT1;}
function input2() {let dragged_object = dragged_object.INPUTS.INPUT2;}
function output1() {let dragged_object = dragged_object.OUTPUTS.OUTPUT1;}
function output2() {let dragged_object = dragged_object.OUTPUTS.OUTPUT2;}
function gate1() {let dragged_object = dragged_object.GATES.GATE1;}
function gate2() {let dragged_object = dragged_object.GATES.GATE2;}
function placeholder() {let dragged_object = dragged_object.PLACEHOLDER;}


// create grid
for (var i = 0; i < (width / grid); i++) {
    canvas.add(new fabric.Line([ i * grid, 0, i * grid, height], { stroke: '#ccc', selectable: false }));
    canvas.add(new fabric.Line([ 0, i * grid, width, i * grid], { stroke: '#ccc', selectable: false }))
}

// snap to grid
canvas.on('object:moving', function(options) {
    options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
    });
});


//adds different elements
canvas.on('drop', function(options) {
    switch (dragged_object) {
        case dragged_object.INPUTS.INPUT1:
            canvas.add(new fabric.Image(input1_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.INPUTS.INPUT2:
            canvas.add(new fabric.Image(input2_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.OUTPUTS.OUTPUT1:
            canvas.add(new fabric.Image(output1_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.OUTPUTS.OUTPUT2:
            canvas.add(new fabric.Image(output2_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.GATES.GATE1:
            canvas.add(new fabric.Image(gate1_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.GATES.GATE2:
            canvas.add(new fabric.Image(gate2_image, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
        case dragged_object.PLACEHOLDER:
            canvas.add(new fabric.Image(placeholder, {
                left: 100,
                top: 100,
                hasControls: false
            }));
            //TODO: reset enum to NONE
            break;
    }

    //This bit ignores the switch statement, as the enum is currently not working
    canvas.add(new fabric.Image(gate2_image, {
        left: 100,
        top: 100,
        hasControls: false
    }));
});

