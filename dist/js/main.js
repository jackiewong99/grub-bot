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
  },
  {
    set: '2',
    cuisineSet: ['French', 'Greek', 'Indian', 'Italian'],
  },
  {
    set: '3',
    cuisineSet: ['Japanese', 'Korean', 'Mediterranean', 'Mexican'],
  },
  {
    set: '4',
    cuisineSet: ['Middle Eastern', 'Moroccan', 'Spanish'],
  },
  {
    set: '5',
    cuisineSet: ['Taiwanese', 'Thai', 'Vegan', 'Vegetarian'],
  },
];

function init() {
  let chat = document.querySelector('.container-chat-msg');
  let initMsg = document.createElement('div');
  let initPrompt = document.createElement('div');
  let welcomeMsg = 'Welcome to Grub Bot!';
  let promptMsg = 'Start by selecting a cuisine of choice below. (Pick one)';

  initMsg.classList.add('chat-msg', 'chat-msg--left');
  initPrompt.classList.add('chat-msg', 'chat-msg--left');
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  chat.appendChild(initMsg);
  chat.appendChild(initPrompt);
}

function cuisineChoices() {}

function removeElement(elementId) {
  let element = document.querySelector(elementId);
  element.parentNode.removeElement(element);
}

window.onload = function () {
  setTimeout(init, 750);
};
