let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getProductImage(name) {
    const images = {
        "Classic T-Shirt": "images/tshirt.jpg",
        "Casual Shirt": "images/shirt.jpg",
        "Regular Jeans": "images/jeans.jpg",
        "Fashion Dress": "images/dress.jpg",
        "Winter Jacket": "images/jacket.jpg",
        "Women Top": "images/top.jpg",
        "Kids Casual T-Shirt": "images/kid.jpg"
    };

    return images[name] || "";
}


// ==============================
// CART COUNT
// ==============================

function updateCartCount() {
    const countElements =
        document.querySelectorAll(".cart-count");

    let totalItems = 0;

    cart.forEach(function(product) {
        totalItems += product.quantity;
    });

    countElements.forEach(function(element) {
        element.textContent = totalItems;
    });
}


// ==============================
// ADD TO CART
// ==============================

function addToCart(name, price, size = "M", quantity = 1) {

    const existingProduct = cart.find(
        product =>
        product.name === name &&
        product.size === size
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: quantity,
            image: getProductImage(name)
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


// ==============================
// DISPLAY CART
// ==============================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        if (cartTotal) {
            cartTotal.textContent = "0";
        }

        updateCartCount();

        return;
    }

    cart.forEach(function(product, index) {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div class="cart-product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </div>

                <div class="cart-product-info">

                    <h3>${product.name}</h3>

                    <p>
                        Price: ₹${product.price}
                    </p>

                    <p>
                        Size: ${product.size}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <p>
                        Subtotal: ₹${itemTotal}
                    </p>

                    <button
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = total;
    }

    updateCartCount();
}


// ==============================
// CHANGE QUANTITY
// ==============================

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ==============================
// REMOVE FROM CART
// ==============================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ==============================
// SEARCH PRODUCTS
// ==============================

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    const products =
        document.querySelectorAll(".product");

    products.forEach(function(product) {

        const productName =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            product.getAttribute(
                "data-category"
            );

        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory = !category ||
            productCategory === category;

        if (
            matchesSearch &&
            matchesCategory
        ) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}


// ==============================
// PAGE LOAD
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        updateCartCount();

        displayCart();
    }
);