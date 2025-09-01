// Cargar productos destacados en la página de inicio
document.addEventListener('DOMContentLoaded', async () => {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    
    if (featuredProductsGrid) {
        try {
            // Cargar todos los productos
            const allProducts = await loadProducts();
            
            // Filtrar solo los productos destacados
            const featuredProducts = allProducts.filter(product => product.featured);
            
            // Mostrar solo los primeros 6 productos destacados
            const limitedFeaturedProducts = featuredProducts.slice(0, 6);
            
            // Renderizar productos destacados limitados
            renderProducts(limitedFeaturedProducts, 'featured-products-grid');
            
            // Agregar botón "Ver más" si hay más de 6 productos destacados
            if (featuredProducts.length > 6) {
                const container = featuredProductsGrid.parentElement;
                const seeMoreButton = document.createElement('div');
                seeMoreButton.className = 'see-more-container';
                seeMoreButton.innerHTML = `
                    <a href="productos.html" class="btn btn-secondary see-more-btn">
                        Ver más
                    </a>
                `;
                container.appendChild(seeMoreButton);
            }
            
        } catch (error) {
            console.error('Error al cargar productos destacados:', error);
            
            // Mostrar mensaje de error
            if (featuredProductsGrid) {
                featuredProductsGrid.innerHTML = `
                    <p style="text-align: center; color: var(--error-color); grid-column: 1/-1;">
                        Error al cargar los productos destacados. Por favor, inténtalo de nuevo.
                    </p>
                `;
            }
        }
    }
});
