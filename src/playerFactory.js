const Player = () => {

    let turn = false;

    function swapTurn() {
        if(turn == false) {
            return true;
        } else {
            return false;
        }
    }
    
    return {swapTurn, turn }

}

export { Player }