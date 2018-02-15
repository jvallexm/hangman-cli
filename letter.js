/* Letter constructor */

function Letter(letter){

    this.letter  = letter;
    this.guessed = false;
    this.print   = function(){
        if(this.guessed)
            return letter;
        else
            return "_"
    }
    this.check   = function(guess){

        let lowerCaseGuess = guess.toLowerCase();
        if(lowerCaseGuess === this.letter.toLowerCase())
            this.guessed = true;

    }

};

module.exports = Letter;