import { Ship } from "./shipFactory";

const Gameboard = () => {

    let gameboard = [];
    // [[0,1,2,3...9], [0,1,2,3...9], ... [...] ]
    for(let i = 0; i<10; i++) {
        gameboard.push([""])
        for(let y = 0; y<9; y++) {
            gameboard[i].push("")
        }
    }

    let ships = [];
   
    function placeShips(posX, posY, length, dir) {
        let ship = Ship(length)
        ships.push(ship)

        //horizontal
        if(dir == "h") {
            if(posX+length > 9) return;
            gameboard[posY][posX] = ship;
            for(let i = 1; i<length; i++) {
                posX++;
                gameboard[posY][posX] = ship;
            }
        } else if(dir == "v") {
            if(posY+length > 9) return;
            gameboard[posY][posX] = ship;
            for(let i = 1; i<length; i++) {
                posY++;
                gameboard[posY][posX] = ship
            }
        }
    }

    function receiveAttack(posX, posY) {
        if(gameboard[posY][posX] != "") {
            gameboard[posY][posX].hit(posX, posY)
            console.log("Its a hit")
        } else {
            let missedShot = "a"
            console.log("Its a miss")
            return missedShot;
        }
    }

    function allShipsSunk() {
        let shipsSunk = ships.map((ship) => ship.isSunk() )
        
        if(shipsSunk.includes(false)) {
            return false;
        } else {
            return true;
        }
    }

    return { placeShips, gameboard, receiveAttack, allShipsSunk }
}

export { Gameboard}