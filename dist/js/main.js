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
import {
  CUISINES,
  PRICE_RANGE,
  PROMPTS,
  YES_NO_ANSWERS,
  PROMPT_CLASS_LIST,
  REPLY_CLASS_LIST
} from './data.js';

import {
  createBtns,
  createBtnRow,
  removeBtnRows,
  createLoaderSpans
} from './elements.js';

const PROXY_ADDRESS = 'http://localhost:3000/businesses';

const CHAT = document.querySelector('.container-chat-msg');
const REPLIES = document.querySelector('.container-chat-replies');

const userPref = [];

let finishChat = false;

// Main function for the chat bot
function chatBot() {
  const initMsg = document.createElement('div');
  const initPrompt = document.createElement('div');
  const cuisineRow = createBtnRow(5);
  const welcomeMsg = 'Welcome to Grub Bot!';
  const promptMsg = PROMPTS['promptOne'];

  initMsg.classList.add(...PROMPT_CLASS_LIST);
  initPrompt.classList.add(...PROMPT_CLASS_LIST);
  initMsg.innerHTML = welcomeMsg;
  initPrompt.innerHTML = promptMsg;

  setTimeout(() => {
    CHAT.appendChild(initMsg);
    // Delay first prompt after the initial message is shown.
    setTimeout(() => {
      CHAT.appendChild(initPrompt);
      for (let i = 0; i < CUISINES.length; i++) {
        const btnSet = createBtns(4);

        if (i === 4) {
          btnSet.pop();
        }

        CUISINES[i].btnSet = btnSet;

        for (let j = 0; j < CUISINES[i].btnSet.length; j++) {
          CUISINES[i].btnSet[j].innerHTML = CUISINES[i].cuisineSet[j];
          CUISINES[i].btnSet[j].addEventListener('click', () => {
            userPref.push({ cuisine: CUISINES[i].btnSet[j].innerHTML });
            removeBtnRows('.chat-replies');
            const reply = document.createElement('div');
            reply.classList.add(...REPLY_CLASS_LIST);
            reply.innerHTML = userPref[0].cuisine;
            CHAT.appendChild(reply);
            showNextPrompt(
              PROMPTS['promptTwo'],
              PRICE_RANGE,
              PRICE_RANGE.length,
              1
            );
          });
          cuisineRow[i].appendChild(CUISINES[i].btnSet[j]);
        }
      }

      cuisineRow.forEach(row => {
        REPLIES.appendChild(row);
      });
    }, 750);
  }, 750);
}

function autoScrollChat(message) {
  CHAT.scrollTop = message.offsetHeight + message.offsetTop;
}

// Show the next prompt from the chat bot.
// Recursively call itself to show the next prompt
function showNextPrompt(prompt, replies, numBtns, numBtnRows) {
  const btnSet = createBtns(numBtns);
  const btnRow = createBtnRow(numBtnRows);
  const nextPrompt = document.createElement('div');

  setTimeout(() => {
    nextPrompt.classList.add(...PROMPT_CLASS_LIST);
    nextPrompt.innerHTML = prompt;
    CHAT.appendChild(nextPrompt);

    if (prompt === PROMPTS['promptThree'] || prompt === PROMPTS['promptFour']) {
      autoScrollChat(nextPrompt);
    }

    for (let i = 0; i < btnSet.length; i++) {
      btnSet[i].innerHTML = replies[i];
      btnSet[i].addEventListener('click', () => {
        const reply = document.createElement('div');

        reply.classList.add(...REPLY_CLASS_LIST);
        reply.innerHTML = btnSet[i].innerHTML;
        removeBtnRows('.chat-replies');
        CHAT.appendChild(reply);

        switch (prompt) {
          case 'How much are you willing to spend?':
            userPref.push({ budget: btnSet[i].innerHTML });
            showNextPrompt(
              PROMPTS['promptThree'],
              YES_NO_ANSWERS,
              YES_NO_ANSWERS.length,
              1
            );
            break;

          case 'Are you looking for a restaurant nearby?':
            userPref.push({ prefNearby: btnSet[i].innerHTML });
            showNextPrompt(
              PROMPTS['promptFour'],
              YES_NO_ANSWERS,
              YES_NO_ANSWERS.length,
              1
            );
            break;

          case 'Does rating and popularity matter to you?':
            userPref.push({ fame: btnSet[i].innerHTML });
            const searchMsg = document.createElement('div');
            searchMsg.classList.add(...PROMPT_CLASS_LIST);
            searchMsg.innerHTML = 'Okay, searching for a restaurant...';
            CHAT.appendChild(searchMsg);
            autoScrollChat(searchMsg);
            searchRestaurant();
            break;

          default:
            break;
        }
      });
      btnRow[0].appendChild(btnSet[i]);
    }

    REPLIES.appendChild(btnRow[0]);
  }, 750);
}

function searchRestaurant() {
  setTimeout(() => {
    const chatArea = document.querySelector('.container-chat');
    // chatArea.style.display = 'none';
    chatArea.classList.add('hide-chat');

    const body = document.querySelector('.home-view');
    const loader = document.createElement('div');
    loader.classList.add('loader');

    const spans = createLoaderSpans();
    for (const span of spans) {
      loader.appendChild(span);
    }

    body.appendChild(loader);
  }, 750);
}

chatBot();
