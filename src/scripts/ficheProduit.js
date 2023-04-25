// Déclaration variables
let unite;
let quantite;
// Liste de nutriments
let listeNutriments = {
  energy: {
    nom: "energy-kcal_100g",
    label: "energy",
  },
  fat: {
    nom: "fat_100g",
    label: "fat",
  },
  saturatedFat: {
    nom: "saturated-fat_100g",
    label: "saturated-fat",
  },
  carbohydrates: {
    nom: "carbohydrates_100g",
    label: "carbohydrates",
  },
  sugars: {
    nom: "sugars_100g",
    label: "sugars",
  },
  fiber: {
    nom: "fiber_100g",
    label: "fiber",
  },
  iron: {
    nom: "iron_100g",
    label: "iron",
  },
  proteins: {
    nom: "proteins_100g",
    label: "proteins",
  },
  salt: {
    nom: "salt_100g",
    label: "salt",
  },
  silica: {
    nom: "silica_100g",
    label: "silica",
  },
  bicarbonate: {
    nom: "bicarbonate_100g",
    label: "bicarbonate",
  },
  potassium: {
    nom: "potassium_100g",
    label: "potassium",
  },
  chloride: {
    nom: "chloride_100g",
    label: "chloride",
  },
  calcium: {
    nom: "calcium_100g",
    label: "calcium",
  },
  magnesium: {
    nom: "magnesium_100g",
    label: "magnesium",
  },
  fluoride: {
    nom: "fluoride_100g",
    label: "fluoride",
  },
  sodium: {
    nom: "sodium_100g",
    label: "sodium",
  },
  vitaminA: {
    nom: "vitamin-a_100g",
    label: "vitamin_a",
  },
  vitaminC: {
    nom: "vitamin-c_100g",
    label: "vitamin_c",
  },
};

// Attendre qu'il y ait un événement 'submit'
document.addEventListener("DOMContentLoaded", search);

// Récupérer l'URL du produit
function search(event) {
  // Empêcher la page de se rafraîchir
  event.preventDefault();
  // Récupérer la reférence produit
  const searchValue = new URLSearchParams(document.location.search).get(
    "search"
  );
  console.log("Reference produit: " + searchValue);
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
      console.log(nutrimentsApi[listeNutriments[i]]);
      // Intrication de la quantité et de l'unité
      quantite = quantite + " " + unite;
      printTable(i);
    } else {
      // Supprime les lignes vides
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
