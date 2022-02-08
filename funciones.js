// -- Elementos del HTML --
const board = document.getElementById( 'board' );
const cells = document.querySelectorAll( '[data-cell]' );
const currentStatus = document.getElementById( 'currentStatus' );
const resetButton = document.getElementById( 'resetButton' );
const gameEndOverlay = document.getElementById( 'gameEndOverlay' );
const currentBeastStatusImg = document.getElementById( 'currentBeastImg' );
const winningMessage = document.querySelector( '[data-winning-message]' );
const winningMessageText = document.querySelector( '[data-winning-message] p' );
const winningMessageImg = document.createElement( 'img' );

// -- Variables del juego --
let gameIsLive = true;
let cristinaTurn = true;
let winner = null;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// -- Funciones --
const setBoardHoverClass = () => {
  board.classList.remove( 'crisina' );
  board.classList.remove( 'macri' );

  if ( cristinaTurn ) {
    board.classList.add( 'cristina' );
  } else {
    board.classList.add( 'macri' );
  }
}

const placeBeastImg = ( cell, currentBeast ) => {
  cell.classList.add( currentBeast );
}

const swapTurns = () => {
  cristinaTurn = !cristinaTurn;
}

const updateCurrentStatus = () => {
  if ( cristinaTurn ) {
    currentBeastStatusImg.src = 'https://i0.wp.com/40.media.tumblr.com/62231d80f5807991f5a45d244b4d7e19/tumblr_inline_nuxg89Osib1qk1op9_500.png';
    currentBeastStatusImg.alt = 'cristina';
  } else {
    currentBeastStatusImg.src = 'https://www.javinilos.com/wp-content/uploads/2019/08/Macri-Mascara.png';
    currentBeastStatusImg.alt = 'macri';
  }
}

const checkWin = ( currentBeast ) => {
  return winningCombinations.some( combination => {
    return combination.every( i => {
      return cells[i].classList.contains( currentBeast );
    })
  });
}

const isDraw = () => {
  return [...cells].every( cell => {
    return cell.classList.contains( 'cristina' ) || cell.classList.contains( 'macri' );
  })
}

const startGame = () => {
  cells.forEach( cell => {
    winningMessageImg.remove();
    cell.classList.remove( 'cristina' );
    cell.classList.remove( 'macri' );
    cell.removeEventListener( 'click', handleCellClick );
    cell.addEventListener( 'click', handleCellClick, { once: true });
  });

  setBoardHoverClass();
  gameEndOverlay.classList.remove( 'show' );
}

const endGame = ( draw ) => {
  if ( draw ) {
    winningMessageText.innerText = `EMPATE!`;
  } else {
    winningMessageImg.src = cristinaTurn ? 'https://i0.wp.com/40.media.tumblr.com/62231d80f5807991f5a45d244b4d7e19/tumblr_inline_nuxg89Osib1qk1op9_500.png' : 'https://www.javinilos.com/wp-content/uploads/2019/08/Macri-Mascara.png';
    winningMessageImg.alt = cristinaTurn ? 'cristina' : 'macri';
    winningMessage.insertBefore( winningMessageImg, winningMessageText );
    winningMessageText.innerText = `GANADOR!!!`
  }

  gameEndOverlay.classList.add( 'show' );
}

// -- Evento --
const handleCellClick = ( e ) => {
  const cell = e.target;
  const currentBeast = cristinaTurn ? 'cristina' : 'macri';

  placeBeastImg( cell, currentBeast );
  if ( checkWin( currentBeast )) {
    endGame( false );
  } else if ( isDraw()) {
    endGame( true );
  } else {
    swapTurns();
    updateCurrentStatus();
    setBoardHoverClass();
  }
}

// -- Aca escuchamos mediante evento --
resetButton.addEventListener( 'click', startGame );

// -- Start Game --
startGame();
