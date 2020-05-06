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
    btnSet: [],
  },
  {
    set: '2',
    cuisineSet: ['French', 'Greek', 'Indian', 'Italian'],
    btnSet: [],
  },
  {
    set: '3',
    cuisineSet: ['Japanese', 'Korean', 'Mediterranean', 'Mexican'],
    btnSet: [],
  },
  {
    set: '4',
    cuisineSet: ['Middle Eastern', 'Moroccan', 'Spanish', 'Taiwanese'],
    btnSet: [],
  },
  {
    set: '5',
    cuisineSet: ['Thai', 'Vegan', 'Vegetarian'],
    btnSet: [],
  },
];

function init() {
  let chat = document.querySelector('.container-chat-msg');
  let replies = document.querySelector('.container-chat-replies');
  let initMsg = document.createElement('div');
  let initPrompt = document.createElement('div');
  let cuisineRow = createCuisineRow();
  let welcomeMsg = 'Welcome to Grub Bot!';
  let promptMsg = 'Start by selecting a cuisine of choice below. (Pick one)';

  initMsg.classList.add('chat-msg', 'chat-msg--left');
  initPrompt.classList.add('chat-msg', 'chat-msg--left');
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  chat.appendChild(initMsg);
  chat.appendChild(initPrompt);

  for (let i = 0; i < cuisines.length; i++) {
    let btnSet = createCuisineBtn();

    if (i === 4) {
      btnSet.pop();
    }

    cuisines[i].btnSet = btnSet;

    for (let j = 0; j < cuisines[i].btnSet.length; j++) {
      cuisines[i].btnSet[j].innerHTML = cuisines[i].cuisineSet[j];
      cuisineRow[i].appendChild(cuisines[i].btnSet[j]);
    }
  }

  cuisineRow.forEach((row) => {
    replies.appendChild(row);
  });
}

function createCuisineBtn() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    let btn = document.createElement('button');
    btn.classList.add('chat-reply');
    arr.push(btn);
  }
  return arr;
}

function createCuisineRow() {
  let arr = [];
  for (let i = 0; i < 5; i++) {
    let btnRow = document.createElement('div');
    btnRow.classList.add('chat-replies');
    arr.push(btnRow);
  }
  return arr;
}

function removeElement(elementId) {
  let element = document.querySelector(elementId);
  element.parentNode.removeElement(element);
}

window.onload = function () {
  setTimeout(init, 500);
};
