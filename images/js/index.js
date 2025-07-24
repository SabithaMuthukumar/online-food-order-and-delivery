// Food items data
const foodItems = {
    1: { name: "Margherita Pizza", originalPrice: 159, discountedPrice: 129, discount: 19, category: "pizzas", taxRate: 0.08 },
    2: { name: "Smoky BBQ Burger", originalPrice: 129, discountedPrice: 99, discount: 23, category: "burgers", taxRate: 0.10 },
    3: { name: "Tandoori Momo", originalPrice: 89, discountedPrice: 69, discount: 22, category: "momos", taxRate: 0.07 },
    4: { name: "Manchow-soup", originalPrice: 60, discountedPrice: 45, discount: 25, category: "soups", taxRate: 0.10 },
    5: { name: "Caesar Salad", originalPrice: 99, discountedPrice: 79, discount: 20, category: "salads", taxRate: 0.06 },
    6: { name: "Icecream Sundae", originalPrice: 129, discountedPrice: 99, discount: 23, category: "ice-creams", taxRate: 0.05 },
    7: { name: "Chicken-Biriyani", originalPrice: 159, discountedPrice: 129, discount: 19, category: "meals", taxRate: 0.08 },
    8: { name: "Panipuri", originalPrice: 50, discountedPrice: 40, discount: 20, category: "chaats", taxRate: 0.07 }
};

let cart = {};
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

    orderSummary.innerHTML = '';
    orderTotals.innerHTML = '';

    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    Object.keys(cart).forEach(itemId => {
        const item = foodItems[itemId];
        const quantity = cart[itemId];
        const itemTotal = item.discountedPrice * quantity;
        const itemDiscount = (item.originalPrice - item.discountedPrice) * quantity;
        const itemTax = itemTotal * item.taxRate;

        subtotal += itemTotal;
        totalDiscount += itemDiscount;
        totalTax += itemTax;

        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>₹${item.discountedPrice.toFixed(2)} x ${quantity} | Tax: ${Math.round(item.taxRate * 100)}%</small>
            </div>
            <div>₹${itemTotal.toFixed(2)}</div>
        `;
        orderSummary.appendChild(orderItem);
    });

    // Delivery charge slabs
    let deliveryCharge = 0;
    if (subtotal >= 500) {
        deliveryCharge = 0;
    } else if (subtotal >= 250) {
        deliveryCharge = 29;
    } else {
        deliveryCharge = 59;
    }

    const total = subtotal + totalTax + deliveryCharge;

    orderTotals.innerHTML = `
        <div class="total-row"><span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
        <div class="total-row"><span>Discount Saved:</span><span style="color: #52c41a;">-₹${totalDiscount.toFixed(2)}</span></div>
        <div class="total-row"><span>Total Tax:</span><span>₹${totalTax.toFixed(2)}</span></div>
        <div class="total-row"><span>Delivery Charge:</span><span>${deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge.toFixed(2)}</span></div>
        <div class="total-row final"><span>Total:</span><span>₹${total.toFixed(2)}</span></div>
    `;

    modal.style.display = 'block';
}

function closeCart() {
    document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
    alert('Order confirmed! Your delicious food will be delivered soon. Thank you for choosing us!');

    cart = {};
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




//transaction option
// JavaScript Functions (Add these to your existing js/index.js file)

// Modified confirmOrder function
function confirmOrder() {
    // Close the order modal
    closeCart();
    // Open payment options modal
    document.getElementById('paymentModal').style.display = 'block';
}

// Handle payment method selection
function selectPaymentMethod(method) {
    if (method === 'cod') {
        // Close payment modal and show COD confirmation
        closePaymentModal();
        document.getElementById('codModal').style.display = 'block';
    } else if (method === 'mobile') {
        // Redirect to transaction page
        window.location.href = 'payment.html';
    }
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Close COD modal
function closeCodModal() {
    document.getElementById('codModal').style.display = 'none';
}

// Close all modals and reset cart
function closeAllModals() {
    closePaymentModal();
    closeCodModal();
    closeCart();
    
    // Reset cart quantities
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`qty-${i}`).textContent = '0';
    }
    
    // Hide cart button
    document.getElementById('cartBtn').style.display = 'none';
    document.getElementById('cartCount').textContent = '0';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const codModal = document.getElementById('codModal');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    }
    if (event.target === codModal) {
        closeCodModal();
    }
}