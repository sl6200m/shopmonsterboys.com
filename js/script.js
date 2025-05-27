document.addEventListener('DOMContentLoaded', function() {
    // Product Data
    const products = [
        {
            id: 1,
            name: "Monster Tee",
            description: "Cool monster graphic t-shirt for everyday wear",
            price: 24.99,
            image: "assets/1.png"
        },
        {
            id: 2,
            name: "Scary Hoodie",
            description: "Comfy hoodie with a scary monster design",
            price: 49.99,
            image: "assets/2.png"
        },
        {
            id: 3,
            name: "Cute Monster Cap",
            description: "Adjustable cap with cute monster embroidery",
            price: 19.99,
            image: "assets/3.png"
        },
        {
            id: 4,
            name: "Monster Squad Sweater",
            description: "Warm sweater for the whole monster squad",
            price: 39.99,
            image: "assets/4.png"
        },
        {
            id: 5,
            name: "Wild Monster Tank",
            description: "Lightweight tank top for wild monsters",
            price: 22.99,
            image: "assets/5.png"
        },
        {
            id: 6,
            name: "Monster Jeans",
            description: "Distressed jeans with monster patches",
            price: 59.99,
            image: "assets/6.png"
        }
    ];

    // Shopping Cart
    let cart = [];

    // DOM Elements
    const productGrid = document.querySelector('.product-grid');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // Display Products
    function displayProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add to Cart Function
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.className = 'feedback-message';
        feedback.textContent = `${product.name} added to cart!`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }

    // Update Cart Function
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart modal
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            cartItems.appendChild(cartItem);
            
            total += item.price * item.quantity;
        });
        
        totalAmount.textContent = total.toFixed(2);
        
        // Add event listeners to quantity buttons and remove buttons
        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Cart Quantity Functions
    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCart();
    }

    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);
        item.quantity += 1;
        updateCart();
    }

    function removeItem(e) {
        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Checkout Function
    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert(`Thank you for your purchase! Total: $${totalAmount.textContent}`);
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    }

    // Form Submission
    function handleContactFormSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        console.log({ name, email, message });
        
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    }

    function handleNewsletterFormSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        
        // Here you would typically send this data to a server
        console.log({ email });
        
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }

    // Event Listeners
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', checkout);

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', handleContactFormSubmit);
    newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);

    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Initialize
    displayProducts();
});