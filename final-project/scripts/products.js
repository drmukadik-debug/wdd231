import { openProductModal } from "./modal.js";
import {
    savePreferredCategory,
    getPreferredCategory
} from "./storage.js";

const productGrid = document.querySelector("#product-grid");
const productCount = document.querySelector("#product-count");
const searchInput = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");

let products = [];

const validCategories = [
    "all",
    "Clothing",
    "Cosmetics",
    "Accessories"
];

const updateProductCount = (count) => {
    if (!productCount) return;

    productCount.textContent =
        `${count} product${count !== 1 ? "s" : ""} found.`;
};

const displayProducts = (items) => {
    if (!productGrid) return;

    productGrid.innerHTML = "";
    productGrid.setAttribute("aria-busy", "false");

    if (items.length === 0) {
        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent = "No products match your search.";

        productGrid.appendChild(message);
        updateProductCount(0);
        return;
    }

    items.forEach((product) => {
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

        const name = document.createElement("h2");
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

        const availability = document.createElement("p");
        availability.className = "product-availability";

        const isAvailable = product.availability === "In Stock";
        availability.classList.add(
            isAvailable ? "in-stock" : "out-of-stock"
        );
        availability.textContent = product.availability;

        const detailsButton = document.createElement("button");
        detailsButton.className = "button details-button";
        detailsButton.type = "button";
        detailsButton.textContent = "View Details";

        detailsButton.addEventListener("click", () => {
            openProductModal(product);
        });

        content.append(
            category,
            name,
            description,
            price,
            availability,
            detailsButton
        );

        card.append(image, content);
        productGrid.appendChild(card);
    });

    updateProductCount(items.length);
};

const filterProducts = () => {
    const searchTerm = searchInput?.value.trim().toLowerCase() || "";
    const selectedCategory = categoryFilter?.value || "all";

    const filteredProducts = products.filter((product) => {
        const name = String(product.name || "").toLowerCase();
        const description = String(product.description || "").toLowerCase();

        const matchesSearch =
            name.includes(searchTerm) ||
            description.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
};

const getProducts = async () => {
    if (!productGrid) return;

    productGrid.setAttribute("aria-busy", "true");

    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid products data.");
        }

        products = data.filter((product) =>
            product &&
            product.id !== undefined &&
            typeof product.name === "string" &&
            typeof product.category === "string" &&
            typeof product.description === "string" &&
            typeof product.image === "string" &&
            product.price !== undefined &&
            typeof product.currency === "string" &&
            typeof product.availability === "string"
        );

        if (products.length === 0) {
            throw new Error("No valid products found.");
        }

        const urlCategory = new URLSearchParams(
            window.location.search
        ).get("category");

        const savedCategory = getPreferredCategory();

        if (
            categoryFilter &&
            validCategories.includes(urlCategory)
        ) {
            categoryFilter.value = urlCategory;
            savePreferredCategory(urlCategory);
        } else if (
            categoryFilter &&
            validCategories.includes(savedCategory)
        ) {
            categoryFilter.value = savedCategory;
        } else if (categoryFilter) {
            categoryFilter.value = "all";
        }

        filterProducts();
    } catch (error) {
        console.error("Unable to load products:", error);

        productGrid.innerHTML = "";

        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent =
            "We are unable to load the products at this time. Please try again later.";

        productGrid.appendChild(message);
        productGrid.setAttribute("aria-busy", "false");

        if (productCount) {
            productCount.textContent = "Products could not be loaded.";
        }
    }
};

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;

        if (validCategories.includes(category)) {
            savePreferredCategory(category);
        }

        filterProducts();
    });
}

getProducts();