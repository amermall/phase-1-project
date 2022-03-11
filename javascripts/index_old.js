// alert('hello there');
document.addEventListener("DOMContentLoaded", () => {
  // Load Gather items button
  gatherItems()

  // Set variable for string entry in food form
  let foodForm = document.querySelector('#add_food_form');

  // Event listener for Food item
  foodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    buildFoodList(e.target.food_item_info.value);
    foodForm.reset();
  })

  // Set variable for string entry in food form
  let stepsForm = document.querySelector('#add_steps_form');

  // Event listener for Steps item
  stepsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    buildStepsList(e.target.numer_of_steps.value);
    stepsForm.reset();
  })

});


// Render to the DOM Food items
function buildFoodList(item) {
  let p = document.createElement('p');

  p.textContent = `${item} `;
  let btn = document.createElement('button');
  btn.textContent = "remove";

  p.appendChild(btn);
  btn.addEventListener('click', handleDelete);
  document.querySelector('#food_list').appendChild(p);

  // Fetch Request of POST to send food list to database
  fetch('http://localhost:3000/foodItems', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({name: item})
  })
  .then(res => res.json())
  .then(food => (food))

}

// Render to the DOM Step items
function buildStepsList(stepNumber) {
  // Fetch Request POST to send steps list to database
  fetch('http://localhost:3000/stepsNumber', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({name: stepNumber})
  })
  .then(res => res.json())
  .then(step => (renderStepsList(stepNumber)))
}

function renderStepsList(stepNumber) {
  let p = document.createElement('p');
  p.textContent = `${stepNumber} `;

  let btn = document.createElement('button');
  btn.textContent = "remove";
  p.appendChild(btn);
  btn.addEventListener('click', handleDelete);
  document.querySelector('#steps_list').appendChild(p);
}

function handleDelete(e) {
  e.target.parentNode.remove();
}

// Render Food items and steps when clicking on Gather food items and steps
// ========================================================================
// const gatherItemsButton = () => document.getElementById("gather_items");
// const gatherItems = () => {
//   // When clicked Fetch request to grab data from json.db
//   gatherItemsButton().addEventListener('click', renderDataFromDataBase);
// }

function renderDataFromDataBase() {
  fetch('http://localhost:3000/stepsNumber')
  .then(res => res.json())
  .then(data => (data.forEach(stepsNumber => {
    renderStepsList(stepsNumber.name)
  })))
}

function renderGatheredData(stepsNumber) {
  let p = document.createElement('p');
  p.textContent = `${stepsNumber}`;
  document.querySelector('#gathered_content').appendChild(p);
}
