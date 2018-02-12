//Hangman-Constructor
//calling required packages and files
var word = require('./word.js');
var randomWord = require('./wordBank.js');

var inquirer = require('inquirer');

console.log('****** READY TO PLAY HANGMAN? ******');
console.log('*    Topic: Commercial Aviation    *');
console.log('************************************');

//global variables
var numBlanks = 0; // TEST
var lettersInWord = [];
//var wrongLetterArr = []; // push to wrong letter array
var currentWord = [];
var guessLeft = 10;

//new constructor functions
var newRandWord = new randomWord();
var newWord = new word();

//function to set up random word and start game
function startGame() {
  //new instance to generate new random word
  newRandWord = new randomWord();
  //numBlanks = newRandWord.length; // TEST

  //reset
  guessLeft = 10;
  currentWord = [];
  wrongLetterArr = []; //push to wrong letter array
  newWord.guessLetter = false;

  //blank array for current random word
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

//start game
startGame();

//function to play game and run through inquirer
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
    //verify user's input is in random word
    newWord.letterInWord(guess.letter, word);
    //incorrect guess
    if (!newWord.guessLetter) {
      guessLeft--;
      if (guessLeft > 0) {
        console.log(`Incorrect guess!...You have ${guessLeft} guesses left.`)
        console.log(currentWord.join(' '));
        //keep inquirer going to continue to play
        playGame(word);
      } else {
        //no remaining guesses
        console.log(`Sorry, you have no guesses remaining! \nGAME OVER!`)
      }
    } else if (newWord.guessLetter) { //right guess
      //compares user's input to random word and all letters match
      if (currentWord.toString() === newRandWord.toString()) {
        console.log(`CONGRATS! YOU GUESS THE WORD!!!
${currentWord.join(' ')} 
\n****** NEW GAME or ctrl+c to exit *******
`);
        //restart new game
        startGame();
      } else {
        //reset the guess to false so it can loop again
        newWord.guessLetter = false;
        console.log(`Correct guess!
${currentWord.join(' ')}`);
        // keep inquirer going to continue to play
        playGame(word);
      }
    }
  });
}
