// --------------- Rulles btn -----------------
let btnRules = document.querySelector(".rules");
const rules = function () {
  alert(
    "RULES OF THE PIG GAME: ---> 1º - If your dice take number 1, you lose. ---> 2º - If one of the players take the 100 ponints, wins --->    3º - You can roll dice or hold, to keep your points"
  );
};
btnRules.addEventListener("click", rules);
// --------------- Rulles btn -----------------

// --------------- Selecting Elements -----------------
let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let score = [0, 0];
let activePlayer = 0;
let currentScore = 0;

// Start Condicions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
let playing = true;

// --------------- Selecting Elements -----------------

// --------------- Games Functionalities -----------------

// Function of roll the dice
const roolDices = function () {
  if (playing) {
    // Roll the Dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 0. Images of the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 1 . Check. If dice = 1 is true, switch the player.

    if (dice !== 1) {
      // 2. Add score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // 3. Switch the player.
      switchPlayer();
    }
  }
};

// Button click for roll the dice
btnRoll.addEventListener("click", roolDices);

// Function of hold the dice
const holdDice = function () {
  if (playing) {
    // 1. Add currentScore to active player's score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. Check if player's score is >= 100

    if (score[activePlayer] >= 100) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
};

// Button to hold the dice
btnHold.addEventListener("click", holdDice);

// Function to reset the game

const resetGame = function () {
  // Reset the function of the winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  playing = true;
  // Clean current score
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // SwitchPlayer
  activePlayer = 0;
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  // Clean Total Score
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  score = [0, 0];
};

btnNew.addEventListener("click", resetGame);
