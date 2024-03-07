let header = document.querySelector(".header");
let snoContainer = document.querySelector(".sno-container");
let rowsContainer = document.querySelector(".rows-container");

let columns = 27;
let rows = 50;

//creating header cells from A to Z
for(let i=0; i<columns; i++) {
    let cell = document.createElement("div");
    i === 0 ? (cell.className = "first-cell") : (cell.className = "cell");
    if(i != 0) {
        cell.innerText = String.fromCharCode(64 + i);
    }
    header.appendChild(cell);
}

//function for creat rows for rows container
function creatRow(rowNumber) {
    let row = document.createElement("div");
    row.className = "row";

    for(let i=1; i<columns; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.contentEditable = true;
        cell.id = `${String.fromCharCode(64 + i)}${rowNumber}`;
        cell.addEventListener("focus", onCellFocus);
        row.appendChild(cell);
    }

    return row;
}

//loop for create serial no rows from 1 to 50 and rows inside rows container
for(let i=1; i<=rows; i++) {
    let snoCell = document.createElement("div")
    snoCell.innerText = i;
    snoCell.className = "sno";
    snoContainer.appendChild(snoCell);

    let rowElement = creatRow(i);

    rowsContainer.appendChild(rowElement);

}