document.addEventListener('DOMContentLoaded', function() {
    var myCarousel = new bootstrap.Carousel(document.getElementById('imageCarousel'), {
        interval: 3000,
        wrap: true
    });

    
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => displayproducts(data));

    
    document.querySelector('form[role="search"]').addEventListener('submit', function(event) {
        event.preventDefault();
        searchProducts();
    });
});

const productcards = [];

function displayproducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        const classes = ['col-12', 'col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-3', 'col-xxl-3', 'items'];
        card.classList.add(...classes);

        card.innerHTML = `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
                <p class="card-text">${product.description}</p>
                <a href="#" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
        `;

        
        productcards.push(card);
        container.appendChild(card);
    });
}

function searchProducts() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const items = document.getElementsByClassName('items');
    
    let itemFound = false;

    Array.from(items).forEach(item => {
        const title = item.getElementsByClassName('card-title')[0].textContent.toLowerCase();
        const description = item.getElementsByClassName('card-text')[1]?.textContent.toLowerCase(); 
        
        
        item.style.display = 'none';
        
        
        if (title.includes(searchValue) || (description && description.includes(searchValue))) {
            item.style.display = 'block';
            itemFound = true;
        }
    });

    
    if (!itemFound) {
        alert('No products found');
    }
}
