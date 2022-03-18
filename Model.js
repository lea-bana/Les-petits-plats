class Model {
  constructor() {
    this.recipes = recipes;
    this.ingredients = new Set();
    this.ustensils = new Set();
    this.appliances = new Set();
    this.init();
  }

  init() {
    for (let index = 0; index < this.recipes.length; index++) {
      const recipe = this.recipes[index];
      //console.log(recipe);
      this.addIngredients(recipe.ingredients);
      this.addAppliances(recipe.appliance);
      this.addUstensils(recipe.ustensils);
    }
  }

  addAppliances(listAppliances) {
    this.appliances.add(listAppliances);
  }

  addIngredients(listIngredients) {
    for (let index = 0; index < listIngredients.length; index++) {
      const ingredient = listIngredients[index];
      //console.log(ingredient);
      this.ingredients.add(ingredient.ingredient);
    }
  }

  addUstensils(listUstensils) {
    //console.log(listUstensils);
    for (let index = 0; index < listUstensils.length; index++) {
      const ustensil = listUstensils[index];
      this.ustensils.add(ustensil);
    }
  }

  getUstensils() {
    return this.ustensils;
  }

  getIngredients() {
    return this.ingredients;
  }

  getAppliances() {
    return this.appliances;
  }

  getRecipes() {
    return this.recipes;
  }
}
