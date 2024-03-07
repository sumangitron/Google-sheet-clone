const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");

let totalSheet = 1;
let activeSheetName = "sheet1";

let state = {};

const defultStyle = {
  fontFamily: "roboto",
  fontSize: 14,
  bold: false,
  italic: false,
  underline: false,
  align: "left",
  bgColor: "#ffffff",
  textColor: "#000000",
  // content: "",
};

function applyStylesToElement(element, styles) {
  element.style.fontFamily = styles.fontFamily;
  element.style.fontSize = `${styles.fontSize}px`;
  element.style.textAlign = styles.align;
  element.style.fontWeight = styles.bold
    ? "bold"
    : "normal";
  element.style.fontStyle = styles.italic
    ? "italic"
    : "normal";
  element.style.textDecoration = styles.underline
    ? "underline"
    : "none";
  element.style.color = styles.textColor;
  element.style.backgroundColor = styles.bgColor;
}

form.addEventListener("change", () => {
  const selectedValues = {
    fontFamily: form.fontFamily.value,
    fontSize: Number(form.fontSize.value),
    bold: form.bold.checked,
    italic: form.italic.checked,
    underline: form.underline.checked,
    align: form.align.value,
    bgColor: form.bgColor.value,
    textColor: form.textColor.value,
  };

  //apply the styles to the selected cell
  const selectedCellElement = document.getElementById(selectedCell);
  applyStylesToElement(selectedCellElement, selectedValues);

  state[selectedCell] = selectedValues;
});

let selectedCell = null;

function onCellFocus(event) {
  if (selectedCell) {
    //remove the active-cell class for the previously focused cell
    document.getElementById(selectedCell).classList.remove("active-cell");
  }
  selectedCell = event.target.id;
  selectedCellElement.innerText = selectedCell;
  if (!state[selectedCell]) {
    //when the cell is focused for the first time
    state[selectedCell] = defultStyle;
  }

  //add active-cell class for newly focused element
  document.getElementById(selectedCell).classList.add("active-cell");

  applyCurrentCellStyleToForm();
}

function applyCurrentCellStyleToForm() {
  //apply style of the current selected cell to the form
  form.bold.checked = state[selectedCell].bold;
  form.italic.checked = state[selectedCell].italic;
  form.underline.checked = state[selectedCell].underline;

  form.fontFamily.value = state[selectedCell].fontFamily;
  form.fontSize.value = state[selectedCell].fontSize;
  form.align.value = state[selectedCell].align;
  form.textColor.value = state[selectedCell].textColor;
  form.bgColor.value = state[selectedCell].bgColor;
}

//expression evalution
const fx = document.getElementById("fx");
fx.addEventListener("keyup", (event) => {
  if(!selectedCell) {
    alert("Please select any cell");
    fx.value = "";
  }
  if (event.code === "Enter" && selectedCell) {
    let expression = fx.value;
    let result = eval(expression);
    document.getElementById(selectedCell).innerText = result;
    fx.value = "";
  }
});

//new sheet flow

const footForm = document.querySelector(".foot-form");

footForm.addEventListener("change", (event) => {
  let newSheetName = event.target.value;
  //save the current sheet into local storage
  localStorage.setItem(activeSheetName, JSON.stringify(state));
  //clear all the cells effected/edited in the current sheet
  for(let cellid in state) {
    clearCell(cellid);
  }
  //reset the state object
  let existingData = localStorage.getItem(newSheetName);

  if(existingData) {
    state = JSON.parse(existingData);
    //TODO: apply the styles to all the individual cell present inside the existing data
    for(let cellId in state) {
      const cellElement = document.getElementById(cellId);
      applyStylesToElement(cellElement, state[cellId]);
    }
  }
  else {
    //as there is no existing data
    state = {};
  }

  //update the active sheet name to be the selected one
  activeSheetName = newSheetName; 
})

function creatNewSheet() {
  totalSheet++;

  let newSheetName = `Sheet${totalSheet}`;

  const inputContainer = document.createElement("div");
  inputContainer.innerHTML = `
          <input type="radio" name="sheet" id="${newSheetName}" value = "${newSheetName}">
          <label for="${newSheetName}">${newSheetName}</label>
  `;

  footForm.appendChild(inputContainer);
}

function clearCell(cellId) {
  let cell = document.getElementById(cellId);
  cell.innerText = "";
  cell.removeAttribute("style");
  cell.classList.remove("active-cell");
}
