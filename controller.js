class Controller {
  display() {
    let model = new Model();

    //let algo1 = new SearchBarAlgo1();

    let listIngredients = model.getIngredients();
    let listAppliances = model.getAppliances();
    let listUstensils = model.getUstensils();
    let view = new RecipesListView(
      recipes, //recipes def dans recipes.js
      listIngredients,
      listAppliances,
      listUstensils
    );
    view.showRecipesList(model.recipes);

    //algo1.searchInIngredients(listIngredients);

    //let recipes = model.getRecipes();
  }
}
