const Word     = require('./word.js');
const inquirer = require("inquirer");


// List of words to guess

let wordBank = ["Emmanuelle Goes to Dinosaur Land","Reaganing","The Funcooker","Murphy Brown Lied To Us","Kidnapped By Danger","Leap Day","Operation Righteous Cowboy Lightning","Sandwich Day","Kidney Now!","Anna Howard Shaw Day","Brooklyn Without Limits","Ludachristmas","Senor Macho Solo","The Fabian Strategy","Christmas Attack Zone","Everything Sunny All the Time Always","A Goon's Deed in a Weary World","Stride of Pride","Gentlemen's Intermission","SeinfeldVision"];

let currentWord          // The current word being guessed 
let guessedLetters = []; // Letters that have been guessed by the player

/* Initialized a new game with a new word from the word bank and empty letters  */

function letsPlay(){

    currentWord     = wordBank[Math.floor(Math.random()* wordBank.length)];
    guessedLetters  = [];
    let guesses     = 0;
    let guessMe     = new Word(currentWord);
    console.log(`*********** NEW GAME ***********`);
    guess(guessMe,guesses); // Starts the game by letting the player guess

}

/* Guess lets the player guess the word until they run out of guesses or guess the word */

function guess(word,guesses){

    console.log(`${10-guesses} guesses remaining.`); // Shows how many guesses the player has remaining

    console.log(word.printWord()); // Shows the word needed to be guessed 

    // Prompts the user to enter a letter
    inquirer.prompt({

        name: "str",
        message: "Your next guess? "

    }).then(function(letter){


        let lowerCaseLetter = letter.str.toLowerCase(); // Lowercase version of the players input 


        if(lowerCaseLetter.length === 1){  // If the length of the guessed letter is one..

            if(guessedLetters.indexOf(lowerCaseLetter) == -1){  // If the player hasn't guessed the letter...

                // If the player guesses a letter incorrectly it increases guesses 

                if(currentWord.toLowerCase().indexOf(lowerCaseLetter) == -1)
                    guesses++;

                guessedLetters.push(lowerCaseLetter); // Adds the new letter to the guessed letter array
                word.guessLetter(letter.str);         // Guesses the letter in the word

                if(guesses < 10 && word.printWord().indexOf("_") != -1){ // If the user still has guesses and the word is incomplete...

                    guess(word,guesses); // runs guess again with the word and current guesses

                } else { 

                    if(guesses < 10) // If the player didn't run out of guesses
                        console.log("Nice work!");
                    else            
                        console.log("Ran out of guesses...");

                    playAgain(); // Plays the next word

                }

            } else { // If the player already guessed the letter...

                console.log(`You already guessed ${letter.str}!`);
                guess(word,guesses);

            }   

        } else { // If the guess length is greater than one character..


            // Tests to see if the lowercase string of the player's input is equal to the current word 

            if(lowerCaseLetter == currentWord.toLowerCase()){

                console.log("Woah! You guessed the whole word!");
                playAgain();

            } else {

                guesses++;
                console.log("That's not the word at all!");
                guess(word,guesses);

            }

        }

    });

}

/* Lets the user play again if there are still entries in word bank */

function playAgain(){

    console.log(currentWord.split("").join(" ")); // Displays the solved word

    wordBank.splice(wordBank.indexOf(currentWord),1); // Removes the current word from the wordBank array

    if(wordBank.length > 0) // If there are still words left...
        letsPlay();
    else
        console.log("That's all the words! You won!!");

}


letsPlay(); // Initializes the game on run


