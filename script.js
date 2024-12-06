const container = document.getElementById("createGameHere");
const result = document.getElementById("result");
let turn = 0;

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function createGame() {
    const displayPlayers = addAttributes(document.createElement("div"),
        ["style", "font-size:25px; width:500px; text-align:right;" +
        "margin-right:15px; font-weight:bold"]);
    container.appendChild(displayPlayers);
    const player1 = document.createElement("p");
    player1.innerText = "X - Player 1";
    const player2 = document.createElement("p");
    player2.innerText = "O - Player 2";
    displayPlayers.appendChild(player1);
    displayPlayers.appendChild(player2);
    const gameField = addAttributes(document.createElement("div"),
        ["style", "display:grid; grid-template-columns:repeat(3, 100px)"]);
    container.appendChild(gameField);
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            const button = addAttributes(document.createElement("button"),
                ["type", "button", "class", "btn btn-outline-secondary", "style",
                "width:100px; height:100px; font-size:60px; color:black;" +
                "font-weight:bold", "onclick", "markButton(this)"]);
            gameField.appendChild(button);
        }
    }
}

function createRestartButton() {
    const button = addAttributes(document.createElement("button"),
        ["onclick", "window.location.reload()", "class", "btn btn-primary"]);
    button.innerText = "Restart";
    result.appendChild(button);
}

function areEqual(element1, element2, element3) {
    return element1.innerText !== "" && element1.innerText === element2.innerText
    && element1.innerText === element3.innerText
}

function checkWinner() {
    const element = document.getElementsByClassName("btn btn-outline-secondary");
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    let winnerFound = false;
    for (let i = 0; i < winnerCombinations.length; ++i) {
        const a = winnerCombinations[i][0];
        const b = winnerCombinations[i][1];
        const c = winnerCombinations[i][2];
        if (areEqual(element[a], element[b], element[c])) {
            if ((turn - 1) % 2) {
                result.innerText = "Player 2 wins";
            } else {
                result.innerText = "Player 1 wins";
            }
            winnerFound = true;
            createRestartButton();
        }
    }
    if (!winnerFound && turn === element.length) {
        result.innerText = "It's a draw";
        createRestartButton();
    }
}

function markButton(button) {
    if (turn % 2) {
        button.innerText = "O";
    } else {
        button.innerText = "X";
    }
    ++turn;
    button.setAttribute("disabled", "true");
    checkWinner();
}
