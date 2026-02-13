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

});