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

const prompts = {
  promptOne: 'Which cuisine are you craving? (Pick one)',
  promptTwo: 'How much are you willing to spend?',
  promptThree: 'Are you looking for a restaurant nearby?',
  promptFour: 'Does rating and popularity matter to you?'
};

let userPref = [];

// Main function for the chat bot
function main() {
  let chat = document.querySelector('.container-chat-msg');
  let replies = document.querySelector('.container-chat-replies');
  let initMsg = document.createElement('div');
  let initPrompt = document.createElement('div');
  let cuisineRow = createBtnRow(5);
  let welcomeMsg = 'Welcome to Grub Bot!';
  let promptMsg = prompts.promptOne;

  initMsg.classList.add('chat-msg', 'chat-msg--left');
  initPrompt.classList.add('chat-msg', 'chat-msg--left');
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  chat.appendChild(initMsg);

  // Delay first prompt after the initial message is shown.
  setTimeout(() => {
    chat.appendChild(initPrompt);
    for (let i = 0; i < cuisines.length; i++) {
      let btnSet = createCuisineBtn();

      if (i === 4) {
        btnSet.pop();
      }

      cuisines[i].btnSet = btnSet;

      for (let j = 0; j < cuisines[i].btnSet.length; j++) {
        cuisines[i].btnSet[j].innerHTML = cuisines[i].cuisineSet[j];
        cuisines[i].btnSet[j].addEventListener('click', function () {
          userPref.push(cuisines[i].btnSet[j].innerHTML);

          removeBtnRows('.chat-replies');
          let reply = document.createElement('div');
          reply.classList.add('chat-msg', 'chat-msg--right');
          reply.innerHTML = userPref[0];
          chat.appendChild(reply);
        });
        cuisineRow[i].appendChild(cuisines[i].btnSet[j]);
      }
    }

    cuisineRow.forEach((row) => {
      replies.appendChild(row);
    });
  }, 750);
}

// Create buttons for choosing a cuisine for the initial prompt
function createCuisineBtn() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
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
  setTimeout(main, 750);
};
