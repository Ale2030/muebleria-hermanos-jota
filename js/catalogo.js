import { loadProducts, renderProducts } from './productos.js';

document.addEventListener('DOMContentLoaded', async () => {
    const allProducts = await loadProducts();
    renderProducts(allProducts, 'products-grid');
});

