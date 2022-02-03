// Note: words in guess list is NOT in word list

export class WordleGuesser {

    constructor() {
        this.guessList = [];
        this.wordList = [];
        // Set used to keep track of letters that exist in the word.
        this.rightLetters = new Set();

        // Initial guess is when len is 10657. Return soare by default
        fetch('data/allowed_guesses.txt')
            .then(res => res.text())
            .then(text => {
                this.guessList = text.split('\r\n');
            });

        // Initial guess is when len is 2315. Return soare by default
        fetch('data/word_list.txt')
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
    process_guess(word_guessed) {
        // Set to keep track of which letters are identified as status 2. This is as wordle puts only the first occurence of a letter with multiple occurrences of right letter in wrong place as yellow, with rest of them grey.
        // Use to stop incorrectly filtering possible words.
        let misplaced_letters = new Set();
        for (let i = 1; i < 6; i++) {
            // Case if letter is not in the final guess. Removes all words with the letter from guess list and word list
            if (word_guessed[i]['status'] === 1) {
                if (!misplaced_letters.has(word_guessed[i]['letter']) && !this.rightLetters.has(word_guessed[i]['letter'])) {
                    this.guessList = this.guessList.filter(word => !word.includes(word_guessed[i]['letter']));
                    this.wordList = this.wordList.filter(word => !word.includes(word_guessed[i]['letter']));
                } else {
                    // Letter is in misplaced set, but this occurence isn't in the right place. Removes all words with this letter in this place
                    this.guessList = this.guessList.filter(word => word[i - 1] !== word_guessed[i]['letter']);
                    this.wordList = this.wordList.filter(word => word[i - 1] !== word_guessed[i]['letter']);
                }
                // Case if letter is in the word but not in the right location. Removes all words without the letter, and words with letter in that spot.
            } else if (word_guessed[i]['status'] === 2) {
                // Simply putting it in the dictionary
                misplaced_letters.add(word_guessed[i]['letter']);
                this.guessList = this.guessList.filter(word => word.includes(word_guessed[i]['letter']) && word[i - 1] !== word_guessed[i]['letter']);
                this.wordList = this.wordList.filter(word => word.includes(word_guessed[i]['letter']) && word[i - 1] !== word_guessed[i]['letter']);
                // Case if letter is in the word and in the right location. Removes all words without the letter, and words where letter is not in that spot.
            } else {
                this.rightLetters.add(word_guessed[i]['letter']);
                this.guessList = this.guessList.filter(word => word.includes(word_guessed[i]['letter']) && word[i - 1] === word_guessed[i]['letter']);
                this.wordList = this.wordList.filter(word => word.includes(word_guessed[i]['letter']) && word[i - 1] === word_guessed[i]['letter']);
            }
        }
        console.log(this.guessList);
        console.log(this.wordList);
    }

    guess_reducePossibilities() {

    }

    guess_word() {

    }
}