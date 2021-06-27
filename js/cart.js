var total = 0;

function TemplateCart(article) {
    return `<div class="col-lg-6 mx-auto my-2 border py-3">
    <div class="d-flex justify-content-between">
    <p class="p-bold">${article.name} -</p><p class="p-bold">Qté :</p> ${article.quantity}<p class="p-bold">P.U :</p><p> ${article.price}$ <p class="p-bold">Total :</p><p> ${article.quantity * article.price} $</p>
    </div> `
}

function DeleteCart() {
    if (confirm("Voulez-vous supprimer votre panier ?")) {
        localStorage.clear();
        document.getElementById('template-cart').innerHTML="";
    }
    DisableButton();
}

function TemplateTotalPrice() {
    localStorage.setItem('total', total);
    return `<div class="d-flex justify-content-end my-2">
    <p class="p-bold">Prix total de votre commande : ${total}$</p>
  </div>`;
}

function DisableButton() {
    let addBtn = document.getElementById('order-btn');
    console.log(localStorage.getItem('panier'));
    if (localStorage.getItem('panier')==undefined) {

      //  addBtn.setAttribute("disabled", false);
      addBtn.setAttribute("disabled", true);
      console.log(addBtn);
    }else{

        addBtn.disabled = false;
    }
}

function PrintCart () {
    if(localStorage.getItem('panier')){
        let panierJS = localStorage.getItem('panier');
        let panier=JSON.parse(panierJS);
        panier.forEach(function(article){
            let cart = document.getElementById('template-cart');
            cart.innerHTML += TemplateCart(article);
            total += article.price * article.quantity;

        })
        let cart = document.getElementById('template-cart');
        cart.innerHTML += TemplateTotalPrice();
    }

DisableButton();
}


function ValidForm () {
      var panier = JSON.parse(localStorage.getItem('panier')); //JSON vers JAVASCRIPT
      var products = [];

      let contact = {}; // creation de l'objet contact
      contact.firstName = document.getElementById('firstName').value;
      contact.lastName = document.getElementById('lastName').value;
      contact.address = document.getElementById('address').value;
      contact.city = document.getElementById('city').value;
      contact.email = document.getElementById('email').value;
        localStorage.setItem('contact', JSON.stringify(contact)); //JAVASCRIPT vers JSON
      // Met les données contact et products dans une variable datas à envoyer
      // à l'API avec la méthode POST
      let datas = JSON.stringify({
          'contact': contact, 'products': panier
       })
       console.log(datas);
             fetch("https://ab-p5-api.herokuapp.com/api/teddies/order", {
                method: "POST",
                headers: new Headers({
                "Content-type": "application/json; charset=UTF-8"
             }),
                body: datas
            })
                .then(response => response.json())
                .then(function (json){
                localStorage.setItem('order', JSON.stringify(json.orderId));
                window.location.replace("./confirmation.html");
                });

                return false;
  }

  window.onload = PrintCart;

  