let card = document.getElementsByClassName('card');
let cards = Array.from(card);
let deck = document.getElementsByClassName('deck')[0];
let openedCards = [];
let matchedCard = document.getElementsByClassName("match");
let modal = document.getElementsByClassName('modal')[0];

document.body.onload = startGame();

function startGame(){
    let cIndex = cards.length;
    let tempVal, rIndex;
    while(cIndex !== 0){
        rIndex = Math.floor(Math.random() * cIndex)
        cIndex--;
        tempVal = cards[cIndex];
        cards[cIndex] = cards[rIndex];
        cards[rIndex] = tempVal;
    }
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove( "match", "disabled","flip");
    }
    openedCards = [];

}
function displayCard(){
    this.classList.toggle('showed');
    this.classList.toggle('disabled')
}

function openCard(){
    openedCards.push(this);
    if(openedCards.length === 2){
        if(openedCards[0].type === openedCards[1].type)
            matchedCards();
        else {
            unflipCards();
        }
    }
}

function flipCard(){
    this.classList.toggle('flip');
}

function matchedCards(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("showed");
    openedCards[1].classList.remove("showed");
    openedCards = [];
}

function  unflipCards(){
    openedCards[0].classList.add("disabled");
    openedCards[1].classList.add("disabled");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("showed", "disabled","flip");
        openedCards[1].classList.remove("showed", "disabled","flip");
        openedCards = [];
        enable();
    },1500);
}

function victory(){
    if(matchedCard.length === 20){
        modal.style.display = "block";
    }
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

function playAgain(){
    modal.style.display = "none";
    startGame();
}

for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click",flipCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click",victory);
};
