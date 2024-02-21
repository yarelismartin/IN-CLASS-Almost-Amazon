import client from '../utils/client';

const endpoint = client.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FIXME: CREATE AUTHOR
const createAuthor = () => {};

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = () => {};

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// FIXME: UPDATE AUTHOR
const updateAuthor = () => {};

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = () => {};

// TODO: FILTER FAV AUTHORS
const favoriteAuthors = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json?orderBy="favorite"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// ADD A FAV AUTHOR TO FAV NAV SECTION w/ THE FAV BUTTON
// passing the firebaseKey parameter b/c it is how can can identify the specific author being targeted
const favoritingOneAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  // setting favorite to true when we fun this b/c we want to update the value of this key
  const favoriteData = { favorite: true };

  // fetching our database through the correct url
  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    // use the PATCH method when we want to change/update our data
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    /*  body of your PATCH request should contain the data provided in the dataToUpdate object,
     and it should be formatted as a JSON string. */
    body: JSON.stringify(favoriteData),
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => resolve(data)) // Resolve the promise with the data
    .catch(reject); // Reject the promise if there's an error
});

// TODO: FILTER uNFAV AUTHORS
const unfavoritingOneAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  const favoriteData = { favorite: false };

  fetch(`${endpoint}/authors/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteData),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  favoriteAuthors,
  favoritingOneAuthor,
  unfavoritingOneAuthor,
};
