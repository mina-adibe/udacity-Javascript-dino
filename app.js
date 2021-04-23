"use strict";

document.addEventListener("DOMContentLoaded", () => {
  (() => {})();
});

//variables
const btnSubmit = document.getElementById("btn");
const form = document.getElementById("dino-compare");
const grid = document.getElementById("grid");

//data
const animalData = [];

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
  })
  .catch((err) => {
    console.log(err);
  });

//animal function
class animal {
  constructor(species, weight, height, diet, where, when, fact, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.facts = [facts];
  }

  compareHeight() {
    const diff = this.height - human.height >= 0 ? "taller" : "shorter";
    const result = this.height - human.height;
    return `this speceis is ${Math.abs(result)} ${diff}  than ${human.name}`;
  }
  compareWeight() {
    const diff = this.weight - human.weight >= 0 ? "heavier" : "lighter";
    const result = this.weight - human.weight;
    return `this speceis is ${Math.abs(result)} ${diff}  than ${human.name}`;
  }
  compareDiet() {
    const humanDiet = human?.diet;
    const dinoDiet = this.diet;
    return `Human diet is  ${humanDiet} dino diet is  ${dinoDiet}`;
  }
  getImage() {
    return (
      "./images/" + this.species.toLowerCase().split(" ").join("_") + ".png"
    );
  }

  htmlTile() {
    const title =
      this.species === "human"
        ? `<h3>${human.name}</h3>`
        : `<h3>${this.species}</h3>`;
    const image = `<img src="${this.getImage()}"   >`;
    const description = `<p>${this.fact}</p>`;

    return `<div class="grid-item"> ${title}${image}${description} </div>`;
  }
}
const human = new animal("human");
// human object
const humanProp = (name, feet, inches, weight, diet) => {
  human.name = name;
  human.height = feet * 12 + inches;
  human.weight = weight;
  human.diet = diet;
  animalData.push(human);
  console.log(human);
};

// create Html from data of animals
const getHtml = () => {
  let html = "";
  randomData(animalData);
  animalData.forEach((dino) => {
    html += dino.htmlTile();
  });

  return html;
};

// shuffle animals data
function randomData(animalData) {
  animalData.sort(() => Math.random() - 0.5);
}
// On button click, prepare and display infographic
btnSubmit.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;

  humanProp(name, feet, inches, weight, diet);

  form.style.display = "none";
  grid.innerHTML = getHtml();
});
