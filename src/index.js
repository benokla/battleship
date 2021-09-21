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
                gb2.receiveAttack(e.target.dataset.posX, e.target.dataset.posY)
                pl1.swapTurn();
                pcTurn();
            }  
        })
    })
     

    function pcTurn() {
        gb1.receiveAttack(getRandomInt(9), getRandomInt(9))
        pl1.swapTurn()
    }
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

})();