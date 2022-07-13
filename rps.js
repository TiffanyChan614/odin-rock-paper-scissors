const playerSelectionMsg = document.querySelector(".player-selection-span");
const computerSelectionMsg = document.querySelector(".computer-selection-span");
const playerScoreMsg = document.querySelector(".player-score-span");
const computerScoreMsg = document.querySelector(".computer-score-span");
const winnerMsg = document.querySelector(".msg");
const roundMsg = document.querySelector(".round-span");
const buttons = document.querySelectorAll(".move");
const endMsg = document.querySelector(".end.msg");
const againBtn = document.querySelector(".again");

function computerPlay(){
   let choice = Math.floor(Math.random() * 3);
   if (choice === 0){
       return "Rock";
   }
   else if (choice === 1){
       return "Paper";
   }
   else{
       return "Scissors";
   }
}

function playRound(playerSelection, computerSelection){
    switch(playerSelection){
        case "Rock":
            switch(computerSelection){
                case "Rock": return `It's a draw! ${computerSelection} ties with ${playerSelection}.`;
                case "Paper": return `You lose! ${computerSelection} beats ${playerSelection}.`;
                case "Scissors": return `You win! ${playerSelection} beats ${computerSelection}.`;
                default: return "Invalid computerSelection";
            }
        case "Paper":
            switch(computerSelection){
                case "Rock": return `You win! ${playerSelection} beats ${computerSelection}.`;
                case "Paper": return `It's a draw! ${computerSelection} ties with ${playerSelection}.`;
                case "Scissors": return `You lose! ${computerSelection} beats ${playerSelection}.`;
                default: return "Invalid computerSelection";
            }
        case "Scissors":
            switch(computerSelection){
                case "Rock": return `You lose! ${computerSelection} beats ${playerSelection}.`;
                case "Paper": return `You win! ${playerSelection} beats ${computerSelection}.`;
                case "Scissors": return `It's a draw! ${computerSelection} ties with ${playerSelection}.`;
                default: return "Invalid computerSelection";
            }
        default: return "Invalid playerSelection";
    }
}

function incrementScore(scoreSpan){
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + 1;
}

function makeSelection(playerSelection){
    playerSelectionMsg.textContent = playerSelection;
    let computerSelection = computerPlay();
    computerSelectionMsg.textContent = computerSelection;
    let msg = playRound(playerSelection, computerSelection);
    if (msg.includes("draw")){
        incrementScore(playerScoreMsg);
        incrementScore(computerScoreMsg);
    }
    else if (msg.includes("win")){
        incrementScore(playerScoreMsg);
    }
    else if (msg.includes("lose")){
        incrementScore(computerScoreMsg);
    }
    winnerMsg.textContent = msg;
}

function displayEndMessage(playerScore, computerScore){
    if (playerScore > computerScore){
        endMsg.textContent = ("Congratulations! You win!");
    }
    else if (computerScore > playerScore){
        endMsg.textContent = ("Unfortunately the computer wins...");
    }
    else{
        endMsg.textContent = ("It's a draw!");
    }
}

function init(){
    roundMsg.textContent = 1;
    playerScoreMsg.textContent = 0;
    computerScoreMsg.textContent = 0;
    playerSelectionMsg.textContent = "";
    computerSelectionMsg.textContent = "";
    winnerMsg.textContent = "";
    endMsg.textContent = "";
    againBtn.classList.remove("show");
}

function askAgain(){
    againBtn.classList.add("show");
    againBtn.addEventListener('click', function(){
        init();
        game();
    });
}

function play(){
    let playerScore, computerScore;
    let playerSelection = this.textContent;

    makeSelection(playerSelection);
    roundMsg.textContent = parseInt(roundMsg.textContent) + 1;

    playerScore = parseInt(playerScoreMsg.textContent);
    computerScore = parseInt(computerScoreMsg.textContent);

    if (playerScore === 5 || computerScore === 5) {
        displayEndMessage(playerScore, computerScore);
        buttons.forEach(button => button.removeEventListener('click', play));
        askAgain();
    }
}

function game(){
    init();
    buttons.forEach(button => button.addEventListener('click', play));
}

game();
