
    // Food items data
    const foodItems = {
    1: {name: "Margherita Pizza", originalPrice: 15.99, discountedPrice: 12.99, discount: 20 },
    2: {name: "Smoky BBQ Burger", originalPrice: 12.99, discountedPrice: 9.99, discount: 25 },
    3: {name: "Tandoori Momo", originalPrice: 8.99, discountedPrice: 6.99, discount: 30 },
    4: {name: "Beef Tacos (3 pcs)", originalPrice: 10.99, discountedPrice: 8.99, discount: 18 },
    5: {name: "Caesar Salad", originalPrice: 9.99, discountedPrice: 7.99, discount: 20 },
    6: {name: "Icecream Sundae", originalPrice: 129, discountedPrice: 99, discount: 23 },
    7: {name: "Chicken-Biriyani", originalPrice: 159, discountedPrice: 129, discount: 23 },
    8: {name: "Panipuri", originalPrice: 50, discountedPrice: 40, discount: 20 }
    
    };

    let cart = { };
    let totalItems = 0;

    function changeQuantity(itemId, change) {
        const qtyElement = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyElement.textContent) || 0;

    currentQty += change;
    if (currentQty < 0) currentQty = 0;

    qtyElement.textContent = currentQty;

    // Update cart
    if (currentQty === 0) {
        delete cart[itemId];
        } else {
        cart[itemId] = currentQty;
        }

    updateCartButton();
    }

    function updateCartButton() {
        totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.getElementById('cartCount');

        if (totalItems > 0) {
        cartBtn.style.display = 'block';
    cartCount.textContent = totalItems;
        } else {
        cartBtn.style.display = 'none';
        }
    }

    function openCart() {
        const modal = document.getElementById('orderModal');
    const orderSummary = document.getElementById('orderSummary');
    const orderTotals = document.getElementById('orderTotals');

    // Clear previous content
    orderSummary.innerHTML = '';
    orderTotals.innerHTML = '';

    let subtotal = 0;
    let totalDiscount = 0;

        Object.keys(cart).forEach(itemId => {
            const item = foodItems[itemId];
    const quantity = cart[itemId];
    const itemTotal = item.discountedPrice * quantity;
    const itemDiscount = (item.originalPrice - item.discountedPrice) * quantity;

    subtotal += itemTotal;
    totalDiscount += itemDiscount;

    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
    <div>
        <strong>${item.name}</strong><br>
            <small>$${item.discountedPrice.toFixed(2)} x ${quantity}</small>
    </div>
    <div>$${itemTotal.toFixed(2)}</div>
    `;
    orderSummary.appendChild(orderItem);
        });

    const tax = subtotal * 0.08;
        const deliveryCharge = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + deliveryCharge;

    orderTotals.innerHTML = `
    <div class="total-row">
        <span>Subtotal:</span>
        <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="total-row">
        <span>Discount Saved:</span>
        <span style="color: #52c41a;">-$${totalDiscount.toFixed(2)}</span>
    </div>
    <div class="total-row">
        <span>Tax (8%):</span>
        <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="total-row">
        <span>Delivery Charge:</span>
        <span>${deliveryCharge === 0 ? 'FREE' : '$' + deliveryCharge.toFixed(2)}</span>
    </div>
    <div class="total-row final">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
    </div>
    `;

    modal.style.display = 'block';
    }

    function closeCart() {
        document.getElementById('orderModal').style.display = 'none';
    }

    function confirmOrder() {
        alert('Order confirmed! Your delicious food will be delivered soon. Thank you for choosing us!');

    cart = { };
    totalItems = 0;

        Object.keys(foodItems).forEach(itemId => {
            const qtyElement = document.getElementById(`qty-${itemId}`);
    if (qtyElement) qtyElement.textContent = '0';
        });

    updateCartButton();
    closeCart();
    }

    // Close modal on outside click
    window.onclick = function (event) {
        const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeCart();
        }
    };

    // Smooth scrolling
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });

