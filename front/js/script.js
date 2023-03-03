

fetch("http://localhost:3000/api/products")

  .then(function(res) {
    
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    
    let n=0;
    while( n < value.length){
        
        let product = value[n];
        let section = document.getElementById("items")
        let a = document.createElement("a");
        a.href=("./product.html?id=" + product._id);
        section.appendChild(a);
        let articleProduit = document.createElement("article");
        a.appendChild(articleProduit);
        let imageProduit = document.createElement("img");
        imageProduit.src=product.imageUrl;
        imageProduit.alt=product.altTxt;
        articleProduit.appendChild(imageProduit);
        let nomProduit = document.createElement("h3");
        nomProduit.classList.add("productName");
        nomProduit.textContent=product.name;
        articleProduit.appendChild(nomProduit);
        let descriptionProduit = document.createElement("p");
        descriptionProduit.classList.add("productDescription");
        descriptionProduit.textContent=product.description;
        articleProduit.appendChild(descriptionProduit);
        
        
        n++;

    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
