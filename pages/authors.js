import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import '../styles/main.scss';
import '@fortawesome/fontawesome-free';

const emptyAuthors = (message, addBtn) => {
  clearDom();
  const addAuthorBtn = addBtn ? '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>' : '';
  const domString = `
  <div>
    ${addAuthorBtn}
    <h1>${message}</h1>
  </div>
  `;
  renderToDOM('#store', domString);
};

const showAuthors = (array, clear = true) => {
  if (clear) clearDom();
  if (array.length <= 0) {
    emptyAuthors('No Anuthors');
  } else {
    const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';

    renderToDOM('#add-button', btnString);

    let domString = '';
    array.forEach((item) => {
      domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
        <i class="btn btn-success" id="view-author-btn--${item.firebaseKey}"><span id="view-author-btn--${item.firebaseKey}" class="fas fa-eye"></i>
        <i class="btn btn-info edit-author-btn" id="update-author--${item.firebaseKey}"><span id="update-author--${item.firebaseKey}" class="fas fa-edit"></span></i>
        <i class="btn btn-heart" style="background-color: #ffafcc;" id="fav-author-btn--${item.firebaseKey}">
  ${item.favorite
    ? `<span id="fav-author-btn--${item.firebaseKey}" class="fas fa-heart favorited" style="color: #c1121f;"></span>`
    : `<span id="fav-author-btn--${item.firebaseKey}" class="fas fa-heart hover-heart" style="color: #ffffff;"></span>`}
</i>
        <i class="btn btn-danger" id="delete-author-btn--${item.firebaseKey}"><span id="delete-author-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
      </div>
    </div>
    `;
    });
    renderToDOM('#store', domString);
  }
};

export { showAuthors, emptyAuthors };

/* <i class="btn" style="background-color: #ffafcc;" id="fav-author-btn--${item.firebaseKey}">
        <span class="fas fa-heart" style="color:
        ${item.favorite
    ? '#c1121f'
    : '#ffffff'};">
        </span></i> */
