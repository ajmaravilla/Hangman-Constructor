// Hangman via Node - Parks Edition
// calling required packages and files
var word = require('./word.js');
var randomWord = require('./wordBank.js');

var inquirer = require('inquirer');

console.log('****** READY TO PLAY HANGMAN? ******');
console.log('*     Topic: Commercial Aviation   *');
console.log('************************************');

// Global variables
var numBlanks = 0; // TEST
var lettersInWord = [];
// var wrongLetterArr = []; // push to wrong letter array
var currentWord = [];
var guessLeft = 9;

// new constructor functions and instances
var newRandWord = new randomWord();
var newWord = new word();

// function to set up random word and start game
function startGame() {
  // new instance to generate new random word
  newRandWord = new randomWord();
  // numBlanks = newRandWord.length; // TEST

  // Reset
  guessLeft = 9;
  currentWord = [];
  wrongLetterArr = []; // push to wrong letter array
  newWord.guessLetter = false;

  // Set up blank array for current random word
  currentWord = newWord.wordBlankArr(newRandWord);

  // console.log(numBlanks); // TEST
  // console.log(currentWord.length); // TEST
  // console.log(newRandWord); // TEST

  // Starting random word with blanks to console
  console.log(currentWord.join(' '));

  // start inquire by playGame
  playGame(newRandWord);
  return currentWord;
}

// initialize game
startGame();

// function to play game and run through inquirer
function playGame(word) {
  inquirer.prompt([{
    type: 'input',
    message: 'Please guess a letter: ',
    name: 'letter',
    validate: function(value) {
      var pass = value.match(
        /[a-z]/
      );
      if (pass) {
        return true;
      }

      return 'Please enter a lower case letter';
    }
  }]).then(function (guess) {
    // take in the user guess and random word and checks if letter is in word
    newWord.letterInWord(guess.letter, word);
    // wrong guess
    if (!newWord.guessLetter) {
      guessLeft--;
      if (guessLeft > 0) {
        console.log(`Uhoh, thats incorrect... ${guessLeft} guesses left.`)
        console.log(currentWord.join(' '));
        // keep inquirer going to continue to play
        playGame(word);
      } else {
        // guess left is 0
        console.log(`Sorry, no more guesses left! \nGAME OVER!`)
      }
    } else if (newWord.guessLetter) { //right guess
      // compares current guess letters to random word to see if all letters are guessed
      if (currentWord.toString() === newRandWord.toString()) {
        console.log(`YOU GUESS THE WORD!!!
${currentWord.join(' ')} 
\n****** NEW GAME or ctrl+c to exit *******
`);
        //restart game
        startGame();
      } else {
        // reset the guess to false so it can loop again
        newWord.guessLetter = false;
        console.log(`you guessed right
${currentWord.join(' ')}`);
        // keep inquirer going to continue to play
        playGame(word);
      }
    }
  });
}
