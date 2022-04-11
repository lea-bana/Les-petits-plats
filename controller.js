class Controller {
  display() {
    let model = new Model();
    let view = new RecipesListView();

    view.showRecipesList(model.recipes);
    let listIngredients = model.getIngredients();
    let listAppliances = model.getAppliances();
    let listUstensils = model.getUstensils();

    view.displayIngredientsFilter(listIngredients);
    view.displayAppliancesFilter(listAppliances);
    view.displayUstentilsFilter(listUstensils);

    let recipes = model.getRecipes();
  }
}
