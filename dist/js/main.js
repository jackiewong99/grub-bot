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

const PROXY_ADDRESS = 'http://localhost:3000/businesses';

const CHAT = document.querySelector('.container-chat-msg');
const REPLIES = document.querySelector('.container-chat-replies');
const REPLY_CLASS_LIST = ['chat-msg', 'chat-msg--right'];

const CUISINES = [
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

const PROMPTS = {
  promptOne: 'Which cuisine are you craving? (Pick one)',
  promptTwo: 'How much are you willing to spend?',
  promptThree: 'Are you looking for a restaurant nearby?',
  promptFour: 'Does rating and popularity matter to you?'
};

let userPref = [];

// Main function for the chat bot
function init() {
  const initMsg = document.createElement('div');
  const initPrompt = document.createElement('div');
  const cuisineRow = createBtnRow(5);
  const welcomeMsg = 'Welcome to Grub Bot!';
  const promptMsg = PROMPTS.promptOne;

  initMsg.classList.add('chat-msg', 'chat-msg--left');
  initPrompt.classList.add('chat-msg', 'chat-msg--left');
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  CHAT.appendChild(initMsg);

  // Delay first prompt after the initial message is shown.
  setTimeout(() => {
    CHAT.appendChild(initPrompt);
    for (let i = 0; i < CUISINES.length; i++) {
      let btnSet = createBtns(4);

      if (i === 4) {
        btnSet.pop();
      }

      CUISINES[i].btnSet = btnSet;

      for (let j = 0; j < CUISINES[i].btnSet.length; j++) {
        CUISINES[i].btnSet[j].innerHTML = CUISINES[i].cuisineSet[j];
        CUISINES[i].btnSet[j].addEventListener('click', function () {
          userPref.push(CUISINES[i].btnSet[j].innerHTML);

          removeBtnRows('.chat-replies');
          const reply = document.createElement('div');
          reply.classList.add(REPLY_CLASS_LIST[0], REPLY_CLASS_LIST[1]);
          reply.innerHTML = userPref[0];
          CHAT.appendChild(reply);
        });
        cuisineRow[i].appendChild(CUISINES[i].btnSet[j]);
      }
    }

    cuisineRow.forEach((row) => {
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

function removeBtnRows(elementId) {
  let elements = document.querySelectorAll(elementId);
  elements.forEach((element) => {
    element.remove();
  });
}

// On load and after 750ms, call the initialize function 'init'
window.onload = function () {
  setTimeout(init, 750);
};
