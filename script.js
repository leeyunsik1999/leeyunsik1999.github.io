import * as utils from "./utils.js";

window.word_pointer = 1;
window.letter_pointer = 1;


window.addEventListener("load", () => {
    let letterboxList = document.getElementsByClassName("letterbox");
    for (const letterbox of letterboxList){
        letterbox.value = 0;
        letterbox.innerText = "";
        letterbox.addEventListener("click", utils.letterboxClick);
    }
    window.addEventListener("keydown", (event) => {
        // Filtering out non-letters
        if (event.key.match(/[a-zA-Z]/)){
            // Filtering out non-letters; shift/control/etc is not filtered by regex
            if (event.key.length === 1){
                let letter = event.key.toUpperCase();
                console.log(`Pressed ${letter}`);
                if (letter_pointer < 6){
                    let box = document.getElementById(`${word_pointer}-${letter_pointer}`);
                    box.value = 1;
                    box.style.backgroundColor = "#343434";
                    box.style.border = "0px";
                    box.innerText = letter;
                    letter_pointer++;
                }
            } else if (event.key === "Backspace" && letter_pointer > 1){
                letter_pointer--;
                let box = document.getElementById(`${word_pointer}-${letter_pointer}`);
                box.value = 0;
                box.style.backgroundColor = "";
                box.style.border = "2px solid darkgrey";
                box.innerText = "";
            }
        }
        utils.getWord();
    });
});