const UI = (() => {

    function displayBoard(container, gameboard) {
        
        for(let i = 0; i<gameboard.length; i++) {
            for(let y = 0; y<gameboard[i].length; y++) {
                const div = document.createElement("div");
                div.dataset.posX = y;
                div.dataset.posY = i;
                div.classList.add("field");
                container.appendChild(div)
                div.textContent = displayShips(gameboard[i][y])
            }
        }
    }

    function displayShips(element) {
        if(element == "") {
            return ""
        } else {
            return "X"
        }
    }

    return {displayBoard}

})();

export { UI }