class SearchBarAlgo1 {
  constructor() {
    this.recipes = recipes;
    this.listIngredients = new Set();
  }
  searchInIngredients() {
    const inputSearch = document.getElementById("search");
    let inputSearchValue = inputSearch.value;
    inputSearchValue = [];

    this.recipes.forEach((recipe) => {
      const ingr = new Array(...this.listIngredients);
      ingr.push(recipe.ingredients);
    });
    console.log(inputSearchValue);
    //inputSearch.addEventListener("input",
    if (inputSearchValue >= 3) {
      let result = inputSearchValue.includes(inputSearchValue.value);
      console.log(result);
    }
  }
}
