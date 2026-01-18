let boxes = document.querySelectorAll('.box');
let resetBtn = document.getElementById('reset');
let newBtn = document.getElementById('new');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.getElementById('msg');

let turnO = true;
const winningpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = winner === "Draw"
        ? "Game is a Draw"
        : `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winningpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log(`Winner ${pos1Val}`);
            showWinner(pos1Val);
            winnerFound = true;
            return;
        }
    }

    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (!winnerFound && allFilled) {
        console.log("Game is a draw");
        showWinner("Draw");
    }
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("box was clicked");
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

const resetgame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    msgcontainer.classList.add("hide");
};

newBtn.addEventListener('click', resetgame);
resetBtn.addEventListener('click', resetgame);
