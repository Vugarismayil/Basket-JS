
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const items = document.querySelectorAll('.add-to-cart');
items.forEach(item => {
    item.addEventListener('click', event => {
        const price = parseFloat(event.target.getAttribute('data-price'));
        addToCart(price);
        updateCart();
    });
});
function addToCart(price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
        price: price,
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.innerText = cartCount;
}
if (window.location.pathname === '/cart.html') {
    showCartItems();
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const index = parseInt(event.target.getAttribute('data-index'));
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        });
    });
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', event => {
            const index = parseInt(event.target.getAttribute('data-index'));
            const quantity = parseInt(event.target.value);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        });
    });
}
function showCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.price.toFixed(2)} TL</td>
        <td>
          <input type="number" min="1" class="quantity" value="${item.quantity}" data-index="${index}">
        </td>
        <td>${(item.price * item.quantity).toFixed(2)} TL</td>
        <td>
          <button class="btn btn-danger remove" data-index="${index}">
            <i class="fa fa-trash"></i> Sil
          </button>
        </td>
      `;
        tableBody.appendChild(row);
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('total');
    totalElement.innerText = total.toFixed(2) + ' TL';
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('#cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;
}
