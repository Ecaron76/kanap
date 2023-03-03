class Produit {
  constructor(name,price,imageProduit,description,altTxt,couleur,id){
    this.name=name;
    this.price=price;
    this.imageProduit=imageProduit;
    this.description=description;
    this.altTxt=altTxt;
    this.couleur=couleur;
    this.id=id;
  }
}
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });