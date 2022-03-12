// *****************************************************
// I. Grab the "Add food" button and handle submit event
// *****************************************************
let addFoodButton = document.querySelector("#add_food_form");

// a. Add an event listener for the action of submit...
addFoodButton.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('hello there');

  // a. Take value entered in the input field during this event and pass it to the buildFoodList function...
  // console.log(e.target.food_item_info.value);
  buildFoodList(e.target.food_item_info.value);


  // d. Create object of input value for later use in db.json.
  let foodItemObject = {
    name: e.target.food_item_info.value,
  }
  storeFoodList(foodItemObject);



  // c. Empty field after food added to list
  addFoodButton.reset();

})

// *******************************************************
// II. Grab the "Add steps" button and handle submit event
// *******************************************************
let addStepsButton = document.querySelector("#add_steps_form");

// a. Add an event listener for the action of submit...
// (This mirrors what is being done in "addFoodButton" event listener above)
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
  // a. So, this function's parameter of "foodItem" needs to pass in the value of what's beeing entered in the food form input field and when the "submit" event is pressed, the value should be ready to be passed here. (Will reference this function in the event listener function of addFoodButton...)
  // console.log(foodItem);
  
  // b. Create "p" tag HTML element and assign it to a variable
  let p = document.createElement('p');
  // console.log(li);

  // c. Create textContent for "p" tag and give p.textContent what is being entered in the food form input field
  p.textContent = `${foodItem} `;

  // d. Ok, time to display the typed item and render it on page...
  // - Grab the "id" of "food_list" from the DOM and append "p" as a child to it...
  document.querySelector("#food_list").appendChild(p);

  // e. Need to be able to remove items from the list...
  // ... will create button at the same time as this function is creating the food item.
  let removeButton = document.createElement('button');
  removeButton.textContent = "remove";

  // f. Add removeButton next to "p" tag item that was added, by making it a child of the "p" tag.
  p.appendChild(removeButton);

  // g. Add event listener to the click, and pass a function that will handle delete for NOT just foodForm but also the steps form.
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