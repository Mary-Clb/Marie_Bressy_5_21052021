var total = 0;

function TemplateCart(article) {
    return `<div class="col-lg-6 mx-auto my-4 border py-3">
    <div class="d-flex justify-content-between">
      <p>${article.name} - ${article.quantity} - ${article.price} $</p><p>${article.quantity * article.price}  $</p>
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
    return `<div class="d-flex justify-content-end my-2">
    <p>Prix total de votre commande : ${total}$</p>
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
    let formData = new FormData(document.getElementById('form-order'));
    fetch("https://ab-p5-api.herokuapp.com/api/teddies/order"), {
        
        // Adding method type
        method: "POST",
        
        // Adding body or contents to send
        body: JSON.stringify({
            body: formData,
            panier: localStorage.getItem('panier');
        }),
        
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
.then(response => response.json())
// Displaying results to console
.then(json => console.log(json));




    console.log(formData);
    return false;
}

window.onload = PrintCart;