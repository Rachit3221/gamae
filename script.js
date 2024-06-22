// script.js
const socket = io();

// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Cell click handler
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            gameBoard[index] = currentPlayer;

            socket.emit('move', { index, currentPlayer });

            // Check for win or tie
            // Implement your own game logic here

            // Switch turns
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Listen for moves from the server
socket.on('move', (data) => {
    const { index, currentPlayer } = data;
    const cell = document.getElementById(`cell-${index}`);
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        // Check for win or tie
        // Implement your own game logic here
    }
});

// Join the game room
socket.emit('joinGame');
