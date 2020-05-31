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

// Display the randomly chosen restaurant to the user
export function showRestaurant(restaurant) {
  // Create overal 'div' container to hold the restaurant's information
  const resCard = document.createElement('div');
  resCard.classList.add('card');

  // Create 'div' container to hold restaurant's name and image
  const resHeader = document.createElement('div');
  const resName = document.createElement('h3');
  resName.innerHTML = restaurant.name;

  const resImg = document.createElement('img');
  resImg.src = restaurant.image_url;
  resImg.classList.add('card-img');

  resHeader.appendChild(resName);
  resHeader.appendChild(resImg);

  // Create 'div' container to hold categories of restaurant
  const categoryContainer = document.createElement('div');
  const categories = restaurant.categories;
  categories.forEach(category => {
    const categoryName = document.createElement('h5');
    categoryName.innerHTML = category.title;
    categoryContainer.appendChild(categoryName);
  });
  categoryContainer.classList.add('categories');

  // Create 'div' container to hold restaurant's rating
  // Show rating icon based on restaurant's rating
  const priceContainer = document.createElement('div');
  const price = document.createElement('p');
  price.innerHTML = restaurant.price;
  priceContainer.classList.add('price');
  priceContainer.appendChild(price);

  // Create 'div' container to hold restaurant's rating
  const rating = document.createElement('div');
  rating.innerHTML = restaurant.rating;
  rating.classList.add('rating');

  // Create 'div' container to hold restaurant's open status
  const openStatus = document.createElement('div');
  if (restaurant.is_closed === false) {
    openStatus.innerHtml = 'Open';
    openStatus.classList.remove('status-closed');
    openStatus.classList.add('status-open');
  } else {
    openStatus.innerHTML = 'Closed';
    openStatus.classList.remove('status-open');
    openStatus.classList.add('status-closed');
  }

  // Create 'div' container to hold user's distance to the restaurant
  const getDistance = restaurant.distance / 1609.344;
  const distance = Math.round(getDistance * 10) / 10;
  const distanceText = document.createElement('div');
  if (distance < 1 || distance > 1) {
    distanceText.innerHTML = `${distance} miles away.`;
  } else {
    distanceText.innerHTML = `${distance} mile away.`;
  }
  distanceText.classList.add('distance');

  // Create 'div' container to hold restaurant's phone number
  const phoneNumContainer = document.createElement('div');
  const phoneNum = document.createElement('p');
  // ** Phone number may or may not be formatted **
  phoneNum.innerHTML = restaurant.display_phone;
  phoneNumContainer.classList.add('phone');
  phoneNumContainer.appendChild(phoneNum);

  // Create 'div' container to hold restaurant's address
  const addressContainer = document.createElement('div');
  const address = restaurant.location.display_address;
  address.forEach(element => {
    const addressElement = document.createElement('h5');
    addressElement.innerHTML = element;
    addressContainer.appendChild(addressElement);
  });
  addressContainer.classList.add('address');

  // Append all restaurant information elements to the main
  // Restaurant card container
  resCard.appendChild(resHeader);
  resCard.appendChild(categoryContainer);
  resCard.appendChild(priceContainer);
  resCard.appendChild(rating);
  resCard.appendChild(openStatus);
  resCard.appendChild(distanceText);
  resCard.appendChild(phoneNumContainer);

  const body = document.querySelector('.home-view');
  body.appendChild(resCard);
}
