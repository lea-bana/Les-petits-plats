class RecipesListView {
  constructor(recipes, listIngredients, listAppliances, listUstensils) {
    this.recipes = recipes;
    this.listIngredients = listIngredients;
    this.listAppliances = listAppliances;
    this.listUstensils = listUstensils;
    this.initEventListener();
    this.listIngredientsFilter = new Set();
    this.listAppliancesFilter = new Set();
    this.listUstensilesFilter = new Set();

    this.displayIngredientsFilter(this.listIngredients);
    this.displayAppliancesFilter(this.listAppliances);
    this.displayUstentilsFilter(this.listUstensils);
  }

  //Affichage des recipes cards dans DOM

  showRecipesList(recipes) {
    let recipesListTag = document.getElementById("recipes");
    recipesListTag.setAttribute("class", "cardsContainer");
    recipesListTag.innerHTML = "";

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];

      recipesListTag.appendChild(this.getRecipeCard(recipe));
    }
    this.ellipsisText();
  }

  //Construction des cards recipes

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

  //fonction appelant les addEventListener (dans le constructor de la classe)

  initEventListener() {
    this.initShowIngredientsList();
    this.initShowAppliancesList();
    this.initShowUstensilsList();
    this.addEventListenerOnInputSearchBar();
    this.addEventListenerOnInputTags(this.listIngredients);
    this.listenerOnIngrList();
    this.listenerOnAppliList();
    this.ListenerOnUstensilsList();
  }

  //fonctions addEventListener sur les dropdown + modifs des placeholders

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
      let appli = document.getElementsByName("appliance")[0];
      console.log(appli);
      appli.value = "";

      if (appli.placeholder == "Appareils") {
        appli.placeholder = "Rechercher un appareil";
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
  //--------------------------------------------------------------MAIN SEARCH----------------------------------------//

  filterRecipeListBySearchBar(searchText, listRecipes) {
    searchText = searchText.toLowerCase();

    let filteredRecipes = listRecipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.description.toLowerCase().includes(searchText) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchText)
        )
      );
    });

    return filteredRecipes;
  }

  filterRecipeListBySearchBar2(searchText, listRecipes) {
    let filteredList = [];
    searchText = searchText.toLowerCase();
    for (let index = 0; index < listRecipes.length; index++) {
      const recipe = listRecipes[index];
      if (recipe.description.toLowerCase().includes(searchText)) {
        filteredList.push(recipe);
      } else if (recipe.name.toLowerCase().includes(searchText)) {
        filteredList.push(recipe);
      } else {
        for (let ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(searchText)) {
            filteredList.push(recipe);
            break;
          }
        }
      }
    }

    return filteredList;
  }

  launchSearch() {
    let noResults = document.getElementById("no-results");
    let filteredRecipes;
    let searchText = document.getElementById("search").value;
    filteredRecipes = this.filterRecipeListBySearchBar(
      searchText,
      this.recipes
    );
    filteredRecipes = this.filterRecipeListbyTag(filteredRecipes);

    if (filteredRecipes.length === 0) {
      noResults.style.display = "block";
    } else {
      let ingrInFilteredRecipes = new Set();
      let appliFilteredRecipes = new Set();
      let ustensFilteredRecipes = new Set();
      for (let recipe of filteredRecipes) {
        for (let ingredient of recipe.ingredients) {
          ingrInFilteredRecipes.add(ingredient.ingredient);
        }
        for (let ustensile of recipe.ustensils) {
          ustensFilteredRecipes.add(ustensile);
        }
        appliFilteredRecipes.add(recipe.appliance);
      }
      this.displayIngredientsFilter(ingrInFilteredRecipes);
      this.displayAppliancesFilter(appliFilteredRecipes);
      this.displayUstentilsFilter(ustensFilteredRecipes);

      noResults.style.display = "none";
    }
    this.showRecipesList(filteredRecipes);
  }

  // Mise en place du listener sur boite search
  addEventListenerOnInputSearchBar() {
    const inputSearch = document.getElementById("search");

    inputSearch.addEventListener("keyup", (event) => {
      if (event.target.value.length >= 3) {
        this.launchSearch();
      } else {
        document.getElementById("no-results").style.display = "none";
        this.showRecipesList(this.recipes);
      }
    });
  }
  //-------------------------------------------------------------------------------------------------------------//

  /*quand recherche dans inputsBy Tags- actualisation des listes */

  filterInTagsLists() {
    let searchIngrText = document.getElementById("search-ingredients").value;
    searchIngrText = searchIngrText.toLowerCase();
    let filteredIngrList = Utils.filterSet(
      searchIngrText,
      this.listIngredients
    );

    this.displayIngredientsFilter(filteredIngrList);

    let searchAppliText = document.getElementById("search-appareils").value;
    searchAppliText = searchAppliText.toLowerCase();
    let filteredAppliList = Utils.filterSet(
      searchAppliText,
      this.listAppliances
    );
    this.displayAppliancesFilter(filteredAppliList);

    let searchUstensText = document.getElementById("search-ustensils").value;
    searchUstensText = searchUstensText.toLowerCase();
    let filteredUstensList = Utils.filterSet(
      searchUstensText,
      this.listUstensils
    );
    this.displayUstentilsFilter(filteredUstensList);
  }

  addEventListenerOnInputTags() {
    const inputIngredient = document.getElementById("search-ingredients");
    const inputAppliances = document.getElementById("search-appareils");
    const inputUstensils = document.getElementById("search-ustensils");

    inputIngredient.addEventListener("keyup", (event) => {
      console.log(event.target.value);
      this.filterInTagsLists();
    });

    inputAppliances.addEventListener("keyup", (event) => {
      //console.log(event.target.value);
      this.filterInTagsLists();
    });

    inputUstensils.addEventListener("keyup", (event) => {
      console.log(event.target.value);
      this.filterInTagsLists();
    });
  }

  //--------------------------------------------LISTES DE RECHERCHE BY TAG---------------------------------------//

  listenerOnIngrList() {
    const list = document.getElementById("listIngredientsContainer");
    list.innerHTML = "";
    list.addEventListener("click", (event) => {
      console.log(event.target);
      this.handleClickTags(event);
    });
  }

  displayIngredientsFilter(ingredientsList) {
    const list = document.getElementById("listIngredientsContainer");
    //affiche tous les ingrédients de toutes les recettes
    list.innerHTML = ""; // a rajouter pour vider les listes
    ingredientsList.forEach((ingredient) => {
      //console.log(ingredient);

      const myIng = document.createElement("li");
      myIng.textContent = ingredient;
      list.appendChild(myIng);
    });
  }
  listenerOnAppliList() {
    const list = document.getElementById("listAppliancesContainer");
    list.innerHTML = "";
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });
  }
  displayAppliancesFilter(appliancesList) {
    //affiche tous les appareils de toutes les recettes
    const list = document.getElementById("listAppliancesContainer");
    list.innerHTML = "";

    appliancesList.forEach((appliance) => {
      //console.log(appliance);
      const myAppliance = document.createElement("li");
      myAppliance.textContent = appliance;
      list.appendChild(myAppliance);
    });
  }

  ListenerOnUstensilsList() {
    const list = document.getElementById("listUstensilsContainer");
    list.innerHTML = "";
    list.addEventListener("click", (event) => {
      this.handleClickTags(event);
    });
  }
  displayUstentilsFilter(ustensilsList) {
    const list = document.getElementById("listUstensilsContainer");
    list.innerHTML = "";

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
