const featuredProducts = document.querySelector("#featured-products");

const displayFeaturedProducts = (products) => {
    if (!featuredProducts) return;

    featuredProducts.innerHTML = "";

    products.slice(0, 6).forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-card-image";
        image.src = product.image;
        image.alt = product.name;
        image.width = 800;
        image.height = 600;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "product-card-content";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "product-price";

        const numericPrice = Number(product.price);
        price.textContent = `${product.currency} ${
            Number.isFinite(numericPrice)
                ? numericPrice.toFixed(2)
                : "Price unavailable"
        }`;

        content.append(category, name, description, price);
        card.append(image, content);
        featuredProducts.appendChild(card);
    });
};

const getFeaturedProducts = async () => {
    if (!featuredProducts) return;

    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const products = await response.json();

        if (!Array.isArray(products)) {
            throw new Error("Invalid products data.");
        }

        displayFeaturedProducts(products);
    } catch (error) {
        console.error("Unable to load featured products:", error);
        featuredProducts.textContent =
            "Featured products are temporarily unavailable.";
    }

    featuredProducts.setAttribute("aria-busy", "false");
};

getFeaturedProducts();