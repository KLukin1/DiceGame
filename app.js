/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If a player gets 6 two times in a row he loses his entire score
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, currentPlayer, gamePlaying, previousDice, winScore;

initial();


document.querySelector('.btn-start').addEventListener('click', function() {
    
    window.alert('GAME RULES: \n- The game has 2 players, playing in rounds \n- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score \n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn \n- If a player gets 6 two times in a row he loses his entire score \n- The player can choose to \'Hold\', which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn \n- The first player to reach winning score that is set at the beginning of the game wins the game')
                 
    winScore = prompt('Set a winning score: ', '100');

    if(!winScore) {
        winScore = 100;
    }
    window.alert('Winning score is ' + winScore);
});


document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display the result img
        document.querySelector('.dice').classList.remove('hide');
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        // Update the round score. If the number is 1, change the player
        if (dice === 6 && previousDice === 6) {
            
            scores[currentPlayer] = 0;
            document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];
            dice = 0;
            nextPlayer();
            
        } else if (dice > 1) {
            roundScore += dice;
            document.querySelector('#current-' + currentPlayer).textContent = roundScore;

        } else {
            nextPlayer();
        }
        
        // Check if the player won
        if (scores[currentPlayer] + roundScore >= winScore) {
            
            checkWinner();
            document.querySelector('#current-' + currentPlayer).textContent = 0;
            document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer] + roundScore;
        }
    } 
        
        // Save dice number
         previousDice = dice;
    });

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        
        // Add score to global score
        scores[currentPlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];

        // Check if the player won
        if (scores[currentPlayer] >= winScore) {
            
            checkWinner();
        }
        else {
            nextPlayer();
        }
    } 
});


function nextPlayer() {
    // Postavi na 0 da ne uzme broj kockice od proslog igraca.
    previousDice = 0;
    
    roundScore = 0;
    document.querySelector('#current-' + currentPlayer).textContent = roundScore;
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
        
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
        
    document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
        
    
    document.querySelector('.dice').classList.remove('hide');
    document.querySelector('.dice').classList.add('hide');

};


document.querySelector('.btn-new').addEventListener('click', initial);

function initial() {
    
    scores = [0,0];
    roundScore = 0;
    currentPlayer = 0;
    gamePlaying = true;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
};

function checkWinner() {
    
    document.getElementById('name-' + currentPlayer).textContent = 'WINNER';
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');

    document.querySelector('.dice').classList.remove('hide');
    document.querySelector('.dice').classList.add('hide');

    gamePlaying = false;
};











