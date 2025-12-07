const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn')

/* Function to get recipes */
const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipecontainer.innerHTML = "";
response.meals.forEach(meal => {
    const recipeDiv=document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
    const Button = document.createElement('button');
    Button.textContent = "view Recipe";
    recipeDiv.appendChild(Button);


   /* Adding EventListner to recipe button*/
   Button.addEventListener('click',()=>{
    openRecipePopup(meal);
   })
        recipecontainer.appendChild(recipeDiv);
});
 } catch (error) {
    recipecontainer.innerHTML = "<h2>Error in Fetching Recipes....</h2>";
        
    }
};

// function to fetch ingrendient and measurements

const fetchIngredients = (meal) => {
    let ingredientsList = "";  // Correct variable

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`]; // Correct key name

        if (ingredient && ingredient.trim()) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }

    return ingredientsList;
}


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions:</h3>
<p >${meal.strInstructions}</P>
</div>
    `


recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML = `<h2>Type the meal you want to search.</h2>`
        return;
    }
    fetchRecipes(searchInput);
});
