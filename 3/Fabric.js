const fs = require('fs') 

var input = fs.readFileSync('input.txt', 'utf8')
var inputs = input.split("\r\n");

//console.log(inputs)

// Loop through and figure out that largest that the fabric has to be
let maxWidth = 0;
let maxHeight = 0;
for(var i = 0; i < inputs.length; i++) {
    let instruction = inputs[i];
    let x = fromTop(instruction) + height(instruction)
    let y = fromLeft(instruction) + width(instruction)

    if ( x > maxHeight) {
        maxHeight = x
    }
    
    if ( y > maxWidth) {
        maxWidth = y
    }

}

// Make fabric
let fabric = []

for (let i = 0; i < maxHeight; i++) {
    fabric[i] = [];
}

for(let i = 0; i < maxHeight; i++) {
    for(let k = 0; k < maxWidth; k++) {
        fabric[i][k] = '.'
    }
}

// Loop through all the instructions again and mark out places on the fabric
let count = 0;
for(var i = 0; i < inputs.length; i++) {
    let instruction = inputs[i];
    let y = fromLeft(instruction)
    let x = fromTop(instruction)
    let widthY = width(instruction)
    let heightX = height(instruction)
    for(var j = 0; j < heightX; j++) {
        for(var k = 0; k < widthY; k++) {
            if(fabric[j+x][k+y] == '.') {
                fabric[j+x][k+y] = 'X'
            } else {
                if (fabric[j+x][k+y] == 'X') {
                    ++count;
                }
                fabric[j+x][k+y] = '#'
            }
        }
    } 
}

for(var i = 0; i < maxHeight; i++) {
    for(var j = 0; j < maxWidth; j++) {
        let elem = fabric[i][j]
        //process.stdout.write(elem);
    }
    //console.log()
} 

console.log(count)

// Now find out which instruction has no overlap
for(var i = 0; i < inputs.length; i++) {
    let instruction = inputs[i];
    let y = fromLeft(instruction)
    let x = fromTop(instruction)
    let widthY = width(instruction)
    let heightX = height(instruction)

    let noOverlap = true;
    for(var j = 0; j < heightX; j++) {
        for(var k = 0; k < widthY; k++) {
            if(fabric[j+x][k+y] === '#') {
                noOverlap = false
            }
        }
    }
    if(noOverlap) {
        console.log(id(instruction))
        break;
    }
}

function id(instruction) {
    return instruction.split(" ")[0]
}

function fromLeft(instruction) {
    let instructionParts = instruction.split(" ")
    let left = instructionParts[2].split(",")[0]
    return parseInt(left)
}

function fromTop(instruction) {
    let instructionParts = instruction.split(" ")
    let top = instructionParts[2].split(",")[1]
    top = top.substring(0, top.length - 1)
    return parseInt(top)
}

function width(instruction) {
    let instructionParts = instruction.split(" ")
    let width = instructionParts[3].split("x")[0]
    return parseInt(width)
}

function height(instruction) {
    let instructionParts = instruction.split(" ")
    let height = instructionParts[3].split("x")[1]
    return parseInt(height)
}