const Ship = (length) => {

    let hits = [];
    // [["", "", "", ....], ["", "", "", ....], ... ["", "", "", ....] ]
    for(let i = 0; i<10; i++) {
        hits.push([""])
        for(let y = 0; y<10; y++) {
            hits[i].push("")
        }
    }

    function isSunk() {
        let receivedShots = 0;
        for(let i = 0; i<10; i++){
            for(let y = 0; y<10; y++) {
                if(hits[i][y] != "") receivedShots++
            }
        }
        if(receivedShots >= length) {
            return true;
        } else {
            return false;
        }
    }

    function hit(posX, posY) {
        hits[posY][posX] = "hit";
    }

    return { length, isSunk, hit, hits}
};



export { Ship }