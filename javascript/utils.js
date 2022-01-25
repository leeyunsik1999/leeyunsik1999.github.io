export function letterboxClick() {
    if (this.value !== 0) {
        if (this.value === 1) {
            this.value = 2;
            this.style.backgroundColor = "#b39c3c";
        } else if (this.value === 2) {
            this.value = 3;
            this.style.backgroundColor = "#548b4c";
        } else {
            this.value = 1;
            this.style.backgroundColor = "#3c3c3c";
        }
    }
}

/**
 * Sets the border, text content and color of letterbox to what it should be by default
 * @param {DOM Element} box Should be letterbox
 */
export function setLetterboxDefault(box) {
    box.value = 0;
    box.style.backgroundColor = "";
    box.style.border = "2px solid darkgrey";
    box.innerText = "";
}

/**
 * Sets the border, text content and color of the letterbox to what it should be when a letter is entered
 * @param {DOM Element} box Should be letterbox
 * @param {String} letter Letter for box's innertext to be set as
 */
export function setLetterboxEntered(box, letter) {
    box.value = 1;
    box.style.backgroundColor = "#343434";
    box.style.border = "2px solid transparent";
    box.innerText = letter;
}

export function getWord() {
    let word = "";
    for (let i = 1; i < 6; i++) {
        word += document.getElementById(`${word_pointer}-${i}`).innerHTML;
    }
    console.log(word);
}

export function submitWord() {
    if (letter_pointer !== 6){
        alert("Please type in a full word!");
    } else {
        getWord();
        for (let i = 1; i < 6; i++) {
            let box = document.getElementById(`${word_pointer}-${i}`);

            // Placeholder logic to interact with wordle AI that is to be implemented.
            // Case of wrong letter
            if (box.value === 1){
                console.log(`${box.innerText} is not present in the answer.`);
            // Case of correct letter in wrong position
            } else if (box.value === 2){
                console.log(`${box.innerText} is in the answer, but not in position ${i}.`);
            // Case of correct letter in correct position
            } else {
                console.log(`${box.innerText} is the right letter in position ${i}.`);
            }
            box.removeEventListener("click", letterboxClick);
        }
        word_pointer++;
        letter_pointer = 1;
    }
}
