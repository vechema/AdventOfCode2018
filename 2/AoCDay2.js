const fs = require('fs') 

var input = fs.readFileSync('input.txt', 'utf8')
var inputs = input.split("\r\n");

console.log(inputs)

var lettersTwice = 0;
var lettersThrice = 0;

let counter = str => {
    return str.split('').reduce((total, letter) => {
      total[letter] ? total[letter]++ : total[letter] = 1;
      return total;
    }, {});
  };


for(var i = 0; i < inputs.length; i++) {
    var word = inputs[i]
    var wordHisto = counter(word);

    var lettersTwo = false;
    var lettersThree = false;
    for (var letter in wordHisto) {
        if (wordHisto[letter] == 2) {
            lettersTwo = true;
        } else if (wordHisto[letter] == 3) {
            lettersThree = true;
        }
    }

    if(lettersTwo) {
        ++lettersTwice
    }

    if(lettersThree) {
        ++lettersThrice
    }
}

console.log(lettersTwice * lettersThrice)