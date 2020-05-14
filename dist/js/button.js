// Create buttons for choosing a cuisine for the initial prompt
export function createBtns(numBtns) {
  let arr = [];
  for (let i = 0; i < numBtns; i++) {
    let btn = document.createElement('button');
    btn.classList.add('chat-reply');
    arr.push(btn);
  }
  console.log('created buttons');
  return arr;
}

// Create the row of cuisine buttons for the initial prompt
export function createBtnRow(numRows) {
  let arr = [];
  for (let i = 0; i < numRows; i++) {
    let btnRow = document.createElement('div');
    btnRow.classList.add('chat-replies');
    arr.push(btnRow);
  }
  console.log('created button row');
  return arr;
}

// Remove the row(s) of buttons from the chat bot
export function removeBtnRows(elementId) {
  let elements = document.querySelectorAll(elementId);
  elements.forEach(element => {
    element.remove();
  });
  console.log('removed btns');
}
