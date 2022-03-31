class RecipesListView {
  constructor() {
    this.initEventListener();
    this.listIngredientsFilter = new Set();
    this.listAppliancesFilter = new Set();
    this.listUstensilesFilter = new Set();
    console.log(this.listIngredientsFilter);
  }

  showRecipesList(recipes) {
    //à terminer + css
    let recipesListTag = document.getElementById("recipes");
    recipesListTag.setAttribute("class", "cardsContainer");
    //cible l'element html id recipes dans le main et lui ajoute la classe cardsContainer
    const listCardDOM = document.createElement("div");
    listCardDOM.setAttribute("class", "article-recipes");
    recipesListTag.appendChild(listCardDOM);

    for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];
      listCardDOM.innerHTML += this.getRecipeCard(recipe);
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
    const dropdown = document.getElementById("dropdownAppliances");

    dropdown.addEventListener("click", (e) => {
      dropdown.classList.toggle("down");

      const myList = document.getElementById("listAppliancesContainer");
      myList.classList.toggle("inactive");

      let appli = document.getElementsByName("appliance")[0];
      appli.value = "";
      if (appli.placeholder == "Appareils") {
        appli.placeholder = "Rechercher un appareil";
        console.log("rechercher");
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
        console.log("rechercher");
      } else {
        ustens.value = "";
        ustens.placeholder = "Ustensiles";
      }
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
    console.log(this.listIngredientsFilter);
    console.log(this.listAppliancesFilter);
    console.log(this.listUstensilesFilter);

    this.showSelectedTags();
  }

  closeTags() {
    const closeCross = document.querySelector(".closeTag");
    const closeTag = document.querySelector(".tag");
    console.log(closeTag);
    closeCross.addEventListener("click", () => {
      closeTag.remove();
    });
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

    /*this.listIngredientsFilter.forEach((currentIngredient) => {
      const closeTag = document.createElement("span");
      closeTag.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      const tagIngr = document.createElement("div");
      tagIngr.className = "tag";
      tagIngr.classList.add("ingr");
      tagIngr.textContent = currentIngredient;
      tagIngr.appendChild(closeTag);
      tagList.appendChild(tagIngr);
    });*/

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
    this.closeTags();
  }
}
