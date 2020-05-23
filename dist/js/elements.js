// Create reply-buttons for each prompt
export function createBtns(numBtns) {
  const arr = [];

  for (let i = 0; i < numBtns; i++) {
    const btn = document.createElement('button');
    btn.classList.add('chat-reply');
    arr.push(btn);
  }

  return arr;
}

// Create the row(s) of buttons for each prompt
export function createBtnRow(numRows) {
  const arr = [];

  for (let i = 0; i < numRows; i++) {
    const btnRow = document.createElement('div');
    btnRow.classList.add('chat-replies');
    arr.push(btnRow);
  }

  return arr;
}

// Remove the row(s) of buttons from the chat bot
export function removeBtnRows(elementId) {
  let elements = document.querySelectorAll(elementId);

  elements.forEach(element => {
    element.remove();
  });
}

// Create spans for the loader
export function createLoaderSpans() {
  const arr = [];

  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span');
    arr.push(span);
  }

  return arr;
}
