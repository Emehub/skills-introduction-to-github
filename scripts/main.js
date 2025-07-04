// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(button => button.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Handling
    const talentForm = document.getElementById('talentForm');
    const contactForm = document.getElementById('contactForm');
    const eventBookingForm = document.getElementById('eventBookingForm');

    // Talent Form Submission
    if (talentForm) {
        talentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showSuccessMessage('Thank you for submitting your talent! We\'ll review your submission and contact you within 48 hours.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Talent submission:', data);
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            showSuccessMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
            
            this.reset();
            
            console.log('Contact submission:', data);
        });
    }

    // Event Booking Form Submission
    if (eventBookingForm) {
        eventBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required services
            const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked');
            if (serviceCheckboxes.length === 0) {
                showErrorMessage('Please select at least one service.');
                return;
            }
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Add selected services to data
            data.services = Array.from(serviceCheckboxes).map(cb => cb.value);
            
            showSuccessMessage('Thank you for your booking request! We\'ll contact you within 24 hours to confirm availability and provide a detailed quote.');
            
            this.reset();
            
            console.log('Booking submission:', data);
        });
    }

    // File Upload Handling
    const fileUploads = document.querySelectorAll('.file-upload');
    fileUploads.forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        
        if (input) {
            upload.addEventListener('click', () => {
                input.click();
            });

            upload.addEventListener('dragover', (e) => {
                e.preventDefault();
                upload.style.borderColor = '#6c5ce7';
                upload.style.backgroundColor = '#f8f9ff';
            });

            upload.addEventListener('dragleave', () => {
                upload.style.borderColor = '#e2e8f0';
                upload.style.backgroundColor = 'transparent';
            });

            upload.addEventListener('drop', (e) => {
                e.preventDefault();
                upload.style.borderColor = '#e2e8f0';
                upload.style.backgroundColor = 'transparent';
                
                const files = e.dataTransfer.files;
                input.files = files;
                updateFileUploadDisplay(upload, files);
            });

            input.addEventListener('change', (e) => {
                updateFileUploadDisplay(upload, e.target.files);
            });
        }
    });

    // Service Selection for Booking Form
    const serviceButtons = document.querySelectorAll('[data-service]');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceType = this.getAttribute('data-service');
            const eventTypeSelect = document.getElementById('eventType');
            
            if (eventTypeSelect) {
                // Pre-select the appropriate event type
                switch(serviceType) {
                    case 'wedding':
                        eventTypeSelect.value = 'wedding';
                        break;
                    case 'corporate':
                        eventTypeSelect.value = 'corporate';
                        break;
                    case 'special':
                        eventTypeSelect.value = 'birthday';
                        break;
                }
            }
            
            // Scroll to booking form
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .about-card, .feature, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Helper Functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.alert-message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert-message alert-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 8px;
        padding: 15px 20px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

    // Add CSS animation
    if (!document.querySelector('#alert-animations')) {
        const style = document.createElement('style');
        style.id = 'alert-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

function updateFileUploadDisplay(uploadElement, files) {
    const fileInfo = uploadElement.querySelector('p');
    const icon = uploadElement.querySelector('i');
    
    if (files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        fileInfo.textContent = `Selected: ${fileNames}`;
        icon.className = 'fas fa-check-circle';
        uploadElement.style.borderColor = '#28a745';
        uploadElement.style.backgroundColor = '#f8fff9';
    } else {
        fileInfo.textContent = 'Click to upload or drag and drop';
        icon.className = 'fas fa-cloud-upload-alt';
        uploadElement.style.borderColor = '#e2e8f0';
        uploadElement.style.backgroundColor = 'transparent';
    }
}

// Contact form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Date validation for event booking
function validateEventDate(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return eventDate >= today;
}

// Export functions for potential external use
window.CreativeVisionStudio = {
    showSuccessMessage,
    showErrorMessage,
    validateEmail,
    validatePhone,
    validateEventDate
};