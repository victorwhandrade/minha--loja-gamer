// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Computador Gamer Pc Completo Intel Core i5 8GB SSD...",
        price: 1877,
        image: "image/71yKcQlBe3L._UF894,1000_QL80_.avif"
    },
    {
        id: 2,
        name: "Notebook Acer Nitro V15 ANV15-51-58AZ 13ª Geração Intel... ",
        price: 4657,
        image: "image/51Wv-tEUn6L._AC_SX679_.avif"
    },
    {
        id: 3,
        name: "Computador Completo TOB Intel Core I5 4aGeração Memória...",
        price: 1041,
        image: "image/computador_completo_tob_intel_core_i5_4a_geracao_memoria_8gb_ssd_240gb_teclado_mouse_win10_trial_mon_8269_1_8c7a9cc73ecb2d2ea23548986101be52.avif"
    },
    { 
    id: 4,
    name: "Computador PC Completo Intel I5-6º SSD 240GB 8...",
    price: 1562,
    image: "image/image.avif"
    },
    {
        id: 5,
        name: "PC GAMER RYZEN 5 5600GT, 16GB DDR4, SSD...",
        price: 2499,
        image: "image/71ccDpSdcLL._AC_SL1200_.avif"
    },
    {
        id: 6,
        name: "Computador Completo Mancer, Intel Core i5, Monitor + Tecla..",
        price: 1199,
        image: "image/516laWyUbkL._UF894,1000_QL80_.avif"
    },
    {
        id: 7,
        name: "Computador Completo Intel Core i5 16GB HD 500GB Monitor 17...",
        price: 1060,
        image: "image/computador_completo_tob_intel_core_i5_4a_geracao_memoria_8gb_ssd_240gb_teclado_mouse_win10_trial_mon_8269_1_8c7a9cc73ecb2d2ea23548986101be52.avif"
    },
    {
        id: 8,
        name: "Notebook Acer Aspire 5 A15-51M-54E6 Intel Core I5 13°...",
        price: 2999,
        image:"image/51cj43d2FUL._AC_SX679_.avif"    
    },
    {
        id: 9,
        name: "Computador All In One 21,5 Nextpc Intel Core...",
        price: 2564,
        image:"image/shopping.avif"    
    },
    {
        id: 10,
        name: "Computador Pcyes One I3-3220 8GB DDR3 Ssd256gb W10 Pro...",
        price: 1786,
        image:"image/shoppingg.avif"    
    },
    {
        id: 11,
        name: "Computador Gamer Completo RGB Intel Core i5 8GB SS...",
        price: 2564,
        image:"image/shoppinggg.avif"    
    },
    {
        id: 11,
        name: "Computador Positivo Master D4300 AMD Ryzen 5-4600G RA...",
        price: 1359,
        image:"image/shoppingui.avif"    
    }
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});