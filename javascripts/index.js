/** Globals **/
let foodStepsItems = [];

/** ID Getters **/
const mainDiv = () => document.getElementById("main");
const homePageLink = () => document.getElementById("home-page-link");
const loggedFoodStepsLink = () => document.getElementById("logged-food-steps-link");
const newEntryFormLink = () => document.getElementById("new-entry-form-link");
const dateInput = () => document.getElementById('date');
const breakfastInput = () => document.getElementById('breakfast');
const lunchInput = () => document.getElementById('lunch');
const dinnerInput = () => document.getElementById('dinner');
const stepsInput = () => document.getElementById('steps');

 
/** Templates **/
/***************/
// meal template
const foodStepsItemsTemplate = (item) => {
  const tr = document.createElement('tr');
  const tdDate = document.createElement('td');
  const tdBreakfast = document.createElement('td');
  const tdLunch = document.createElement('td');
  const tdDinner = document.createElement('td');
  const tdSteps = document.createElement('td');
  tdDate.innerText = item.date;
  tdBreakfast.innerText = item.breakfast;
  tdLunch.innerText = item.lunch;
  tdDinner.innerText = item.dinner;
  tdSteps.innerText = item.steps;
  tr.appendChild(tdDate);
  tr.appendChild(tdBreakfast);
  tr.appendChild(tdLunch);
  tr.appendChild(tdDinner);
  tr.appendChild(tdSteps);
  
  return tr;
}

/** Renderers **/
/***************/
const renderHomePage = () => {
  mainDiv().innerHTML = '';
  return renderLogNewEntryForm();
}


// render meals list page
const renderfoodsStepsLogPage = async () => {
  await loadFoodsStepsFromDb();
  mainDiv().innerHTML = '';
  const h1 = document.createElement('h1');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const thDate = document.createElement('th');
  const thBreakfast = document.createElement('th');
  const thLunch = document.createElement('th');
  const thDinner = document.createElement('th');
  const thSteps = document.createElement('th');
  const tbody = document.createElement('tbody');

  h1.innerText = 'Food & Steps logged';
  thDate.innerText = 'Date';
  thBreakfast.innerText = 'Breakfast';
  thLunch.innerText = 'Lunch';
  thDinner.innerText = 'Dinner';
  thSteps.innerText = 'Steps';

  table.classList.add('highlight');

  tr.appendChild(thDate);
  tr.appendChild(thBreakfast);
  tr.appendChild(thLunch);
  tr.appendChild(thDinner);
  tr.appendChild(thSteps);
  thead.appendChild(tr);
  table.appendChild(thead);
  // console.log(table);
  foodStepsItems.forEach(item => tbody.appendChild(foodStepsItemsTemplate(item)))
  table.appendChild(tbody);
  mainDiv().appendChild(h1);
  mainDiv().appendChild(table);
}

// renderLogNewEntryForm
const renderLogNewEntryForm = () => {
  mainDiv().innerHTML = '';
  // alert('form has been loaded!');
  const h1 = document.createElement('h1');
  const form = document.createElement('form');
  const dateDiv = document.createElement('div');
  const dateInput = document.createElement('input');
  const dateLabel = document.createElement('label');
  const breakfastDiv = document.createElement('div');
  const breakfastInput = document.createElement('input');
  const breakfastLabel = document.createElement('label');
  const lunchDiv = document.createElement('div');
  const lunchInput = document.createElement('input');
  const lunchLabel = document.createElement('label');
  const dinnerDiv = document.createElement('div');
  const dinnerInput = document.createElement('input');
  const dinnerLabel = document.createElement('label');
  const stepsDiv = document.createElement('div');
  const stepsInput = document.createElement('input');
  const stepsLabel = document.createElement('label');
  const submitButton = document.createElement('input');

  h1.className = 'center-align';
  dateDiv.className = 'input-field';
  breakfastDiv.className = 'input-field';
  lunchDiv.className = 'input-field';
  dinnerDiv.className = 'input-field';
  stepsDiv.className = 'input-field';
  submitButton.className = 'waves-effect waves-light btn';

  dateInput.setAttribute('id', 'date');
  dateInput.setAttribute('type', 'text');
  dateLabel.setAttribute('for', 'date');
  breakfastInput.setAttribute('id', 'breakfast');
  breakfastInput.setAttribute('type', 'text');
  breakfastLabel.setAttribute('for', 'breakfast');
  lunchInput.setAttribute('id', 'lunch');
  lunchInput.setAttribute('type', 'text');
  lunchLabel.setAttribute('for','lunch');
  dinnerInput.setAttribute('id', 'dinner');
  dinnerInput.setAttribute('type', 'text');
  dinnerLabel.setAttribute('for','dinner');
  stepsInput.setAttribute('id', 'steps');
  stepsInput.setAttribute('type', 'text');
  stepsLabel.setAttribute('for','steps');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Submit');

  h1.innerText = 'LOG Items for the Day';
  dateLabel.innerText = 'Date';
  breakfastLabel.innerText = 'Breakfast';
  lunchLabel.innerText = "Lunch";
  dinnerLabel.innerText = "Dinner";
  stepsLabel.innerText = "Steps";

  dateDiv.appendChild(dateInput);
  dateDiv.appendChild(dateLabel);
  breakfastDiv.appendChild(breakfastInput);
  breakfastDiv.appendChild(breakfastLabel);
  lunchDiv.appendChild(lunchInput);
  lunchDiv.appendChild(lunchLabel);
  dinnerDiv.appendChild(dinnerInput);
  dinnerDiv.appendChild(dinnerLabel);
  stepsDiv.appendChild(stepsInput);
  stepsDiv.appendChild(stepsLabel);

  form.appendChild(dateDiv);
  form.appendChild(breakfastDiv);
  form.appendChild(lunchDiv);
  form.appendChild(dinnerDiv);
  form.appendChild(stepsDiv);
  form.appendChild(submitButton);

  form.addEventListener('submit', submitFormEvent);

  mainDiv().appendChild(h1);
  mainDiv().appendChild(form);
}

// render meals
const renderFoodStepsItems = () => {
  // Here is where we can iterate through the items...
  return foodStepsItems.map(item => foodStepsItemsTemplate(item))
  // for every item we have we are going to call foodStepsItemsTemplate
}

/** Events **/
/***************/
// const loadFoodsStepsFromDb = () => {
//   fetch('http://localhost:3000/foodsAndSteps')
//   .then(resp => resp.json())
//   .then(data => meals = data)
// }
const loadFoodsStepsFromDb = async () => {
  const resp = await fetch('http://localhost:3000/foodsAndSteps');
  const data = await resp.json();
  foodStepsItems = data;
}

const homePageLinkEvent = () => {
  homePageLink().addEventListener('click', (e) => {
    e.preventDefault();
    renderHomePage();
  })
}

const loggedFoodStepsLinkEvent = () => {
  loggedFoodStepsLink().addEventListener('click', async (e) => {
    e.preventDefault();
    renderfoodsStepsLogPage();
  })
}

const logNewEntryLinkEvent = () => {
  newEntryFormLink().addEventListener('click', (e) => {
    e.preventDefault();
    renderLogNewEntryForm();
  })
}

const submitFormEvent = e => {
  e.preventDefault();

  console.log('date', dateInput().value);
  console.log('breakfast', breakfastInput().value);
  console.log('lunch', lunchInput().value);
  console.log('dinner', dinnerInput().value);
  console.log('steps', stepsInput().value);

  fetch('http://localhost:3000/foodsAndSteps', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: dateInput().value,
      breakfast: breakfastInput().value,
      lunch: lunchInput().value,
      dinner:  dinnerInput().value,
      steps: stepsInput().value
    })
  })
  .then(resp => resp.json())
  .then(data => {
    // console.log(data)
    renderfoodsStepsLogPage();
  })
}

/**********************************************************/

/** When the DOM loads... **/
document.addEventListener('DOMContentLoaded', function() {
  renderHomePage();
  homePageLinkEvent();
  loggedFoodStepsLinkEvent();
  logNewEntryLinkEvent();
})
