// LIBRARIES
// -------------------------------------------------------------------
const moves = ['rock', 'paper', 'scissors']
const icons = {
    'rock': "https://openmoji.org/data/black/svg/270A.svg",
    'paper': "https://openmoji.org/data/black/svg/270B.svg",
    'scissors': "https://openmoji.org/data/black/svg/270C.svg",
    'pointDown': "https://openmoji.org/data/black/svg/1F447.svg",
    'pointLeft': "https://openmoji.org/data/black/svg/1F448.svg"
}
// -------------------------------------------------------------------

// VARIABLES
// -------------------------------------------------------------------
let round = 1
let playerScore = 0
let pcScore = 0
let message = 'Message board'
// -------------------------------------------------------------------

// SECONDARY FUNCTIONS
// -------------------------------------------------------------------
const playerMove = (choice, moves) => moves[choice]
const pcMove = moves => moves[(Math.floor(Math.random() * 3))]
const playerWins = (player, pc) => {
    return (player === 'rock' && pc === 'scissors') ||
        (player === 'paper' && pc === 'rock') ||
        (player === 'scissors' && pc === 'paper')
    console.log('Player wins: ' + playerWins)
}
const drawPlayerScore = playerScore => {
    document.getElementById('player-score').innerHTML = playerScore
}
const drawPcScore = pcScore => {
    document.getElementById('pc-score').innerHTML = pcScore
}
const drawMessage = message => {
    document.getElementById('message-text').innerHTML = message
}
const updateRound = () => {
    round++
    document.getElementById('round').innerHTML = `Round # ${round}`
}
const updateBoard = (player, pc) => {
    document.getElementById('player-move').src = icons[player]
    document.getElementById('pc-move').src = icons[pc]
}
const restart = () => {
    round = 0
    updateRound()

    playerScore = 0
    drawPlayerScore(playerScore)

    updateBoard('pointDown', 'pointLeft')

    pcScore = 0
    drawPcScore(pcScore)
    drawMessage("OK, let's start again!")
}
const endGame = (playerScore, pcScore) => {
    restart()
    if (playerScore > pcScore) {
        drawMessage('YOU WON! <3')
    }
    else if (playerScore < pcScore) {
        drawMessage('You lost <\\3')
    }
    else {
        drawMessage('Tie. Try again!')
    }
}
// -------------------------------------------------------------------

// MAIN FUNCTION
// -------------------------------------------------------------------
function playRPS(choice) {

    console.log('Round # ' + round)

    let player = playerMove(choice, moves)
    let pc = pcMove(moves)

    updateBoard(player, pc)

    if (player === pc) {
        drawMessage('Tie! Try again!')
    }
    else if (playerWins(player, pc)) {
        playerScore++
        drawMessage('Point for you! :)')
        drawPlayerScore(playerScore)
    }
    else {
        pcScore++
        drawMessage('Point for PC :(')
        drawPcScore(pcScore)
    }

    console.log(`Player: ${player} - ${playerScore} pts.`)
    console.log(`Pc: ${pc} - ${pcScore} pts.`)

    updateRound()
}
// -------------------------------------------------------------------

// BUTTONS
// -------------------------------------------------------------------
let instructionsCloseButton = document.getElementById("instructions-close")
instructionsCloseButton.addEventListener("click", e => { document.getElementById('instructions').style.display = 'none'})

let rockButton = document.getElementById("rock")
rockButton.addEventListener('click', e => { playRPS(0) })

let paperButton = document.getElementById("paper")
paperButton.addEventListener('click', e => { playRPS(1) })

let scissorsButton = document.getElementById("scissors")
scissorsButton.addEventListener('click', e => { playRPS(2) })

let restartButton = document.getElementById("restart")
restartButton.addEventListener("click", e => { restart() })

let endGameButton = document.getElementById("finish")
endGameButton.addEventListener("click", e => { endGame(playerScore, pcScore) })
// -------------------------------------------------------------------