const cards = document.querySelectorAll('.item')
let front = document.getElementsByClassName('front')
let back = document.getElementsByClassName('back')
var hasFlipCard = false
var lockBoard = false
var firstCard,secondCard
function flipcard(event){
    if(lockBoard===true)
        return
    this.classList.toggle('flip')
    if(!hasFlipCard) {
        hasFlipCard=true
        firstCard=this
    } else {
        hasFlipCard=false
        secondCard=this
        checkForMatch()
    }
}
function  checkForMatch() {
    if(firstCard.dataset.name === secondCard.dataset.name && firstCard!==secondCard){
        disableCard()
    }else {
        unFlipCard()
    }
}
function disableCard () {
    setTimeout(()=> {
        secondCard.removeEventListener('click',flipcard)
        firstCard.removeEventListener('click',flipcard)
    },1000)
}
function unFlipCard() {
    lockBoard = true
    setTimeout(() => { 
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard=false
        firstCard=secondCard=null
    },1000)
}
function resetBoard() {
    [lockBoard , hasFlipCard] = [false , false]
    [firstCard , secondCard] = [null , null]
}
(function setRandom() {
    cards.forEach(card => card.style.order = Math.floor(Math.random()*16))
})()
cards.forEach(card => card.addEventListener('click',flipcard))