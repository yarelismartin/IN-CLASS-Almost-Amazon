import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import '@fortawesome/fontawesome-free';

const addOrderBtnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add A Order</button>';

const emptyOrders = (message, addBtn) => {
  const addOrderBtn = addBtn ? addOrderBtnString : '';
  const domString = `
  <div> 
    ${addOrderBtn} 
    <h1>${message}</h1>
  </div>`;
  renderToDOM('#store', domString);
};

const showOrders = (array, clear = true) => {
  if (clear) clearDom();
  if (array.length <= 0) {
    emptyOrders('No Orders', true);
  } else {
    renderToDOM('#add-button', addOrderBtnString);

    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
          <h5 class="card-header card-title">${item.customer_first_name}${item.customer_last_name}</h5>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.notes}</p>
          <i class="btn btn-success" id="view-order-btn--${item.firebaseKey}"><span id="view-order-btn--${item.firebaseKey}" class="fas fa-eye"></span></i>
          <i id="edit-order-btn--${item.firebaseKey}" class="btn btn-info"><span id="edit-order-btn--${item.firebaseKey}" class="fas fa-edit"></span></i>
          <i id="delete-order-btn--${item.firebaseKey}" class="btn btn-danger"><span id="delete-order-btn--${item.firebaseKey}" class="fas fa-trash-alt"></span></i>
      </div>
    </div>`;
    });
    renderToDOM('#store', domString);
  }
};

export { showOrders, emptyOrders };
