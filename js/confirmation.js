function Confirmation(){
    let orderHtml =   document.getElementById('confirmationOrder');
  if(localStorage.getItem('contact') && localStorage.getItem('order') && localStorage.getItem('panier')){
 $template = `<p class="text-center">
 Nous vous remerçions pour votre commande n° <strong>${localStorage.getItem('order')}</strong>
 d'un montant de <strong>${localStorage.getItem('total')} $</strong> .
 <br>Un mail de confirmation vous sera bientôt envoyé.</p>
`;
localStorage.clear();

  }else{
    $template = `
<p class="text-center">Vous n'avez pas de commande.</p>
    `;
  }
orderHtml.innerHTML = $template;
}
window.onload = Confirmation;