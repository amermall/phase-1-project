// *****************************************************
// I. Grab the "Add food" button and handle submit event
// *****************************************************
let addFoodButton = document.querySelector("#add_food_form");
addFoodButton.addEventListener("submit", (e) => {
  e.preventDefault();
  buildFoodList(e.target.food_item_info.value);

  let foodItemObject = {
    name: e.target.food_item_info.value,
  }
  storeFoodList(foodItemObject);

  addFoodButton.reset();
})

// *******************************************************
// II. Grab the "Add steps" button and handle submit event
// *******************************************************
let addStepsButton = document.querySelector("#add_steps_form");

addStepsButton.addEventListener("submit", (e) => {
  e.preventDefault();

  buildStepsList(e.target.number_of_steps.value);

  let stepsObject = {
    steps: e.target.number_of_steps.value,
  }
  storeSteps(stepsObject);

  addStepsButton.reset();
})

// ****************************************************
// III. Build Food list with items entered in food form
// ****************************************************
function buildFoodList(foodItem) {

  let p = document.createElement('p');
  p.textContent = `${foodItem} `;

  document.querySelector("#food_list").appendChild(p);

  let removeButton = document.createElement('button');
  removeButton.textContent = "remove";
  p.appendChild(removeButton);
  
  removeButton.addEventListener('click', handleDelete);
}

// *****************************************************
// VI. Build Steps list with items entered in steps form
// *****************************************************
// a. This function will be in the same manner as the buildFoodList function.
function buildStepsList(numberOfSteps) {
  let p = document.createElement('p');
  p.textContent = `${numberOfSteps} `;
  document.querySelector("#steps_list").appendChild(p);

  let removeButton = document.createElement('button');
  removeButton.textContent = "remove";
  p.appendChild(removeButton);
  removeButton.addEventListener('click', handleDelete);
}


// *****************************************
// V. Function to delete food and step items
// *****************************************
function handleDelete(e) {
  // a. The event parameter, is being used to target the parentNode of element.
  e.target.parentNode.remove();
}


// ******************************************************
// VI. Build food list and steps list to send to db.json
// ******************************************************
// Send food list items to db.json for later use
function storeFoodList(foodItem) {
  fetch('http://localhost:3000/foodItems', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(foodItem)
  })
  .then(res => res.json())
  .then(food => console.log(food))
}

function storeSteps(steps) {
  fetch('http://localhost:3000/stepsNumber', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(steps)
  })
  .then(res => res.json())
  .then(stepsNumber => console.log(stepsNumber))
}