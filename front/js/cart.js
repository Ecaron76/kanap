let id;
let panier=[];
let totalPrice=0;
let totalQuantity= document.getElementById("totalQuantity");
let totalQteProd = 0;
let productChange;









panier=JSON.parse(localStorage.panierTotal);



for(var i=0; i<panier.length; i++){
    id= panier[i][0];
    let couleur= panier[i][1];
    let quantite = panier[i][2];
        fetch("http://localhost:3000/api/products/"+id)

        .then(function(res) {
    
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) { 
            
            product=value; 
            
            let cart__item = document.createElement("article");
            cart__item.classList.add("cart__item");
            cart__item.dataset.id=product._id;
            cart__item.dataset.color=couleur;
            cart__items.appendChild(cart__item);
            
            let cart__item__img = document.createElement("div");
            cart__item__img.classList.add("cart__item__img");
            console.log(cart__item__img);
            cart__item.appendChild(cart__item__img);
            let imgProduit = document.createElement("img");
            imgProduit.classList.add("logo");
            cart__item__img.appendChild(imgProduit);
            imgProduit.src=product.imageUrl;
            imgProduit.alt=product.altTxt;

            let cart__item__content = document.createElement("div");
            cart__item__content.classList.add("cart__item__content");
            cart__item.appendChild(cart__item__content);
            let cart__item__content__description = document.createElement("div");
            cart__item__content__description.classList.add("cart__item__content__description");
            cart__item__content.appendChild(cart__item__content__description);
            console.log(cart__item__content__description);
            let nomProduit= document.createElement("h2");
            cart__item__content__description.appendChild(nomProduit);
            nomProduit.textContent=product.name;
            let couleurProduit= document.createElement("p");
            cart__item__content__description.appendChild(couleurProduit);
            couleurProduit.innerText=couleur;
            let prix= document.createElement("p");
            cart__item__content__description.appendChild(prix)
            prix.innerText=product.price + " €";

            
            
            
            let cart__item__content__settings = document.createElement("div");
            cart__item__content__settings.classList.add("cart__item__content__settings");
            cart__item__content.appendChild(cart__item__content__settings);

            let cart__item__content__settings__quantity = document.createElement("div");
            cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");
            cart__item__content__settings.appendChild(cart__item__content__settings__quantity)
            let quantiteProduit=document.createElement("p")
            cart__item__content__settings__quantity.appendChild(quantiteProduit);
            quantiteProduit.innerText="Qté : "+ quantite;
            let qteButton = document.createElement("input");
            qteButton.type="number";
            qteButton.classList.add("itemQuantity");
            qteButton.name="itemQuantity";
            qteButton.min=1;
            qteButton.max=100;
            qteButton.value=quantite;
            cart__item__content__settings.appendChild(qteButton);
            // Changement de la quantité d'un produit du panier
            qteButton.addEventListener("change",function(){
                let idChange=cart__item.dataset.id;
                console.log(idChange);
                // Requete sur l'API avec l'ID du produit en question pour modifier la quantitée du bon produit
                fetch("http://localhost:3000/api/products/"+idChange)
                    .then(function(res){
                        if (res.ok) {
                            return res.json();
                        }

                    })
                    .then(function(valueChange){
                        productChange=valueChange;
                        quantiteProduit.innerText="Qté : "+ qteButton.value;
                        console.log(cart__item.dataset.id);
                        for (let j = 0; j < panier.length; j++) {
                            if (panier[j][0]== cart__item.dataset.id && panier[j][1]== cart__item.dataset.color) {
                                // Si la quantitée du produit a été réduite 
                                if (parseInt(panier[j][2])> qteButton.value) {
                                    //Changement du prix final de la commande après réduction de la quantitée du produit
                                    totalPrice= totalPrice - (parseInt(panier[j][2])- qteButton.value)*parseInt(productChange.price);
                                    totalPriceProd.innerText=totalPrice;
                                    // Changement du nombre final de produit de la commande après réduction de la quantitée du produit
                                    totalQteProd= totalQteProd-(parseInt(panier[j][2])-qteButton.value);
                                    totalQuantity.innerText=totalQteProd;
                                // Si la quantitée du produit a été augmenté
                                }else if (parseInt(panier[j][2])< qteButton.value) {
                                    // Changement du prix final de la commande après augmentation de la quantitée du produit
                                    totalPrice= totalPrice + (qteButton.value- parseInt(panier[j][2]))*parseInt(productChange.price);
                                    totalPriceProd.innerText=totalPrice;
                                    // Changement du nombre final de produit de la commande après augmentation de la quantitée du produit
                                    totalQteProd= totalQteProd+(qteButton.value-parseInt(panier[j][2]));
                                    totalQuantity.innerText=totalQteProd;
                                }
                                panier[j][2]=qteButton.value;
                                console.log(panier);
                                
                                localStorage.panierTotal=JSON.stringify(panier);
                                
                            }
                    
                        }
                    })
                    .catch(function(err){
                        // Une erreur est survenue.
                    });
                
                
            })
            
            let cart__item__content__settings__delete = document.createElement("div");
            cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");
            cart__item__content__settings.appendChild(cart__item__content__settings__delete);
            let deleteButton = document.createElement("p");
            deleteButton.classList.add("deleteItem");
            deleteButton.innerText="Supprimer";
            cart__item__content__settings__delete.appendChild(deleteButton);
            // Suppression d'un produit du panier.
            deleteButton.addEventListener("click",function(){
                let idChange=cart__item.dataset.id;
                // Requete sur l'API avec l'ID du produit en question pour supprimer le bon produit
                fetch("http://localhost:3000/api/products/"+idChange)
                    .then(function(res){
                        if (res.ok) {
                            return res.json();
                        }

                    })
                    .then(function(valueChange){
                        productChange=valueChange;
                        for (let j = 0; j < panier.length; j++) {
                            if (panier[j][0]== cart__item.dataset.id && panier[j][1]== cart__item.dataset.color) {
                                // Changement du prix final de la commande après suppression du produit
                                totalPrice= totalPrice-qteButton.value*parseInt(productChange.price);
                                totalPriceProd.innerText=totalPrice;
                                // Changement du nombre final de produit de la commande après suppression du produit
                                totalQteProd=totalQteProd-qteButton.value;
                                totalQuantity.innerText=totalQteProd;
                                // Mise à jour du panier et du localStorage après suppression du produit
                                panier.splice(j,1);
                                localStorage.panierTotal=JSON.stringify(panier);
                                cart__item.remove();
                                
                                
                            }
                            
                        }
                        
                    })
                    .catch(function(err){
                        // Une erreur est survenue.
                    });
                
                
            })
            
            
            // Affichage du prix total de la commande
            totalPrice=totalPrice+ parseInt(product.price)*quantite;
            let totalPriceProd = document.getElementById("totalPrice");
            totalPriceProd.innerText=totalPrice;
           
            
        })
        .catch(function(err) {
      // Une erreur est survenue
        })}



for (let k = 0; k < panier.length; k++) {
    totalQteProd= totalQteProd + parseInt(panier[k][2]); 
}
// affichage du nombre total de produit dans la commande 
totalQuantity.innerText=totalQteProd;

// Envoi données formulaire 
const envoieFormulaire = document.getElementById("order");
envoieFormulaire.addEventListener("click", async function (e) {
    e.preventDefault();
    // Création Objet contact contenant les valeurs des champs du formulaire 
    const contact={
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            email : document.getElementById("email").value
    };
    // Fonctions controle champs formulaire //
    function nomControl(){
        const nom = contact.lastName;
        if (regExPrenomNomVille(nom)) {
            return true;
        }else{
            document.getElementById("lastNameErrorMsg").innerText="Veuillez correctement renseigner votre nom";
        }
    };
    function prenomControl(){
        const prenom = contact.firstName;
        if (regExPrenomNomVille(prenom)) {
            return true;
        }else{
            document.getElementById("firstNameErrorMsg").innerText="Veuillez correctement renseigner votre prenom";
        }
    };
    function villeControl(){
        const ville = contact.city;
        if (regExPrenomNomVille(ville)) {
            return true;
        }else{
            document.getElementById("cityErrorMsg").innerText="Veuillez correctement renseigner votre ville";
        }
    };
    function emailControl(){
        const email = contact.email;
        if (regExEmail(email)) {
            return true;
        }else{
            document.getElementById("emailErrorMsg").innerText="Veuillez correctement renseigner votre adresse-mail";
        }
    };
    function adresseControl(){
        const adresse = contact.address;
        if (regExAdresse(adresse)) {
            return true;
        }else{
            document.getElementById("addressErrorMsg").innerText="Veuillez correctement renseigner votre adresse postale";
        }
    };
    
    
    
   
    
    
    
    if (nomControl() && prenomControl() && villeControl() && adresseControl() && emailControl()) {
        
        // création du tableau de produit du panier
        let products= [];
        for (let x = 0; x < panier.length; x++) {
            products.push(panier[x][0])
            
        }
        // constante contenant les deux valeurs à envoyer à l'API
        const aEnvoyer = {contact,products};

        // REQUETE POST sur l'API pour valider la commande
        let response = await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(aEnvoyer)
        });
        let result = await response.json();
        console.log(result)
        // Récupération de l'ID de la commande 
        var urlConfirmation= "confirmation.html?"+result.orderId;
        document.location.href=urlConfirmation;
        
    }
})





// Fonction Fleché RegEx pour tester champs //
const regExPrenomNomVille = (valueForm) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(valueForm);

};
const regExEmail = (valueForm) => {
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(valueForm);

};
const regExAdresse = (valueForm) => {
    return /^[A-Za-z0-9\s]{5,60}$/.test(valueForm);
};








    
