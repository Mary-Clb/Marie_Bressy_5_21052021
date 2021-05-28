function templateFocusArticle (unArticle){
    return `<div class="col my-2">
    <div class="card template-product">
      <img src="${unArticle.imageUrl}" class="card-img-top" alt="ours en peluche">
      <div class="card-body">
        <h5 class="name-product py-2">${unArticle.name}</h5>
        <p class="description-product"> Description : ${unArticle.description}</p>
        <p class="price-product"> Prix : ${unArticle.price} $</p>
        <select class="form-select form-select-sm my-3" aria-label=".form-select-sm example">
            <option selected>Choississez la couleur</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <div class="d-flex justify-content-center my-1">
        <a class="btn btn-primary" href="#" role="button">Ajouter au panier</a>
        </div>
      </div>
    </div>
  </div>`
}

