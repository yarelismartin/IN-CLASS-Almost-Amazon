import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

// USING THIS FORM FOR BOTH CREATE AND UPDATE
// took out the uid in my because it wasnt showing me the current values of each key
const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="title">Order Title</label>
        <input type="text" class="form-control" id="order_title" aria-describedby="orderTitle" placeholder="Enter Order Title" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <textarea class="form-control" placeholder="First Name" id="customer_first_name">${obj.customer_first_name || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <textarea class="form-control" placeholder="Last Name" id="customer_last_name" >${obj.customer_last_name || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="order">Order Notes</label>
        <textarea class="form-control" placeholder="Order Notes" id="notes" style="height: 100px">${obj.notes || ''}</textarea>
      </div>
      <hr>
      <button type="submit" class="btn btn-primary">${obj.firebaseKey ? 'Update Order' : 'Submit Order'}
      </button>
    </form>`;

  renderToDOM('#form-container', domString);
};

// the tags you use matter; <input> wasnt showing my value when i went to edit an order unlike <textarea></textarea> that was reading my value correctly

export default addOrderForm;
