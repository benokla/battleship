const Player = (name) => {

    let turn = false;

    function swapTurn() {
        if(turn == false) {
            return true;
        } else {
            return false;
        }
    }
    
    return { name, swapTurn, turn }

}

export { Player }