const table = document.querySelector(".table");
const colors = ["yellow", "blue", "green", "red"];

const xButtons = [...document.querySelectorAll("div.x")];
const yButtons = [...document.querySelectorAll("div.y")];

const endWindow = document.querySelector("div.win");



const createMatrix = () => {
    const matrix = [];

    for (var i = 0; i < 6; i++) {
        matrix[i] = new Array();
    }

    return matrix
}

const selectColor = () => {
    return colors[Math.floor(Math.random() * 4)]
}

const getColorCount = (color) => {
    return document.querySelectorAll("." + color).length
}

const isColorAvailable = (selectedColor) => {
    if (getColorCount(selectedColor) >= 9) {
        return false
    } else {
        return true
    }
}

const setAvailableColor = (pillow) => {
    let selectedColor = selectColor();

    while (isColorAvailable(selectedColor) != true) {
        selectedColor = selectColor();

    }

    pillow.classList.add(selectedColor);
}

const xButtonsListener = () => {

    for (i = 0; i < xButtons.length; i++) {
        xButtons[i].addEventListener("click", moveX);
    }
}

const yButtonsListener = () => {

    for (i = 0; i < yButtons.length; i++) {
        yButtons[i].addEventListener("click", moveY)
    }

}

const fillTable = () => {

    matrix = createMatrix();

    for (let i = 0; i <= 35; i++) {
        let pillow = document.createElement("div");
        pillow.setAttribute('class', 'pillow');
        setAvailableColor(pillow);
        table.appendChild(pillow);
        matrix[Math.floor(i / 6)].push(pillow);
        btnStart.style.display = "none";
    }

}

const moveX = function () {

    x = xButtons.indexOf(this);
    firtsPillowColor = [...matrix[x][0].classList]

    for (y = 0; y < xButtons.length; y++) {

        if (y < 5) {

            classesToAdd = [...matrix[x][y + 1].classList];
            classesToRemove = [...matrix[x][y].classList];


            matrix[x][y].classList.remove(classesToRemove[1]);
            matrix[x][y].classList.add(classesToAdd[1]);

        } else {

            classesToAdd = [...matrix[x][0].classList];
            classesToRemove = [...matrix[x][y].classList];


            matrix[x][y].classList.remove(classesToRemove[1]);
            matrix[x][y].classList.add(firtsPillowColor[1]);

        }

        checkIfWinner()
    }
}

const moveY = function () {

    y = yButtons.indexOf(this);
    firtsPillowColor = [...matrix[0][y].classList]

    for (x = 0; x < yButtons.length; x++) {

        if (x < 5) {

            classesToAdd = [...matrix[x + 1][y].classList];
            classesToRemove = [...matrix[x][y].classList];


            matrix[x][y].classList.remove(classesToRemove[1]);
            matrix[x][y].classList.add(classesToAdd[1]);

        } else {

            classesToRemove = [...matrix[x][y].classList];


            matrix[x][y].classList.remove(classesToRemove[1]);
            matrix[x][y].classList.add(firtsPillowColor[1]);

        }
    }

    checkIfWinner()
}

const setButtonsVisable = () => {
    x = document.querySelector("div.xButtons")
    y = document.querySelector("div.yButtons")

    xy = [x, y]

    xy.forEach(element => {
        element.style.display = "flex"

    });
}

const showHideInterface = () => {

    const example = document.querySelector("div.examples");
    example.style.display = "flex";

    const h1 = document.querySelector("h1")
    h1.style.display = "block"

    const h1Descirption = document.querySelector("h1.description");
    h1Descirption.style.display = "none"

}

const checkIfWinner = () => {

    let leftTopSquare = [matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][0], matrix[1][1], matrix[1][2], matrix[2][0], matrix[2][1], matrix[2][2]]

    let rigthTopSquare = [matrix[0][3], matrix[0][4], matrix[0][5], matrix[1][3], matrix[1][4], matrix[1][5], matrix[2][3], matrix[2][4], matrix[2][5], ]

    let leftBottomSquare = [matrix[3][0], matrix[3][1], matrix[3][2], matrix[4][0], matrix[4][1], matrix[4][2], matrix[5][0], matrix[5][1], matrix[5][2]]

    let rightBottomSquare = [matrix[3][3], matrix[3][4], matrix[3][5], matrix[4][3], matrix[4][4], matrix[4][5], matrix[5][3], matrix[5][4], matrix[5][5], ]

    isWinner = 1


    leftTopSquare.forEach(element => {
        if (element.classList.contains("blue") != true) {
            isWinner = 0
        };
    })

    rigthTopSquare.forEach(element => {
        if (element.classList.contains("red") != true) {
            isWinner = 0
        };
    })

    leftBottomSquare.forEach(element => {
        if (element.classList.contains("green") != true) {
            isWinner = 0
        };
    })

    rightBottomSquare.forEach(element => {
        if (element.classList.contains("yellow") != true) {
            isWinner = 0
        };
    })

    if (isWinner === 1) {
        gameEnd()
    }
}

const gameEnd = () => {
    endWindow.style.display = "flex";

}

const clearTable = () => {
    matrix = ""

    for (let i = 0; i <= 35; i++) {
        let pillow = document.querySelector("div.pillow")
        table.removeChild(pillow);
    }

    endWindow.style.display = "none"
}

const gameStart = () => {
    fillTable();
    setButtonsVisable();
    showHideInterface();
    xButtonsListener();
    yButtonsListener();
}

const oneMoreGame = () => {
    clearTable();
    gameStart();
}




const btnStart = document.querySelector(".start");
btnStart.addEventListener("click", gameStart);


const btnOneMoreGame = document.querySelector("button.oneMore");
btnOneMoreGame.addEventListener("click", oneMoreGame);