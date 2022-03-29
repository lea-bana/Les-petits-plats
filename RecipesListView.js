class RecipesListView {
  constructor() {
    this.initEventListener();
    this.listIngredientsFilter = new Set();
    console.log(this.listIngredientsFilter);
  }

  showRecipesList(recipes) {
    //à terminer + css
    let recipesListTag = document.getElementById("recipes");
    recipesListTag.setAttribute("class", "cardsContainer");
    //cible l'element html id recipes dans le main et lui ajoute la classe cardsContainer
    const listCardDOM = document.createElement("div");
    listCardDOM.setAttribute("class", "cardsSize");
    recipesListTag.appendChild(listCardDOM);

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];
      recipesListTag.innerHTML += this.getRecipeCard(recipe);
    }
    //console.log(recipes);
  }

  getRecipeCard(recipe) {
    return recipe.name + "<br>";
  }

  initEventListener() {
    this.initShowIngredientsList();
    this.initShowAppliancesList();
    this.initShowUstensilsList();
  }
  //refacto on utilise closest PUIS on cherche dans le parent via querySelector
  //un élément qui a une class qui commence par querySelector('[class^="list"]')
  //sensé chopper tous les &l&ments ayant une class commencant par listxxxxx
  initShowIngredientsList() {
    const dropdown = document.getElementById("dropdownIngredients");
    dropdown.addEventListener("click", (e) => {
      const mylist = document.getElementById("listIngredientsContainer");
      mylist.classList.toggle("inactive");
    });
  }
  initShowAppliancesList() {
    const dropdown = document.getElementById("dropdownAppliances");
    dropdown.addEventListener("click", (e) => {
      const myList = document.getElementById("listAppliancesContainer");
      myList.classList.toggle("inactive");
    });
  }
  initShowUstensilsList() {
    const dropdown = document.getElementById("dropdownUstensils");
    dropdown.addEventListener("click", (e) => {
      const myList = document.getElementById("listUstensilsContainer");
      myList.classList.toggle("inactive");
    });
  }

  displayIngredientsFilter(ingredientsList) {
    //affiche tous les ingrédients de toutes les recettes
    const list = document.getElementById("listIngredientsContainer");
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });
    ingredientsList.forEach((ingredient) => {
      //console.log(ingredient);
      const myIng = document.createElement("li");
      myIng.textContent = ingredient;
      list.appendChild(myIng);
    });
  }
  displayAppliancesFilter(appliancesList) {
    //affiche tous les appareils de toutes les recettes
    const list = document.getElementById("listAppliancesContainer");
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });
    appliancesList.forEach((appliance) => {
      //console.log(appliance);
      const myAppliance = document.createElement("li");
      myAppliance.textContent = appliance;
      list.appendChild(myAppliance);
    });
  }
  displayUstentilsFilter(ustensilsList) {
    //affiche tous les ustensils de toutes les recettes
    const list = document.getElementById("listUstensilsContainer");
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });

    ustensilsList.forEach((ustensil) => {
      //console.log(ustensil);
      const myUstensil = document.createElement("li");
      myUstensil.textContent = ustensil;
      list.appendChild(myUstensil);
    });
  }
  //handler qui répond au click sur les elements de la liste
  //doit filtrer la liste de recettes en fonction du tag
  handleClickTags(event) {
    const tag = event.target;
    console.log(this.listIngredientsFilter);
    this.listIngredientsFilter.add(tag.textContent);
    //console.log(this.listIngredientsFilter);
  }
}
