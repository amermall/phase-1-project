/** Globals **/
const baseUrl = 'http://localhost:3000/foodsAndSteps';
let foodStepsItems = [];

/** NODE Getters **/
// 1. Function to call the main div anytime we need it.
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const loggedFoodStepsLink = () => document.getElementById("logged-food-steps-link");

/** Events **/
// const loadMeals = () => {
//   fetch(baseUrl)
//   .then(resp => resp.json())
//   .then(data => meals = data)
// }
const loadFoodsStepsFromDb = async () => {
  const resp = await fetch(baseUrl);
  const data = await resp.json();
  foodStepsItems = data;
}

const homePageLinkEvent = () => {
  // Grab homepage link
  homePageLink().addEventListener('click', function(e) {
    e.preventDefault();
    renderHomePage();
  })
}

const loggedFoodStepsLinkEvent = () => {
  // Grab homepage link
  loggedFoodStepsLink().addEventListener('click', async function(e) {
    e.preventDefault();
    await loadFoodsStepsFromDb();
    renderfoodsStepsLogPage();
  })
}


/** Templates **/
// const homePageTemplate = () => {
//   return `
//     <h4 class="center-align">Welcome to logging food and steps for the day</h4>
//   `
// }

// From meal list template
const loggedFoodsStepsTemplate = () => {
  return `
  <h1>Food and steps list</h1>
  <table class="highlight">
    <thead>
      <tr>
        <th>Date</th>
        <th>Breakfast</th>
        <th>Lunch</th>
        <th>Dinner</th>
        <th>Snack</th>
        <th>Steps Logged Today</th>
      </tr>
    </thead>
    <tbody>
      ${ renderFoodStepsItems() }
    </tbody>
  </table>
  `
}

// meal template
const foodStepsItemsTemplate = (item) => {
  const tr = document.createElement('tr');
  const tdDate = document.createElement('td');
  const tdBreakfast = document.createElement('td');
  const tdLunch = document.createElement('td');
  const tdDinner = document.createElement('td');
  const tdSnack = document.createElement('td');
  const tdSteps = document.createElement('td');
  tdDate.innerText = item.date;
  tdBreakfast.innerText = item.breakfast;
  tdLunch.innerText = item.lunch;
  tdDinner.innerText = item.dinner;
  tdSnack.innerText = item.snack;
  tdSteps.innerText = item.steps;
  tr.appendChild(tdDate);
  tr.appendChild(tdBreakfast);
  tr.appendChild(tdLunch);
  tr.appendChild(tdDinner);
  tr.appendChild(tdSnack);
  tr.appendChild(tdSteps);
  
  return tr;
}
/** Renderers **/
const renderHomePage = () => {
  mainDiv().innerHTML = '';
  const h1 = document.createElement('h1');
  h1.innerText = 'Welcome to our Meal Planner'
  mainDiv().appendChild(h1);
}


// render meals list page
const renderfoodsStepsLogPage = () => {
  mainDiv().innerHTML = '';
  const h1 = document.createElement('h1');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const thDate = document.createElement('th');
  const thBreakfast = document.createElement('th');
  const thLunch = document.createElement('th');
  const thDinner = document.createElement('th');
  const thSnack = document.createElement('th');
  const thSteps = document.createElement('th');
  const tbody = document.createElement('tbody');

  h1.innerText = 'Food & Steps logged';
  thDate.innerText = 'Date';
  thBreakfast.innerText = 'Breakfast';
  thLunch.innerText = 'Lunch';
  thDinner.innerText = 'Dinner';
  thSnack.innerText = 'Snack';
  thSteps.innerText = 'Steps';

  table.classList.add('highlight');

  tr.appendChild(thDate);
  tr.appendChild(thBreakfast);
  tr.appendChild(thLunch);
  tr.appendChild(thDinner);
  tr.appendChild(thSnack);
  tr.appendChild(thSteps);
  thead.appendChild(tr);
  table.appendChild(thead);
  // console.log(table);
  foodStepsItems.forEach(item => tbody.appendChild(foodStepsItemsTemplate(item)))
  table.appendChild(tbody);
  mainDiv().appendChild(h1);
  mainDiv().appendChild(table);
}

// render meals
const renderFoodStepsItems = () => {
  // Here is where we can iterate through the meals...
  return foodStepsItems.map(item => foodStepsItemsTemplate(item))
  // for every item we have we are going to call foodStepsItemsTemplate
}

/******************/

/** When the DOM loads... **/
document.addEventListener('DOMContentLoaded', function() {
  renderHomePage();
  homePageLinkEvent();
  loggedFoodStepsLinkEvent();
})
















































































// // *****************************************************
// // I. Grab the "Add food" button and handle submit event
// // *****************************************************
// let addFoodButton = document.querySelector("#add_food_form");
// addFoodButton.addEventListener("submit", (e) => {
//   e.preventDefault();
//   buildFoodList(e.target.food_item_info.value);

//   let foodItemObject = {
//     name: e.target.food_item_info.value,
//   }
//   storeFoodList(foodItemObject);

//   addFoodButton.reset();
// })

// // *******************************************************
// // II. Grab the "Add steps" button and handle submit event
// // *******************************************************
// let addStepsButton = document.querySelector("#add_steps_form");

// addStepsButton.addEventListener("submit", (e) => {
//   e.preventDefault();

//   buildStepsList(e.target.number_of_steps.value);

//   let stepsObject = {
//     steps: e.target.number_of_steps.value,
//   }
//   storeSteps(stepsObject);

//   addStepsButton.reset();
// })

// // ****************************************************
// // III. Build Food list with items entered in food form
// // ****************************************************
// function buildFoodList(foodItem) {

//   let p = document.createElement('p');
//   p.textContent = `${foodItem} `;

//   document.querySelector("#food_list").appendChild(p);

//   let removeButton = document.createElement('button');
//   removeButton.textContent = "remove";
//   p.appendChild(removeButton);

//   removeButton.addEventListener('click', handleDelete);
// }

// // *****************************************************
// // VI. Build Steps list with items entered in steps form
// // *****************************************************
// // a. This function will be in the same manner as the buildFoodList function.
// function buildStepsList(numberOfSteps) {
//   let p = document.createElement('p');
//   p.textContent = `${numberOfSteps} `;
//   document.querySelector("#steps_list").appendChild(p);

//   let removeButton = document.createElement('button');
//   removeButton.textContent = "remove";
//   p.appendChild(removeButton);
//   removeButton.addEventListener('click', handleDelete);
// }


// // *****************************************
// // V. Function to delete food and step items
// // *****************************************
// function handleDelete(e) {
//   // a. The event parameter, is being used to target the parentNode of element.
//   e.target.parentNode.remove();
// }


// // ******************************************************
// // VI. Build food list and steps list to send to db.json
// // ******************************************************
// // Send food list items to db.json for later use
// function storeFoodList(foodItem) {
//   fetch('http://localhost:3000/foodItems', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(foodItem)
//   })
//   .then(res => res.json())
//   .then(food => console.log(food))
// }

// function storeSteps(steps) {
//   fetch('http://localhost:3000/stepsNumber', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(steps)
//   })
//   .then(res => res.json())
//   .then(stepsNumber => console.log(stepsNumber))
// }

// // ********************************************
// // VII. GET Request to display what in db.json
// // ********************************************
// function getFoodItems() {
//   fetch('http://localhost:3000/foodItems')
//   .then(res => res.json())
//   .then(data => console.log(data));
// }

// function getNumberOfSteps() {
//   fetch('http://localhost:3000/stepsNumber')
//   .then(res => res.json())
//   .then(data => console.log(data))
// }