let star = document.getElementsByClassName('star');
let stars = Array.from(star);
let sequence = [1,2,3,4,5,6,7,8,9];
let elka = document.getElementsByClassName('elka')[0];
let counter;
let modal = document.getElementsByClassName('modal')[0];

document.body.onload = firstStart();

function firstStart(){
    sequence.sort(() => Math.random() - 0.5);
    startGame();
    console.log(sequence);
}

function startGame(){
    counter = 0;
    elka.classList.remove("win");
    for (let i = 0; i < stars.length; i++){
        [].forEach.call(stars, function(item) {
            elka.appendChild(item);
        });
        stars[i].classList.remove( "lighted","win");
    }
}
function checkStar() {
    if (sequence[counter].toString() === this.type) {
    counter++;
    this.classList.add("lighted");
    }
    else{
        startGame();
    }
}

function allStars(){
    if(document.getElementsByClassName("lighted").length === 9){
        modal.style.display = "block";
        elka.classList.add('win');
        for (let i = 0; i < stars.length; i++){
            [].forEach.call(stars, function(item) {
                elka.appendChild(item);
            });
            stars[i].classList.add("win");
        }
    }
}

function playAgain(){
    modal.style.display = "none";
    firstStart();
}

for (let i = 0; i < stars.length; i++){
    star = stars[i];
    star.addEventListener("click", checkStar);
    star.addEventListener("click", allStars);
};