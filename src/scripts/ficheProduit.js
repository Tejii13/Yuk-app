// Déclaration variables
let unite;
let quantite;
let resultatQuantite;
// let resultatQuantite = quantite + unite;
// Liste de nutriments
let nutriments = [
  "energie",
  "matGrasses",
  "grasSat",
  "glucides",
  "sucres",
  "fibres",
  "prot",
  "sel",
  "silice",
  "bicar",
  "potass",
  "chloru",
  "calci",
  "magne",
  "fluor",
  "sulfate",
];
let unit = ["mg", "g", "%", "kcal"];

// Rempli le tableau avec des informations random, juste pour tester
function rempliTable() {
  for (let i = 0; i < nutriments.length; i++) {
    // Détermine une quanitté random
    quantite = parseInt(Math.random() * 100);
    // Choisis une unité random
    do {
      unite = parseInt(Math.random() * 100);
    } while (unite > 3);
    // Intrication de la quantité et de l'unité
    resultatQuantite = quantite + unit[unite];
    // Ecriture dans le tableau
    document.querySelector("#" + nutriments[i] + ">td.quantite").textContent =
      resultatQuantite;
  }
}

document
  // Identification du formulaire dans lequel on travaille
  .querySelector("form[role=search]")
  // Attendre qu'il y ait un événement 'submit'
  .addEventListener("submit", function (event) {
    // Empêcher la page de se rafraîchir
    event.preventDefault();
    // Création de l'URL avec le code barres voulu intriqué à l'intérieur
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${
      document.querySelector("#pd_search").value
    }.json?fields=generic_name,nutriments`;
    // Réinitialiser le formulaire de recherche
    document.querySelector("#pd_search").value = "";
    // Renvoie l'URL dans la console
    console.log(apiUrl);
    // Apelle la fonction rempliTable()
    rempliTable();
  });
// Format étendue de la fonction décrite au dessus
/*
// Récupérer l'URL du produit
function search(event) {
  event.preventDefault();
  const searchValue = document.querySelector("#pd_search").value;
  document.querySelector("#pd_search").value = "";
  const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${searchValue}.json?fields=generic_name,nutriments`;
  console.log(apiUrl);
  remplissage();
}
*/
