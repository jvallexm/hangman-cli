const Letter = require(`./letter.js`)

/* Word Constructor */

function Word(thisWord){

    let splitWord = thisWord.split("");
    this.letters = [];

    splitWord.forEach(i => {

        let newLetter = new Letter(i);

        if(/\W/g.test(i))
            newLetter.guessed = true;

        this.letters.push(newLetter);

    });

    this.printWord = function(){

        let returnString = "";

        this.letters.forEach(l =>{
            returnString += l.print() + " ";
        });

        return returnString;

    };
    
    this.guessLetter = function(letter){

        this.letters.forEach(l =>{

            l.check(letter);

        });

    };

}

module.exports = Word;