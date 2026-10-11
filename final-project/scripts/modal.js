const modal = document.querySelector("#product-modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");


export function openProductModal(product) {

    if (!modal || !modalBody) {
        return;
    }

    modalBody.innerHTML = `
        <img
            class="modal-product-image"
            src="${product.image}"
            alt="${product.name}"
            width="800"
            height="600"
        >

        <p class="product-category">${product.category}</p>

        <h2>${product.name}</h2>

        <div class="modal-details">

            <p>
                <strong>Price:</strong>
                ${product.currency} ${product.price.toFixed(2)}
            </p>

            <p>
                <strong>Availability:</strong>
                ${product.availability}
            </p>

            <p>
                <strong>Description:</strong>
                ${product.description}
            </p>

        </div>
    `;

    modal.showModal();
}


function closeProductModal() {
    if (modal) {
        modal.close();
    }
}


if (modalClose) {
    modalClose.addEventListener("click", closeProductModal);
}


if (modal) {
    modal.addEventListener("click", (event) => {

        const rect = modal.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            closeProductModal();
        }
    });
}