import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

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

// const searchStore = async (searchValue) => {
//   const allBooks = await getBooks();
//   const filterBooks = await allBooks.filter((book) => book.title.toLowerCase().includes(searchValues))
// }

export { getBookDetails, getAuthorDetails, deleteAuthorAndAuthorBooks };
