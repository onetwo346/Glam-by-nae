// ─── Auth ───────────────────────────────────────────────────────────────────
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime  = sessionStorage.getItem('adminLoginTime');
    if (!isLoggedIn || !loginTime) { window.location.href = 'admin-login.html'; return false; }
    if (new Date().getTime() - parseInt(loginTime) > 86400000) { logout(); return false; }
    return true;
}
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    window.location.href = 'admin-login.html';
}

// ─── Seed real website data on first load ───────────────────────────────────
function initializeData() {
    const DATA_VERSION = '5.0'; // Increment to force refresh
    const currentVersion = localStorage.getItem('dataVersion');
    
    // Force refresh if version changed
    if (currentVersion !== DATA_VERSION) {
        localStorage.removeItem('services');
        localStorage.removeItem('products');
        localStorage.removeItem('gallery');
        localStorage.removeItem('about');
        localStorage.removeItem('homepage');
        localStorage.setItem('dataVersion', DATA_VERSION);
    }
    
    if (!localStorage.getItem('services')) {
        localStorage.setItem('services', JSON.stringify([
            { id: 1,  name: 'Soft Glam',        category: 'makeup',  price: 65,  duration: 45,  description: 'Perfect for everyday elegance. Natural enhancement with a touch of glam. Includes foundation, concealer, soft eye look, lashes, and nude lip.' },
            { id: 2,  name: 'Full Glam',         category: 'makeup',  price: 85,  duration: 60,  description: 'Bold and beautiful. Full coverage, dramatic eyes, statement lashes, and bold lips. Perfect for nights out and special occasions.' },
            { id: 3,  name: 'Bridal Glam',       category: 'makeup',  price: 150, duration: 90,  description: 'Your special day deserves perfection. Long-lasting, camera-ready makeup. Includes trial session.' },
            { id: 4,  name: 'Photoshoot Glam',   category: 'makeup',  price: 110, duration: 75,  description: 'Camera-ready perfection. HD makeup that photographs beautifully. Ideal for professional shoots and content creation.' },
            { id: 5,  name: 'Silk Press',        category: 'hair',    price: 70,  duration: 120, description: 'Sleek, smooth, and silky. Professional silk press that leaves your hair flowing and healthy.' },
            { id: 6,  name: 'Wig Install',       category: 'hair',    price: 120, duration: 150, description: 'Flawless wig installation that looks natural. Custom fitting, lace melting, and styling included.' },
            { id: 7,  name: 'Braids',            category: 'hair',    price: 100, duration: 240, description: 'Protective styling at its finest. Box braids, knotless braids, cornrows, and more.' },
            { id: 8,  name: 'Quick Style',       category: 'hair',    price: 45,  duration: 45,  description: 'Fast and fabulous. Curls, ponytails, buns, or touch-ups. Perfect for events.' },
            { id: 9,  name: 'Hair + Makeup',     category: 'combo',   price: 170, duration: 150, description: 'Complete glam package. Choose any hair service + full glam makeup. Perfect for weddings and events.' },
            { id: 10, name: 'Event Package',     category: 'combo',   price: 200, duration: 180, description: 'VIP treatment. Full hair styling, full glam makeup, lashes, and touch-up kit.' },
            { id: 11, name: 'Birthday Glam',     category: 'combo',   price: 180, duration: 150, description: 'Make your birthday unforgettable. Full glam makeup + styling of choice.' }
        ]));
    }

    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([
            { id: 1,  name: 'Glam Gloss Collection',    category: 'makeup', price: 18.00, stock: 50,  description: 'High-shine, non-sticky gloss in 6 stunning shades' },
            { id: 2,  name: 'Nae Nude Lipstick',        category: 'makeup', price: 22.00, stock: 45,  description: 'Creamy matte formula in 8 nude shades for every skin tone' },
            { id: 3,  name: 'Lash Line',                category: 'makeup', price: 15.00, stock: 100, description: '3D mink lashes, reusable up to 25 times' },
            { id: 4,  name: 'Glam Setting Spray',       category: 'makeup', price: 25.00, stock: 60,  description: 'Long-lasting formula keeps makeup flawless for 16+ hours' },
            { id: 5,  name: 'Matte Lip Kit',            category: 'makeup', price: 28.00, stock: 40,  description: 'Lip liner + liquid lipstick duo in 5 bold shades' },
            { id: 6,  name: 'Glow Highlighter Palette', category: 'makeup', price: 32.00, stock: 35,  description: '4 shades from subtle glow to blinding shine' },
            { id: 7,  name: 'Edge Control',             category: 'hair',   price: 16.00, stock: 75,  description: 'Strong hold, no flaking, perfect edges all day' },
            { id: 8,  name: 'Nourishing Hair Oil',      category: 'hair',   price: 24.00, stock: 55,  description: 'Argan & jojoba blend for shine and growth' },
            { id: 9,  name: 'Wig Melt Spray',           category: 'hair',   price: 20.00, stock: 65,  description: 'Invisible lace melting formula for natural hairline' },
            { id: 10, name: 'Professional Lace Glue',   category: 'hair',   price: 18.00, stock: 80,  description: 'Waterproof, sweat-proof hold for 4-6 weeks' },
            { id: 11, name: 'Heat Protectant Spray',    category: 'hair',   price: 19.00, stock: 70,  description: 'Protects up to 450°F, adds shine and smoothness' },
            { id: 12, name: 'Signature Beauty Blender', category: 'tools',  price: 12.00, stock: 90,  description: 'Soft, latex-free sponge for flawless foundation application' },
            { id: 13, name: 'Pro Brush Set (12pc)',     category: 'tools',  price: 65.00, stock: 30,  description: 'Professional makeup brushes with rose gold handles' },
            { id: 14, name: 'Bridal Glam Kit',          category: 'kits',   price: 85.00, stock: 20,  description: 'Complete bridal makeup essentials in one luxe kit' },
            { id: 15, name: 'Wig Install Kit',          category: 'kits',   price: 55.00, stock: 25,  description: 'Everything you need for perfect wig installation' },
            { id: 16, name: 'Travel Glam Bag',          category: 'kits',   price: 45.00, stock: 40,  description: 'Mini versions of bestsellers in chic travel case' }
        ]));
    }

    if (!localStorage.getItem('gallery')) {
        localStorage.setItem('gallery', JSON.stringify([
            { id: 1,  title: 'Bridal Glam',              category: 'bridal',       image: '' },
            { id: 2,  title: 'Silk Press Perfection',     category: 'hair',         image: '' },
            { id: 3,  title: 'Full Glam Beat',            category: 'makeup',       image: '' },
            { id: 4,  title: 'Custom Wig Install',        category: 'hair',         image: '' },
            { id: 5,  title: 'Soft Glam Transformation',  category: 'before-after', image: '' },
            { id: 6,  title: 'Birthday Glam',             category: 'events',       image: '' },
            { id: 7,  title: 'Knotless Braids',           category: 'hair',         image: '' },
            { id: 8,  title: 'Bridal Party Glam',         category: 'bridal',       image: '' },
            { id: 9,  title: 'Wig Install Magic',         category: 'before-after', image: '' },
            { id: 10, title: 'Photoshoot Ready',          category: 'makeup',       image: '' },
            { id: 11, title: 'Elegant Updo',              category: 'events',       image: '' },
            { id: 12, title: 'Dramatic Smokey Eye',       category: 'makeup',       image: '' },
            { id: 13, title: 'Full Glam Transformation',  category: 'before-after', image: '' },
            { id: 14, title: 'Bouncy Curls',              category: 'hair',         image: '' },
            { id: 15, title: 'Prom Night Glam',           category: 'events',       image: '' },
            { id: 16, title: 'Sleek Ponytail',            category: 'hair',         image: '' },
            { id: 17, title: 'Timeless Bridal Beauty',    category: 'bridal',       image: '' },
            { id: 18, title: 'Silk Press Glow Up',        category: 'before-after', image: '' }
        ]));
    }

    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([
            { id: 1, date: '2026-03-01', name: 'Sarah Johnson', service: 'Bridal Glam',  time: '10:00 AM', status: 'Confirmed', email: 'sarah@email.com', phone: '(518) 555-0101', notes: 'Wedding day makeup' },
            { id: 2, date: '2026-03-02', name: 'Maria Garcia',  service: 'Wig Install',  time: '2:00 PM',  status: 'Pending',   email: 'maria@email.com', phone: '(518) 555-0102', notes: '' },
            { id: 3, date: '2026-03-05', name: 'Jasmine King',  service: 'Full Glam',    time: '12:00 PM', status: 'Confirmed', email: 'jas@email.com',   phone: '(518) 555-0103', notes: 'Birthday event' }
        ]));
    }

    if (!localStorage.getItem('about')) {
        localStorage.setItem('about', JSON.stringify({
            title: 'My Story',
            story1: "Welcome to Glam by Nae! I'm Nae, and beauty has been my passion for as long as I can remember. What started as doing makeup for friends and family has blossomed into a thriving beauty business right here in Albany, New York.",
            story2: "My journey in the beauty industry began over 5 years ago when I realized that makeup and hair weren't just about looking good—they were about feeling confident, empowered, and ready to take on the world. That's the experience I create for every single client who sits in my chair.",
            story3: "I believe that beauty should be accessible and most importantly, authentic to who you are. Whether you're getting ready for your wedding day, a photoshoot, or just want to feel amazing for a night out, I'm here to bring your vision to life.",
            missionSub: 'Empowering beauty, one transformation at a time',
            missionCards: [
                { title: 'Confidence First', text: 'Every service is designed to make you feel like the best version of yourself. When you look good, you feel unstoppable.' },
                { title: 'Personalized Care', text: "No two clients are the same. I take time to understand your style, preferences, and vision to create a look that's uniquely you." },
                { title: 'Quality Products', text: 'I use only high-quality products that are safe for your skin and hair. Your health and beauty go hand in hand.' },
                { title: 'The Experience', text: 'From the moment you book to the final reveal, every touchpoint is designed to feel special, elevated, and memorable.' }
            ],
            certs: [
                { title: 'Professional Makeup Artistry', desc: 'Certified by Empire Beauty School', year: '2019' },
                { title: 'Advanced Bridal Makeup', desc: 'Specialized training in bridal beauty', year: '2020' },
                { title: 'Hair Styling & Installation', desc: 'Expert wig installation & styling certification', year: '2021' },
                { title: 'HD & Photoshoot Makeup', desc: 'Camera-ready makeup techniques', year: '2022' }
            ],
            values: [
                { title: '🌸 Inclusivity', text: 'Beauty has no boundaries. I celebrate and cater to all skin tones, hair types, and personal styles. Everyone deserves to feel beautiful.' },
                { title: '💪 Empowerment', text: "My goal isn't just to make you look good—it's to help you feel powerful, confident, and ready to conquer whatever comes your way." },
                { title: '🤝 Community', text: "Glam by Nae is more than a beauty service—it's a community of women supporting women, lifting each other up, and celebrating beauty together." },
                { title: '🎨 Artistry', text: 'I approach every client as a canvas for creativity. Your face and hair are my art, and I pour my heart into every transformation.' }
            ],
            bts: [
                { title: 'My Studio', text: 'A cozy, welcoming space in Albany designed for your comfort and transformation' },
                { title: 'Quality Products', text: 'Carefully curated collection of the best beauty products in the industry' },
                { title: 'The Process', text: 'Every detail matters—from consultation to the final touch' },
                { title: 'Client Love', text: 'Nothing beats seeing the smile on a client\'s face after their transformation' }
            ]
        }));
    }

    if (!localStorage.getItem('homepage')) {
        localStorage.setItem('homepage', JSON.stringify({
            hero: {
                title: 'Glam by Nae',
                slogan: 'Book the Look. Own the Room.',
                subtitle: 'Glam, everyday energy',
                btn: 'Book Your Glam'
            },
            servicesPreview: {
                title: 'Our Services',
                subtitle: 'Where beauty meets confidence',
                cards: [
                    { img: '', icon: '💄', name: 'Makeup', desc: 'Soft glam to full beat perfection' },
                    { img: '', icon: '💇‍♀️', name: 'Hair', desc: 'Silk press, installs, braids & more' },
                    { img: '', icon: '👑', name: 'Wigs', desc: 'Custom wig installation & styling' },
                    { img: '', icon: '✨', name: 'Combo Packages', desc: 'Hair + makeup event packages' }
                ]
            },
            meetNae: {
                img: '',
                title: 'Meet Nae',
                p1: 'Welcome to Glam by Nae, where your beauty journey becomes an unforgettable experience. Based in Albany, New York, I specialize in creating stunning transformations that make you feel confident and beautiful.',
                p2: 'From soft glam to full beat perfection, every look is crafted with precision, passion, and a personal touch. Let\'s create magic together.',
                btn: 'Learn More About Nae'
            },
            transformations: {
                title: 'Transformations',
                subtitle: 'See the magic happen',
                items: [
                    { before: '', after: '' },
                    { before: '', after: '' },
                    { before: '', after: '' }
                ]
            },
            products: {
                title: 'Mimi Cosmetics',
                subtitle: 'Our signature beauty line',
                items: [
                    { img: '', name: 'Glam Gloss Collection', price: '18.00' },
                    { img: '', name: 'Nae Nude Lipstick', price: '22.00' },
                    { img: '', name: 'Lash Line', price: '15.00' },
                    { img: '', name: 'Glam Setting Spray', price: '25.00' }
                ]
            },
            testimonials: {
                title: 'What Clients Say',
                subtitle: 'Real transformations, real confidence',
                reviews: [
                    { text: 'Nae is absolutely amazing! She did my bridal makeup and I felt like a princess. The attention to detail was incredible and it lasted all day!', author: '- Sarah M.' },
                    { text: 'Best wig install I\'ve ever had! So natural and comfortable. Nae is a true artist and I won\'t go anywhere else.', author: '- Jasmine K.' },
                    { text: 'The full glam package for my birthday was everything! Nae made me feel so beautiful and confident. Can\'t wait to book again!', author: '- Michelle T.' }
                ]
            },
            contact: {
                title: 'Visit Us',
                location: 'Albany, NY',
                locNote: 'Exact address provided upon booking',
                hoursWD: 'Monday - Friday: 9:00 AM - 7:00 PM',
                hoursSat: 'Saturday: 8:00 AM - 8:00 PM',
                hoursSun: 'Sunday: By Appointment Only',
                email: 'hello@glambynae.com',
                phone: '(518) 555-GLAM',
                instagram: '@glambynae'
            }
        }));
    }

    if (!localStorage.getItem('contact')) {
        localStorage.setItem('contact', JSON.stringify({
            businessName: 'Glam by Nae',
            email: 'hello@glambynae.com',
            phone: '(518) 555-GLAM',
            address: 'Albany, New York',
            instagram: '@glambynae',
            hoursWeekday: 'Monday - Friday: 9:00 AM - 7:00 PM',
            hoursSaturday: 'Saturday: 8:00 AM - 8:00 PM',
            hoursSunday: 'Sunday: By Appointment Only'
        }));
    }
}

// ─── DOMContentLoaded ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    if (!checkAuth()) return;
    initializeData();
    loadDashboard();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const section = this.dataset.section;
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
            if (section === 'homepage')  loadHomepage();
            if (section === 'services') loadServices();
            if (section === 'shop')     loadProducts();
            if (section === 'gallery')  loadGallery();
            if (section === 'bookings') loadBookings();
            if (section === 'about')    loadAbout();
            if (section === 'settings') loadSettings();
        });
    });

    document.getElementById('serviceForm').addEventListener('submit', saveService);
    document.getElementById('productForm').addEventListener('submit', saveProduct);
    document.getElementById('galleryForm').addEventListener('submit', saveGalleryItem);
});

// ─── Dashboard ───────────────────────────────────────────────────────────────
function loadDashboard() {
    document.getElementById('totalServices').textContent = JSON.parse(localStorage.getItem('services') || '[]').length;
    document.getElementById('totalProducts').textContent = JSON.parse(localStorage.getItem('products') || '[]').length;
    document.getElementById('totalGallery').textContent  = JSON.parse(localStorage.getItem('gallery')  || '[]').length;
    document.getElementById('totalBookings').textContent = JSON.parse(localStorage.getItem('bookings') || '[]').length;
}

// ─── Services ────────────────────────────────────────────────────────────────
let editingServiceId = null;

function loadServices() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const tbody = document.getElementById('servicesTable');
    if (!services.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:#aaa;">No services yet. Click + Add Service.</td></tr>';
        return;
    }
    tbody.innerHTML = services.map(s => `
        <tr>
            <td><strong>${s.name}</strong></td>
            <td style="text-transform:capitalize">${s.category}</td>
            <td>$${s.price}</td>
            <td>${s.duration} min</td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit"   onclick="editService(${s.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteService(${s.id})">Delete</button>
                </div>
            </td>
        </tr>`).join('');
}

function openModal(type) {
    if (type === 'service') {
        document.getElementById('serviceModal').classList.add('active');
        document.getElementById('serviceModalTitle').textContent = 'Add Service';
        document.getElementById('serviceForm').reset();
        editingServiceId = null;
    } else if (type === 'product') {
        document.getElementById('productModal').classList.add('active');
        document.getElementById('productModalTitle').textContent = 'Add Product';
        document.getElementById('productForm').reset();
        editingProductId = null;
    } else if (type === 'gallery') {
        document.getElementById('galleryModal').classList.add('active');
        document.getElementById('galleryForm').reset();
        editingGalleryId = null;
    }
}

function closeModal(type) {
    document.getElementById(type + 'Modal').classList.remove('active');
}

function saveService(e) {
    e.preventDefault();
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const service = {
        id:          editingServiceId || Date.now(),
        name:        document.getElementById('serviceName').value,
        category:    document.getElementById('serviceCategory').value,
        price:       parseFloat(document.getElementById('servicePrice').value),
        duration:    parseInt(document.getElementById('serviceDuration').value),
        description: document.getElementById('serviceDescription').value
    };
    if (editingServiceId) {
        const idx = services.findIndex(s => s.id === editingServiceId);
        services[idx] = service;
    } else {
        services.push(service);
    }
    localStorage.setItem('services', JSON.stringify(services));
    showToast('Service saved! Changes are live on the website.');
    closeModal('service');
    loadServices();
    loadDashboard();
}

function editService(id) {
    const s = JSON.parse(localStorage.getItem('services') || '[]').find(s => s.id === id);
    if (!s) return;
    document.getElementById('serviceName').value        = s.name;
    document.getElementById('serviceCategory').value    = s.category;
    document.getElementById('servicePrice').value       = s.price;
    document.getElementById('serviceDuration').value    = s.duration;
    document.getElementById('serviceDescription').value = s.description;
    editingServiceId = id;
    document.getElementById('serviceModalTitle').textContent = 'Edit Service';
    document.getElementById('serviceModal').classList.add('active');
}

function deleteService(id) {
    if (!confirm('Delete this service?')) return;
    let services = JSON.parse(localStorage.getItem('services') || '[]').filter(s => s.id !== id);
    localStorage.setItem('services', JSON.stringify(services));
    showToast('Service deleted.');
    loadServices();
    loadDashboard();
}

// ─── Products ────────────────────────────────────────────────────────────────
let editingProductId = null;

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const tbody = document.getElementById('productsTable');
    if (!products.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:#aaa;">No products yet. Click + Add Product.</td></tr>';
        return;
    }
    tbody.innerHTML = products.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td style="text-transform:capitalize">${p.category}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>${p.stock} units</td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit"   onclick="editProduct(${p.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
                </div>
            </td>
        </tr>`).join('');
}

function saveProduct(e) {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = {
        id:          editingProductId || Date.now(),
        name:        document.getElementById('productName').value,
        category:    document.getElementById('productCategory').value,
        price:       parseFloat(document.getElementById('productPrice').value),
        stock:       parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value
    };
    if (editingProductId) {
        const idx = products.findIndex(p => p.id === editingProductId);
        products[idx] = product;
    } else {
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
    showToast('Product saved! Changes are live on the shop page.');
    closeModal('product');
    loadProducts();
    loadDashboard();
}

function editProduct(id) {
    const p = JSON.parse(localStorage.getItem('products') || '[]').find(p => p.id === id);
    if (!p) return;
    document.getElementById('productName').value        = p.name;
    document.getElementById('productCategory').value    = p.category;
    document.getElementById('productPrice').value       = p.price;
    document.getElementById('productStock').value       = p.stock;
    document.getElementById('productDescription').value = p.description;
    editingProductId = id;
    document.getElementById('productModalTitle').textContent = 'Edit Product';
    document.getElementById('productModal').classList.add('active');
}

function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    let products = JSON.parse(localStorage.getItem('products') || '[]').filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    showToast('Product deleted.');
    loadProducts();
    loadDashboard();
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
let editingGalleryId = null;

function loadGallery() {
    const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
    const grid = document.getElementById('galleryGrid');
    if (!gallery.length) {
        grid.innerHTML = '<div style="text-align:center;padding:3rem;color:#aaa;grid-column:1/-1;">No images yet. Click + Add Image.</div>';
        return;
    }
    grid.innerHTML = gallery.map(item => `
        <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
            <div style="background:${item.image ? 'url(' + item.image + ') center/cover' : 'linear-gradient(135deg,#F4A7B9,#E8C4CE)'};height:150px;display:flex;align-items:center;justify-content:center;color:rgba(107,32,53,0.5);font-size:0.85rem;">
                ${item.image ? '' : item.title}
            </div>
            <div style="padding:0.9rem;">
                <strong style="font-size:0.88rem;">${item.title}</strong>
                <p style="font-size:0.78rem;color:#888;margin:0.2rem 0;text-transform:capitalize">${item.category}</p>
                <div style="display:flex;gap:0.5rem;margin-top:0.7rem;">
                    <button class="btn-edit"   onclick="editGalleryItem(${item.id})" style="flex:1;font-size:0.75rem;">Edit</button>
                    <button class="btn-delete" onclick="deleteGalleryItem(${item.id})" style="flex:1;font-size:0.75rem;">Delete</button>
                </div>
            </div>
        </div>`).join('');
}

function saveGalleryItem(e) {
    e.preventDefault();
    const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
    const item = {
        id:       editingGalleryId || Date.now(),
        title:    document.getElementById('galleryTitle').value,
        category: document.getElementById('galleryCategory').value,
        image:    document.getElementById('galleryImage').value
    };
    if (editingGalleryId) {
        const idx = gallery.findIndex(g => g.id === editingGalleryId);
        gallery[idx] = item;
    } else {
        gallery.push(item);
    }
    localStorage.setItem('gallery', JSON.stringify(gallery));
    showToast('Gallery updated! Changes are live on the gallery page.');
    closeModal('gallery');
    loadGallery();
    loadDashboard();
}

function editGalleryItem(id) {
    const item = JSON.parse(localStorage.getItem('gallery') || '[]').find(g => g.id === id);
    if (!item) return;
    document.getElementById('galleryTitle').value    = item.title;
    document.getElementById('galleryCategory').value = item.category;
    document.getElementById('galleryImage').value    = item.image;
    editingGalleryId = id;
    document.getElementById('galleryModal').classList.add('active');
}

function deleteGalleryItem(id) {
    if (!confirm('Delete this image?')) return;
    let gallery = JSON.parse(localStorage.getItem('gallery') || '[]').filter(g => g.id !== id);
    localStorage.setItem('gallery', JSON.stringify(gallery));
    showToast('Image deleted.');
    loadGallery();
    loadDashboard();
}

// ─── Bookings ────────────────────────────────────────────────────────────────
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const tbody = document.getElementById('bookingsTable');
    if (!bookings.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:#aaa;">No bookings yet.</td></tr>';
        return;
    }
    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.date}</td>
            <td>
                <strong>${b.name}</strong><br>
                <small style="color:#888">${b.email || ''}</small><br>
                <small style="color:#888">${b.phone || ''}</small>
            </td>
            <td>${b.service}</td>
            <td>${b.time}</td>
            <td><span style="background:${b.status === 'Confirmed' ? '#4CAF50' : b.status === 'Cancelled' ? '#f44336' : '#FFA726'};color:white;padding:0.25rem 0.7rem;border-radius:20px;font-size:0.75rem;">${b.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit"   onclick="cycleBookingStatus(${b.id})">Status</button>
                    <button class="btn-delete" onclick="deleteBooking(${b.id})">Delete</button>
                </div>
            </td>
        </tr>`).join('');
}

function cycleBookingStatus(id) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const b = bookings.find(b => b.id === id);
    if (!b) return;
    const cycle = { 'Pending': 'Confirmed', 'Confirmed': 'Cancelled', 'Cancelled': 'Pending' };
    b.status = cycle[b.status] || 'Pending';
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings();
}

function deleteBooking(id) {
    if (!confirm('Delete this booking?')) return;
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]').filter(b => b.id !== id);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    showToast('Booking deleted.');
    loadBookings();
    loadDashboard();
}

// ─── Image Upload Helper ──────────────────────────────────────────────────
function handleImgUpload(fileInput, hiddenId) {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById(hiddenId).value = e.target.result;
        const preview = document.getElementById(hiddenId + '_preview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

function setImgPreview(hiddenId, dataUrl) {
    document.getElementById(hiddenId).value = dataUrl || '';
    const preview = document.getElementById(hiddenId + '_preview');
    if (preview) {
        if (dataUrl) {
            preview.src = dataUrl;
            preview.style.display = 'block';
        } else {
            preview.src = '';
            preview.style.display = 'none';
        }
    }
}

// ─── Homepage ─────────────────────────────────────────────────────────────
function loadHomepage() {
    const h = JSON.parse(localStorage.getItem('homepage') || '{}');
    // Hero
    document.getElementById('heroTitle').value    = (h.hero && h.hero.title)    || 'Glam by Nae';
    document.getElementById('heroSlogan').value   = (h.hero && h.hero.slogan)   || '';
    document.getElementById('heroSubtitle').value = (h.hero && h.hero.subtitle) || '';
    document.getElementById('heroBtn').value      = (h.hero && h.hero.btn)      || 'Book Your Glam';
    // Services Preview
    const sp = h.servicesPreview || {};
    document.getElementById('svcPreviewTitle').value = sp.title    || 'Our Services';
    document.getElementById('svcPreviewSub').value   = sp.subtitle || '';
    const cards = sp.cards || [];
    for (let i = 0; i < 4; i++) {
        setImgPreview('svcCard' + (i+1) + 'Img', (cards[i] && cards[i].img) || '');
        document.getElementById('svcCard' + (i+1) + 'Icon').value = (cards[i] && cards[i].icon) || '';
        document.getElementById('svcCard' + (i+1) + 'Name').value = (cards[i] && cards[i].name) || '';
        document.getElementById('svcCard' + (i+1) + 'Desc').value = (cards[i] && cards[i].desc) || '';
    }
    // Meet Nae
    const mn = h.meetNae || {};
    setImgPreview('meetNaeImg', mn.img || '');
    document.getElementById('meetNaeTitle').value = mn.title || 'Meet Nae';
    document.getElementById('meetNaeP1').value    = mn.p1    || '';
    document.getElementById('meetNaeP2').value    = mn.p2    || '';
    document.getElementById('meetNaeBtn').value   = mn.btn   || 'Learn More About Nae';
    // Transformations
    const tr = h.transformations || {};
    document.getElementById('transformTitle').value = tr.title    || 'Transformations';
    document.getElementById('transformSub').value   = tr.subtitle || '';
    const trItems = tr.items || [];
    for (let i = 0; i < 3; i++) {
        setImgPreview('transform' + (i+1) + 'Before', (trItems[i] && trItems[i].before) || '');
        setImgPreview('transform' + (i+1) + 'After',  (trItems[i] && trItems[i].after)  || '');
    }
    // Mimi Cosmetics / Products
    const pr = h.products || {};
    document.getElementById('productsTitle').value = pr.title    || 'Mimi Cosmetics';
    document.getElementById('productsSub').value   = pr.subtitle || '';
    const prItems = pr.items || [];
    for (let i = 0; i < 4; i++) {
        setImgPreview('prod' + (i+1) + 'Img', (prItems[i] && prItems[i].img) || '');
        document.getElementById('prod' + (i+1) + 'Name').value  = (prItems[i] && prItems[i].name)  || '';
        document.getElementById('prod' + (i+1) + 'Price').value = (prItems[i] && prItems[i].price) || '';
    }
    // Testimonials
    const t = h.testimonials || {};
    document.getElementById('testimonialsTitle').value = t.title    || 'What Clients Say';
    document.getElementById('testimonialsSub').value   = t.subtitle || '';
    const reviews = t.reviews || [];
    for (let i = 0; i < 3; i++) {
        document.getElementById('review' + (i+1) + 'Text').value   = (reviews[i] && reviews[i].text)   || '';
        document.getElementById('review' + (i+1) + 'Author').value = (reviews[i] && reviews[i].author) || '';
    }
    // Contact
    const c = h.contact || {};
    document.getElementById('contactTitle').value    = c.title    || 'Visit Us';
    document.getElementById('contactLocation').value = c.location || 'Albany, NY';
    document.getElementById('contactLocNote').value  = c.locNote  || '';
    document.getElementById('contactHoursWD').value  = c.hoursWD  || '';
    document.getElementById('contactHoursSat').value = c.hoursSat || '';
    document.getElementById('contactHoursSun').value = c.hoursSun || '';
    document.getElementById('contactEmail').value    = c.email    || '';
    document.getElementById('contactPhone').value    = c.phone    || '';
    document.getElementById('contactInsta').value    = c.instagram || '';
}

function saveHomepage() {
    const data = {
        hero: {
            title:    document.getElementById('heroTitle').value,
            slogan:   document.getElementById('heroSlogan').value,
            subtitle: document.getElementById('heroSubtitle').value,
            btn:      document.getElementById('heroBtn').value
        },
        servicesPreview: {
            title:    document.getElementById('svcPreviewTitle').value,
            subtitle: document.getElementById('svcPreviewSub').value,
            cards: []
        },
        meetNae: {
            img:   document.getElementById('meetNaeImg').value,
            title: document.getElementById('meetNaeTitle').value,
            p1:    document.getElementById('meetNaeP1').value,
            p2:    document.getElementById('meetNaeP2').value,
            btn:   document.getElementById('meetNaeBtn').value
        },
        transformations: {
            title:    document.getElementById('transformTitle').value,
            subtitle: document.getElementById('transformSub').value,
            items: []
        },
        products: {
            title:    document.getElementById('productsTitle').value,
            subtitle: document.getElementById('productsSub').value,
            items: []
        },
        testimonials: {
            title:    document.getElementById('testimonialsTitle').value,
            subtitle: document.getElementById('testimonialsSub').value,
            reviews: []
        },
        contact: {
            title:     document.getElementById('contactTitle').value,
            location:  document.getElementById('contactLocation').value,
            locNote:   document.getElementById('contactLocNote').value,
            hoursWD:   document.getElementById('contactHoursWD').value,
            hoursSat:  document.getElementById('contactHoursSat').value,
            hoursSun:  document.getElementById('contactHoursSun').value,
            email:     document.getElementById('contactEmail').value,
            phone:     document.getElementById('contactPhone').value,
            instagram: document.getElementById('contactInsta').value
        }
    };
    for (let i = 1; i <= 4; i++) {
        data.servicesPreview.cards.push({
            img:  document.getElementById('svcCard' + i + 'Img').value,
            icon: document.getElementById('svcCard' + i + 'Icon').value,
            name: document.getElementById('svcCard' + i + 'Name').value,
            desc: document.getElementById('svcCard' + i + 'Desc').value
        });
    }
    for (let i = 1; i <= 3; i++) {
        data.transformations.items.push({
            before: document.getElementById('transform' + i + 'Before').value,
            after:  document.getElementById('transform' + i + 'After').value
        });
    }
    for (let i = 1; i <= 4; i++) {
        data.products.items.push({
            img:   document.getElementById('prod' + i + 'Img').value,
            name:  document.getElementById('prod' + i + 'Name').value,
            price: document.getElementById('prod' + i + 'Price').value
        });
    }
    for (let i = 1; i <= 3; i++) {
        data.testimonials.reviews.push({
            text:   document.getElementById('review' + i + 'Text').value,
            author: document.getElementById('review' + i + 'Author').value
        });
    }
    localStorage.setItem('homepage', JSON.stringify(data));
    showToast('Homepage saved! Changes are live on the website.');
}

// ─── About ───────────────────────────────────────────────────────────────────
function loadAbout() {
    const a = JSON.parse(localStorage.getItem('about') || '{}');
    // Story
    document.getElementById('aboutTitle').value  = a.title  || 'My Story';
    document.getElementById('aboutStory1').value = a.story1 || '';
    document.getElementById('aboutStory2').value = a.story2 || '';
    document.getElementById('aboutStory3').value = a.story3 || '';
    // Mission
    document.getElementById('aboutMissionSub').value = a.missionSub || '';
    const mc = a.missionCards || [];
    for (let i = 0; i < 4; i++) {
        document.getElementById('missionCard' + (i+1) + 'Title').value = (mc[i] && mc[i].title) || '';
        document.getElementById('missionCard' + (i+1) + 'Text').value  = (mc[i] && mc[i].text)  || '';
    }
    // Certifications
    const ce = a.certs || [];
    for (let i = 0; i < 4; i++) {
        document.getElementById('cert' + (i+1) + 'Title').value = (ce[i] && ce[i].title) || '';
        document.getElementById('cert' + (i+1) + 'Desc').value  = (ce[i] && ce[i].desc)  || '';
        document.getElementById('cert' + (i+1) + 'Year').value  = (ce[i] && ce[i].year)  || '';
    }
    // Values
    const va = a.values || [];
    for (let i = 0; i < 4; i++) {
        document.getElementById('value' + (i+1) + 'Title').value = (va[i] && va[i].title) || '';
        document.getElementById('value' + (i+1) + 'Text').value  = (va[i] && va[i].text)  || '';
    }
    // BTS
    const bt = a.bts || [];
    for (let i = 0; i < 4; i++) {
        document.getElementById('bts' + (i+1) + 'Title').value = (bt[i] && bt[i].title) || '';
        document.getElementById('bts' + (i+1) + 'Text').value  = (bt[i] && bt[i].text)  || '';
    }
}

function saveAbout() {
    const data = {
        title:  document.getElementById('aboutTitle').value,
        story1: document.getElementById('aboutStory1').value,
        story2: document.getElementById('aboutStory2').value,
        story3: document.getElementById('aboutStory3').value,
        missionSub: document.getElementById('aboutMissionSub').value,
        missionCards: [],
        certs: [],
        values: [],
        bts: []
    };
    for (let i = 1; i <= 4; i++) {
        data.missionCards.push({ title: document.getElementById('missionCard'+i+'Title').value, text: document.getElementById('missionCard'+i+'Text').value });
        data.certs.push({ title: document.getElementById('cert'+i+'Title').value, desc: document.getElementById('cert'+i+'Desc').value, year: document.getElementById('cert'+i+'Year').value });
        data.values.push({ title: document.getElementById('value'+i+'Title').value, text: document.getElementById('value'+i+'Text').value });
        data.bts.push({ title: document.getElementById('bts'+i+'Title').value, text: document.getElementById('bts'+i+'Text').value });
    }
    localStorage.setItem('about', JSON.stringify(data));
    showToast('About content saved! Changes are live on the about page.');
}

// ─── Settings ────────────────────────────────────────────────────────────────
function loadSettings() {
    const c = JSON.parse(localStorage.getItem('contact') || '{}');
    document.getElementById('settingName').value      = c.businessName   || 'Glam by Nae';
    document.getElementById('settingEmail').value     = c.email          || 'hello@glambynae.com';
    document.getElementById('settingPhone').value     = c.phone          || '(518) 555-GLAM';
    document.getElementById('settingAddress').value   = c.address        || 'Albany, New York';
    document.getElementById('settingInsta').value     = c.instagram      || '@glambynae';
    document.getElementById('settingHoursWD').value   = c.hoursWeekday   || 'Monday - Friday: 9:00 AM - 7:00 PM';
    document.getElementById('settingHoursSat').value  = c.hoursSaturday  || 'Saturday: 8:00 AM - 8:00 PM';
    document.getElementById('settingHoursSun').value  = c.hoursSunday    || 'Sunday: By Appointment Only';
}

function saveSettings() {
    localStorage.setItem('contact', JSON.stringify({
        businessName:   document.getElementById('settingName').value,
        email:          document.getElementById('settingEmail').value,
        phone:          document.getElementById('settingPhone').value,
        address:        document.getElementById('settingAddress').value,
        instagram:      document.getElementById('settingInsta').value,
        hoursWeekday:   document.getElementById('settingHoursWD').value,
        hoursSaturday:  document.getElementById('settingHoursSat').value,
        hoursSunday:    document.getElementById('settingHoursSun').value
    }));
    showToast('Settings saved! Contact info updated on the website.');
}

// ─── Toast notification ──────────────────────────────────────────────────────
function showToast(msg) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'adminToast';
        toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:linear-gradient(135deg,#F4A7B9,#C4788A);color:white;padding:0.9rem 1.5rem;border-radius:10px;font-size:0.88rem;font-weight:600;box-shadow:0 4px 20px rgba(196,120,138,0.4);z-index:99999;transition:opacity 0.4s;';
        document.body.appendChild(toast);
    }
    toast.textContent = '✓ ' + msg;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
