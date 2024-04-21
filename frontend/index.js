fetch('http://localhost:8080/views/home')
    .then(response => response.json())
    .then(res => { 
        res.data.forEach(product => {
            document.getElementById('containerProducts').innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src=${product.thumbnail} class="card-img-top" alt="...">
                <div class="card-body">
                    <h1 class="card-title">${product.title}</h1>
                    <p class="card-text">${product.description}</p>
                    <h3 class="card-text">Categoria:${product.category}</h3>
                    <h4 class="card-text">${product.price}</h4>
                    <p class="card-text">Cant:${product.stock}</p>
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-primary btnAddToCart" data-id="${product._id}">Add to cart</button>
                        <a class="btn btn-primary" target="_blank" href="http://localhost:8080/views/products/details/${product._id}">Detalles</a>
                    </div>
                </div>
            </div>`
        });
    })