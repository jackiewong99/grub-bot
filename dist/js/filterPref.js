// Filter for user's budget preference
export async function filterBudget(results, userPref) {
  const budgetPref = results.filter(
    result => result.price === userPref[1].budget
  );

  return budgetPref;
}

// Filter for nearby restaurants (within 2 miles)
export async function filterDistance(results) {
  const distPref = results.filter(result => result.distance <= 3218.69);

  return distPref;
}

// Filter for high review count and rating
export async function filterFame(results) {
  const reviews = results.filter(result => result.review_count > 150);
  const rating = reviews.filter(business => business.rating >= 3.5);

  return rating;
}

/*
  Final check for user's combination of answers for 
  preferring a nearby restaurant and if
  they prefer high review count and rating
  */
export async function checkPreferences(
  userPref,
  budgetPref,
  distPref,
  famePref,
  famePrefOnly
) {
  const finalFilter = [];
  if (userPref[2].prefNearby === 'Yes' && userPref[3].fame === 'Yes') {
    famePref.forEach(business => {
      finalFilter.push(business);
    });
  } else if (userPref[2].prefNearby === 'Yes' && userPref[3].fame === 'No') {
    distPref.forEach(business => {
      finalFilter.push(business);
    });
  } else if (userPref[2].prefNearby === 'No' && userPref[3].fame === 'Yes') {
    famePrefOnly.forEach(business => {
      finalFilter.push(business);
    });
  } else if (userPref[2].prefNearby === 'No' && userPref[3].fame === 'No') {
    budgetPref.forEach(business => {
      finalFilter.push(business);
    });
  }

  return finalFilter;
}
