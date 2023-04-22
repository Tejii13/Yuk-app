// Déclaration variables
let unite;
let quantite;
// let resultatQuantite = quantite + unite;
// Liste de nutriments
let listeNutriments = [
  'energy-kcal_100g',
  'fat_100g',
  'saturated-fat_100g',
  'carbohydrates_100g',
  'sugars_100g',
  'fiber_100g',
  'proteins_100g',
  'salt_100g',
  'silice',
  'biocar',
  'potass',
  'chloru',
  'calcium_100g',
  'magne',
  'fluor',
  'sulfate',
];
let unit = "g";

document
  // Identification du formulaire dans lequel on travaille
  .querySelector("form[role=search]")
  .addEventListener("submit", search);
  // Format étendue de la fonction décrite au dessus

// Récupérer l'URL du produit
function search(event) {
  // Empêcher la page de se rafraîchir
  event.preventDefault();
  // Attendre qu'il y ait un événement 'submit'
  const searchValue = document.querySelector("#pd_search").value;
  // Réinitialiser le formulaire de recherche
  document.querySelector("#pd_search").value = "";
  // Création de l'URL avec le code barres voulu intriqué à l'intérieur
  const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${searchValue}.json?fields=generic_name,nutriments`;
  // Renvoie l'URL dans la console
  console.log(apiUrl);
  // Apelle la fonction rempliTable()
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(("Network response was not ok"));
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 1){
        console.log("Produit connu");
        console.log(data.product);
        printData(data.product);
      } else {
        console.log("Produit inconnu ou code barre erroné")
        location.href = "../../index.html"
      }

    })
    .catch(error => {
      console.error("There was a problem with the fetch operation: ", error);
    })
}

// Actualiser les valeurs du tableau
function printData(p) {
  // Changement nom du produit
  document.querySelector("#nomProduit").textContent = p.generic_name
  console.log(p.image_url); //FIXME Impossible de récupérer l'url ou à peut prés la moitié des infos...
  // document.querySelector('#imageProduit').setAttribute('src', p.image_front_url);
  // Attribution constance pour aller chercher dans les nutriments
  const nutrimentsApi = p.nutriments;
  // Ecriture dans le tableau
  for (let i = 0; i < listeNutriments.length; i++) {
    // Récupération de la quantité
    quantite = nutrimentsApi[listeNutriments[i]];
    console.log(quantite)
    // Intrication de la quantité et de l'unité
    quantite = quantite + unit;
    // Ecriture dans le tableau
    document.querySelector("#" + listeNutriments[i] + ">td.quantite").textContent =
      quantite;
  }
}
