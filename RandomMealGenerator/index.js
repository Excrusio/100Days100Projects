const get_meal_button = document.getElementById("get_meal");
const get_meal_div = document.getElementById("meal");

get_meal_button.addEventListener("click", () => {
	fetch("https://www.themealdb.com/api/json/v1/1/random.php")
		.then((result) => result.json())
		.then((result) => {
			createMeal(result.meals[0]);
		})
		.catch((error) => {
			console.warn(error);
		});
});

const createMeal = (meal) => {
	const ingredients = [];

	for (let i = 1; i <= 20; ++i) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		} else {
			break;
		}
	}

	console.log(ingredients);

	const newInnerHTML = `
    <div class="row">
        <div class="columns five">
            <img src="${meal.strMealThumb}" alt="Meal Image">
            ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
            ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(",").join(", ")}</p>` : ""}
            <h5>Gawk upon them ingredients!</h5>
            <ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
            </ul>
        </div>
        <div class="columns seven">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
    ${
		meal.strYoutube
			? `
            <div class="row">
                <h5>Video Recipe</h5>
                <div class="videoWrapper">
                    <iframe width="420" height="315"
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                    </iframe>
                </div>
            </div>`
			: ""
	}
    `;

	get_meal_div.innerHTML = newInnerHTML;
};
