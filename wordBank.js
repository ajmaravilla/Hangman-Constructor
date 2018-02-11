// function to generate new random word

function randomWord() {
    // Word repository
    var wordBank = ["airplane", "boeing", "airline", "ticket", "airport", "delta",
    "pilot", "turbulence", "departure", "american", "ticket", "united"];
    
    // Logic to pick random word from the bank of words
    var randWordIndex = Math.floor(Math.random()*wordBank.length);
    var randWord = wordBank[randWordIndex];
    var randWordArr = randWord.split('');
    
    return randWordArr;
    }
    
    // console.log(randomWord()); // TEST
    
    // exports an array of the random word split into letters
    module.exports = randomWord;
