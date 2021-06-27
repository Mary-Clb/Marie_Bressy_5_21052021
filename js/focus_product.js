var options =""; //variable globale accessible depuis tous les scopes
var mesArticles;
function templateFocusArticle (unArticle){
   unArticle.colors.forEach(colorArticle); // Parcourir chaque couleur pour chaque article 
   //(fonction callback colorArticle qui crée les options de la liste déroulante)
    console.log(options); 
    // interpolation = insérer variable dans chaine de caractère
    return `<div class="col-md-6 my-2 mx-auto">
    <div class="card template-product">
      <img src="${unArticle.imageUrl}" class="card-img-top" alt="ours en peluche"> 
      <div class="card-body">
        <h5 class="name-product py-2">${unArticle.name}</h5>
        <p class="description-product"> Description : ${unArticle.description}</p>
        <p class="price-product"> Prix : ${unArticle.price} $</p>
        <select id="option-color" class="form-select form-select-sm my-3" aria-label=".form-select-sm example" onchange="CheckOption();">
            <option selected value="0">Choississez la couleur</option>
            ${options}
            
            
        </select>
        <div class="d-flex justify-content-center my-1">
        <a class="btn btn-primary" id="add-btn" href="#" onclick="addPanier('${unArticle._id}');" role="button">Ajouter au panier</a>
        </div>
      </div>
    </div>
  </div>`
}

function CheckOption() {
    let userOption = document.getElementById('option-color');
    console.log(userOption.value);
    let addBtn = document.getElementById('add-btn');
    if (userOption.value == 0) {
        addBtn.setAttribute("disabled", true);
        console.log(addBtn);
    }else{
        addBtn.setAttribute("disabled", false);

    }
}

function colorArticle (color) {
   options+= '<option value="'+color+'" >'+color+'</option>';
}
//concaténation = mettre à la suite des chaines de caractères

function addPanier(unId){ // fonction pour l'ajout des articles au panier
    let userOption = document.getElementById('option-color');
    if (userOption.value == 0) {  //si l'utilisateur ne choisit pas de couleur = return 0
        return;
    }    
    mesArticles.forEach(function(article){ 
   
      
        if(unId == article._id) {
            if(localStorage.getItem('panier')){  //on regarde s'il y'a déjà des articles au panier
                let panierJS = localStorage.getItem('panier');
                let panier=JSON.parse(panierJS);
                let existingArticle = false;
                panier.forEach(function(unArticle){ // Parcourir les articles
                    if (article._id == unArticle._id) { // Si l'ajout est un article déjà existant au panier on rajoute 1 en qté
                        existingArticle = true;
                        unArticle.quantity += 1;
                    }
                })
                if (existingArticle == false) {
                    article.quantity = 1; // si l'ajout est un article non existant on définit la quantité sur 1
                    panier.push(article);  
                }
                localStorage.setItem('panier', JSON.stringify(panier));
            }else{
                let panier = [];
                article.quantity = 1;
                panier.push(article);

                localStorage.setItem('panier',JSON.stringify(panier));
            }
           
            alert("L'article a bien été ajouté au panier");
         }
    })
}


function afficheArticle () {
    
    fetch('https://ab-p5-api.herokuapp.com/api/teddies') //récupérer les données de l'API
    .then(function(response) {
        return response.json() // on attend de récuperer les données - tranforme JSON en JAVASCRIPT
    })
    .then(function(articles) { // on récupère l'objet transformé plus haut
        mesArticles = articles;
        console.log(articles); // vérifier les données (tableau de 5 articles)
        let containerArticles = document.getElementById('focus-articles'); // on récupère un élément du DOM avec son ID
        console.log(containerArticles); // Vérifier les données
        articles.forEach(function(article){ // On crée une boucle pour dire que pour chaque article on utilise le template créé plus haut
            console.log(article);
            let url = new URL(document.location.href); // on récupère l'url courante
            let id = url.searchParams.get("id"); // on récupère le paramètre id de l'url
            console.log(id); //  on affiche l'id
            if(id == article._id) {
                containerArticles.innerHTML+=templateFocusArticle(article); // on affiche le template si l'id de l'url est égal
                                                                            // à l'id de l'article parcouru par le foreach
                
                                                                        }
        })

        CheckOption();
    })
    
}

window.onload = afficheArticle; // charger les articles après le chargement de la page