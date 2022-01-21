export function letterboxClick(){
    console.log("dsadA");
    if (this.value !== 0){
        console.log("Here");
        if (this.value === 1){
            console.log("1");
            this.value = 2;
            this.style.backgroundColor = "#b39c3c";
        } else if (this.value === 2){
            this.value = 3;
            this.style.backgroundColor = "#548b4c";
        } else {
            this.value = 1;
            this.style.backgroundColor = "#3c3c3c";
        }
    }
}

export function getWord(){
    let word = "";
    for (let i = 1; i < 6; i++){
        word += document.getElementById(`${word_pointer}-${i}`).innerHTML;
    }
    console.log(word);
}