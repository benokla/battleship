import { Ship } from "./shipFactory";
import { Gameboard } from "./gameboardFactory";
import { UI } from "./UI";
import { Player } from "./playerFactory";

const game = (() => {
    const myGameboard = document.querySelector(".myGameboard")
    const pcGameboard = document.querySelector(".pcGameboard")
    
    
    const gb1 = Gameboard();
    const gb2 = Gameboard();
    const pl1 = Player("Jakob")
    const pl2 = Player("PC")

    gb1.placeShips(3, 3, 3, "h")
    gb1.placeShips(7, 5, 3, "v")

    gb2.placeShips(3, 3, 3, "h")
    gb2.placeShips(7, 5, 3, "v")


    UI.displayBoard(myGameboard, gb1.gameboard)
    UI.displayBoard(pcGameboard, gb2.gameboard)

    pl1.turn = pl1.swapTurn();
    
    const enemyFields = pcGameboard.querySelectorAll(".field");
    enemyFields.forEach(element => {
        element.addEventListener("click", (e) => {
            
            if(pl1.turn) {
                let res = gb2.receiveAttack(e.target.dataset.posX, e.target.dataset.posY)
                if(res[0]) {
                    UI.showMessage(`You shot on the coordinates ${res[1]} ${res[2]} and ... hit!`)
                } else {
                    UI.showMessage(`You shot on the coordinates ${res[1]} ${res[2]} and ... missed.`)
                }
                UI.markBoard(res[0], res[1], res[2], gb2, e)
                if(isGameOver()) {
                    if(gb2.allShipsSunk()) {
                        UI.showMessage("You won")
                    } else {
                        UI.showMessage("The PC won")
                    }
                    return
                }
                pl1.swapTurn();
                console.log(pl1.turn)
                setTimeout(pcTurn, 3000)
            }  
        })
    })
     
    function pcTurn() {
        if(isGameOver()) return
        let res = gb1.receiveAttack(getRandomInt(9), getRandomInt(9))
        if(res[0]) {
            UI.showMessage(`PC shot on the coordinates ${res[1]} ${res[2]} and ... hit!`)
        } else {
            UI.showMessage(`PC shot on the coordinates ${res[1]} ${res[2]} and ... missed.`)
        }
        UI.markBoard(res[0], res[1], res[2], gb1, false)
        pl1.swapTurn()
    }

    function isGameOver() {
        if(gb1.allShipsSunk() || gb2.allShipsSunk()) {
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