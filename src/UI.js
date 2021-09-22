const UI = (() => {

    const info = document.querySelector(".info")


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

    function displayShips(element, visible) {
            if(element == "") {
                return ""
            } else {
                return "X"
            }  
        }

    function markBoard(isHit, posX, posY, board, e) {
        if(e == false) {
            let gameboard = document.querySelector(".myGameboard");
            let myFields = gameboard.querySelectorAll(".field")
            let myFieldsArr = Array.from(myFields)
            let myField = myFieldsArr.find(element => element.dataset.posX == posX && element.dataset.posY == posY)
            if(isHit) {
                myField.classList.add("hit");
            } else {
                myField.classList.add("miss");
            }
            
        } else {
            if(isHit) {
                e.target.classList.add("hit");
            } else {
                e.target.classList.add("miss");
            }
        }
    }

    function showMessage(text) {
        info.textContent = text;
    }


    return {displayBoard, markBoard, showMessage}

})();

export { UI }