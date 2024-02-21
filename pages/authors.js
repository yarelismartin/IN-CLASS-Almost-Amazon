import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import '../styles/main.scss';

const emptyAuthors = (message) => {
  const domString = `<h1>${message}</h1>`;
  renderToDOM('#store', domString);
};

const showAuthors = (array) => {
  clearDom();

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
        <i class="btn btn-success" id="view-author-btn--${item.firebaseKey}"><span class="fas fa-eye"></span></i>
        <i class="btn btn-info" id="update-author--${item.firebaseKey}"><span class="fas fa-edit"></span></i>
        <i class="btn" style="background-color: #ffafcc;" id="fav-author-btn--${item.firebaseKey}">
  ${item.favorite
    ? '<span class="fas fa-heart favorited" style="color: #c1121f;"></span>'
    : '<span class="fas fa-heart hover-heart" style="color: #ffffff;"></span>'}
</i>
        <i class="btn btn-danger fas" id="delete-author-btn--${item.firebaseKey}"><span class="fas fa-trash-alt"></span></i>
      </div>
    </div>
    `;
  });
  renderToDOM('#store', domString);
};

export { showAuthors, emptyAuthors };

/* <i class="btn" style="background-color: #ffafcc;" id="fav-author-btn--${item.firebaseKey}">
        <span class="fas fa-heart" style="color:
        ${item.favorite
    ? '#c1121f'
    : '#ffffff'};">
        </span></i> */
