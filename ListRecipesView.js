class RecipesListView {
  showRecipesList(recipes) {
    let recipesListTag = document.getElementById("recipes");
    /*recipesList.setAttribute("class", "cardsContainer");
    //cible l'element html id recipes et lui ajoute la classe cardsContainer
    const listCardDOM = document.createElement("div");
    listCardDOM.setAttribute("class", "cardsSize");
    recipesList.appendChild(listCardDOM);*/

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];
      recipesListTag.innerHTML += this.getRecipeCard(recipe);
    }
    console.log(recipes);
  }
  getRecipeCard(recipe) {
    return recipe.name + "<br>";
  }
}
