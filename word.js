var letter = require("./letter.js");

function word() {
  this.guessLetter = false;
  var currentWord = [];

  // method to generate blanks in random word
  this.wordBlankArr = function (wordArr) {
    currentWord = [];
    for (var i = 0; i < wordArr.length; i++) {
      currentWord.push("_");
    }
    return currentWord;
  };
  // method to take guess letter and compare to random word, then return letter in word
  this.letterInWord = function (let, wordArr) {
    for (var i = 0; i < wordArr.length; i++) {
      if (let === wordArr[i]) {
        this.guessLetter = true;
      }
    }
    if (this.guessLetter) {
      for (var j = 0; j < wordArr.length; j++) {
        if (let === wordArr[j]) {
          currentWord[j] = let;
        }
      }
    }
    return currentWord;
  };
}

/*** TESTING
var newWord = new word();
var arr = ["h", "a", "t"];
console.log(newWord.wordBlankArr(arr));
console.log(newWord.letterInWord("h", arr));
***/

module.exports = word;