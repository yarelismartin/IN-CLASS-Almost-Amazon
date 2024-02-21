import { deleteBook, getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import {
  deleteSingleAuthor, getAuthors, favoritingOneAuthor,
} from '../api/authorData';
import { showAuthors } from '../pages/authors';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('ADD BOOK');
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteSingleAuthor(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR FAVORITING AN AUTHOR
    if (e.target.id.includes('fav-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to favorite author?')) {
        console.warn('FAVORITE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        favoritingOneAuthor(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // // UNFAV an Author
    // if (e.target.id && e.target.id.includes('fav-author-btn')) {
    //   // eslint-disable-next-line no-alert
    //   if (window.confirm('Want to unfavorite author?')) {
    //     console.warn('UNFAVORITE AUTHOR', e.target.id);
    //     const [, firebaseKey] = e.target.id.split('--');

    //     unfavoritingOneAuthor(firebaseKey).then(() => {
    //       getAuthors().then(showAuthors);
    //     });
    //   }
    // }

    // if (e.target.id.includes('fav-author-btn')) {
    //   const [, firebaseKey] = e.target.id.split('--');
    //   const favoritedCard = e.target.classList.contains('favorited');
    //   const confirmationMessage = favoritedCard
    //     // eslint-disable-next-line no-alert
    //     ? window.confirm('Want to unfavorite author?')
    //     // eslint-disable-next-line no-alert
    //     : window.confirm('Want to favorite author?');

    //   // eslint-disable-next-line no-nested-ternary
    //   const toggleFavorite = favoritedCard && confirmationMessage ? unfavoritingOneAuthor
    //     : !favoritedCard && confirmationMessage ? favoritingOneAuthor
    //       : null;
    //   if (toggleFavorite) {
    //     toggleFavorite(firebaseKey).then(() => {
    //       getAuthors().then(showAuthors);
    //     });
    //   }
    // }
    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
