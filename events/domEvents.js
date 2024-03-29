import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import {
  getAuthors, favoritingOneAuthor, getSingleAuthor, unfavoritingOneAuthor
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  deleteAuthorAndAuthorBooks, getAuthorDetails, getBookDetails, getBooksNotInTheOrder, getOrderAndBooks
} from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuhtor';
import addOrderForm from '../components/forms/addOrderForm';
import { getOrders, singleOrder, deleteOrder } from '../api/orderData';
import { showOrders } from '../pages/orders';
import viewOrder from '../pages/viewOrder';
import { showBooksNotInOrder } from '../pages/booksNotInOrder';
import { createOrderBook, updateOrderBook } from '../api/orderBookData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm({}, uid);
      /* had an issue with adding books b/c i wasnt passing it the uid param
      but that was because i didnt have an obj to pass it so to get around that you make it an empty obj */
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = (e.target.id.split('--'));
      console.warn(firebaseKey, 'is this working??');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj, uid));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      const [, firebaseKey] = (e.target.id.split('--'));

      getBookDetails(firebaseKey).then((bookAuthorObj) => {
        console.warn(bookAuthorObj);
        viewBook(bookAuthorObj);
      });
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorAndAuthorBooks(firebaseKey).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      }
    }

    // FIXME: FAVORITING AND UNFAVORITING AN ARTHUR

    if (e.target.id.includes('fav-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      const favoritedCard = e.target.classList.contains('favorited');
      const confirmationMessage = favoritedCard
        // eslint-disable-next-line no-alert
        ? window.confirm('Want to unfavorite author?')
        // eslint-disable-next-line no-alert
        : window.confirm('Want to favorite author?');

      // eslint-disable-next-line no-nested-ternary
      const toggleFavorite = favoritedCard && confirmationMessage ? unfavoritingOneAuthor
        : !favoritedCard && confirmationMessage ? favoritingOneAuthor
          : null;
      if (toggleFavorite) {
        toggleFavorite(firebaseKey).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      }
    }
    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      console.warn('click to edit author');
      const [, firebaseKey] = (e.target.id.split('--'));
      console.warn(firebaseKey, 'hello??');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj, uid));
      // getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }

    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = (e.target.id.split('--'));
      getAuthorDetails(firebaseKey);

      getAuthorDetails(firebaseKey).then((authorBooksObj) => {
        console.warn(authorBooksObj);
        viewAuthor(authorBooksObj);
      });
    }

    // FIXME: ADD CLICK EVENT FOR ADDING AN ORDER
    if (e.target.id.includes('add-order-btn')) {
      console.warn('you are creating an order');
      addOrderForm();
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = (e.target.id.split('--'));
      console.warn(firebaseKey, 'is this working??');
      singleOrder(firebaseKey).then((orderObj) => addOrderForm(orderObj, uid));
    }

    if (e.target.id.includes('delete-order-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE order', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteOrder(firebaseKey).then(() => {
          getOrders(uid).then(showOrders);
        });
      }
    }
    // Click Event to view order details;
    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn(getOrderAndBooks(firebaseKey).then(viewOrder));
      getOrderAndBooks(firebaseKey).then(viewOrder);
    }
    if (e.target.id.includes('show-books-not-in-order-btn')) {
      const [, orderFirebaseKey] = e.target.id.split('--');
      getBooksNotInTheOrder(orderFirebaseKey, uid).then((booksArray) => showBooksNotInOrder(booksArray, orderFirebaseKey));
    }
    if (e.target.id.includes('add-book-to-order-btn')) {
      const [, bookFirebaseKey, orderFirebaseKey] = e.target.id.split('--');
      const payload = {
        order_id: orderFirebaseKey,
        book_id: bookFirebaseKey,
        uid
      };
      // CREATE ORDERBOOK
      createOrderBook(payload).then(({ name }) => {
        // PATCH FIREBASEKEY
        const patchPayload = { firebaseKey: name };

        // UPDATE ORDER BOOK
        updateOrderBook(patchPayload).then(() => {
          // CALL GET ALL BOOKS NOT IN THE ORDER SO THE BOOK JUST ADDED WILL NOT SHOW IN VIEW
          // YOU CAN ONLY ADD BOOKS TO ORDER FROM THE showBooksNotInOrder VIEW
          getBooksNotInTheOrder(orderFirebaseKey, uid).then((booksArray) => showBooksNotInOrder(booksArray, orderFirebaseKey));
        });
      });
    }
  });
};

// if (e.target.id.includes('view-book-btn')) {
//   console.warn('VIEW BOOK', e.target.id);
//   const [, firebaseKey] = (e.target.id.split('--'));

//   getBookDetails(firebaseKey).then((bookAuthorObj) => {
//     console.warn(bookAuthorObj);
//     viewBook(bookAuthorObj);
//   });
// }

export default domEvents;
