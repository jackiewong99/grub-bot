// ************************************************************************************************************************

// Test fetching data from Yelp API

// All functionality goes in this file temporarily until first version project is finished

// Local Proxy ADDRESS: http://localhost:3000/businesses/offset/latitude/longitude

// *** EXAMPLE: ***

// let resultOffset = 101;
// let latitude = '21.2869027';
// let longitude = '-157.7973769';
// fetch(`${PROXY_ADDRESS}/${resultOffset}/${latitude}/${longitude}`)
//   .then((response) => response.json())
//   .then((json) => {
//     let businesses = json.businesses;
//     console.log(businesses);
//   });

// ****************

// ************************************************************************************************************************

const CHAT = document.querySelector('.container-chat-msg');
const cuisines = [
  {
    set: '1',
    cuisineSet: ['American', 'Asian fusion', 'Cantonese', 'Chinese'],
    btnSet: []
  },
  {
    set: '2',
    cuisineSet: ['French', 'Greek', 'Indian', 'Italian'],
    btnSet: []
  },
  {
    set: '3',
    cuisineSet: ['Japanese', 'Korean', 'Mediterranean', 'Mexican'],
    btnSet: []
  },
  {
    set: '4',
    cuisineSet: ['Middle Eastern', 'Moroccan', 'Spanish', 'Taiwanese'],
    btnSet: []
  },
  {
    set: '5',
    cuisineSet: ['Thai', 'Vegan', 'Vegetarian'],
    btnSet: []
  }
];

const PRICE_RANGE = ['$', '$$', '$$$', '$$$$'];
const PROMPTS = {
  promptOne: 'Which cuisine are you craving? (Pick one)',
  promptTwo: 'How much are you willing to spend?',
  promptThree: 'Are you looking for a restaurant nearby?',
  promptFour: 'Does rating and popularity matter to you?'
};
const PROMPT_CLASS_LIST = ['chat-msg', 'chat-msg--left'];
const PROXY_ADDRESS = 'http://localhost:3000/businesses';

const REPLIES = document.querySelector('.container-chat-replies');
const REPLY_CLASS_LIST = ['chat-msg', 'chat-msg--right'];

const YES_NO_ANSWERS = ['Yes', 'No'];

let promptNum = 1;

let userPref = [];

// Main function for the chat bot
function init() {
  const initMsg = document.createElement('div');
  const initPrompt = document.createElement('div');
  const cuisineRow = createBtnRow(5);
  const welcomeMsg = 'Welcome to Grub Bot!';
  const promptMsg = PROMPTS.promptOne;

  initMsg.classList.add(...PROMPT_CLASS_LIST);
  initPrompt.classList.add(...PROMPT_CLASS_LIST);
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  CHAT.appendChild(initMsg);

  // Delay first prompt after the initial message is shown.
  setTimeout(() => {
    CHAT.appendChild(initPrompt);
    for (let i = 0; i < cuisines.length; i++) {
      const btnSet = createBtns(4);

      if (i === 4) {
        btnSet.pop();
      }

      cuisines[i].btnSet = btnSet;

      for (let j = 0; j < cuisines[i].btnSet.length; j++) {
        cuisines[i].btnSet[j].innerHTML = cuisines[i].cuisineSet[j];
        cuisines[i].btnSet[j].addEventListener('click', () => {
          userPref.push({ cuisine: cuisines[i].btnSet[j].innerHTML });
          removeBtnRows('.chat-replies');
          const reply = document.createElement('div');
          reply.classList.add(...REPLY_CLASS_LIST);
          reply.innerHTML = userPref[0].cuisine;
          CHAT.appendChild(reply);
          // TEST:
          // showNextPrompt(PROMPTS.promptTwo, PRICE_RANGE, PRICE_RANGE.length, 1);
        });
        cuisineRow[i].appendChild(cuisines[i].btnSet[j]);
      }
    }

    cuisineRow.forEach(row => {
      REPLIES.appendChild(row);
    });
  }, 750);
}

// Create buttons for choosing a cuisine for the initial prompt
function createBtns(numBtns) {
  let arr = [];
  for (let i = 0; i < numBtns; i++) {
    let btn = document.createElement('button');
    btn.classList.add('chat-reply');
    arr.push(btn);
  }
  return arr;
}

// Create the row of cuisine buttons for the initial prompt
function createBtnRow(numRows) {
  let arr = [];
  for (let i = 0; i < numRows; i++) {
    let btnRow = document.createElement('div');
    btnRow.classList.add('chat-replies');
    arr.push(btnRow);
  }
  return arr;
}

// Remove the row(s) of buttons from the chat bot
function removeBtnRows(elementId) {
  let elements = document.querySelectorAll(elementId);
  elements.forEach(element => {
    element.remove();
  });
}

// Show the next prompt from the chat bot
function showNextPrompt(prompt, replies, numBtns, numBtnRows) {
  const btnSet = createBtns(numBtns);
  const btnRow = createBtnRow(numBtnRows);
  const nextPrompt = document.createElement('div');

  setTimeout(() => {
    nextPrompt.classList.add(...PROMPT_CLASS_LIST);
    nextPrompt.innerHTML = prompt;
    CHAT.appendChild(nextPrompt);

    for (let i = 0; i < btnSet.length; i++) {
      btnSet[i].innerHTML = replies[i];
      btnSet[i].addEventListener('click', () => {
        promptNum++;

        // IF: promptNum is equal to 4 (we are on the fourth prompt)
        // THEN: Show chat bot message: 'Searching for a restaurant...'
      });
      btnRow[0].appendChild(btnSet[i]);
    }

    REPLIES.appendChild(btnRow[0]);
  }, 750);
}

// On load and after 750ms, call the initialize function 'init'
window.onload = function () {
  setTimeout(init, 750);
};
