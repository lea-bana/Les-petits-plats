class RecipesListView {
  constructor() {
    this.initEventListener();
    this.listIngredientsFilter = new Set();
    this.listAppliancesFilter = new Set();
    this.listUstensilesFilter = new Set();
    this.recipes = recipes;
  }

  //Affichage des recipes cards dans le main DOM

  showRecipesList(recipes) {
    let recipesListTag = document.getElementById("recipes");
    recipesListTag.setAttribute("class", "cardsContainer");

    recipesListTag.innerHTML = "";
    console.log(recipes);

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];

      recipesListTag.appendChild(this.getRecipeCard(recipe));
    }
    this.ellipsisText();
  }
  //factory des cards
  //TROP balèze a refacto ! Divide into X functions // dans un autre fichier?
  getRecipeCard(recipe) {
    //Div englobante de la carte
    const listCardDOM = document.createElement("div");
    listCardDOM.setAttribute("class", "card");
    //Div de l'image
    let imgDivCard = document.createElement("div");
    imgDivCard.setAttribute("class", "imgDivCard");
    //l'image attribuée
    let imgCard = document.createElement("img");
    imgCard.setAttribute("class", "img");
    imgCard.setAttribute("src", `assets/resto1.jpg`);
    //image dans sa div
    imgDivCard.appendChild(imgCard);
    //Div titre et temps & icon
    const bodyCard = document.createElement("div");
    bodyCard.classList.add("titlePrepa");
    const bodyCardTitle = document.createElement("h3");
    bodyCardTitle.classList.add("recipe-title");
    bodyCardTitle.textContent = recipe.name;
    const bodyCardTime = document.createElement("div");
    bodyCardTime.classList.add("time");
    const bodyCardTimeIcon = document.createElement("i");
    bodyCardTimeIcon.classList.add("fa-regular", "fa-clock");
    const bodyCardTimeValue = document.createElement("span");
    bodyCardTimeValue.textContent = recipe.time + " min";
    //Div englobante liste ingredients + description recette
    const globalRecipe = document.createElement("div");
    globalRecipe.setAttribute("class", "globalRecipe");
    //liste des ingredients
    const bodyCardIngredientsList = document.createElement("ul");
    bodyCardIngredientsList.classList.add("bodyCardIngredientsList");
    //pour chaque ingrédients de la recette - créer un li , si unit et quantity ne sont pas renseignés - Rien
    recipe.ingredients.forEach((ingredient) => {
      const bodyCardIngredientsListItem = document.createElement("li");
      ingredient.unit !== undefined ? "" : (ingredient.unit = " ");
      ingredient.quantity !== undefined ? "" : (ingredient.quantity = " ");
      bodyCardIngredientsListItem.textContent =
        ingredient.ingredient +
        ": " +
        ingredient.quantity +
        " " +
        ingredient.unit;
      bodyCardIngredientsListItem.classList.add("listItem");
      bodyCardIngredientsList.appendChild(bodyCardIngredientsListItem);
    });
    //description de la recette

    const bodyCardRecipeDescription = document.createElement("p");
    bodyCardRecipeDescription.setAttribute("class", "ellipsis");
    bodyCardRecipeDescription.textContent = recipe.description;

    bodyCardTime.append(bodyCardTimeIcon, bodyCardTimeValue);
    bodyCard.append(bodyCardTitle, bodyCardTime);
    globalRecipe.append(bodyCardIngredientsList, bodyCardRecipeDescription);
    listCardDOM.append(imgDivCard, bodyCard, globalRecipe);

    return listCardDOM;
  }

  //fonction utilitaire pour rendre l'ellipsis sur les descr°---------------------------------------------------//

  ellipsisText() {
    let repiceDescrList = document.querySelectorAll(".ellipsis");
    for (let index = 0; index < repiceDescrList.length; index++) {
      const description = repiceDescrList[index];
      let d = description.firstChild;
      if (d.length > 200) {
        d.textContent = d.nodeValue.substring(0, 200) + "...";
      }
    }
  }

  //------------------------------------------------------------------------------------------------------------//

  initEventListener() {
    this.initShowIngredientsList();
    this.initShowAppliancesList();
    this.initShowUstensilsList();
  }
  //refacto on utilise closest PUIS on cherche dans le parent via querySelector
  //un élément qui a une class qui commence par querySelector('[class^="list"]')
  //sensé chopper tous les &l&ments ayant une class commencant par listxxxxx

  //listeners sur les dropdown et les input pour inititer l'affichage des listes

  initShowIngredientsList() {
    const dropdown = document.getElementById("dropdownIngredients");
    dropdown.addEventListener("click", (e) => {
      dropdown.classList.toggle("down");

      const mylist = document.getElementById("listIngredientsContainer");
      mylist.classList.toggle("inactive");

      let ingr = document.getElementsByName("ingredients")[0];
      ingr.value = "";

      if (ingr.placeholder == "Ingrédients") {
        ingr.placeholder = "Rechercher un ingrédient";
      } else {
        ingr.value = "";
        ingr.placeholder = "Ingrédients";
      }
    });
    const inputIngr = document.getElementById("search-ingredients");
    inputIngr.addEventListener("click", (e) => {
      inputIngr.classList.toggle("down");
      const mylist = document.getElementById("listIngredientsContainer");
      mylist.classList.toggle("inactive");
      let ingr = document.getElementsByName("ingredients")[0];
      ingr.value = "";

      if (ingr.placeholder == "Ingrédients") {
        ingr.placeholder = "Rechercher un ingrédient";
      } else {
        ingr.value = "";
        ingr.placeholder = "Ingrédients";
      }
    });
  }

  initShowAppliancesList() {
    const dropdown = document.getElementById("dropdownAppliances");
    dropdown.addEventListener("click", (e) => {
      dropdown.classList.toggle("down");

      const myList = document.getElementById("listAppliancesContainer");
      myList.classList.toggle("inactive");

      let appli = document.getElementsByName("appliance")[0];
      appli.value = "";
      if (appli.placeholder == "Appareils") {
        appli.placeholder = "Rechercher un appareil";
      } else {
        appli.value = "";
        appli.placeholder = "Appareils";
      }
    });
    const inputAppli = document.getElementById("search-appareils");
    inputAppli.addEventListener("click", (e) => {
      inputAppli.classList.toggle("down");
      const mylist = document.getElementById("listAppliancesContainer");
      mylist.classList.toggle("inactive");
      let appli = document.getElementsByName("appliances")[0];
      appli.value = "";

      if (appli.placeholder == "Appareils") {
        ingr.placeholder = "Rechercher un appareil";
      } else {
        appli.value = "";
        appli.placeholder = "Appareils";
      }
    });
  }
  initShowUstensilsList() {
    const dropdown = document.getElementById("dropdownUstensils");

    dropdown.addEventListener("click", (e) => {
      dropdown.classList.toggle("down");

      const myList = document.getElementById("listUstensilsContainer");
      myList.classList.toggle("inactive");

      let ustens = document.getElementsByName("ustensils")[0];
      ustens.value = "";
      if (ustens.placeholder == "Ustensiles") {
        ustens.placeholder = "Rechercher un ustensile";
      } else {
        ustens.value = "";
        ustens.placeholder = "Ustensiles";
      }
    });
    const inputUstens = document.getElementById("search-ustensils");
    inputUstens.addEventListener("click", (e) => {
      inputUstens.classList.toggle("down");
      const mylist = document.getElementById("listUstensilsContainer");
      mylist.classList.toggle("inactive");
      let ustens = document.getElementsByName("ustensils")[0];
      ustens.value = "";

      if (ustens.placeholder == "Ustensiles") {
        ustens.placeholder = "Rechercher un ustensile";
      } else {
        ustens.value = "";
        ustens.placeholder = "Ustensiles";
      }
    });
  }
  //--------------------------------------------------------------MAIN SEARCH------------------------------------

  filterRecipeListBySearchBar(searchText, listRecipes) {
    let filteredList = [];
    for (let index = 0; index < listRecipes.length; index++) {
      const recipe = listRecipes[index];
      //console.log(recipe);
      if (recipe.name.includes(searchText)) {
        filteredList.push(recipe);
      } else {
        for (let ingredient of recipe.ingredients) {
          //console.log(ingredient);
          if (ingredient.ingredient.includes(searchText)) {
            filteredList.push(recipe);
            break;
          }
        }
      }
    }
    console.log(filteredList);
    return filteredList;
  }

  launchSearch() {
    let filteredRecipes;
    let searchText = document.getElementById("search").value;
    filteredRecipes = this.filterRecipeListBySearchBar(
      searchText,
      this.recipes
    );
    filteredRecipes = this.filterRecipeListbyTag(filteredRecipes);
    //afficher les recettes correspondantes à filteredRecipes
    this.showRecipesList(filteredRecipes);
  }

  addEventListenerOnInputSearchBar() {
    const inputSearch = document.getElementById("search");
    inputSearch.addEventListener("keydown", (event) => {
      console.log(event.target.value);
      //this.filterRecipeListBySearchBar(event.target.value);
      this.launchSearch();
    });
  }

  //-------------------------------------------------------------------------------------------------------------//

  /*quand la recherche est lancée - actualisation des listes des ingredients*/

  //--------------------------------------------LISTES DE RECHERCHE BY TAG---------------------------------------//

  displayIngredientsFilter(ingredientsList) {
    //affiche tous les ingrédients de toutes les recettes

    const list = document.getElementById("listIngredientsContainer");
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });
    const inputIngr = document.getElementById("search-ingredients");
    inputIngr.addEventListener("click", (event) => {
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
    const parent = tag.parentNode;
    const idParent = parent.id;

    switch (idParent) {
      case "listIngredientsContainer":
        this.listIngredientsFilter.add(tag.textContent);
        break;
      case "listAppliancesContainer":
        this.listAppliancesFilter.add(tag.textContent);
        break;
      case "listUstensilsContainer":
        this.listUstensilesFilter.add(tag.textContent);
        break;
    }

    this.showSelectedTags();
    this.launchSearch();
    //rappeler la méthode de construction en lui passant le nouveau tableau filtré
    this.addEventListenerOnCloseCrossTags();
  }

  //-----------------------------------------------------------------------------------------//
  filterRecipeListbyTag(listRecipes) {
    //1.Récupérer la liste des ingrédients / appareils / ustensiles sélectionnés et la transformer en array (car c'est un set)

    //2.Récupérer le tableau des ingrédients / appareils / ustensiles de chaque recette pr le comparer aux filtres(includes)

    let filteredRecipes = listRecipes;

    if (this.listIngredientsFilter.size != 0) {
      const myFilters = new Array(...this.listIngredientsFilter);
      console.log(filteredRecipes);
      filteredRecipes = filteredRecipes.filter((recipe) =>
        myFilters.every((filter) =>
          recipe.ingredients
            .map((ingredients) => ingredients.ingredient.toLowerCase())
            .includes(filter.toLowerCase())
        )
      );
    }
    if (this.listUstensilesFilter.size != 0) {
      const usFilters = new Array(...this.listUstensilesFilter);
      filteredRecipes = filteredRecipes.filter((recipe) =>
        usFilters.every((filter) =>
          recipe.ustensils
            .map((us) => us.toLowerCase())
            .includes(filter.toLowerCase())
        )
      );
    }
    if (this.listAppliancesFilter.size != 0) {
      const appFilters = new Array(...this.listAppliancesFilter);
      filteredRecipes = filteredRecipes.filter((recipe) =>
        appFilters.every(
          (filter) => recipe.appliance.toLowerCase() === filter.toLowerCase()
        )
      );
    }
    return filteredRecipes;

    /*const inputSearch = document.getElementById("search");
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
    }*/
  }
  //-------------------------------------------------------------------------------------------//

  addEventListenerOnCloseCrossTags() {
    const closeCrossList = document.querySelectorAll(".closeTag");

    for (let index = 0; index < closeCrossList.length; index++) {
      const closeTag = closeCrossList[index];
      closeTag.addEventListener("click", (e) => {
        //1. récupérer l'élement sur lequel on a cliqué (x)
        console.log(e.target.closest(".tag"));
        const myElement = e.target.closest(".tag");
        //2. Retrouver la liste a laquelle il appartient
        if (myElement.classList.contains("ingr")) {
          console.log(myElement.textContent);
          this.listIngredientsFilter.delete(myElement.textContent);
        } else if (myElement.classList.contains("appli")) {
          console.log(myElement.textContent);
          this.listAppliancesFilter.delete(myElement.textContent);
        } else if (myElement.classList.contains("ustens")) {
          console.log(myElement.textContent);
          this.listUstensilesFilter.delete(myElement.textContent);
        }

        closeTag.parentNode.remove();
        this.launchSearch();
      });
    }
  }

  showSelectedTags() {
    const tagList = document.querySelector(".tagList");
    tagList.innerHTML = "";

    for (let currentIngredient of this.listIngredientsFilter) {
      const closeTag = document.createElement("span");
      closeTag.classList.add("closeTag");
      closeTag.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      const tagIngr = document.createElement("div");
      tagIngr.className = "tag";
      tagIngr.classList.add("ingr");
      tagIngr.append(currentIngredient, closeTag);
      tagList.appendChild(tagIngr);
    }

    for (let currentAppliance of this.listAppliancesFilter) {
      const closeTag = document.createElement("span");
      closeTag.classList.add("closeTag");
      closeTag.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      const tagAppli = document.createElement("div");
      tagAppli.className = "tag";
      tagAppli.classList.add("appli");
      tagAppli.append(currentAppliance, closeTag);
      tagList.appendChild(tagAppli);
    }

    for (let currentUstensile of this.listUstensilesFilter) {
      const closeTag = document.createElement("span");
      closeTag.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      closeTag.classList.add("closeTag");
      const tagUstensile = document.createElement("div");
      tagUstensile.className = "tag";
      tagUstensile.classList.add("ustens");
      tagUstensile.append(currentUstensile, closeTag);
      tagList.appendChild(tagUstensile);
    }
  }
}
