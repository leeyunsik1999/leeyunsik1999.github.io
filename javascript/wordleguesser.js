// Note: words in guess list is NOT in word list

export class WordleGuesser {

    constructor(){
        this.guessList = [];
        this.wordList = [];

        // Initial guess is when len is 10657. Return soare by default
        fetch('data/allowed_guesses')
        .then(res => res.text())
        .then(text => {
            this.guessList = text.split('\r\n');
        });

        // Initial guess is when len is 2315. Return soare by default
        fetch('data/word_list')
        .then(res => res.text())
        .then(text => {
            this.wordList = text.split('\r\n');
        });
    }

    /**
     * A dictionary representing the word guessed, and the attributes of the letters in positions. Should describe the letter guessed and the state (letter not in word, in word but incorrect place, in word and in correct place) represented by state 1, 2 or 3.
     * Format:
     * {1: {'letter': 'a', 'state': 1}, 2: {'letter': 'b', 'state': 2}, ...} where keys = 1, 2, 3, 4 and 5.
     * @param {Dictionary} word_guessed 
     */
    process_guess(word_guessed){
        for (let i = 1; i < 6; i++){
            // Case if letter is not in the final guess. Removes all words with the letter from guess list and word list
            if (word_guessed[i]['state'] === 1){
                this.guessList.filter(word => !(word.includes(word_guessed[i]['letter'])));
                this.wordList.filter(word => !(word.includes(word_guessed[i]['letter'])));
            // Case if letter is in the word but not in the right location. Removes all words without the letter, and words with letter in that spot.
            } else if (word_guessed[i]['state'] === 2){
                this.guessList.filter(word => word.includes(word_guessed[i]['letter'] || word[i-1] !== word_guessed[i]['letter']));
                this.wordList.filter(word => word.includes(word_guessed[i]['letter'] || word[i-1] !== word_guessed[i]['letter']));
            // Case if letter is in the word and in the right location. Removes all words without the letter, and words where letter is not in that spot.
            } else {
                this.guessList.filter(word => word.includes(word_guessed[i]['letter'] || word[i-1] === word_guessed[i]['letter']));
                this.wordList.filter(word => word.includes(word_guessed[i]['letter'] || word[i-1] === word_guessed[i]['letter']));
            }
        }
    }

    guess_reducePossibilities(){

    }

    guess_word(){

    }
}