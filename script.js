document.addEventListener('DOMContentLoaded', () => {

    // --- 0. FONDO RANDOM POSITION ---
    const bgImage = document.getElementById('random-bg');
    
    function randomizeBackground() {
        if (!bgImage) return; // Evita errores si la imagen no carga

        const imgSize = 2160; // Tamaño de tu imagen original
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        
        const availableX = imgSize - winW;
        const availableY = imgSize - winH;

        if (availableX > 0 && availableY > 0) {
            const randomX = Math.floor(Math.random() * availableX) * -1;
            const randomY = Math.floor(Math.random() * availableY) * -1;
            
            bgImage.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    }

    randomizeBackground();
    window.addEventListener('resize', randomizeBackground);
// --- NUEVO: Ejecutar SOLO en elementos interactivos ---
    document.addEventListener('click', (e) => {
        // Verificamos si lo que se clickeó es (o está dentro de) un botón, enlace o summary
        const interactiveElement = e.target.closest('button, a, summary');

        if (interactiveElement) {
            randomizeBackground();
        }
    });
    
    // --- 1. LÓGICA DEL CURSOR PERSONALIZADO ---
    // (Incluso si usas CSS nativo, este bloque no estorba, pero verifica que tengas el div en HTML si lo usas)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    const hoverTargets = document.querySelectorAll('a, button, summary');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });


    // --- 2. NAVEGACIÓN (SPA) ---
    const indexScreen = document.getElementById('index-screen');
    const viewerContainer = document.getElementById('viewer-container');
    const backBtn = document.getElementById('back-btn');
    const moduleLinks = document.querySelectorAll('.module-link');
    const modules = document.querySelectorAll('.horizontal-scroll-wrapper');
    
    let currentModule = null;

    moduleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetModule = document.getElementById(targetId);

            if (targetModule) {
                indexScreen.classList.add('hidden');
                viewerContainer.classList.add('active');

                modules.forEach(m => {
                    m.style.display = 'none';
                    m.classList.remove('active');
                });
                
                targetModule.style.display = 'flex';
                setTimeout(() => {
                    targetModule.classList.add('active');
                }, 10);
                
                currentModule = targetModule;
                currentModule.scrollLeft = 0;
            }
        });
    });

    backBtn.addEventListener('click', () => {
        viewerContainer.classList.remove('active');
        indexScreen.classList.remove('hidden');

        setTimeout(() => {
            if(currentModule) {
                currentModule.style.display = 'none';
                currentModule.classList.remove('active');
                currentModule = null;
            }
            document.querySelectorAll('details[open]').forEach(d => {
                d.removeAttribute('open');
                d.closest('.item-card').classList.remove('expanded');
            });
        }, 600); 
    });


    // --- 3. SCROLL MAPPING ---
    window.addEventListener('wheel', (e) => {
        if (currentModule && viewerContainer.classList.contains('active')) {
            const scrollSpeed = 2; 
            currentModule.scrollLeft += e.deltaY * scrollSpeed;
        }
    }, { passive: true });


    // --- 4. EXPANSIÓN DE TARJETAS ---
    const detailsTags = document.querySelectorAll('details');

    detailsTags.forEach(detail => {
        const summary = detail.querySelector('summary');
        
        summary.addEventListener('click', (e) => {
            e.preventDefault(); 
            const parentCard = detail.closest('.item-card');
            const isOpen = detail.hasAttribute('open');

            if (isOpen) {
                detail.removeAttribute('open');
                parentCard.classList.remove('expanded');
            } else {
                // Opcional: Cerrar otros acordeones
                document.querySelectorAll('details[open]').forEach(d => {
                    d.removeAttribute('open');
                    d.closest('.item-card').classList.remove('expanded');
                });

                detail.setAttribute('open', '');
                parentCard.classList.add('expanded');
                
                setTimeout(() => {
                    parentCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }, 300);
            }
        });
    });

    // ... (todo tu código anterior dentro del DOMContentLoaded) ...

    // --- 4. LÓGICA DEL MODAL FULLSCREEN (NUEVO) ---
    
    // Referencias a los elementos
    // Usamos la clase específica que añadimos a la imagen en el HTML
    const triggerImg1 = document.querySelector('.trigger-articulo-1');
    const modal1 = document.getElementById('fullscreen-modal-1');
    
    if (triggerImg1 && modal1) {
        const closeBtn1 = modal1.querySelector('.close-modal-btn');

        // FUNCIÓN ABRIR
        triggerImg1.addEventListener('click', (e) => {
            // CRÍTICO: Evita que el clic se propague al <summary> y abra la tarjeta pequeña
            e.preventDefault();
            e.stopPropagation();
            
            // Activar modal
            modal1.classList.add('active');
            
            // Opcional: Bloquear el scroll del body si fuera necesario, 
            // aunque tu body ya tiene overflow:hidden, así que no es crítico.
        });

        // FUNCIÓN CERRAR (Botón X)
        closeBtn1.addEventListener('click', () => {
            modal1.classList.remove('active');
        });

        // FUNCIÓN CERRAR (Tecla ESC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal1.classList.contains('active')) {
                modal1.classList.remove('active');
            }
        });
    }

    // --- LÓGICA MODAL 5.1 ---
    const triggerImg5 = document.querySelector('.trigger-articulo-5');
    const modal5 = document.getElementById('fullscreen-modal-5');
    
    if (triggerImg5 && modal5) {
        const closeBtn5 = modal5.querySelector('.close-modal-btn');

        triggerImg5.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Evita abrir el acordeón
            modal5.classList.add('active');
        });

        closeBtn5.addEventListener('click', () => {
            modal5.classList.remove('active');
        });

        // Cierre con tecla ESC (opcional si quieres que funcione para ambos)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal5.classList.remove('active');
            }
        });
    }
    // --- LÓGICA MODAL 3.1 ---
    const triggerImg3 = document.querySelector('.trigger-articulo-3');
    const modal3 = document.getElementById('fullscreen-modal-3');
    
    if (triggerImg3 && modal3) {
        const closeBtn3 = modal3.querySelector('.close-modal-btn');

        triggerImg3.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Evita abrir el acordeón
            modal3.classList.add('active');
        });

        closeBtn3.addEventListener('click', () => {
            modal3.classList.remove('active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal3.classList.contains('active')) {
                modal3.classList.remove('active');
            }
        });
    }

}); // <-- FIN DEL DOMContentLoaded