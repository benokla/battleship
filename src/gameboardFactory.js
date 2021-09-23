import { Ship } from "./shipFactory";

const Gameboard = () => {

    let gameboard = [];
    // [["", "", "", ....], ["", "", "", ....], ... ["", "", "", ....]]
    for(let i = 0; i<10; i++) {
        gameboard.push([""])
        for(let y = 0; y<9; y++) {
            gameboard[i].push("")
        }
    }

    let ships = [];
   
    function placeShips(posX, posY, length, dir) {
        posX = Number(posX)
        posY = Number(posY)
        let ship = Ship(length)
        ships.push(ship)
        
        //horizontal
        if(dir == "h") {
            if(posX+length > 9) return;
            
            for(let i = 0; i<length; i++) { 
                if(gameboard[posY][posX] != "") {
                    while(i>0){
                        posX--;
                        gameboard[posY][posX] = "";
                        i--
                    }
                    return;
                }
                gameboard[posY][posX] = ship;
                posX++;
            }  
        } 
        //vertical 
        else if(dir == "v") {
            if(posY+length > 9) return;

            for(let i = 0; i<length; i++) {
                if(gameboard[posY][posX] != "") {
                    while(i>0){
                        posY--;
                        gameboard[posY][posX] = "";
                        i--
                    }
                    return;
                }
                gameboard[posY][posX] = ship;
                posY++;
            }
        }
        return true;
    }

    function receiveAttack(posX, posY) {
        if(gameboard[posY][posX] != "") {
            gameboard[posY][posX].hit(posX, posY)
            return [true, posX, posY]
        } else {
            return [false, posX, posY]    
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