let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Hero slideshow — infinite loop
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 4000);
    }

    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('mobileOverlay');

    function closeMobileNav() {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                closeMobileNav();
            } else {
                navMenu.classList.add('active');
                hamburger.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.body.classList.add('nav-open');
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMobileNav();
            // Also close cart if open
            const cartSidebar = document.getElementById('cartSidebar');
            if (cartSidebar && cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                document.body.classList.remove('cart-open');
            }
        });
    }

    // Close nav when tapping a nav link (mobile)
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMobileNav, 150);
            });
        });
    }

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    updateCartDisplay();

    // Load dynamic content from admin localStorage
    renderServicesInBookingForm();
    renderHomepage();
});

// Populate booking form service dropdown from admin data
function renderServicesInBookingForm() {
    const serviceSelect = document.getElementById('service');
    if (!serviceSelect) return;
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    if (!services.length) return;
    serviceSelect.innerHTML = '<option value="">Select a service</option>' +
        services.map(s => `<option value="${s.name.toLowerCase().replace(/\s+/g,'-')}" data-price="${s.price}">${s.name} - $${s.price}</option>`).join('');
}

// Render all homepage content from admin localStorage
function renderHomepage() {
    const h = JSON.parse(localStorage.getItem('homepage') || '{}');
    if (!Object.keys(h).length) return;

    // Hero
    if (h.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSlogan = document.querySelector('.hero-slogan');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBtn = document.querySelector('.btn-hero');
        if (heroTitle)    heroTitle.textContent    = h.hero.title    || 'Glam by Nae';
        if (heroSlogan)   heroSlogan.textContent   = h.hero.slogan   || '';
        if (heroSubtitle) heroSubtitle.textContent = h.hero.subtitle || '';
        if (heroBtn)      heroBtn.textContent      = h.hero.btn      || 'Book Your Glam';
    }

    // Services Preview
    if (h.servicesPreview) {
        const sp = h.servicesPreview;
        const svcSection = document.querySelector('.services-preview');
        if (svcSection) {
            const svcTitle = svcSection.querySelector('.section-title');
            const svcSub   = svcSection.querySelector('.section-subtitle');
            if (svcTitle) svcTitle.textContent = sp.title    || 'Our Services';
            if (svcSub)   svcSub.textContent   = sp.subtitle || '';
            const cards = svcSection.querySelectorAll('.service-card');
            if (sp.cards && sp.cards.length) {
                sp.cards.forEach((c, i) => {
                    if (cards[i]) {
                        const img  = cards[i].querySelector('.service-card-img');
                        const icon = cards[i].querySelector('.service-icon');
                        const name = cards[i].querySelector('h3');
                        const desc = cards[i].querySelector('p');
                        if (img && c.img) { img.src = c.img; img.style.display = 'block'; }
                        if (icon) icon.textContent = c.icon || '';
                        if (name) name.textContent = c.name || '';
                        if (desc) desc.textContent = c.desc || '';
                    }
                });
            }
        }
    }

    // Meet Nae
    if (h.meetNae) {
        const mn = h.meetNae;
        const aboutSection = document.querySelector('.about-preview');
        if (aboutSection) {
            const naeImg  = aboutSection.querySelector('.meet-nae-img');
            const heading = aboutSection.querySelector('.about-content h2');
            const paras   = aboutSection.querySelectorAll('.about-text');
            const btn     = aboutSection.querySelector('.btn-secondary');
            if (naeImg && mn.img) naeImg.src = mn.img;
            if (heading)   heading.textContent = mn.title || 'Meet Nae';
            if (paras[0])  paras[0].textContent = mn.p1 || '';
            if (paras[1])  paras[1].textContent = mn.p2 || '';
            if (btn)       btn.textContent = mn.btn || 'Learn More About Nae';
        }
    }

    // Transformations
    if (h.transformations) {
        const tr = h.transformations;
        const trSection = document.querySelector('.transformation');
        if (trSection) {
            const trTitle = trSection.querySelector('.section-title');
            const trSub   = trSection.querySelector('.section-subtitle');
            if (trTitle) trTitle.textContent = tr.title    || 'Transformations';
            if (trSub)   trSub.textContent   = tr.subtitle || '';
            const items = trSection.querySelectorAll('.transformation-item');
            if (tr.items && tr.items.length) {
                tr.items.forEach((t, i) => {
                    if (items[i]) {
                        const imgs = items[i].querySelectorAll('.transform-img');
                        if (imgs[0] && t.before) imgs[0].src = t.before;
                        if (imgs[1] && t.after)  imgs[1].src = t.after;
                    }
                });
            }
        }
    }

    // Mimi Cosmetics / Products
    if (h.products) {
        const pr = h.products;
        const prodSection = document.querySelector('.featured-products');
        if (prodSection) {
            const prTitle = prodSection.querySelector('.section-title');
            const prSub   = prodSection.querySelector('.section-subtitle');
            if (prTitle) prTitle.textContent = pr.title    || 'Mimi Cosmetics';
            if (prSub)   prSub.textContent   = pr.subtitle || '';
            const prodCards = prodSection.querySelectorAll('.product-card');
            if (pr.items && pr.items.length) {
                pr.items.forEach((p, i) => {
                    if (prodCards[i]) {
                        const img   = prodCards[i].querySelector('.product-img');
                        const name  = prodCards[i].querySelector('h3');
                        const price = prodCards[i].querySelector('.product-price');
                        const btn   = prodCards[i].querySelector('.btn-add-cart');
                        if (img && p.img) img.src = p.img;
                        if (name)  name.textContent  = p.name  || '';
                        if (price) price.textContent = '$' + (p.price || '0.00');
                        if (btn)   btn.setAttribute('onclick', "addToCart('" + (p.name || '').replace(/'/g, "\\'") + "', " + parseFloat(p.price || 0) + ")");
                    }
                });
            }
        }
    }

    // Testimonials
    if (h.testimonials) {
        const t = h.testimonials;
        const testSection = document.querySelector('.testimonials');
        if (testSection) {
            const testTitle = testSection.querySelector('.section-title');
            const testSub   = testSection.querySelector('.section-subtitle');
            if (testTitle) testTitle.textContent = t.title    || 'What Clients Say';
            if (testSub)   testSub.textContent   = t.subtitle || '';
            const reviewCards = testSection.querySelectorAll('.testimonial-card');
            if (t.reviews && t.reviews.length) {
                t.reviews.forEach((r, i) => {
                    if (reviewCards[i]) {
                        const text   = reviewCards[i].querySelector('.testimonial-text');
                        const author = reviewCards[i].querySelector('.testimonial-author');
                        if (text)   text.textContent   = r.text   || '';
                        if (author) author.textContent  = r.author || '';
                    }
                });
            }
        }
    }

    // Contact / Visit Us
    if (h.contact) {
        const c = h.contact;
        const contactSection = document.querySelector('.location');
        if (contactSection) {
            const cTitle = contactSection.querySelector('.section-title');
            const cSub   = contactSection.querySelector('.section-subtitle');
            if (cTitle) cTitle.textContent = c.title || 'Visit Us';
            if (cSub)   cSub.textContent   = c.location || 'Albany, New York';

            const infoItems = contactSection.querySelectorAll('.info-item');
            // Location
            if (infoItems[0]) {
                const ps = infoItems[0].querySelectorAll('p');
                if (ps[0]) ps[0].textContent = c.location || 'Albany, NY';
                if (ps[1]) ps[1].textContent = c.locNote  || 'Exact address provided upon booking';
            }
            // Hours
            if (infoItems[1]) {
                const ps = infoItems[1].querySelectorAll('p');
                if (ps[0]) ps[0].textContent = c.hoursWD  || '';
                if (ps[1]) ps[1].textContent = c.hoursSat  || '';
                if (ps[2]) ps[2].textContent = c.hoursSun  || '';
            }
            // Contact info
            if (infoItems[2]) {
                const ps = infoItems[2].querySelectorAll('p');
                if (ps[0]) ps[0].textContent = 'Email: ' + (c.email     || 'hello@glambynae.com');
                if (ps[1]) ps[1].textContent = 'Phone: ' + (c.phone     || '(518) 555-GLAM');
                if (ps[2]) ps[2].textContent = 'Instagram: ' + (c.instagram || '@glambynae');
            }
        }
    }
}

function updatePrice() {
    const serviceSelect = document.getElementById('service');
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price') || 0;
    const deposit = (price * 0.5).toFixed(2);
    
    document.getElementById('priceDisplay').textContent = `$${price}.00`;
    document.getElementById('depositDisplay').textContent = `$${deposit}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const serviceEl = document.getElementById('service');
    const formData = {
        id:      Date.now(),
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        phone:   document.getElementById('phone').value,
        service: serviceEl.options[serviceEl.selectedIndex].text,
        date:    document.getElementById('date').value,
        time:    document.getElementById('time').options[document.getElementById('time').selectedIndex].text,
        notes:   document.getElementById('notes').value,
        status:  'Pending'
    };

    // Save to localStorage so admin portal sees it
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(formData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    document.getElementById('bookingForm').reset();
    document.getElementById('priceDisplay').textContent  = '$0.00';
    document.getElementById('depositDisplay').textContent = '$0.00';

    showBookingModal();
}

function showBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing! 💕');
    e.target.reset();
}

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    toggleCart();
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added! ✓';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCountElement.textContent = '0';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let totalItems = 0;
    let totalPrice = 0;
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartCountElement.textContent = totalItems;
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('mobileOverlay');
    const isOpen = cartSidebar.classList.contains('active');
    
    if (isOpen) {
        cartSidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('cart-open');
    } else {
        cartSidebar.classList.add('active');
        if (overlay && window.innerWidth <= 768) overlay.classList.add('active');
        document.body.classList.add('cart-open');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    console.log('Checkout initiated:', {
        items: cart,
        total: total
    });
    
    alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nIn a production environment, this would redirect to payment processing.`);
    
    cart = [];
    updateCartDisplay();
    toggleCart();
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('bookingModal');
        if (modal.classList.contains('active')) {
            closeBookingModal();
        }
        
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
