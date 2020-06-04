// Local Proxy ADDRESS: http://localhost:3000/businesses/offset/latitude/longitude

import {
  CUISINES,
  PRICE_RANGE,
  PROMPTS,
  YES_NO_ANSWERS,
  PROMPT_CLASS_LIST,
  REPLY_CLASS_LIST,
  COORDS
} from './data.js';

import {
  createBtns,
  createBtnRow,
  removeBtnRows,
  createLoaderSpans,
  showRestaurant
} from './elements.js';

import {
  filterBudget,
  filterDistance,
  filterFame,
  checkPreferences
} from './filterPref.js';

const OFFSET_MAX_VAL = 1000;
const PROXY_ADDRESS = 'http://localhost:3000/businesses';

const CHAT = document.querySelector('.container-chat-msg');
const REPLIES = document.querySelector('.container-chat-replies');

const closeModalBtn = document.querySelector('.closeBtn');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.about-btn');
const searchResult = [];
const userPref = [];

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

  if (navigator.geolocation) {
    let optn = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(collectPosition, showError, optn);
  } else {
    alert('Geolocation not supported in browser.');
  }

  setTimeout(() => {
    CHAT.appendChild(initMsg);
    // Delay first prompt after the initial message is shown.
    setTimeout(() => {
      CHAT.appendChild(initPrompt);
      for (let i = 0; i < CUISINES.length; i++) {
        let btnSet;

        if (i === 4) {
          btnSet = createBtns(5);
        } else {
          btnSet = createBtns(4);
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
            setTimeout(() => {
              searchRestaurant();
            }, 1300);
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

function collectPosition(position) {
  COORDS['latitude'] = position.coords.latitude;
  COORDS['longitude'] = position.coords.longitude;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        'You have denied the request to share your location. Searching may not function properly.'
      );
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('Request for your location has timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error has occurred.');
      break;
  }
}

async function searchRestaurant() {
  const chatArea = document.querySelector('.container-chat');
  // TEST:
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

  // Loop in for loop, while iterator is less than 1050:
  // Fetch with offset at 0
  // Push results into an array
  // Add 50 to iterator
  for (let i = 0; i < OFFSET_MAX_VAL; i += 50) {
    const offset = i;
    const cuisine = userPref[0].cuisine;
    let category = cuisine.toLowerCase();

    if (category === 'middle eastern') {
      category = 'mideastern';
    } else if (category === 'indian') {
      category = 'indpak';
    } else {
      category = category.replace(/\s+/g, '');
    }

    if (category === 'american') {
      for (let j = 0; j < 2; j++) {
        let newCategory;
        switch (i) {
          case 0:
            newCategory = 'newamerican';
            break;

          case 1:
            newCategory = 'tradamerican';
            break;
        }

        const res = await fetch(
          `${PROXY_ADDRESS}/${newCategory}/${offset}/${COORDS.latitude}/${COORDS.longitude}`
        );

        const results = await res.json();

        searchResult.push(results);

        if (results.businesses.length === 0) {
          searchResult.pop();
          break;
        }
      }
    } else {
      const res = await fetch(
        `${PROXY_ADDRESS}/${category}/${offset}/${COORDS.latitude}/${COORDS.longitude}`
      );

      const results = await res.json();

      searchResult.push(results);

      if (results.businesses.length === 0) {
        searchResult.pop();
        break;
      }
    }
  }

  // After searching
  // Await a function to resolve a filtered array
  // Make a main async function for filtering
  // Make sub functions for filtering each user preference (4 step process)
  const filteredRes = await filterResults(searchResult);

  if (filteredRes.length === 0) {
    // Remove loader animation before displaying error message
    loader.remove();

    // Display error message stating that there are no results based on user preferences.
    const errorContainer = document.createElement('div');
    const errorMsg = document.createElement('p');
    errorMsg.innerHTML =
      'There are no results based on your preferences. Try again?';
    errorMsg.classList.add('error-noresult');
    errorContainer.classList.add('error-noresult-container');
    errorContainer.appendChild(errorMsg);
    body.appendChild(errorContainer);

    // After 1 sec, show a left arrow for user to click to go back to home page.
  } else {
    // Then call a async function to pick a random object from filtered array and await it
    const randomRes = await randomizeRestaurant(filteredRes);

    // Remove loader animation before displaying restaurant data
    loader.remove();

    // Then animate the displaying of the restaurant
    // And display restaurant
    console.log(filteredRes);
    showRestaurant(randomRes);
  }
}

async function filterResults(results) {
  // Merge arrays in 'searchResult' array into one array
  const mergedResults = [];

  results.forEach(result => {
    result.businesses.forEach(business => {
      mergedResults.push(business);
    });
  });

  // Filter for budget
  const budgetPref = await filterBudget(mergedResults, userPref);

  // Filter for distanceText and or fame, and return filtered list based on user preferences.
  const distPref = await filterDistance(budgetPref);
  const famePref = await filterFame(distPref);
  const famePrefOnly = await filterFame(budgetPref);
  const finalFilter = await checkPreferences(
    userPref,
    budgetPref,
    distPref,
    famePref,
    famePrefOnly
  );

  return finalFilter;
}

async function randomizeRestaurant(results) {
  // Generate a random integer between 0 and results.length - 1
  const min = Math.ceil(0);
  const max = Math.floor(results.length - 1);

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  // Return object at index of randomly generated integer
  return results[randomNum];
}

// Open modal
function openModal() {
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
}

// Close modal if outside click
function clickOutside(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

chatBot();

modalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);
