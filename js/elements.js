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
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('container-card');
  const resCard = document.createElement('div');
  resCard.classList.add('card');

  // Get restaurant's information
  const resNameContainer = getResName(restaurant);
  const imgContainer = getResImg(restaurant);
  const categoryContainer = getResCategory(restaurant);
  const priceContainer = getResPrice(restaurant);
  const ratingContainer = getResRating(restaurant);
  const distContainer = getResDistance(restaurant);
  const addressContainer = getResAddress(restaurant);
  const phoneNumContainer = getResPhoneNum(restaurant);
  const yelpRefContainer = getYelpRef(restaurant);

  // Credit Yelp Fusion API
  const creditYelp = document.createElement('p');
  creditYelp.innerHTML =
    'All icons, images, and information are provided by the Yelp Fusion API.';
  creditYelp.classList.add('card-credit');

  // Create 'div' container to hold all restaurant information
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('card-info');
  infoContainer.appendChild(categoryContainer);
  infoContainer.appendChild(priceContainer);
  infoContainer.appendChild(ratingContainer);
  infoContainer.appendChild(distContainer);
  infoContainer.appendChild(addressContainer);
  infoContainer.appendChild(phoneNumContainer);
  infoContainer.appendChild(yelpRefContainer);

  // Append all restaurant elements to the main
  // Restaurant card container and display to user
  resCard.appendChild(resNameContainer);
  resCard.appendChild(imgContainer);
  resCard.appendChild(infoContainer);
  cardContainer.appendChild(resCard);
  cardContainer.appendChild(creditYelp);

  const body = document.querySelector('.home-view');
  body.appendChild(cardContainer);
}

// Create 'div' container to hold restaurant's name
function getResName(restaurant) {
  const resNameContainer = document.createElement('div');
  const resName = document.createElement('a');
  resName.innerHTML = restaurant.name;
  resName.href = restaurant.url;
  resName.target = '_blank';
  resName.classList.add('card-name');
  resNameContainer.classList.add('card-name-container');
  resNameContainer.appendChild(resName);
  return resNameContainer;
}

// Create 'div' container to hold restaurant's image
function getResImg(restaurant) {
  const imgContainer = document.createElement('div');
  const resImg = document.createElement('img');
  resImg.src = restaurant.image_url;
  resImg.classList.add('card-img');
  imgContainer.classList.add('card-img-container');
  imgContainer.appendChild(resImg);
  return imgContainer;
}

// Create 'div' container to hold categories of restaurant
function getResCategory(restaurant) {
  const categoryContainer = document.createElement('div');
  const categories = restaurant.categories;
  const categoryHeader = document.createElement('span');
  categoryHeader.innerHTML = 'Categories:';
  categoryHeader.classList.add('card-categories-header');
  categoryContainer.appendChild(categoryHeader);

  if (categories.length === 1) {
    const categoryItem = document.createElement('span');
    const categoryName = document.createElement('p');
    categoryName.innerHTML = categories[0].title;
    categoryName.classList.add('card-categories');
    categoryItem.appendChild(categoryName);
    categoryContainer.appendChild(categoryItem);
  } else {
    for (let i = 0; i < categories.length; i++) {
      const categoryItem = document.createElement('span');
      const categoryName = document.createElement('p');
      if (i === categories.length - 1) {
        categoryName.innerHTML = categories[i].title;
      } else {
        categoryName.innerHTML = categories[i].title + ',';
      }
      categoryName.classList.add('card-categories');
      categoryItem.appendChild(categoryName);
      categoryContainer.appendChild(categoryItem);
    }
  }
  categoryContainer.classList.add('card-categories-container');

  return categoryContainer;
}

// Create 'div' container to hold restaurant's rating
// Show rating icon based on restaurant's rating
function getResPrice(restaurant) {
  const priceContainer = document.createElement('div');
  const priceHeader = document.createElement('p');
  const price = document.createElement('p');
  priceHeader.innerHTML = 'Price:';
  priceHeader.classList.add('card-price-header');
  price.innerHTML = restaurant.price;
  price.classList.add('card-price');
  priceContainer.classList.add('card-price-container');
  priceContainer.appendChild(priceHeader);
  priceContainer.appendChild(price);

  return priceContainer;
}

// Create 'div' container to hold restaurant's rating
function getResRating(restaurant) {
  const ratingContainer = document.createElement('div');
  const rating = document.createElement('img');
  switch (restaurant.rating) {
    case 0:
      rating.src = './icons/small/small_0.png';
      break;

    case 1:
      rating.src = './icons/small/small_1.png';
      break;

    case 1.5:
      rating.src = './icons/small/small_1_half.png';
      break;

    case 2:
      rating.src = './icons/small/small_2.png';
      break;

    case 2.5:
      rating.src = './icons/small/small_2_half.png';
      break;

    case 3:
      rating.src = './icons/small/small_3.png';
      break;

    case 3.5:
      rating.src = './icons/small/small_3_half.png';
      break;

    case 4:
      rating.src = './icons/small/small_4.png';
      break;

    case 4.5:
      rating.src = './icons/small/small_4_half.png';
      break;

    case 5:
      rating.src = './icons/small/small_5.png';
      break;
  }
  ratingContainer.classList.add('card-rating-container');
  ratingContainer.appendChild(rating);

  return ratingContainer;
}

// Create 'div' container to hold user's distance to the restaurant
function getResDistance(restaurant) {
  const distContainer = document.createElement('div');
  const distHeader = document.createElement('p');
  const getDistance = restaurant.distance / 1609.344;
  const distance = Math.round(getDistance * 10) / 10;
  const distanceText = document.createElement('p');

  distHeader.innerHTML = 'Distance:';
  distHeader.classList.add('card-distance-header');
  if (distance < 1 || distance > 1) {
    distanceText.innerHTML = `${distance} miles away`;
  } else {
    distanceText.innerHTML = `${distance} mile away`;
  }
  distanceText.classList.add('card-distance');
  distContainer.classList.add('card-distance-container');
  distContainer.appendChild(distHeader);
  distContainer.appendChild(distanceText);

  return distContainer;
}

// Create 'div' container to hold restaurant's address
function getResAddress(restaurant) {
  const addressContainer = document.createElement('div');
  const addressHeader = document.createElement('p');
  const address = restaurant.location.display_address;
  addressHeader.innerHTML = 'Address:';
  addressHeader.classList.add('card-address-header');
  addressContainer.appendChild(addressHeader);
  address.forEach(element => {
    const addressElement = document.createElement('p');
    addressElement.innerHTML = element;
    addressElement.classList.add('card-address');
    addressContainer.appendChild(addressElement);
  });
  addressContainer.classList.add('card-address-container');

  return addressContainer;
}

// Create 'div' container to hold restaurant's phone number
function getResPhoneNum(restaurant) {
  const phoneNumContainer = document.createElement('div');
  const phoneNumHeader = document.createElement('p');
  const phoneNum = document.createElement('p');
  // ** Phone number may or may not be formatted **
  phoneNumHeader.innerHTML = 'Phone: ';
  phoneNumHeader.classList.add('card-phone-header');
  phoneNum.innerHTML = restaurant.display_phone;
  phoneNum.classList.add('card-phone');
  phoneNumContainer.classList.add('card-phone-container');
  phoneNumContainer.appendChild(phoneNumHeader);
  phoneNumContainer.appendChild(phoneNum);

  return phoneNumContainer;
}

// Create 'div' container to display referral to restaurant's Yelp page
function getYelpRef(restaurant) {
  const yelpRefContainer = document.createElement('div');
  const yelpRef = document.createElement('a');
  const arrowRight = document.createElement('i');

  yelpRef.innerHTML = 'For more information, visit their page on Yelp!';
  yelpRef.href = restaurant.url;
  yelpRef.target = '_blank';
  yelpRef.classList.add('card-ref');
  yelpRef.appendChild(arrowRight);

  arrowRight.classList.add('fa', 'fa-arrow-right', 'card-ref-arrow');
  arrowRight.setAttribute('aria-hidden', true);
  yelpRef.addEventListener('mouseenter', () => {
    arrowRight.classList.add('animate-arrow');
  });
  yelpRef.addEventListener('mouseleave', () => {
    arrowRight.classList.remove('animate-arrow');
  });

  yelpRefContainer.classList.add('card-ref-container');
  yelpRefContainer.appendChild(yelpRef);

  return yelpRefContainer;
}
