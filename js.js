let winsCounter = 0, attemptsCounter = 0, guessedCounter = 0;
let images = [];
let selectedCards = [];
let timeCounter;
let mediumTime = 35, hardTime = 65;
let expertAndUnrealTime = 60;
let expertTimeFlag = false, unrealTimeFlag = false;
const amountOfAttemptsInUnrealLevel = 20;
let currentMaxTime;
let timerDecrementing;
let string = '';
const cards = [...document.querySelectorAll('.card')];
const statisticsWins = document.querySelector('.wins');
const statisticsAttempts = document.querySelector('.attempts');
const statisticsGuessed = document.querySelector('.guessed');
const winMessage = document.querySelector('.win-message');
const loosingMessage = document.querySelector('.loosing-message');
const levelsBlock = document.querySelector('.choosing-level-block');
const gameBlock = document.querySelector('.game-block');
const blockWithCards = document.querySelector('.block-with-cards');
const timer = document.querySelector('.timer-block');
const questionButton = document.querySelector('.about-levels-button');
const popupAboutLevels = document.querySelector('.popup-about-levels');
const closeButtonForPopup = document.querySelector('.close-popup-button');
const easyLevel = document.querySelector('.easy-level');
const mediumLevel = document.querySelector('.medium-level');
const hardLevel = document.querySelector('.hard-level');
const expertLevel = document.querySelector('.expert-level');
const unrealLevel = document.querySelector('.unreal-level');
const startButton = document.querySelector('.start-button');
const startPage = document.querySelector('.starting-page');
const finishButton = document.querySelector('.reload-button');
const finishingTheGamePopup = document.querySelector('.finishing-the-game-popup');
const buttonForNotFinishingTheGame = document.querySelector('.not-finishing-the-game-button');
const buttonForFinishingTheGame = document.querySelector('.finishing-the-game-button');

statisticsWins.textContent = `Wins : ${winsCounter}`;
statisticsAttempts.textContent = `Amount os attempts ${string}: ${attemptsCounter}`;
statisticsGuessed.textContent = `Amount of guessed : ${guessedCounter} from ${cards.length}`;

fillingCardsWithImages();

/*=====================================================*/
/*============Script for starting page=================*/
/*=====================================================*/
startButton.addEventListener('click', () => {
    startPage.classList.add('starting-page__hide');
    levelsBlock.classList.add('choosing-level-block__visible');
})
/*=====================================================*/
/*=====Script for block with choosing of levels========*/
/*=====================================================*/
/*========Script for popup about levels================*/
/*======================================================*/

questionButton.addEventListener('click', () => {
    popupAboutLevels.classList.add('popup-about-levels__visible');
})
closeButtonForPopup.addEventListener('click', () => {

    popupAboutLevels.classList.remove('popup-about-levels__visible');
    popupAboutLevels.classList.add('popup-about-levels__hide');

    setTimeout(() => {
        popupAboutLevels.classList.remove('popup-about-levels__hide');
    }, 1000)
})
popupAboutLevels.addEventListener('click', function () {

    popupAboutLevels.classList.remove('popup-about-levels__visible');
    popupAboutLevels.classList.add('popup-about-levels__hide');

    setTimeout(() => {
        popupAboutLevels.classList.remove('popup-about-levels__hide');
    }, 1000)
})

/*======================================================*/
/*==============Timer functions=========================*/

/*======================================================*/

function refreshingCardsForLoosing() {
    const refreshing = new Promise((resolve) => {
        setTimeout(() => {
            loosingMessage.classList.add('loose-animation');
        }, 10);
        resolve();
    }).then(() => {
        setTimeout(refreshCards, 2000);
    }).then(() => {
        setTimeout(() => {
            guessedCounter = 0;
            attemptsCounter = 0;
            if (unrealTimeFlag) attemptsCounter = amountOfAttemptsInUnrealLevel;
            resetTimeOnTimer();
        }, 1000);
    })

}

function resetTimeOnTimer() {
    clearInterval(timerDecrementing);
    if ((expertTimeFlag || unrealTimeFlag) && currentMaxTime > 30)
        currentMaxTime--;
    timeCounter = currentMaxTime;
    timerDecrementing = setInterval(timerOn, 1000);
}

function timerOn() {
    if (timeCounter < 0) {
        //Time is over
        refreshingCardsForLoosing()
    } else {
        timer.textContent = timeCounter;
        timeCounter--;
    }
}

function setTimer() {
    timeCounter = currentMaxTime;
    timer.textContent = timeCounter;
    timerDecrementing = setInterval(timerOn, 1000);
}

/*======================================================*/
/*========Script for going to game======================*/

/*======================================================*/

function transitionToGame() {
    levelsBlock.classList.add('choosing-level-block__hide');
    // gameBlock.classList.add('game-block__visible');
    cards.forEach(item => {
        item.addEventListener('click', clickFn, false);
    })
}

function addingCards() {
    for (let i = 0; i < 6; i++) {
        const card = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');
        card.classList.add('card');
        front.classList.add('front');
        back.classList.add('back');
        card.append(front);
        card.append(back);
        blockWithCards.append(card);
        cards.push(card);
    }
    fillingCardsWithImages();
}

function checkingForAttemptsCounter() {
    string = 'осталось ';
    attemptsCounter = amountOfAttemptsInUnrealLevel;
    statisticsAttempts.textContent = `Amount of attempts ${string}: ${attemptsCounter}`;
    setInterval(() => {
        if (attemptsCounter <= 0) {
            refreshingCardsForLoosing();
        }
    }, 1000)
}

function easyLevelResponsiveStyles() {
    if (window.innerWidth <= 835 && window.innerWidth > 637) {
        cards[0].remove();
        cards[1].remove();
        cards.splice(0, 2);
        // refreshCards();
        fillingCardsWithImages()
        mediumTime = 25;
    }
    if (window.innerWidth <= 384) {
        cards[0].remove();
        cards[1].remove();
        cards[2].remove();
        cards[4].remove();
        // refreshCards();
        fillingCardsWithImages()
        mediumTime = 20;
    }
    gameBlock.classList.add('game-block__visible__easy');

}

function hardLevelsResponsiveStyles() {
    if (window.innerWidth <= 637) {
        cards[0].remove();
        cards[1].remove();
        //refreshCards();
        expertAndUnrealTime *= 2;
        hardTime *= 2;

        fillingCardsWithImages()
    }
    if (window.innerWidth <= 510) {
        cards.forEach(item => {
            item.classList.add('small-card');
        })
    }
    gameBlock.classList.add('game-block__visible__hard');

}

easyLevel.addEventListener('click', () => {
    easyLevelResponsiveStyles();
    transitionToGame();
    timer.style.display = 'none';
    gameBlock.style.marginTop = '-200px'
})
mediumLevel.addEventListener('click', () => {
    easyLevelResponsiveStyles();
    transitionToGame();
    currentMaxTime = mediumTime;
    gameBlock.style.marginTop = '-140px'
    setTimer();
})
hardLevel.addEventListener('click', () => {
    addingCards();
    hardLevelsResponsiveStyles();
    transitionToGame();
    currentMaxTime = hardTime;
    setTimer();
    gameBlock.style.marginTop = '130px';
    timer.classList.add('timer-left');
    statisticsGuessed.textContent = `Amount of guessed : ${guessedCounter} from ${cards.length}`;
    setTimeout(transitionToGame, 0);
})

function transitionToGameForExpertAndUnrealLevels() {
    addingCards();
    hardLevelsResponsiveStyles();
    transitionToGame();
    currentMaxTime = expertAndUnrealTime;
    setTimer();
    gameBlock.style.marginTop = '130px';
    timer.classList.add('timer-left');
    statisticsGuessed.textContent = `Amount of guessed : ${guessedCounter} from ${cards.length}`;
    setTimeout(transitionToGame, 0);
}

expertLevel.addEventListener('click', () => {
    transitionToGameForExpertAndUnrealLevels();
    expertTimeFlag = true;
})
unrealLevel.addEventListener('click', () => {
    transitionToGameForExpertAndUnrealLevels();
    unrealTimeFlag = true;
    checkingForAttemptsCounter();
})
/*==================================================*/
/*============Main game logic=======================*/

/*==================================================*/
function randUniqueIndexFromArray(arr, usedIndexes) {
    let index;
    do {
        index = Math.floor((Math.random() * 10) % arr.length);
    } while (usedIndexes.includes(index))
    return index;
}

function fillingCardsWithImages() {
    randFillingImagesArr();
    randomBackground(cards)
}

function randomBackground(collection) {
    let counter = 0, imageIndex;
    let usedIndexes = [];
    for (let i = 0; i < collection.length / images.length; i++) {
        for (let j = 0; j < images.length; j++) {
            imageIndex = randUniqueIndexFromArray(images, usedIndexes);
            usedIndexes.push(imageIndex);
            collection[counter].firstElementChild.style.background = `url(${images[imageIndex]})`;
            collection[counter].setAttribute('data-image', `${images[imageIndex]}`);
            counter++;
        }
        usedIndexes = [];
    }
}

function refreshCards() {
    //removing active classes from cards
    cards.forEach(item => {
        item.addEventListener('click', clickFn, false);
        item.setAttribute('data-guessed', 'false');
        item.classList.remove('is-selected');
        item.classList.remove('successful-animation');
        item.classList.remove('wrong-animation');
        item.firstElementChild.classList.remove('is-guessed');
    })
    statisticsWins.textContent = `Wins : ${winsCounter}`;

    resetTimeOnTimer();

    //removing animation class from winning and loosing messages
    setTimeout(() => {
        winMessage.classList.remove('win-animation');
        loosingMessage.classList.remove('loose-animation');
    }, 2100);
    setTimeout(() => {
        randomBackground(cards);
    }, 600);

    guessedCounter = 0;
    attemptsCounter = 0;
    if (unrealTimeFlag) attemptsCounter = amountOfAttemptsInUnrealLevel;
    statisticsGuessed.textContent = `Amount of guessed : ${guessedCounter} from ${cards.length}`;
    statisticsAttempts.textContent = `Amount of attempts ${string} : ${attemptsCounter}`;

    randFillingImagesArr();
}

function markGuessedCards(sortedCards) {

    sortedCards[0].classList.add('successful-animation');
    sortedCards[1].classList.add('successful-animation');

    sortedCards[0].removeEventListener('click', clickFn, false);
    sortedCards[0].setAttribute('data-guessed', 'true');

    sortedCards[1].removeEventListener('click', clickFn, false);
    sortedCards[1].setAttribute('data-guessed', 'true');

    setTimeout(() => {
        sortedCards[0].firstElementChild.classList.add('is-guessed');
        sortedCards[1].firstElementChild.classList.add('is-guessed');
    }, 1500)

    guessedCounter += 2;
    statisticsGuessed.textContent = `Amount of guesses : ${guessedCounter} from ${cards.length}`;
}

let clickFn = function () {

    this.classList.toggle('is-selected');

    selectedCards = [...blockWithCards.querySelectorAll('.is-selected')];

    //removing previous guessed cards from array of selected cards
    let sortedCards = selectedCards.filter(item => {
        return item.getAttribute('data-guessed') !== 'true'
    })

    if (sortedCards.length === 2) {

        if (unrealTimeFlag)
            attemptsCounter--;
        else
            attemptsCounter++;
        statisticsAttempts.textContent = `Amount of attempts ${string} : ${attemptsCounter}`;

        if (sortedCards[0].getAttribute('data-image') === sortedCards[1].getAttribute('data-image')) {
            markGuessedCards(sortedCards);
        } else {
            const promise = new Promise((resolve) => {
                setTimeout(() => {

                    sortedCards[0].classList.remove('is-selected')
                    sortedCards[0].classList.add('wrong-animation');

                    sortedCards[1].classList.remove('is-selected')
                    sortedCards[1].classList.add('wrong-animation');
                }, 750)
                resolve(sortedCards);
            }).then(() => {
                setTimeout(() => {
                    sortedCards[0].classList.remove('wrong-animation');
                    sortedCards[1].classList.remove('wrong-animation');
                }, 100)
            })
        }

    }
    if (selectedCards.length === cards.length) {
        sortedCards[1].classList.add('successful-animation');
        winsCounter++;
        const displayWinMessage = new Promise((resolve) => {
            setTimeout(() => {
                winMessage.classList.add('win-animation');
            }, 100);
            resolve();
        }).then(() => {
            setTimeout(refreshCards, 2000);
        })
    }
}

function randFillingImagesArr() {
    images = [];
    //Amount of images must be at least = cards.length/2
    const allImages = ['img/cat.jpg', 'img/sunset.png', 'img/pizza.jpg', 'img/tetris.jpg', 'img/river.jpg', 'img/interstellar.jpg',
        'img/man.jpg', 'img/mountains.jpg', 'img/nasa.jpg', 'img/avocado.jpg', 'img/fox.jpg', 'img/car.jpg', 'img/woman.png'];
    let counter = 0, index;
    do {
        if (counter % 2 === 0)
            index = Math.floor(Math.floor((Math.random() * 10) % allImages.length / 2) +
                Math.floor((Math.random() * 10) % allImages.length));
        else
            index = Math.floor((Math.random() * 10) % allImages.length / 2) +
                Math.floor((Math.random() * 10) % allImages.length / 4);

        if (!images.includes(allImages[index]) && index < allImages.length) {
            images.push(allImages[index]);
            counter++;
        }
    } while (counter < cards.length / 2)
}

/*==========================================*/
/*============Finishing the game===========*/
/*=========================================*/
finishButton.addEventListener('click', () => {
    finishingTheGamePopup.classList.add('finishing-the-game-popup__visible');
})
buttonForNotFinishingTheGame.addEventListener('click', () => {

    finishingTheGamePopup.classList.remove('finishing-the-game-popup__visible');
    finishingTheGamePopup.classList.add('finishing-the-game-popup__hide');

    setTimeout(() => {
        finishingTheGamePopup.classList.remove('finishing-the-game-popup__hide');
    }, 1000)
})
buttonForFinishingTheGame.addEventListener('click', () => {
    location.reload();
})
/**/


