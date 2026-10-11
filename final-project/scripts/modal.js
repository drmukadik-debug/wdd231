const modal = document.querySelector("#product-modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");

/**
 * Open the product details modal.
 * @param {Object} product - Product to display.
 */
export function openProductModal(product) {
    if (!modal || !modalBody || !product) {
        return;
    }

    // Clear previous product details.
    modalBody.replaceChildren();

    // Product image.
    const image = document.createElement("img");
    image.className = "modal-product-image";
    image.src = product.image;
    image.alt = product.name || "Product image";
    image.width = 800;
    image.height = 600;

    // Product category.
    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category || "Uncategorized";

    // Product name.
    const name = document.createElement("h2");
    name.id = "modal-product-title";
    name.textContent = product.name || "Product details";

    // Product details container.
    const details = document.createElement("div");
    details.className = "modal-details";

    // Price.
    const priceParagraph = document.createElement("p");
    const priceLabel = document.createElement("strong");
    priceLabel.textContent = "Price: ";

    const numericPrice = Number(product.price);
    const priceValue = document.createTextNode(
        `${product.currency || ""} ${
            Number.isFinite(numericPrice)
                ? numericPrice.toFixed(2)
                : "Price unavailable"
        }`
    );

    priceParagraph.append(priceLabel, priceValue);

    // Availability.
    const availabilityParagraph = document.createElement("p");
    const availabilityLabel = document.createElement("strong");
    availabilityLabel.textContent = "Availability: ";

    const availabilityValue = document.createTextNode(
        product.availability || "Availability unknown"
    );

    availabilityParagraph.append(
        availabilityLabel,
        availabilityValue
    );

    // Description.
    const descriptionParagraph = document.createElement("p");
    const descriptionLabel = document.createElement("strong");
    descriptionLabel.textContent = "Description: ";

    const descriptionValue = document.createTextNode(
        product.description || "No description available."
    );

    descriptionParagraph.append(
        descriptionLabel,
        descriptionValue
    );

    details.append(
        priceParagraph,
        availabilityParagraph,
        descriptionParagraph
    );

    modalBody.append(
        image,
        category,
        name,
        details
    );

    // Associate the dialog with its visible title.
    modal.setAttribute("aria-labelledby", "modal-product-title");

    // Open the dialog only if it is not already open.
    if (!modal.open) {
        modal.showModal();
    }
}

/**
 * Close the product details modal.
 */
function closeProductModal() {
    if (modal?.open) {
        modal.close();
    }
}

// Close when the close button is clicked.
if (modalClose) {
    modalClose.addEventListener("click", closeProductModal);
}

// Close when the user clicks the backdrop outside the dialog.
if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeProductModal();
        }
    });
}