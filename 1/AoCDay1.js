const fs = require('fs') 

var input = fs.readFileSync('AoCDay1Input.txt', 'utf8')
var inputs = input.split("\r\n");

//console.log(inputs)

var sum = 0;
var frequencies = new Set([sum]);
var hasDuplicate = false;
while (!hasDuplicate) {
    for (var i = 0; i < inputs.length; i++) {
        
        var num = parseInt(inputs[i].substr(1));
        if (inputs[i].charAt(0) == '-') {
            sum -= num;
        } else {
            sum += num;
        }

        if(frequencies.has(sum)) {
            console.log("Twice done frequency!" + sum);
            hasDuplicate = true;
            break;
        }

        frequencies.add(sum);
    }
}

console.log(sum)
//console.log(frequencies)