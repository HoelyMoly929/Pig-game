// 'use strict';

const dice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const btn_new = document.querySelector('.btn--new');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let currentPlayer, currentScore, scores, playing;

function init() {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--acitve');
}
init();

function diceRoll() {
  if (playing) {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    //   dice.setAttribute('src', `dice-${randomNum}.png`);
    dice.src = `dice-${randomNum}.png`;
    //   currentScore += randomNum;

    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
    //   currentPlayer === 0
    //     ? (current0.textContent = currentScore)
    //     : (current1.textContent = currentScore);

    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;

    console.log(
      `dice: ${randomNum} current player : ${currentPlayer} player0: ${scores[0]}, player1 : ${scores[1]} current score ${currentScore}`
    );
  }
}

function switchPlayer() {
  player0.classList.toggle('player--active'); // there is a toggle function for classList
  player1.classList.toggle('player--active');
  //   if (currentPlayer === 0) {
  //     current0.textContent = 0;
  //     player0Score += currentScore;
  //     score0.textContent = player0Score;
  //   } else {
  //     current1.textContent = 0;
  //     player1Score += currentScore;
  //     score1.textContent = player1Score;
  //   }
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

btn_roll.addEventListener('click', diceRoll);

btn_hold.addEventListener('click', () => {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btn_new.addEventListener('click', init);
