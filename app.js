const Gameboard = (() => {
    const cellElements = document.querySelectorAll('[data-cell-index]');
    const board = document.getElementById('game--container');
    const playerNames = document.querySelector('#player-name');
    const restartButton = document.getElementById('game--restart')
    const newRoundButton = document.getElementById('game--newRound')
    const winningMessageTextElement = document.querySelector('.winning-message');

    const form = document.getElementById('name-form')
    const name1Form = document.getElementById('name1Form')
    const name2Form = document.getElementById('name2Form')
    const player1DOM = document.getElementById('p1NameDOM')
    const player2DOM = document.getElementById('p2NameDOM')

    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let circleTurn;

    let gameActive = true;

    let player1Name = 'Player 1';
    let player2Name = 'Player 2';

    startGame()

    restartButton.addEventListener('click', startGame)
    newRoundButton.addEventListener('click', newRound)
    form.addEventListener('submit', displayNamesDOM);

    function startGame() {
        gameActive = true;
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        });

        playerNames.classList.remove('hide')
        winningMessageTextElement.innerHTML = '';

        player1DOM.innerHTML = 'Player 1'
        player2DOM.innerHTML = 'Player 2'

        player1Name = 'Player 1'
        player2Name = 'Player 2'

        setBoardHoverClass();
    }

    function newRound() {
        gameActive = true;
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        });

        playerNames.classList.remove('hide')
        winningMessageTextElement.innerHTML = '';

        player1DOM.innerHTML = player1Name;
        player2DOM.innerHTML = player2Name;

        setBoardHoverClass();
    }

    function displayNamesDOM(e) {
        e.preventDefault();

        if (name1Form.value.length > 0) {
            player1DOM.innerHTML = `${name1Form.value}`
            player1Name = `${name1Form.value}`
        } else if (name1Form.value.length === 0) {
            player1DOM.innerHTML = 'Player 1'
            player1Name = player1DOM.innerHTML;
        }

        if (name2Form.value.length > 0) {
            player2DOM.innerHTML = `${name2Form.value}`
            player2Name = `${name2Form.value}`
        } else if (name2Form.value.length === 0) {
            player2DOM.innerHTML = 'Player 2'
            player2Name = player2DOM.innerHTML;
        }

        name1Form.value = ''
        name2Form.value = ''
    }

    function handleClick(e) {
        if (!gameActive) {
            return;
        }
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        placeMark(cell, currentClass)
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    }

    function endGame(draw) {
        if (draw) {
            playerNames.classList.add('hide');
            winningMessageTextElement.innerHTML = `<p>Draw!</p>`
            gameActive = false;
        } else if (circleTurn === false) {
            playerNames.classList.add('hide');
            winningMessageTextElement.innerHTML = `${player1Name === 'Player 1' ? "X's" : player1Name} wins!</p>`
            gameActive = false;
        } else if (circleTurn === true) {
            playerNames.classList.add('hide');
            winningMessageTextElement.innerHTML = `${player2Name === 'Player 2' ? "O's" : player2Name} wins!</p>`
            gameActive = false;
        }
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass)
    }

    function swapTurns() {
        circleTurn = !circleTurn;
    }

    function setBoardHoverClass() {
        if (gameActive === false) {
            return;
        }
        board.classList.remove(X_CLASS);
        board.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS)
        } else {
            board.classList.add(X_CLASS)
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }
})();