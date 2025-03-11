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




document.addEventListener('DOMContentLoaded', async function () {
    let cartContainer;
    let productContainer = document.getElementById('product-container');
    let filterOptions = document.getElementById('filter-options');
    const cart = [];

    // Definir la categoría basada en la URL
    let category;
    if (window.location.pathname.includes("Anillos.html")) {
        category = "Anillos";
    } else if (window.location.pathname.includes("Aretes.html")) {
        category = "Aretes";
    } else if (window.location.pathname.includes("Cadenas.html")) {
        category = "Cadenas";
    } else if (window.location.pathname.includes("Charms.html")) {
        category = "Charms";
    } else if (window.location.pathname.includes("Monederos.html")) {
        category = "Monederos";
    }else if (window.location.pathname.includes("Pulseras.html")) {
        category = "Pulseras";
    }else {
        return;
    }

    // Cargar productos desde el JSON correspondiente
    async function loadProducts(filter = "all") {
        if (!productContainer) return;
        productContainer.innerHTML = '';

        try {
            const response = await fetch(`Catalogo/${category}/${category.toLowerCase()}.json`);
            const products = await response.json();

            let filteredProducts = products;
            if (filter === "high") {
                filteredProducts = filteredProducts.filter(p => p.price > 20);
            } else if (filter === "low") {
                filteredProducts = filteredProducts.filter(p => p.price <= 20);
            }

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                <div class="card text-center">
                    <img class="card-img-top mx-auto" src="${product.image}" alt="${product.name}" onerror="this.src='default-image.png'" style="width: 70%; display: block;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Precio: $${product.price.toFixed(2)}</p>
                        <p class="card-text">${product.description}</p>
                        <button class="btn btn-info view-more" data-id="${product.id}" data-toggle="modal" data-target="#productModal">Ver</button>
                    </div>
                </div>`;
                productContainer.appendChild(card);
            });

            addEventListeners(products);
        } catch (error) {
            console.error("Error cargando los productos:", error);
        }
    }

    function addEventListeners(products) {
        document.querySelectorAll('.view-more').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);

                if (product) {
                    document.getElementById('productModalLabel').textContent = product.name;
                    document.getElementById('productModalImage').src = product.image;
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
            });
        });

        let addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);

                if (product) {
                    cart.push(product);
                    updateCartDisplay();
                    alert(`${product.name} ha sido añadido al carrito.`);
                    $('#productModal').modal('hide');
                }
            });
        }
    }

    function updateCartDisplay() {
        if (!cartContainer) return;

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

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartDisplay();
            });
        });
    }
    
    if (filterOptions) {
        filterOptions.addEventListener('change', function () {
            loadProducts(this.value);
        });
    }

    // Crear carrito
    cartContainer = document.createElement('div');
    cartContainer.id = 'cart-container';
    cartContainer.className = 'container mt-5 p-3 border';
    cartContainer.innerHTML = `
        <h2 class="text-center">Carrito de Compras</h2>
        <div id="cart-items"></div>
        <p id="total-cost" class="text-center font-weight-bold">Costo Total: $0.00</p>
    `;
    document.querySelector('.container').appendChild(cartContainer);

    loadProducts();
});