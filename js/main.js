const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""]
    const render = () =>{
        let gameboardHTML = ""
        gameboard.forEach((squares, index) =>{
            gameboardHTML += `<div class='squares' id='square-${index}'>${squares}</div>`
        })
        document.querySelector('.gameboard').innerHTML = gameboardHTML
        const square = document.querySelectorAll('.squares')
        square.forEach((squares) => {
            squares.addEventListener('click', Game.handleClick)
        })
    }
    const update = (index,mark) =>{
        gameboard[index] = mark
        render()
    }

    const getGameboard = () => gameboard
    return{
        render,
        update,
        getGameboard
    }
})();

const createPlayer = (name, mark) =>{

    return{
        name,
        mark
    }
}

function checkForWin(board,mark){
    let condition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0;i<condition.length;i++){
        const [a, b, c] = condition[i]
        if(board[a] && board[a]===board[b] && board[a]===board[c]){
            return true
        }
    }
    return
}

function checkForTie(board){
    return board.every(cell => cell !== "")
}

const Game = (() => {
    let player = []
    let currentPlayerIndex
    let isGameOver
    let messageText = document.querySelector('.message')

    const start = () =>{
        player = [
            createPlayer(document.querySelector('#player1').value,'X'),
            createPlayer(document.querySelector('#player2').value,'O')
        ]
    
        currentPlayerIndex = 0
        isGameOver = false
        Gameboard.render()
    }

    const handleClick = (event) =>{
        if(isGameOver){
            return
        }
        let index = event.target.id.split('-')[1]
        if(Gameboard.getGameboard()[index] !== ""){
            return
        }
        
        Gameboard.update(index, player[currentPlayerIndex].mark)
        if(checkForWin(Gameboard.getGameboard())){
            isGameOver = true
            if(player[currentPlayerIndex].name === ""){
                player[currentPlayerIndex].name = `Player ${currentPlayerIndex+1}`
                messageText.textContent = `${player[currentPlayerIndex].name.toUpperCase()} is Won`
            }
            
            messageText.textContent = `${player[currentPlayerIndex].name.toUpperCase()} is Won`
        }
        else if(checkForTie(Gameboard.getGameboard())){
            isGameOver = true
            messageText.textContent = `It's A Tie`
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 :0
    }

    const restart = () => {
        for(let i = 0;i < 9; i++){
            Gameboard.update(i,"")
        }
        Gameboard.render()
        messageText.textContent = ''
        isGameOver =  false
        currentPlayerIndex = 0
    }

    return{
        start,
        restart,
        handleClick
    }
})();


const restartButton = document.querySelector('.restart-game')
const startButton = document.querySelector('.start-game')

startButton.addEventListener('click', ()=>{
    Game.start()
})

restartButton.addEventListener('click',()=>{
    Game.restart()
    document.querySelector('#player1').value = ''
    document.querySelector('#player2').value = ''
})