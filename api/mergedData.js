import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, getBooks } from './bookData';
import { singleOrder } from './orderData';
import { getOrderBooks } from './orderBookData';

// TODO: Get data for viewBook
// const getBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleBook(bookFirebaseKey).then((bookObj) => {
//     getSingleAuthor(bookObj.author_id).then((authorObject) => {
//       console.warn({ ...bookObj, authorObject });
//     });
//   }).catch(reject);
// });

const getBookDetails = async (bookFirebaseKey) => {
  const bookObject = await getSingleBook(bookFirebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);

  return { ...bookObject, authorObject };
};

const getAuthorDetails = async (authorFirebaseKey) => {
  const authorObject = await getSingleAuthor(authorFirebaseKey);
  const authorsBooks = await getAuthorBooks(authorFirebaseKey);

  return { ...authorObject, books: authorsBooks };
};

const deleteAuthorAndAuthorBooks = async (authorFirebaseKey) => {
  const authorBooks = await getAuthorBooks(authorFirebaseKey);
  const deleteBooksPromises = await authorBooks.map((abObj) => deleteBook(abObj.firebaseKey));

  await Promise.all(deleteBooksPromises).then(() => deleteSingleAuthor(authorFirebaseKey));
};
// THIS IS TO GET THE ORDER DETAILS
const getOrderAndBooks = async (orderFirebaseKey) => {
  //  GET THE SINGLE ORDER
  const order = await singleOrder(orderFirebaseKey);

  // GET THE ORDERBOOKS RELATED TO THE ORDER
  const allOrderBooks = await getOrderBooks(orderFirebaseKey);

  // GET THE SINGLE BOOKS IN ORDER RETURNS AN ARRAY OF PROMISES
  const allBooksInOrder = await allOrderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  // PROMISE.ALL TO GET ALL BOOK OBJECTS
  const books = await Promise.all(allBooksInOrder);

  // RETURN THE ORDER OBJECT AND THE ARRAY OF BOOKS FOUND IN ORDERBOOKS
  return { ...order, books };
};

// GET BOOKS NOT RELATED TO AN ORDER
const getBooksNotInTheOrder = async (orderId, uid) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);

  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const orderBooks = await getOrderBooks(orderId);

  // GET THE BOOKS FOUND IN THE ORDERBOOKS, RETURNS AN ARRAY OF PROMISES
  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.book_id));

  // USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const books = await Promise.all(bookPromises);

  // FILTER AND COMPARE USING .SOME() THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  // IF A BOOK IS FOUND IN ORDERBOOKS THEN IT WILL NOT BE RETURN IN THIS ARRAY
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filterBooks;
};
// const searchStore = async (searchValue) => {
//   const allBooks = await getBooks();
//   const filterBooks = await allBooks.filter((book) => book.title.toLowerCase().includes(searchValues))
// }

export {
  getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks, getOrderAndBooks, getBooksNotInTheOrder
};
