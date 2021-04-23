//done
// ## Create Dino Constructor         >>done
// ## Create Dino Objects             >>done
// ## Create Human Object             >>done
// ## Remove form from screen         >>done
// ## Create Dino Compare Method 1    >>done
// ## Create Dino Compare Method 2    >>done
// ## Create Dino Compare Method 3    >>done
// ## Generate Tiles for each Dino in Array    >>done
// ## Add tiles to DOM                         >>done

// @@ NOTE: Weight in JSON file is in lbs, height in inches.
//not yet
// ## Use IIFE to get human data from form

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log(" DOMContentLoaded - DOM ready!");
  (() => {
    //variables
    const btnSubmit = document.getElementById("btn");
    const form = document.getElementById("dino-compare");
    const grid = document.getElementById("grid");

    //data
    const animalData = [];

    function randomData(animalData) {
      animalData.sort(() => Math.random() - 0.5);
    }

    // read from json file
    fetch("./dino.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.dinos.forEach((dino) => {
          animalData.push(
            new animal(
              dino.species,
              dino.weight,
              dino.height,
              dino.diet,
              dino.where,
              dino.when,
              dino.fact
            )
          );
        });
        console.log(animalData);
      })
      .catch((err) => {
        console.log(err);
      });

    //animal function
    class animal {
      constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
      }

      compareHeight() {
        const result = this.weight / humanKind.weight;
        return `this speceis is ${Math.floor(result)} than ${humanKind.name}`;
      }
      compareWeight() {
        const result = this.weight / humanKind.weight;
        return `this speceis is ${Math.floor(result)} than ${humanKind.name}`;
      }
      compareDiet() {
        const humanDiet = humanKind.diet;
        const dinoDiet = this.diet;
        return `Human diet is  ${humanDiet} dino diet is  ${dinoDiet}`;
      }
    }

    const humanKind = new animal("human");
    animalData.push(humanKind);

    // human object
    const humanProp = (name, feet, inches, weight, diet) => {
      humanKind.name = name;
      humanKind.height = feet * 12 + inches;
      humanKind.weight = weight;
      humanKind.diet = diet;
    };

    const getHtml = () => {
      animalData.forEach((dino) => {
        var divItem = document.createElement("div");
        divItem.classList.add("grid-item");
        grid.appendChild(divItem);

        var heading = document.createElement("h3");
        heading.innerHTML = dino.species;
        divItem.appendChild(heading);

        var itemImg = document.createElement("img");
        const imgPath = "./images/" + dino.species.toLowerCase() + ".png";
        itemImg.setAttribute("src", imgPath);
        divItem.appendChild(itemImg);

        var itemDesc = document.createElement("p");
        itemDesc.innerHTML = dino.compareWeight();
        divItem.appendChild(itemDesc);
      });
    };

    // On button click, prepare and display infographic
    btnSubmit.addEventListener("click", function () {
      const name = document.getElementById("name").value;
      const feet = document.getElementById("feet").value;
      const inches = document.getElementById("inches").value;
      const weight = document.getElementById("weight").value;
      const diet = document.getElementById("diet").value;

      humanProp(name, feet, inches, weight, diet);
      randomData(animalData);
      getHtml();

      form.style.display = "none";
      grid.display;

      // console.log(name, feet, inches, weight, diet);
    });
  })();
});

console.log("sync data");
window.onload = () => {
  console.log("window.onload");
};
