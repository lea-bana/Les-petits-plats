class Controller {
  display() {
    let model = new Model();
    //RecipesListView.showRecipesList(listRecipes);
    /*let listIngredients = model.getIngredients();
    console.log(listIngredients);*/
    let recipes = model.getRecipes();
    let view = new RecipesListView();
    view.showRecipesList(recipes);
  }
}
