
// nous allons récupérer le paramètre d'URL :
const urlParams = new URLSearchParams(window.location.search);
let codebar = urlParams.get('codebar');

// message nutriscore
const nutriscoreMsg = {
    a: 'Très bonne qualité nutritionnelle',
    b: 'Bonne qualité nutritionnelle',
    c: 'Qualité nutritionnelle moyenne',
    d: 'Moins bonne qualité nutritionnelle',
    e: 'Très basse qualité nutritionnelle',
    unknown : 'Valeur nutritionnelle inconnue',
    undefined : 'Valeur nutritionnelle inconnue'
}

// background nutriscore
const nutriscoreBg = {
    'a': '#00803d',
    'b': '#87bd25',
    'c': '#ffcc00',
    'd': '#ef7d00',
    'e': '#e63312',
    'unknown': '#ffffff',
    'not-applicable' : '#ffffff'
}

// message novascore
const novascoreMsg = [
    "NOVA Non calculé",
    "Aliment non transformés ou minimalement transformés",
    "Ingrédient culinaires transformés",
    "Aliment transformés",
    "Aliment ultra-transformés"
]

// background novascore
const novascoreBg = [
    // en cours :)
]

// quaker exemple cruesli
// product = 3168930010265

fetch('https://world.openfoodfacts.org/api/v3/product/' + codebar)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        if (data.status == 'failure') {
            document.querySelector('#productDetails').innerHTML = `
                <p class="fs-4 text-center">Produit non trouvé</p>
                <p class="fs-4 fw-bold text-center">${codebar}</p>
                <a href="index.html" class="btn btn-afpa text-white btn-lg my-3 col-12"><i class="bi bi-upc-scan me-3"></i>Nouvelle recherche</a>
                <section class="text-center mt-5">
                    <img class="nodata-img"src="assets/img/no-data.png" alt="no-data picture">
                </section>

            `
        } else {
            showProductDetails(data)
        }


    })


function showProductDetails(productData) {
    let htmlElement = ''
    document.querySelector('#productDetails').innerHTML = `
                <h1 class="text-center">${productData.product.product_name_fr}</h1>

        <div class="text-center">
            <img class="barcode-img" src="assets/img/barre-code.png" alt="Image d'un code barre">
            <p>${productData.code}</p>
        </div>

        <img class="d-block mx-auto product-img shadow rounded"
            src="${productData.product.selected_images.front.display.fr}"
            alt="${productData.product.product_name_fr}">

        <div id="nutriscore-div" class="shadow-sm rounded my-3 py-3">

            <div class="row justify-content-center">
                <div class="col-5">
                    <img class="img-fluid" src="assets/img/nutriscore/score-${productData.product.nutrition_grade_fr == 'unknown' || productData.product.nutrition_grade_fr == 'not-applicable' ? 'idk' : productData.product.nutrition_grade_fr}.svg" alt="">
                </div>
                <div class="col-6 d-flex flex-column justify-content-center">
                    <div class="text-center fw-bold">
                    ${nutriscoreMsg[productData.product.nutrition_grade_fr] ?? 'Non évalué'}
                    </div>
                </div>
            </div>

        </div>

        <div id="novascore-div" class="bg-light shadow-sm rounded my-3 py-3">

            <div class="row justify-content-center">
                <div class="col-2">
                    <img class="col-2 nova-img" src="assets/img/novascore/nova-${productData.product.nova_group == undefined ? 'idk' : productData.product.nova_group}.svg" alt="">
                </div>
                <div class="col-9 pt-2 d-flex flex-column justify-content-center text-center fw-bold">
                ${novascoreMsg[productData.product.nova_group == undefined ? 0 : productData.product.nova_group]}
                </div>
            </div>

        </div>

        <div class="accordion" id="accordionProduct">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Dénomination générique
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionProduct">
                    <div class="accordion-body">
                    ${productData.product.generic_name == '' ? productData.product.product_name : productData.product.generic_name}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Quantité
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionProduct">
                    <div class="accordion-body">
                    ${productData.product.quantity == '' ? 'Non renseigné' : productData.product.quantity}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Marques
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionProduct">
                    <div class="accordion-body">
                        ${productData.product.brands}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        Catégories
                    </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionProduct">
                    <div class="accordion-body">
                    ${productData.product.categories}
                    </div>
                </div>
            </div>
        </div>

        <a href="index.html" class="btn btn-afpa text-white btn-lg my-4 col-12"><i class="bi bi-upc-scan me-3"></i>Nouvelle
            recherche</a>
        `

    // changement de la couleur du nutriscore
    document.querySelector('#nutriscore-div').style.backgroundColor = nutriscoreBg[productData.product.nutrition_grade_fr]

    return htmlElement

}