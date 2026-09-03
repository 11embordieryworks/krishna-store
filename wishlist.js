let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


function updateWishlistCount() {

    const countElements =
        document.querySelectorAll(".wishlist-count");

    countElements.forEach(function(element) {
        element.textContent = wishlist.length;
    });
}


function toggleWishlist(name, price, id, image) {

    const existingProduct = wishlist.find(
        product => product.id === id
    );

    if (existingProduct) {

        wishlist = wishlist.filter(
            product => product.id !== id
        );

    } else {

        wishlist.push({
            name: name,
            price: price,
            id: id,
            image: image
        });
    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistButtons();
    updateWishlistCount();
}


function updateWishlistButtons() {

    document.querySelectorAll(".wishlist-btn")
        .forEach(function(button) {

            const id =
                button.getAttribute("data-id");

            const exists = wishlist.some(
                product => product.id === id
            );

            button.textContent =
                exists ? "♥️" : "♡";

            button.classList.toggle(
                "active",
                exists
            );
        });
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        updateWishlistButtons();
        updateWishlistCount();
    }
);