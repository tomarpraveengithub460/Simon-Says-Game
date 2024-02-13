let gameSequence = [];
let userSequence = [];

let buttons = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let startButton = document.querySelector("#start");
let scoreCard=document.querySelector("#score");

startButton.addEventListener("click", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSequence = [];
    scoreCard.innerText = `Score : ${level}`;
    level++;

    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = buttons[randomIndex];
    console.log(randomColor);
    let randomButton = document.querySelector(`#${randomColor}`);
    console.log(randomButton);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    gameFlash(randomButton);
}

function checkAns(index) {
    if (userSequence[index] === gameSequence[index]) {
        if (userSequence.length == gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        scoreCard.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAns(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btns");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

let resetButton=document.querySelector("#reset");

resetButton.addEventListener("click",reset);
function reset() {
    scoreCard.innerHTML = "SCORE : 0";
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}