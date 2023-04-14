const search = document.querySelector("#search"),
  form = document.querySelector("#submit"),
  randomBtn = document.querySelector("#random"),
  resultHeading = document.querySelector("#result-heading"),
  mealsEl = document.querySelector("#meals"),
  singleMealEl = document.querySelector("#single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Searh results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. <b>Try again!</b></p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map((meal) => {
              return `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info"data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
            </div>
            </div>`;
            })
            .join("");
        }
      });
    //   Clear searh text
  } else {
    alert("Please enter a search term");
  }
}

form.addEventListener("submit", searchMeal);
