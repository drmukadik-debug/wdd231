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


const displayProducts = (items) => {

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";

    if (items.length === 0) {

        productGrid.innerHTML = `
            <p class="error-message">
                No products match your search.
            </p>
        `;

        updateProductCount(0);

        return;
    }


    items.forEach((product) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <img
                class="product-card-image"
                src="${product.image}"
                alt="${product.name}"
                width="800"
                height="600"
                loading="lazy"
            >

            <div class="product-card-content">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>${product.name}</h2>

                <p>
                    ${product.description}
                </p>

                <p class="product-price">
                    ${product.currency} ${product.price.toFixed(2)}
                </p>

                <p class="product-availability ${
                    product.availability === "In Stock"
                        ? "in-stock"
                        : "out-of-stock"
                }">
                    ${product.availability}
                </p>

                <button
                    class="button details-button"
                    type="button"
                    data-id="${product.id}">
                    View Details
                </button>

            </div>
        `;


        const detailsButton =
            card.querySelector(".details-button");


        detailsButton.addEventListener("click", () => {
            openProductModal(product);
        });


        productGrid.appendChild(card);
    });


    updateProductCount(items.length);
};


const updateProductCount = (count) => {

    if (!productCount) {
        return;
    }

    productCount.textContent =
        `${count} product${count !== 1 ? "s" : ""} found.`;
};


const filterProducts = () => {

    const searchTerm =
        searchInput?.value.trim().toLowerCase() || "";

    const selectedCategory =
        categoryFilter?.value || "all";


    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);


        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;


        return matchesSearch && matchesCategory;
    });


    displayProducts(filteredProducts);
};


const getProducts = async () => {

    try {

        const response =
            await fetch("data/products.json");


        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }


        products = await response.json();


        displayProducts(products);


        const savedCategory =
            getPreferredCategory();


        if (
            savedCategory &&
            categoryFilter
        ) {

            categoryFilter.value =
                savedCategory;

            filterProducts();
        }

    } catch (error) {

        console.error(
            "Unable to load products:",
            error
        );


        if (productGrid) {

            productGrid.innerHTML = `
                <p class="error-message">
                    We are unable to load the products
                    at this time. Please try again later.
                </p>
            `;
        }
    }
};


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );
}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        () => {

            savePreferredCategory(
                categoryFilter.value
            );

            filterProducts();
        }
    );
}


getProducts();