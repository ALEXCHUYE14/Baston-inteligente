document.addEventListener('DOMContentLoaded', () => {
    // Menú de Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cierre del menú al hacer clic en un enlace (en móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Formulario de WhatsApp
    const whatsappForm = document.getElementById('whatsappForm');

    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const whatsappNumber = '51924996961'; // **Reemplaza con tu número de teléfono (con código de país, sin el signo +)**
        const message = `Hola, mi nombre es ${name}. Me gustaría obtener más información sobre el Bastón Inteligente VITALITY. Mi teléfono es: ${phone}.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });

    // Animaciones al hacer scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Funcionalidad de Comentarios
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('comments-list');

    // Función para renderizar los comentarios
    const renderComments = () => {
        const comments = JSON.parse(localStorage.getItem('vitalityComments')) || [];
        commentsList.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.dataset.index = index;
            
            commentItem.innerHTML = `
                <p class="comment-text-content">${comment.text}</p>
                <p class="comment-meta">-${comment.name}</p>
                <div class="comment-actions">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            `;
            commentsList.prepend(commentItem);
        });
    };

    renderComments();

    // Manejar el envío de nuevos comentarios
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const commentText = document.getElementById('comment').value;
        const commentName = document.getElementById('commentName').value;

        const newComment = {
            text: commentText,
            name: commentName,
            id: Date.now() // Agregamos un ID único para la edición
        };

        const comments = JSON.parse(localStorage.getItem('vitalityComments')) || [];
        comments.push(newComment);
        localStorage.setItem('vitalityComments', JSON.stringify(comments));

        renderComments();
        commentForm.reset();
    });

    // Manejar la edición y eliminación de comentarios
    commentsList.addEventListener('click', (e) => {
        const target = e.target;
        const commentItem = target.closest('.comment-item');
        if (!commentItem) return;

        const index = commentItem.dataset.index;
        let comments = JSON.parse(localStorage.getItem('vitalityComments')) || [];

        // Acción de eliminar
        if (target.classList.contains('delete-btn')) {
            if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                comments.splice(index, 1);
                localStorage.setItem('vitalityComments', JSON.stringify(comments));
                renderComments();
            }
        }

        // Acción de editar
        if (target.classList.contains('edit-btn')) {
            const currentText = comments[index].text;
            const newText = prompt('Edita tu comentario:', currentText);

            if (newText !== null && newText.trim() !== '') {
                comments[index].text = newText.trim();
                localStorage.setItem('vitalityComments', JSON.stringify(comments));
                renderComments();
            }
        }
    });
});