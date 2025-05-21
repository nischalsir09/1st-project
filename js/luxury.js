document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#cart-close');
    const cartContent = document.querySelector('.cart-content');
    const cartCount = document.querySelector('.cart-count');
    const buyButton = document.querySelector('.btn-buy');
    // Open and close cart
    cartIcon.addEventListener('click', () => cart.classList.add('active'));
    closeCart.addEventListener('click', () => cart.classList.remove('active'));
    // Add to cart
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.content');
            const name = product.querySelector('h2').innerText;
            const price = event.target.dataset.price;
            const img = product.querySelector('img').src;
            // Check if product already exists in the cart
            if ([...cartContent.querySelectorAll('.cart-product-title')].some(item => item.innerText === name)) {
                alert('This item is already in your cart!');
                return;
            }
            // Add item to cart
            const cartBox = document.createElement('div');
            cartBox.classList.add('cart-box');
            cartBox.innerHTML = `
                <img src="${img}" alt="${name}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${name}</div>
                    <div class="cart-price">Rs. ${parseFloat(price).toLocaleString('en-IN')}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
            `;
            cartContent.appendChild(cartBox);
            updateCart();
            // Add event listeners
            cartBox.querySelector('.cart-remove').addEventListener('click', () => {
                cartBox.remove();
                updateCart();
            });
            cartBox.querySelector('.cart-quantity').addEventListener('change', (e) => {
                if (e.target.value <= 0) e.target.value = 1;
                updateCart();
            });
        });
    });
    // Buy button functionality
    buyButton.addEventListener('click', () => {
        if (cartContent.children.length > 0) {
            alert('Thank you for your purchase!');
            cartContent.innerHTML = '';
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });
    function updateCart() {
        let total = 0;
        document.querySelectorAll('.cart-box').forEach(cartBox => {
            const price = parseFloat(cartBox.querySelector('.cart-price').innerText.replace(/[Rs.,]/g, ''));
            const quantity = cartBox.querySelector('.cart-quantity').value;
            total += price * quantity;
        });
        document.querySelector('.total-price').innerText = `Rs. ${total.toLocaleString('en-IN')}`;
        cartCount.textContent = cartContent.children.length;
    }
});
