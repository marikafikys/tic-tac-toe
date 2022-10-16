const board = document.querySelector('.board');
let items = document.getElementsByClassName('square');
let symbol = "X";
let field = [];
let win = false;
const COUNT = 3;
let steps = COUNT**2;

for (let i = 0; i < COUNT; i++) {
    field[i] = [];
}



function startGame() {
    board.innerHTML = ""; //точка остановки для дебаггера
    steps = COUNT**2;
    for (let i = 0; i < COUNT**2; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.setAttribute('data-pos', i); // собственный атрибут
    square.textContent = "";
    fillField(i, "");
    square.addEventListener('click', setStep);
    board.append(square);
    }
}

console.log(items);

function changeChar(char) {
    return char === "X" ? "O" : "X";
}

function fillField(n, char) {
    let row = Math.floor(n / COUNT);
    let col = n % COUNT;
    field[row][col] = char;
}

function setStep(e) {
    const el = e.target;
    const pos = el.getAttribute('data-pos');
    if (!el.textContent) {
        steps--;
        el.textContent = symbol;
        fillField(pos, symbol);
        checkWin(symbol);

        if (steps === 0 && !win) {
            alert("Ничья!");
            startGame();
        }

        symbol = changeChar(symbol);
    }
}

function checkWin(s) {
    for (let i = 0; i < COUNT; i++) {
        if (field[i][0] === s && 
            field[i][1] === s &&
            field[i][2] === s
            ) {
                showWin([i * COUNT + 0, i * COUNT + 1, i * COUNT + 2]);
                win = true;
                setTimeout(function() { //чтобы алерт был после третьего выигрышного символа, а не до
                    alert(`${s} win!`);
                    startGame();
                }, 0);
            }
        if (field[0][i] === s && 
            field[1][i] === s &&
            field[2][i] === s
            ) {
                showWin([0 * COUNT + i, 1 * COUNT + i, 2 * COUNT + i]);
                win = true;
                setTimeout(function() { //чтобы алерт был после третьего выигрышного символа, а не до
                    alert(`${s} win!`);
                    startGame();
                }, 0);
            }
    }
    if (field[0][0] === s && 
        field[1][1] === s &&
        field[2][2] === s
        ) {
            showWin([0,4,8]);
            win = true;
            setTimeout(function() { //чтобы алерт был после третьего выигрышного символа, а не до
                alert(`${s} win!`);
                startGame();
            }, 0);
    }

    if (field[0][2] === s && 
        field[1][1] === s &&
        field[2][0] === s
        ) {
            showWin([2,4,6]);
            win = true;
            setTimeout(function() { //чтобы алерт был после третьего выигрышного символа, а не до
                alert(`${s} win!`);
                startGame();
            }, 0);
    }
}

function showWin(posArr) {
    posArr.forEach(pos => {
        items[pos].classList.add('win');
    })
}

startGame();

