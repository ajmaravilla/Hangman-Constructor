// function to reveal userGuess if true or blank if false

function letter(let) {
  // takes in the letter
  this.letter = let;
  // initial guess is false
  this.guessLetter = false;
}

// function will change the guessLetter placeholder to either true or false
// which is display either _ or the letter
letter.prototype.reveal = function() {
  if (this.guessLetter === false) {
    return '_';
  } else {
    return this.letter;
  }
}

// var newLetter = new letter("this true and is working"); //TEST
// console.log(newLetter.reveal()); //TEST

// exports either a _ or letter
module.exports = letter;