// Toggle form visibility on Newsletter button click
document.addEventListener('DOMContentLoaded', function () {
    const newsletterBtn = document.getElementById('newsletter-btn');
    const form = document.querySelector('form');
    const contactForm = document.getElementById('contact-form');
    const mascaraForm = document.querySelector('.mascara-form');

    if (newsletterBtn && form && mascaraForm) {
        newsletterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            form.classList.toggle('form-active');
            mascaraForm.classList.toggle('active');
        });

        // Send form via JavaScript without pop-ups
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let statusMessage = contactForm.querySelector('.form-status');
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.className = 'form-status';
                statusMessage.style.marginTop = '1rem';
                statusMessage.style.padding = '1rem';
                statusMessage.style.borderRadius = '0.5rem';
                statusMessage.style.background = 'linear-gradient(45deg, #7b00ffc9, #ff003cd9 )';
                statusMessage.style.color = '#EDEDED';
                statusMessage.style.fontWeight = '600';
                contactForm.appendChild(statusMessage);
            }

            statusMessage.textContent = 'Enviando... Por favor aguarde...';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                mode: 'cors'
            })
                .then(function (response) {
                    if (!response.ok) throw new Error('Falha no envio');
                    statusMessage.textContent = 'Enviado! O formulário será fechado em instantes.';
                    setTimeout(function () {
                        statusMessage.remove();
                    }, 1200);
                    form.classList.remove('form-active');
                    mascaraForm.classList.remove('active');
                    contactForm.reset();
                })
                .catch(function () {
                    statusMessage.textContent = 'Erro ao enviar. Tente novamente em alguns instantes.';
                });
        });

        // Close form when clicking outside
        document.addEventListener('click', function (e) {
            if (form.classList.contains('form-active') &&
                !form.contains(e.target) &&
                e.target !== newsletterBtn) {
                form.classList.remove('form-active');
                mascaraForm.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation buttons with enhanced options
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Custom smooth scroll with easing
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // milliseconds
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);

                    // Easing function (ease-in-out cubic)
                    const easeInOutCubic = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                    window.scrollTo(0, startPosition + distance * easeInOutCubic);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });
});