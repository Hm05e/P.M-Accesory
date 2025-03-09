/* Modo Oscuro*/


document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});


/* Alertas Modales*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('¡Formulario enviado con éxito!');
        });
    }
});

/* Efecto Mouse*/

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.hover-effect');
    elements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        element.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

/* Iframe*/

// video
function changeYouTubeVideo(videoId) {
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
}

// mapa de Google
function changeMapLocation(lat, lng) {
    const iframe = document.getElementById('googleMapIframe');
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}`;
}

/* Formulario*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (email === '' || message === '') {
                event.preventDefault();
                alert('Por favor, complete todos los campos obligatorios.');
            }
        });
    }
});


/* productos ver detalle pagina de anillos*/

document.addEventListener('DOMContentLoaded', function () {

    let cartContainer;
    let productContainer = document.getElementById('product-container');
    let filterOptions = document.getElementById('filter-options');
    const cart = [];
    const productPath = 'Catalogo/Anillos';
    const products = [
        { id: 1, name: "Anillo Clásico", price: 15, description: "Un diseño atemporal perfecto para cualquier ocasión." },
        { id: 2, name: "Anillo Elegante", price: 18, description: "Destaca con este elegante anillo de plata." },
        { id: 3, name: "Anillo de Plata", price: 20, description: "Diseño minimalista en plata pura." },
        { id: 4, name: "Anillo Moderno", price: 22, description: "Un anillo moderno para looks sofisticados." },
        { id: 5, name: "Anillo con Diamantes", price: 30, description: "Incluye detalles con diamantes brillantes." },
        { id: 6, name: "Anillo Vintage", price: 25, description: "Estilo retro con un toque único." },
        { id: 7, name: "Anillo Minimalista", price: 12, description: "Diseño simple pero elegante." },
        { id: 8, name: "Anillo Dorado", price: 19, description: "Anillo dorado con acabado premium." },
        { id: 9, name: "Anillo Bohemio", price: 16, description: "Perfecto para un estilo relajado y bohemio." },
        { id: 10, name: "Anillo Único", price: 40, description: "Un diseño exclusivo hecho a mano." }
    ];

    if (window.location.pathname.includes("Anillos.html")) {
        cartContainer = document.createElement('div');
        cartContainer.id = 'cart-container';
        cartContainer.className = 'container mt-5 p-3 border';
        cartContainer.innerHTML = `
            <h2 class="text-center">Carrito de Compras</h2>
            <div id="cart-items"></div>
            <p id="total-cost" class="text-center font-weight-bold">Costo Total: $0.00</p>
        `;
        document.querySelector('.container').appendChild(cartContainer);
    }

    function loadProducts(filter = "all") {
        if (!productContainer) return;  // Si no estamos en Anillos.html, no hacer nada

        productContainer.innerHTML = '';
        let filteredProducts = products;
        if (filter === "high") {
            filteredProducts = products.filter(product => product.price > 20);
        } else if (filter === "low") {
            filteredProducts = products.filter(product => product.price <= 20);
        }
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
            <div class="card text-center">
                <img class="card-img-top mx-auto" src="${productPath}/anillo${product.id}.png" alt="${product.name}" onerror="this.src='default-image.png'" style="width: 70%; display: block;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price.toFixed(2)}</p>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-info view-more" data-id="${product.id}" data-toggle="modal" data-target="#productModal">Ver</button>   
                    </div>
                </div>
            </div>`;
            productContainer.appendChild(card);
        });
    }

    function updateCartDisplay() {
        if (!cartContainer) return; // Si no estamos en Anillos.html, no hacer nada

        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let totalCost = 0;
        cart.forEach((product, index) => {
            totalCost += product.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item border p-2 mb-2';
            cartItem.innerHTML = `
                <p>${product.name} - $${product.price.toFixed(2)}
                <button class="btn btn-danger btn-sm float-right remove-from-cart" data-index="${index}">Quitar</button></p>
            `;
            cartItems.appendChild(cartItem);
        });
        document.getElementById('total-cost').textContent = `Costo Total: $${totalCost.toFixed(2)}`;
    }

    if (productContainer) {
        productContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('view-more')) {
                const productId = e.target.getAttribute('data-id');
                const product = products.find(p => p.id === parseInt(productId));

                if (product) {
                    document.getElementById('productModalLabel').textContent = product.name;
                    document.getElementById('productModalImage').src = `${productPath}/anillo${product.id}.png`;
                    document.getElementById('productModalImage').onerror = function() {
                        this.src = 'default-image.png';
                    };
                    document.getElementById('productModalPrice').textContent = `Precio: $${product.price.toFixed(2)}`;
                    document.getElementById('productModalDescription').textContent = product.description;

                    let addToCartBtn = document.getElementById('add-to-cart');
                    if (addToCartBtn) {
                        addToCartBtn.setAttribute('data-id', product.id);
                    }
                }
            }
        });
    }

    if (cartContainer) {
        cartContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-from-cart')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartDisplay();
            }
        });
    }

    let addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const product = products.find(p => p.id === parseInt(productId));

            if (product) {
                cart.push(product);
                updateCartDisplay();
                alert(`${product.name} ha sido añadido al carrito.`);
            }
        });
    }

    if (filterOptions) {
        filterOptions.addEventListener('change', function () {
            loadProducts(this.value);
        });
    }

    loadProducts();
});


/* productos ver detalle pagina de aretes*/

document.addEventListener('DOMContentLoaded', function () {

    let cartContainer;
    let productContainer = document.getElementById('product-container');
    let filterOptions = document.getElementById('filter-options');
    const cart = [];
    const productPath = 'Catalogo/Anillos';
    const products = [
        { id: 1, name: "Arete Clásico", price: 15, description: "Un diseño atemporal perfecto para cualquier ocasión." },
        { id: 2, name: "Arete Elegante", price: 18, description: "Destaca con este elegante anillo de plata." },
        { id: 3, name: "Arete de Plata", price: 20, description: "Diseño minimalista en plata pura." },
        { id: 4, name: "Arete Moderno", price: 22, description: "Un anillo moderno para looks sofisticados." },
        { id: 5, name: "Arete con Diamantes", price: 30, description: "Incluye detalles con diamantes brillantes." },
        { id: 6, name: "Arete Vintage", price: 25, description: "Estilo retro con un toque único." },
        { id: 7, name: "Arete Minimalista", price: 12, description: "Diseño simple pero elegante." },
        { id: 8, name: "Arete Dorado", price: 19, description: "Anillo dorado con acabado premium." },
        { id: 9, name: "Arete Bohemio", price: 16, description: "Perfecto para un estilo relajado y bohemio." },
        { id: 10, name: "Arete Único", price: 40, description: "Un diseño exclusivo hecho a mano." }
    ];

    if (window.location.pathname.includes("Aretes.html")) {
        cartContainer = document.createElement('div');
        cartContainer.id = 'cart-container';
        cartContainer.className = 'container mt-5 p-3 border';
        cartContainer.innerHTML = `
            <h2 class="text-center">Carrito de Compras</h2>
            <div id="cart-items"></div>
            <p id="total-cost" class="text-center font-weight-bold">Costo Total: $0.00</p>
        `;
        document.querySelector('.container').appendChild(cartContainer);
    }

    function loadProducts(filter = "all") {
        if (!productContainer) return;  // Si no estamos en Anillos.html, no hacer nada

        productContainer.innerHTML = '';
        let filteredProducts = products;
        if (filter === "high") {
            filteredProducts = products.filter(product => product.price > 20);
        } else if (filter === "low") {
            filteredProducts = products.filter(product => product.price <= 20);
        }
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
            <div class="card text-center">
                <img class="card-img-top mx-auto" src="${productPath}/anillo${product.id}.png" alt="${product.name}" onerror="this.src='default-image.png'" style="width: 70%; display: block;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price.toFixed(2)}</p>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-info view-more" data-id="${product.id}" data-toggle="modal" data-target="#productModal">Ver</button>   
                    </div>
                </div>
            </div>`;
            productContainer.appendChild(card);
        });
    }

    function updateCartDisplay() {
        if (!cartContainer) return; // Si no estamos en Anillos.html, no hacer nada

        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let totalCost = 0;
        cart.forEach((product, index) => {
            totalCost += product.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item border p-2 mb-2';
            cartItem.innerHTML = `
                <p>${product.name} - $${product.price.toFixed(2)}
                <button class="btn btn-danger btn-sm float-right remove-from-cart" data-index="${index}">Quitar</button></p>
            `;
            cartItems.appendChild(cartItem);
        });
        document.getElementById('total-cost').textContent = `Costo Total: $${totalCost.toFixed(2)}`;
    }

    if (productContainer) {
        productContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('view-more')) {
                const productId = e.target.getAttribute('data-id');
                const product = products.find(p => p.id === parseInt(productId));

                if (product) {
                    document.getElementById('productModalLabel').textContent = product.name;
                    document.getElementById('productModalImage').src = `${productPath}/anillo${product.id}.png`;
                    document.getElementById('productModalImage').onerror = function() {
                        this.src = 'default-image.png';
                    };
                    document.getElementById('productModalPrice').textContent = `Precio: $${product.price.toFixed(2)}`;
                    document.getElementById('productModalDescription').textContent = product.description;

                    let addToCartBtn = document.getElementById('add-to-cart');
                    if (addToCartBtn) {
                        addToCartBtn.setAttribute('data-id', product.id);
                    }
                }
            }
        });
    }

    if (cartContainer) {
        cartContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-from-cart')) {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                updateCartDisplay();
            }
        });
    }

    let addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const product = products.find(p => p.id === parseInt(productId));

            if (product) {
                cart.push(product);
                updateCartDisplay();
                alert(`${product.name} ha sido añadido al carrito.`);
            }
        });
    }

    if (filterOptions) {
        filterOptions.addEventListener('change', function () {
            loadProducts(this.value);
        });
    }

    loadProducts();
});