
// nous allons récupérer le paramètre d'URL :
const urlParams = new URLSearchParams(window.location.search);
let product = urlParams.get('product');

// message nutriscore
const nutriscoreMsg = {
    a: "Très bonne qualité nutritionnelle",
    b: "Bonne qualité nutritionnelle",
    c: "Qualité nutritionnelle moyenne",
    d: "Moins bonne qualité nutritionnelle",
    e: "Très basse qualité nutritionnelle"
}

// message novascore
const novascoreMsg = [
    "Aliment non transformés ou minimalement transformés",
    "Ingrédient culinaires transformés",
    "Aliment transformés",
    "Aliment ultra-transformés"
]

// quaker exemple cruesli
product = 3168930010265

fetch('https://world.openfoodfacts.org/api/v3/product/' + product)
.then(response => response.json())
.then(data => {
    console.log(data)
})