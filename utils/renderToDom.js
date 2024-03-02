/* render to dom will take two parameters, one being the id and another the html content
to select id we need to use doc.query
take that declared variable and use .innerHTML to target */
const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
};

export default renderToDOM;
