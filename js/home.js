function templateArticle (unArticle){
    return `<div class="col-sm-12 col-md-4 my-2">
    <div class="card template-product">
      <img src="${unArticle.imageUrl}" class="card-img-top img-fluid" alt="ours en peluche">
      <div class="card-body">
        <h5 class="name-product py-2">${unArticle.name}</h5>
        <p class="description-product"> Description : ${unArticle.description}</p>
        <p class="price-product"> Prix : ${unArticle.price} $</p>
        <div class="d-flex justify-content-center my-1">
        <a class="btn btn-primary" href="./focus_product.html?id=${unArticle._id}" role="button">Voir l'article</a>
        </div>
      </div>
    </div>
  </div>`
}

//AFFICHER LES ARTICLES SUR LA HOME
function afficheArticle () {
    fetch('https://ab-p5-api.herokuapp.com/api/teddies') //récupérer les données de l'API
      .then(function(response) {
        return response.json() // on attend de récuperer les données - tranforme JSON en JAVASCRIPT
      })
      .then(function(articles) { // on récupère l'objet transformé plus haut
        console.log(articles); // vérifier les données (tableau de 5 articles)
        let containerArticles = document.getElementById('articles'); // on récupère un élément du DOM avec son ID
        console.log(containerArticles); // Vérifier les données
        articles.forEach(function(article){ // On crée une boucle pour dire que pour chaque article on utilise le template créé plus haut
            console.log(article);
            containerArticles.innerHTML+=templateArticle(article);
        })
      })
}

window.onload = afficheArticle; // charger les articles après le chargement de la page