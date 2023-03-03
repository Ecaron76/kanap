var urlProduit= document.location.href;
var newUrl = new URL(urlProduit);
var id = newUrl.searchParams.get("id");
console.log(id);
console.log(newUrl);

let test =false;
let panier=[
  
];
let panierTotal=[];
if (localStorage.panierTotal !=  null) {
  panier=JSON.parse(localStorage.panierTotal);
  console.log(panier);
}



fetch("http://localhost:3000/api/products/"+id)

  .then(function(res) {
    
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {  
    
    let product= value;  
    console.log(value);
    let nomProduit=document.getElementById("title");
    nomProduit.textContent=product.name;
    let prixProduit=document.getElementById("price");
    prixProduit.textContent=product.price;
    let pDescription= document.getElementById("description");
    pDescription.textContent=product.description;
    let elt = document.querySelector("section.item article > div.item__img");
    console.log(elt);
    let imgProduit = document.createElement("img");
    imgProduit.src=product.imageUrl;
    imgProduit.alt=product.altTxt;
    elt.appendChild(imgProduit);
    let selectColor=document.getElementById("colors");
    
    for(let n=0; n < product.colors.length; n++){
      let color = document.createElement("option");
      color.value=product.colors[n];
      color.textContent=product.colors[n]
      selectColor.appendChild(color);
      console.log(color);
    }
    document.getElementById("addToCart").addEventListener("click", function() {
      if (panier == false ) {
        panier.push([id,document.getElementById("colors").value,document.getElementById("quantity").value]);
        console.log(panier);
        localStorage.panierTotal=JSON.stringify(panier);
      }else{
        test=false;
        for(var i=0; i<panier.length; i++) {
          if(id == panier[i][0] && document.getElementById("colors").value == panier[i][1]) {
            let quantitéPanier = parseInt(panier[i][2]);
            console.log(quantitéPanier);
            let quantité = parseInt(document.getElementById("quantity").value);
            console.log(quantité);
            quantitéPanier=quantitéPanier+quantité;
            console.log(quantitéPanier);
            panier[i][2]= quantitéPanier.toString();
            console.log(panier[i][2]);
            localStorage.panierTotal=JSON.stringify(panier); 
            test= true;
          }
          console.log(i);
        }
          if(test==false){
            panier.push([id,document.getElementById("colors").value,document.getElementById("quantity").value]);
            console.log(panier);
            localStorage.panierTotal=JSON.stringify(panier);
            test=true;
          }
        } 
      }
      
      
      
      
      
      
      
      
      
      

      
      
      
      
      
      
      
    )
    
    
    
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  


 
  