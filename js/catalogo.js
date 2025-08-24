import { loadProducts, renderProducts } from './productos.js';

document.addEventListener('DOMContentLoaded', async () => {
    const allProducts = await loadProducts();
    console.log(allProducts);
    renderProducts(allProducts, 'products-grid');
});

