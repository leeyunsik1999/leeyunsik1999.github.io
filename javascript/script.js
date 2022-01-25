import * as utils from "./utils.js";

import { WordleGuesser } from "./wordleguesser.js";

// Initializing variables to keep track of which word row and which letter we are typing in.
window.word_pointer = 1;
window.letter_pointer = 1;

let wordle = new WordleGuesser();

/**
 * Function used for setting letterboxes to their default state. Also used to reset state.
 */
function loadLetterboxes() {
    let letterboxList = document.getElementsByClassName("letterbox");

    // Sets data and parameters for letterbox to original state. setLetterboxDefault called as this function is also used for resetting.
    for (const letterbox of letterboxList) {
        letterbox.value = 0;
        letterbox.innerText = "";
        utils.setLetterboxDefault(letterbox);
        letterbox.addEventListener("click", utils.letterboxClick);
    }
}

window.addEventListener("load", () => {
    // Loads letterboxes to default state.
    loadLetterboxes();
    // Logic for typing in words.
    window.addEventListener("keydown", (event) => {
        // Filtering out non-letters
        if (event.key.match(/[a-zA-Z]/)) {
            // Filtering out non-letters; shift/control/etc is not filtered by regex
            if (event.key.length === 1) {
                let letter = event.key.toUpperCase();
                console.log(`Pressed ${letter}`);
                if (letter_pointer < 6) {
                    utils.setLetterboxEntered(document.getElementById(`${word_pointer}-${letter_pointer}`), letter);
                    letter_pointer++;
                }
            } else if (event.key === "Backspace" && letter_pointer > 1) {
                letter_pointer--;
                utils.setLetterboxDefault(document.getElementById(`${word_pointer}-${letter_pointer}`));
            }
        }
    });

    document.getElementById("btn-submit").addEventListener("click", utils.submitWord);

    // Reset button loads the letterboxes to default state again, and resets pointer values.
    document.getElementById("btn-reset").addEventListener("click", () => {
        loadLetterboxes();
        window.word_pointer = 1;
        window.letter_pointer = 1;
    });
});