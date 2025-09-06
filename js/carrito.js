// Si el carrito existe en localStorage, se extrae, sino se crea un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Obtener las referencias a los elementos del DOM.
const cartCountElement = document.getElementById('cart-count');
const featuredProductsGrid = document.getElementById('featured-products-grid');

// Crear contenedor de toast
function createToastContainer() {
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Crear carrito desplegable
function createCartDropdown() {
    if (!document.getElementById('cart-dropdown')) {
        const cartDropdown = document.createElement('div');
        cartDropdown.id = 'cart-dropdown';
        cartDropdown.className = 'cart-dropdown';
        cartDropdown.innerHTML = `
            <div class="cart-dropdown-header">
                <h3 class="cart-dropdown-title">Carrito de Compras</h3>
                <button class="cart-dropdown-close" id="cart-dropdown-close">×</button>
            </div>
            <div class="cart-dropdown-content" id="cart-dropdown-content">
                <!-- Los items del carrito se cargarán aquí -->
            </div>
            <div class="cart-dropdown-footer" id="cart-dropdown-footer">
                <!-- El total y botones se cargarán aquí -->
            </div>
        `;
        
        // Agregar el dropdown al contenedor del carrito
        const navCart = document.querySelector('.nav-cart');
        if (navCart) {
            navCart.appendChild(cartDropdown);
            
            // Agregar event listener al botón de cerrar
            const closeBtn = cartDropdown.querySelector('#cart-dropdown-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeCartDropdown);
            }
        }
    }
}

/**
 * Mostrar toast notification
 * @param {string} message Mensaje a mostrar
 * @param {string} type Tipo de toast ('success', 'error', 'info')
 * @param {number} duration Duración en milisegundos
 */
function showToast(message, type = 'success', duration = 3000) {
    createToastContainer();
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Mostrar toast con animación desde la derecha
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Ocultar toast automáticamente
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

/**
 * Actualizar el contador del carrito en el ícono.
 * @param {number} cantidad El número total de productos en el carrito.
 */
function actualizarContadorCarrito(cantidad) {
    if (cartCountElement) {
        cartCountElement.textContent = cantidad;
    }
}

/**
 * Guarda el arreglo del carrito en el almacenamiento local del navegador.
 */
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

/**
 * Formatear precio para mostrar en el carrito
 * @param {number} price Precio a formatear
 * @returns {string} Precio formateado
 */
function formatPrice(price) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 0,
    }).format(price);
}

/**
 * Renderizar el contenido del carrito desplegable
 */
function renderCartDropdown() {
    const content = document.getElementById('cart-dropdown-content');
    const footer = document.getElementById('cart-dropdown-footer');
    
    if (!content || !footer) return;
    
    if (carrito.length === 0) {
        content.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p class="cart-empty-message">Tu carrito está vacío</p>
            </div>
        `;
        footer.innerHTML = '';
        return;
    }
    
    // Renderizar items del carrito
    content.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="cart-item-quantity-btn decrease-btn" data-product-id="${item.id}">-</button>
                    <span class="cart-item-quantity-value">${item.cantidad}</span>
                    <button class="cart-item-quantity-btn increase-btn" data-product-id="${item.id}">+</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones de cantidad
    const decreaseBtns = content.querySelectorAll('.decrease-btn');
    const increaseBtns = content.querySelectorAll('.increase-btn');
    
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            updateCartItemQuantity(productId, -1);
        });
    });
    
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            updateCartItemQuantity(productId, 1);
        });
    });
    
    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);
    
    // Renderizar footer con total y botones
    footer.innerHTML = `
        <div class="cart-total">
            <span class="cart-total-label">Total:</span>
            <span class="cart-total-value">${formatPrice(total)}</span>
        </div>
        <div class="cart-dropdown-actions">
            <button class="btn btn-secondary" id="clear-cart-btn">Vaciar</button>
            <button class="btn btn-primary" id="checkout-btn">Comprar</button>
        </div>
    `;
    
    // Agregar event listeners a los botones del footer
    const clearBtn = footer.querySelector('#clear-cart-btn');
    const checkoutBtn = footer.querySelector('#checkout-btn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearCart();
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            checkout();
        });
    }
}

/**
 * Actualizar cantidad de un item en el carrito
 * @param {number} productId ID del producto
 * @param {number} change Cambio en la cantidad (+1 o -1)
 */
function updateCartItemQuantity(productId, change) {
    const item = carrito.find(p => p.id === productId);
    if (!item) return;
    
    item.cantidad += change;
    
    if (item.cantidad <= 0) {
        // Remover item si la cantidad es 0 o menor
        carrito = carrito.filter(p => p.id !== productId);
        showToast('Producto removido del carrito', 'info');
    }
    
    guardarCarrito();
    actualizarContadorCarrito(carrito.reduce((total, item) => total + item.cantidad, 0));
    
    // Solo renderizar el contenido del carrito sin cerrar el dropdown
    // Mantener el dropdown abierto
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown && dropdown.classList.contains('show')) {
        renderCartDropdown();
    }
}

/**
 * Vaciar el carrito
 */
function clearCart() {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito(0);
    renderCartDropdown();
    showToast('Carrito vaciado', 'info');
    closeCartDropdown();
}

/**
 * Procesar compra (placeholder)
 */
function checkout() {
    showToast('Función de compra en desarrollo', 'info');
    // Aquí se implementaría la lógica de checkout
}

/**
 * Alternar visibilidad del carrito desplegable
 */
function toggleCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    if (!dropdown) return;
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    } else {
        dropdown.classList.add('show');
        renderCartDropdown();
    }
}

/**
 * Cerrar el carrito desplegable
 */
function closeCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

/**
 * Agregar un producto al carrito.
 * @param {object} producto El producto a agregar.
 */
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(p => p.id === producto.id);
    // Si el producto ya está en el carrito, se incrementa su cantidad,
    // sino, se agrega con una cantidad inicial de 1.
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Se guarda el carrito actualizado en el almacenamiento local y se actualiza el contador.
    guardarCarrito();
    
    // Calcular el total de productos (suma de todas las cantidades)
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    actualizarContadorCarrito(totalProductos);

    // Mostrar toast en lugar de alert
    showToast(`Producto agregado al carrito: ${producto.name}`, 'success');
    
    console.log('Producto agregado al carrito:', producto.name);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear contenedores necesarios
    createToastContainer();
    createCartDropdown();
    
    // Agregar event listener al ícono del carrito
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCartDropdown);
    }
    
    // Cerrar dropdown al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('cart-dropdown');
        const cartIcon = document.querySelector('.cart-icon');
        
        // Solo cerrar si el dropdown está abierto y se hace clic fuera de él
        if (dropdown && dropdown.classList.contains('show') && 
            !dropdown.contains(event.target) && !cartIcon.contains(event.target)) {
            closeCartDropdown();
        }
    });
    
    // Se llama a la función al cargar la página para mostrar el número de productos guardados.
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    actualizarContadorCarrito(totalProductos);
    
    // Inicializar menú móvil
    initializeMobileMenu();
});

// Funcionalidad del menú móvil
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}
