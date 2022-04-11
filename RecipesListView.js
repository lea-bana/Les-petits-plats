class RecipesListView {
  constructor() {
    this.initEventListener();
    this.listIngredientsFilter = new Set();
    this.listAppliancesFilter = new Set();
    this.listUstensilesFilter = new Set();
    console.log(this.listIngredientsFilter);
    this.recipes = recipes;
  }

  showRecipesList(recipes) {
    let recipesListTag = document.getElementById("recipes");
    recipesListTag.setAttribute("class", "cardsContainer");

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];

      recipesListTag.appendChild(this.getRecipeCard(recipe));
    }
  }
  //TROP balèze a refacto ! Divide into X functions
  getRecipeCard(recipe) {
    //On créer la carte parente
    const listCardDOM = document.createElement("div");
    listCardDOM.setAttribute("class", "card");
    //On créer la div qui contiendra l'image
    let imgDivCard = document.createElement("div");
    imgDivCard.setAttribute("class", "imgDivCard");
    let imgCard = document.createElement("img");
    imgCard.setAttribute("class", "img");
    imgCard.setAttribute("src", `assets/resto1.jpg`);
    imgDivCard.appendChild(imgCard);
    //On créer la div qui contiendra le titre et le temps
    const bodyCard = document.createElement("div");
    bodyCard.classList.add("titlePrepa");
    const bodyCardName = document.createElement("h3");
    bodyCardName.classList.add("recipe-title");
    bodyCardName.textContent = recipe.name;
    const bodyCardTime = document.createElement("div");
    bodyCardTime.classList.add("time");
    const bodyCardTimeIcon = document.createElement("i");
    bodyCardTimeIcon.classList.add("fa-regular", "fa-clock");
    const bodyCardTimeValue = document.createElement("span");
    bodyCardTimeValue.textContent = recipe.time + " min";
    //On créer la div qui contiendra la liste des ingrédient  + descritpion de la recipe
    const globalRecipe = document.createElement("div");
    globalRecipe.setAttribute("class", "globalRecipe");
    const bodyCardIngredientsList = document.createElement("ul");
    bodyCardIngredientsList.classList.add("bodyCardIngredientsList");
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
    const bodyCardRecipeDescription = document.createElement("p");
    bodyCardRecipeDescription.setAttribute("class", "ellipsis");
    bodyCardRecipeDescription.textContent = recipe.description;

    bodyCardTime.append(bodyCardTimeIcon, bodyCardTimeValue);
    bodyCard.append(bodyCardName, bodyCardTime);
    globalRecipe.append(bodyCardIngredientsList, bodyCardRecipeDescription);
    listCardDOM.append(imgDivCard, bodyCard, globalRecipe);

    return listCardDOM;
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
      dropdown.classList.toggle("down");

      const mylist = document.getElementById("listIngredientsContainer");
      mylist.classList.toggle("inactive");

      let ingr = document.getElementsByName("ingredients")[0];
      ingr.value = "";

      if (ingr.placeholder == "Ingrédients") {
        ingr.placeholder = "Rechercher un ingrédient";
        console.log("rechercher");
      } else {
        ingr.value = "";
        ingr.placeholder = "Ingrédients";
      }
    });
  }

  initShowAppliancesList() {
    //
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
  }

  displayIngredientsFilter(ingredientsList) {
    //affiche tous les ingrédients de toutes les recettes
    //
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
    const parent = tag.parentNode;
    const idParent = parent.id;
    //1. On récupére la liste de toutes les recettes dans le DOM

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
    this.filterRecipeList();
    //rappeler la mtéhode de construction en lui passant un nouveau tableau
    this.addEventListenerOnCloseCrossTags();
  }

  //-----------------------------------------------------------------------------------------//
  filterRecipeList() {}
  //1.Récupére la liste des Selected Tags
  //Comparer le tableau myFilters (tiré su set ingr selectionnés -listIngredientsFilter) avec le tableau courant d'ingrédients
  //de la recette (courante)
  //
  //const recipes = this.recipes;
  //const myFilters = new Array(...this.listIngredientsFilter);

  /*const result = recipes.filter(recipe => {
      recipe.ingredients.filter(ingredient =>{
        ingredient.ingrfir
      })
    } )
  }*/

  //-------------------------------------------------------------------------------------------//

  addEventListenerOnCloseCrossTags() {
    const closeCrossList = document.querySelectorAll(".closeTag");
    console.log(closeCrossList);

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
      console.log(this.listAppliancesFilter);
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
