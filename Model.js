class Model {
  constructor() {
    this.recipes = recipes;
    this.ingredients = new Set();
    this.ustensils = [];
    this.appliances = [];
    this.init();
  }
  init() {
    for (let index = 0; index < this.recipes.length; index++) {
      const recipe = this.recipes[index];
      console.log(recipe);
      this.addIngredients(recipe.ingredients);
      //this.addUstensils(recipe.ustensils);
    }
  }
  addIngredients(listIngredients) {
    /*this.ingredients = [...new Set([...this.ingredients, ...listIngredients])];
    console.log(this.ingredients);*/
    for (let index = 0; index < listIngredients.length; index++) {
      const ingredient = listIngredients[index];
      //console.log(ingredient.ingredient);
      this.ingredients.add(ingredient.ingredient);
    }
  }
  getIngredients() {
    return this.ingredients;
  }
  //addUstensils(listUstensils) {
  //this.ustensils = [...new Set([...this.ustensils, ...listUstensils])];
  //console.log(this.ustensils);
  //}

  //addAppliances()

  getRecipes() {
    return this.recipes;
  }
}
