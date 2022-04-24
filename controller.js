class Controller {
  display() {
    let model = new Model();
    let view = new RecipesListView();
    //let algo1 = new SearchBarAlgo1();

    view.showRecipesList(model.recipes);
    let listIngredients = model.getIngredients();
    let listAppliances = model.getAppliances();
    let listUstensils = model.getUstensils();

    view.displayIngredientsFilter(listIngredients);
    view.displayAppliancesFilter(listAppliances);
    view.displayUstentilsFilter(listUstensils);
    view.addEventListenerOnInputSearchBar();

    //algo1.searchInIngredients(listIngredients);

    //let recipes = model.getRecipes();
  }
}
