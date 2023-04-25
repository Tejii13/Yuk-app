// Déclaration variables
let unite;
let quantite;
// Liste de nutriments
let listeNutriments = {
  energy: {
    nom: "energy-kcal_100g",
    label: "energy",
    quantite,
    unite,
  },
  fat: {
    nom: "fat_100g",
    label: "fat",
    quantite,
    unite,
  },
  saturatedFat: {
    nom: "saturated-fat_100g",
    label: "saturated-fat",
    quantite,
    unite,
  },
  carbohydrates: {
    nom: "carbohydrates_100g",
    label: "carbohydrates",
    quantite,
    unite,
  },
  sugars: {
    nom: "sugars_100g",
    label: "sugars",
    quantite,
    unite,
  },
  fiber: {
    nom: "fiber_100g",
    label: "fiber",
    quantite,
    unite,
  },
  iron: {
    nom: "iron_100g",
    label: "iron",
    quantite,
    unite,
  },
  proteins: {
    nom: "proteins_100g",
    label: "proteins",
    quantite,
    unite,
  },
  salt: {
    nom: "salt_100g",
    label: "salt",
    quantite,
    unite,
  },
  silica: {
    nom: "silica_100g",
    label: "silica",
    quantite,
    unite,
  },
  bicarbonate: {
    nom: "bicarbonate_100g",
    label: "bicarbonate",
    quantite,
    unite,
  },
  potassium: {
    nom: "potassium_100g",
    label: "potassium",
    quantite,
    unite,
  },
  chloride: {
    nom: "chloride_100g",
    label: "chloride",
    quantite,
    unite,
  },
  calcium: {
    nom: "calcium_100g",
    label: "calcium",
    quantite,
    unite,
  },
  magnesium: {
    nom: "magnesium_100g",
    label: "magnesium",
    quantite,
    unite,
  },
  fluoride: {
    nom: "fluoride_100g",
    label: "fluoride",
    quantite,
    unite,
  },
  sodium: {
    nom: "sodium_100g",
    label: "sodium",
    quantite,
    unite,
  },
  vitaminA: {
    nom: "vitamin-a_100g",
    label: "vitamin_a",
    quantite,
    unite,
  },
  vitaminC: {
    nom: "vitamin-c_100g",
    label: "vitamin_c",
    quantite,
    unite,
  },
};
/*let listeNutriments = [
  "energy-kcal_100g",
  "fat_100g",
  "saturated-fat_100g",
  "carbohydrates_100g",
  "sugars_100g",
  "fiber_100g",
  "iron_100g",
  "proteins_100g",
  "salt_100g",
  "silica_100g",
  "bicarbonate_100g",
  "potassium_100g",
  "chloride_100g",
  "calcium_100g",
  "magnesium_100g",
  "fluoride_100g",
  "sodium_100g",
  "vitamin-a_100g",
  "vitamin-c_100g",
];*/
/*for (let i in listeNutriments) {
  console.log(listeNutriments[i].nom);
}*/

// FIXME
// sessionStorage.setItem
// Identification du formulaire dans lequel on travaille
document.querySelector("form[role=search]").addEventListener("submit", search);
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
  const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${searchValue}.json?fields=generic_name,ingredients_text,nutriments,image_url,nutriscore_grade,nova_group`;
  // Renvoie l'URL dans la console
  console.log(apiUrl);
  // Apelle la fonction rempliTable()
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === 1) {
        printData(data.product);
        printPictures(data.product);
      } else {
        console.log("Produit inconnu ou code barre erroné");
        location.href = "../../index.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation: ", error);
    });
}

// Actualiser les valeurs du tableau
function printData(p) {
  // Changement nom du produit
  if (p.product_name == undefined) {
    document.querySelector("#nomProduit").textContent = p.generic_name;
  } else {
    document.querySelector("#nomProduit").textContent = p.product_name;
  }
  //Changement description produit
  document.querySelector("#descriptionProduit").textContent = p.generic_name;
  // Changement liste d'ingrédients
  document.querySelector("#ingredients").textContent = p.ingredients_text;

  // Attribution constance pour aller chercher dans les nutriments
  const nutrimentsApi = p.nutriments;
  // Ecriture dans le tableau
  for (let i in listeNutriments) {
    // Récupération des quantitées
    quantite = nutrimentsApi[listeNutriments[i].nom];
    // Vérification que le nutriment exixte
    if (quantite != undefined) {
      // Récupération de l'unité
      unite = nutrimentsApi[listeNutriments[i].label + "_unit"];
      // Intrication de la quantité et de l'unité
      quantite = quantite + " " + unite;
      printTable(i);
    } else {
      // Supprime les lignes vides
      console.log("A retirer: " + listeNutriments[i].nom);
      document.querySelector("#" + listeNutriments[i].nom).remove();
    }
  }
}

// Ecriture dans le tableau
function printTable(i) {
  document.querySelector(
    "#" + listeNutriments[i].nom + ">td.quantite"
  ).textContent = quantite;
}

function printPictures(p) {
  // Changement image produit
  document.querySelector("#imageProduit").src = p.image_url;
  // Changement image nutriscore
  if (p.nutriscore_grade != undefined) {
    document.querySelector(
      "#scoresNutri"
    ).src = `../../img/images/nutriscore/nutriScore_${p.nutriscore_grade}.svg`;
  } else {
    document.querySelector(
      "#scoresNutri"
    ).src = `../../img/images/nutriscore/nutriscore_undefined.svg`;
  }
  // Changement image NOVA
  if (p.nova_group != undefined) {
    document.querySelector(
      "#scoresNova"
    ).src = `../../img/images/NOVA/NOVA_${p.nova_group}.svg`;
  } else {
    document.querySelector(
      "#scoresNova"
    ).src = `../../img/images/NOVA/NOVA_unknown.svg`;
  }
}
