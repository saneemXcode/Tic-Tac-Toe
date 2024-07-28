// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
    selectxBtn = selectBox.querySelector(".playerx"),
    selectoBtn = selectBox.querySelector(".playero"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replaybtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times", // FontAwesome class for X
    playerOIcon = "far fa-circle", // FontAwesome class for O
    playerSign = "X", // Default player sign
    runGame = true; // Control if the game is running

window.onload = () => { // Once the window is loaded
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
};

selectxBtn.onclick = () => {
    selectBox.classList.add("hide"); // Hide the select box on X selection
    playBoard.classList.add("show"); // Show the play board
    playerSign = "X"; // Set player sign to X
    updateTurnIndicator(); // Update the turn indicator
};

selectoBtn.onclick = () => {
    selectBox.classList.add("hide"); // Hide the select box on O selection
    playBoard.classList.add("show"); // Show the play board
    players.classList.add("active"); // Switch active player to O
    playerSign = "O"; // Set player sign to O
    updateTurnIndicator(); // Update the turn indicator
};

function clickedBox(element) {
    if (runGame) {
        if (element.innerHTML === "") { // Only allow clicking on empty boxes
            element.innerHTML = `<i class="${playerSign === "X" ? playerXIcon : playerOIcon}"></i>`; // Set icon based on player sign
            element.setAttribute("id", playerSign); // Set id to the player sign
            players.classList.toggle("active"); // Toggle active player
            selectWinner(); // Check for a winner
            if (runGame) {
                playerSign = playerSign === "X" ? "O" : "X"; // Switch player sign
                updateTurnIndicator(); // Update the turn indicator
            }
        }
    }
}

function updateTurnIndicator() {
    players.querySelector(".Xturn").style.color = playerSign === "X" ? "#fff" : "#56baed";
    players.querySelector(".Oturn").style.color = playerSign === "O" ? "#fff" : "#56baed";
    players.querySelector(".slider").style.left = playerSign === "X" ? "0" : "50%";
}

function getClass(idname) {
    return document.querySelector(".box" + idname).id; // Return the id of the box
}

function checkClasses(val1, val2, val3, sign) {
    return getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign;
}

function selectWinner() {
    if (checkClasses(1, 2, 3, playerSign) || checkClasses(4, 5, 6, playerSign) || checkClasses(7, 8, 9, playerSign) || checkClasses(1, 4, 7, playerSign) || checkClasses(2, 5, 8, playerSign) || checkClasses(3, 6, 9, playerSign) || checkClasses(1, 5, 9, playerSign) || checkClasses(3, 5, 7, playerSign)) {
        runGame = false; // Stop the game
        setTimeout(() => {
            playBoard.classList.remove("show"); // Hide the play board
            resultBox.classList.add("show"); // Show the result box
        }, 700); // 700ms delay
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; // Show the winning text
    } else if (isDraw()) {
        runGame = false; // Stop the game
        setTimeout(() => {
            playBoard.classList.remove("show"); // Hide the play board
            resultBox.classList.add("show"); // Show the result box
        }, 700); // 700ms delay
        wonText.textContent = "Match has been drawn!"; // Show the draw text
    }
}

function isDraw() {
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].innerHTML === "") {
            return false;
        }
    }
    return true;
}

replaybtn.onclick = () => {
    window.location.reload(); // Reload the window
}
