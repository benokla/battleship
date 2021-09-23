import { Gameboard } from "./gameboardFactory";
import { UI } from "./UI";
import { Player } from "./playerFactory";

const game = (() => {
    const myGameboard = document.querySelector(".myGameboard")
    const pcGameboard = document.querySelector(".pcGameboard")
    const addShipBtn = document.querySelector("#addShipBtn")
    const posXInput = document.querySelector("#posXInput")
    const posYInput = document.querySelector("#posYInput")
    const randomBtn = document.querySelector("#randomBtn")
    const orientationBtn = document.querySelector("#orientationBtn")

    let start = false;
    let shipsLength = [3, 4, 5, 3]
    
    let gb1 = Gameboard();
    let gb2 = Gameboard();
    const pl1 = Player()
    const pl2 = Player()

    UI.displayBoard(myGameboard, gb1.gameboard)
    UI.displayBoard(pcGameboard, gb2.gameboard)
    // init enemy board
    addRandomShips(gb2)
    UI.displayBoard(pcGameboard, gb2.gameboard)

    pl1.turn = pl1.swapTurn();

    let i = 0;
    addShipBtn.addEventListener("click", addShip);
    orientationBtn.addEventListener("click", changeOrientation)

    function addShip() {
        if(gb1.placeShips(posXInput.value, posYInput.value, shipsLength[i], orientationBtn.value)) {
            UI.displayBoard(myGameboard, gb1.gameboard)
            i++; 
            UI.showMessage("Next ship has length of " + shipsLength[i])
            if(i>=shipsLength.length){
                start = true;
                UI.showMessage("Click on the enemy board to shoot")
            }
        }
        else {
            return
        }
    }

    function changeOrientation() {
        if(orientationBtn.textContent == "Vertical") {
            orientationBtn.value = "v";
            orientationBtn.textContent = "Horizontal"
        } else if(orientationBtn.textContent == "Horizontal") {
            orientationBtn.value = "h";
            orientationBtn.textContent = "Vertical"
        }
    }

    randomBtn.addEventListener("click", () => {
        if(!start) {
            gb1 = Gameboard();
            addRandomShips(gb1)
            UI.displayBoard(myGameboard, gb1.gameboard)
            UI.showMessage("Click on the enemy board to shoot")
            start = true;
        }
    })

    function addRandomShips(gb) {
        let y = 0;
        let dir = "";
        while(y<shipsLength.length) {
            if(getRandomInt(2) == 1) {
                dir = "v"
            } else {
                dir = "h"
            }
            if(gb.placeShips(getRandomInt(9), getRandomInt(9), shipsLength[y], dir)){
                y++;
            }
        }
    }
    
    const enemyFields = pcGameboard.querySelectorAll(".field");
    enemyFields.forEach(element => {
        element.addEventListener("click", (e) => {
            
            if(pl1.turn && start) {
                let res = gb2.receiveAttack(e.target.dataset.posX, e.target.dataset.posY)
                if(res[0]) {
                    UI.showMessage(`You shot on the coordinates ${res[1]} ${res[2]} and ... hit!`)
                } else {
                    UI.showMessage(`You shot on the coordinates ${res[1]} ${res[2]} and ... missed.`)
                }
                UI.markBoard(res[0], res[1], res[2], gb2, e)
                
                if(isGameOver()) {
                    if(gb2.allShipsSunk()) {
                        UI.showMessage("You won. Next game already started.")
                        newGame()
                    } else if(gb1.allShipsSunk() ) {
                        UI.showMessage("The PC won. Next game already started.")                    
                        newGame()
                    }
                    let y = 0;
                    let dir = "";
                    while(y<shipsLength.length) {
                        if(getRandomInt(2) == 1) {
                            dir = "v"
                        } else {
                            dir = "h"
                        }
                        if(gb2.placeShips(getRandomInt(9), getRandomInt(9), shipsLength[y], dir)){
                            y++;
                        }
                    }
                    return
                }
                pl1.turn = false;
                
                setTimeout(pcTurn, 2000)
            }  
        })
    })
     

    function newGame() {
       // init enemy board
       gb2 = Gameboard();
       addRandomShips(gb2)
       UI.displayBoard(pcGameboard, gb2.gameboard) 
       gb1 = Gameboard();
       UI.displayBoard(myGameboard, gb1.gameboard)
    }

    function pcTurn() {
        if(isGameOver()) return
        let res = gb1.receiveAttack(getRandomInt(9), getRandomInt(9))
        if(res[0]) {
            UI.showMessage(`PC shot on the coordinates ${res[1]} ${res[2]} and ... hit!`)
        } else {
            UI.showMessage(`PC shot on the coordinates ${res[1]} ${res[2]} and ... missed.`)
        }
        UI.markBoard(res[0], res[1], res[2], gb1, false)
        pl1.turn = pl1.swapTurn();
    }

    function isGameOver() {
        console.log(gb1.gameboard)
        if(gb1.allShipsSunk() || gb2.allShipsSunk()) {
            start = false;
            return true
        }
        else {
            return false
        }
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

})();