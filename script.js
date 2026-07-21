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

    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.getElementById('mobileNavMenu');
    var overlay = document.getElementById('mobileOverlay');

    function closeMobileNav() {
        if (mobileNav) mobileNav.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.documentElement.classList.remove('nav-open');
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileNav.classList.contains('active')) {
                closeMobileNav();
            } else {
                mobileNav.classList.add('active');
                hamburger.classList.add('active');
                if (overlay) overlay.classList.add('active');
                document.documentElement.classList.add('nav-open');
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMobileNav();
        });
    }

    // Close mobile nav on link tap — browser handles navigation naturally
    if (mobileNav) {
        var mobileLinks = mobileNav.getElementsByTagName('a');
        for (var i = 0; i < mobileLinks.length; i++) {
            mobileLinks[i].addEventListener('click', function() {
                closeMobileNav();
            });
        }
    }

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Load dynamic content from admin localStorage
    renderServicesInBookingForm();
    renderHomepage();
    renderGallery();
    renderAbout();
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
            var items = trSection.querySelectorAll('.transformation-item');
            if (tr.items && tr.items.length) {
                var allImages = tr.items.map(function(t) { return t.image; }).filter(Boolean);
                for (var i = allImages.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var tmp = allImages[i]; allImages[i] = allImages[j]; allImages[j] = tmp;
                }
                items.forEach(function(card, i) {
                    var img = card.querySelector('.transform-img');
                    if (img && allImages[i]) img.src = allImages[i];
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

// Render gallery page images from admin localStorage
function renderGallery() {
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    var items = JSON.parse(localStorage.getItem('gallery') || '[]');
    if (!items.length) return;
    var slots = grid.querySelectorAll('.gallery-item');
    slots.forEach(function(slot, i) {
        if (!items[i]) return;
        var img = slot.querySelector('.gallery-img');
        var placeholder = slot.querySelector('.placeholder-gallery');
        if (img && items[i].image) {
            img.src = items[i].image;
            img.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        }
        var overlay = slot.querySelector('.gallery-overlay h3');
        if (overlay && items[i].title) overlay.textContent = items[i].title;
    });
}

// Render about page from admin localStorage
function renderAbout() {
    var aboutSection = document.querySelector('.about-story');
    if (!aboutSection) return;
    var h = JSON.parse(localStorage.getItem('homepage') || '{}');
    if (h.meetNae) {
        var mn = h.meetNae;
        var img = document.getElementById('aboutNaeImg');
        var title = document.getElementById('aboutTitle');
        var p1 = document.getElementById('aboutP1');
        var p2 = document.getElementById('aboutP2');
        if (img && mn.img) { img.src = mn.img; img.style.display = 'block'; }
        if (title && mn.title) title.textContent = mn.title;
        if (p1 && mn.p1) p1.textContent = mn.p1;
        if (p2 && mn.p2) p2.textContent = mn.p2;
    }
    // Also render contact section on about page
    if (h.contact) {
        var c = h.contact;
        var loc = document.getElementById('contactLocation');
        var locNote = document.getElementById('contactLocationNote');
        var h1 = document.getElementById('contactHours1');
        var h2 = document.getElementById('contactHours2');
        var h3el = document.getElementById('contactHours3');
        var email = document.getElementById('contactEmail');
        var phone = document.getElementById('contactPhone');
        var insta = document.getElementById('contactInsta');
        if (loc)     loc.textContent     = c.location   || 'Albany, NY';
        if (locNote) locNote.textContent = c.locNote    || 'Exact address provided upon booking';
        if (h1)      h1.textContent      = c.hoursWD    || 'Monday – Friday: 9:00 AM – 7:00 PM';
        if (h2)      h2.textContent      = c.hoursSat   || 'Saturday: 8:00 AM – 8:00 PM';
        if (h3el)    h3el.textContent    = c.hoursSun   || 'Sunday: By Appointment Only';
        if (email)   email.textContent   = 'Email: '     + (c.email     || 'hello@glambynae.com');
        if (phone)   phone.textContent   = 'Phone: '     + (c.phone     || '(518) 555-GLAM');
        if (insta)   insta.textContent   = 'Instagram: ' + (c.instagram || '@glambynae');
    }
}

function updatePrice() {
    const serviceSelect = document.getElementById('service');
    if (!serviceSelect) return;
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price') || 0;
    const deposit = (price * 0.5).toFixed(2);
    
    const priceDisplay = document.getElementById('priceDisplay');
    const depositDisplay = document.getElementById('depositDisplay');
    if (priceDisplay) priceDisplay.textContent = `$${price}.00`;
    if (depositDisplay) depositDisplay.textContent = `$${deposit}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const serviceEl = document.getElementById('service');
    const nameEl = document.getElementById('name');
    if (!serviceEl || !nameEl) return;
    const formData = {
        id:      Date.now(),
        name:    nameEl.value,
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
    const pd = document.getElementById('priceDisplay');
    const dd = document.getElementById('depositDisplay');
    if (pd) pd.textContent = '$0.00';
    if (dd) dd.textContent = '$0.00';

    showBookingModal();
}

function showBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('active');
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing! 💕');
    e.target.reset();
}


window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (modal && event.target === modal) {
        closeBookingModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('bookingModal');
        if (modal && modal.classList.contains('active')) {
            closeBookingModal();
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

document.querySelectorAll('.service-card, .testimonial-card, .transformation-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
