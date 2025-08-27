// Si el carrito existe en localStorage, se extrae, sino se crea un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Obtener las referencias a los elementos del DOM.
const cartCountElement = document.getElementById('cart-count');
const featuredProductsGrid = document.getElementById('featured-products-grid');

/**
 * Actualizar el contador del carrito en el ícono.
 * @param {number} cantidad El número de productos en el carrito.
 */
function actualizarContadorCarrito(cantidad) {
    cartCountElement.textContent = cantidad;
}

/**
 * Guarda el arreglo del carrito en el almacenamiento local del navegador.
 */
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
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
    actualizarContadorCarrito(carrito.length);

    console.log('Producto agregado al carrito:', producto.nombre);
    alert('Producto agregado al carrito:', producto.nombre);
}

// Se llama a la función al cargar la página para mostrar el número de productos guardados.
actualizarContadorCarrito(carrito.length);
