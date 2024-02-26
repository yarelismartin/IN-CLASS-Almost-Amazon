import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
// return { ...authorObject, books: authorsBooks };
const viewAuthor = (obj) => {
  clearDom();
  let domString = '';

  domString += `
  <div class="card view-author-card" style="width: 18rem; margin-right: 100%;">
    <div class="card-body" style="width: 550px">
      <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted view-author-card-email">${obj.email}</h6>
      <i class="btn btn-info edit-author-btn" id="update-author--${obj.firebaseKey}"><span id="update-author--${obj.firebaseKey}" class="fas fa-edit"></span></i>
      <i class="btn btn-heart" style="background-color: #ffafcc;" id="fav-author-btn--${obj.firebaseKey}">
${obj.favorite
    ? `<span id="fav-author-btn--${obj.firebaseKey}" class="fas fa-heart favorited" style="color: #c1121f;"></span>`
    : `<span id="fav-author-btn--${obj.firebaseKey}" class="fas fa-heart hover-heart" style="color: #ffffff;"></span>`}
</i>
      <i class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><span id="delete-author-btn--${obj.firebaseKey}" class="fas fa-trash-alt"></span></i>
      <hr>
    </div>
  </div>
  <h5 style="margin-left: 15px; color:white;">Books</h5>
  `;
  domString += '<div id="books-container" style="margin-left:10px;">';
  obj.books.forEach((item) => {
    domString += `
    <div class="book-card" style="width:300px; margin:0px 15px 15px 0px;">
      <div class="card" >
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 300px;">
        <div class="card-body" style="height: 182px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success" id="view-book-btn--${item.firebaseKey}"><span id="view-book-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
            <i id="edit-book-btn--${item.firebaseKey}" class="btn btn-info"><span id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit"></span></i>
            <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger"><span id="delete-book-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
        </div>
      </div>
      </div>`;
  });
  domString += '</div>';
  renderToDOM('#view', domString);
};

export default viewAuthor;
