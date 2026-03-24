document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar ---
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    // --- Active Link Switching ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => revealObserver.observe(el));
    // --- Parallax Effect on Hero Elements ---
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if(scrollValue < window.innerHeight) {
            parallaxElements.forEach(el => {
                let speed = 0.3;
                if(el.tagName === 'H1') speed = 0.5;
                if(el.tagName === 'P') speed = 0.4;
                el.style.transform = `translateY(${scrollValue * speed}px)`;
            });
        }
    });
    // --- Menu Popup Logic ---
    const modal = document.getElementById('menu-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const popupTriggers = document.querySelectorAll('.menu-popup-trigger');
    // Menu Data
    const menuData = {
        'south-indian': {
            title: 'South Indian Specials',
            items: [
                { name: 'Bamboo Biriyani', price: '₹350' },
                { name: 'Mutton Chukka', price: '₹280' },
                { name: 'Poricha Parotta (Set of 2)', price: '₹120' },
                { name: 'Chettinad Chicken Curry', price: '₹240' },
                { name: 'Elaneer Payasam', price: '₹150' }
            ]
        },
        'arabic': {
            title: 'Arabic Grills',
            items: [
                { name: 'Tandoori Chicken (Half/Full)', price: '₹250 / ₹480' },
                { name: 'Chicken Tikka', price: '₹220' },
                { name: 'Mutton Seekh Kebab', price: '₹320' },
                { name: 'Mixed Grill Platter', price: '₹650' },
                { name: 'Garlic Naan & Hummus', price: '₹180' }
            ]
        },
        'indo-chinese': {
            title: 'Indo-Chinese Favorites',
            items: [
                { name: 'Chicken Manchurian Dry', price: '₹200' },
                { name: 'Chilli Paneer', price: '₹180' },
                { name: 'Schezwan Fried Rice', price: '₹190' },
                { name: 'Hakka Noodles', price: '₹180' },
                { name: 'Dragon Chicken', price: '₹220' }
            ]
        },
        'desserts': {
            title: 'Beverages & Desserts',
            items: [
                { name: 'Royal Falooda', price: '₹160' },
                { name: 'Fresh Watermelon Juice', price: '₹80' },
                { name: 'Filter Coffee', price: '₹40' },
                { name: 'Sizzling Brownie', price: '₹180' },
                { name: 'Rose Milk', price: '₹60' }
            ]
        }
    };
    function openModal(category) {
        const data = menuData[category];
        if (data) {
            modalTitle.textContent = data.title;
            
            let html = '';
            data.items.forEach(item => {
                html += `
                    <div class="modal-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">${item.price}</span>
                    </div>
                `;
            });
            
            modalBody.innerHTML = html;
            modal.style.display = 'flex';
            
            // Small timeout to allow display:flex to apply before adding opacity
            setTimeout(() => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }, 10);
        }
    }
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300); // match transition time
    }
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-category');
            openModal(category);
        });
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    // Handle Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
