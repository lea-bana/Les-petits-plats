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
    //console.log(listUstensils);
    //view.initEventListener();
    //view.showAppliancesList();
    //view.showUstensilsList();
    let recipes = model.getRecipes();
  }
  /*dispatchListeners(){
    const inputIngredient = document.querySelector(#search-ingredients);
    const inputAppareil = document.querySelector('#search-appareils')
  }*/
}
