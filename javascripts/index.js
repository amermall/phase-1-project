// alert('hello there');
document.addEventListener("DOMContentLoaded", () => {

  let foodForm = document.querySelector('#add_food_form');
  foodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    buildFoodList(e.target.food_item_info.value);

    foodForm.reset();
  })

  let stepsForm = document.querySelector('#add_steps_form');
  stepsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    buildStepsList(e.target.numer_of_steps.value);

    stepsForm.reset();
  })

});

function buildFoodList(todo) {
  let p = document.createElement('p');

  p.textContent = `${todo} `;
  let btn = document.createElement('button');
  btn.textContent = "remove";

  p.appendChild(btn);
  btn.addEventListener('click', handleDelete);
  document.querySelector('#food_list').appendChild(p);

  // Fetch Request POST to send food list to database
  fetch('http://localhost:3000/foodItems', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(p)
  })
  .then(res => res.json())
  .then(food => (food))

}

function buildStepsList(todo) {
  let p = document.createElement('p');
  p.textContent = `${todo} `;

  let btn = document.createElement('button');
  btn.textContent = "remove";
  p.appendChild(btn);
  btn.addEventListener('click', handleDelete);
  document.querySelector('#steps_list').appendChild(p);

  // Fetch Request POST to send steps list to database
  fetch('http://localhost:3000/stepsNumber', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(p)
  })
  .then(res => res.json())
  .then(step => (step))


}

function handleDelete(e) {
  e.target.parentNode.remove();
}