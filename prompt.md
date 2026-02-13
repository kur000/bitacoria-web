# PROMPT: Generador de Sitio Web "Bitácora Digital Interactiva"

## ROL
Actúa como un Desarrollador Web Creativo Senior y experto en UI/UX. Tu especialidad son los sitios web artísticos, minimalistas y con navegación no convencional.

## OBJETIVO
Tu tarea es escribir el código completo (HTML, CSS y JavaScript y librerias que sean necesarias) para una "Bitácora Digital" de una Diplomatura en Artes Mediales. El sitio debe ser visualmente impactante pero ligero, funcionando como una Single Page Application (SPA) sencilla o un sitio estático muy fluido.

## ESTRUCTURA DEL SITIO
El sitio consta de dos estados principales:

### 1. El Index (Menú Principal)
- Debe ser la pantalla de bienvenida.
- Debe tener un diseño centrado y limpio.
- Debe contener un menú de navegación claro con enlaces a los 4 módulos:
  1. **Módulo 1:** Historia y problemáticas del campo.
  2. **Módulo 2:** Imagen y Video generativo.
  3. **Módulo 3:** Sonido generativo.
  4. **Módulo 4:** LLMs y Agentes.

### 2. Las Secciones (Los Módulos)
- Al hacer clic en un módulo del Index, el Index debe desaparecer (transición suave) y mostrar el contenido del módulo seleccionado.
- **REQUISITO CLAVE DE NAVEGACIÓN:** Dentro de cada módulo, **NO** debe haber menú de navegación. Solo debe haber un botón fijo y visible que diga "VOLVER AL INDEX" (o un ícono de flecha atrás/cerrar) que regrese al usuario a la pantalla de bienvenida.

## REQUISITOS DE DISEÑO Y LAYOUT (CRÍTICOS)

1.  **Desplazamiento Horizontal (Horizontal Scroll):**
    - El sitio **NO** debe tener scroll vertical en absoluto (`overflow-y: hidden`).
    - El contenido de cada módulo se distribuye en un eje horizontal (`overflow-x: auto` o scroll controlado con JS). El usuario navega moviéndose hacia la derecha.
    - Usa la rueda del mouse para scrollear horizontalmente (mapear el scroll vertical del mouse al scroll horizontal de la página mediante JS para mejor UX).

2.  **Contenedores de Contenido (Los "Desplegables"):**
    - A lo largo del recorrido horizontal, debe haber "Items" o "Tarjetas".
    - Estos items representan los entregables (imágenes, videos, textos, prompts, código).
    - **Interactividad:** Estos items deben estar colapsados o en vista previa. Al hacer clic en ellos, deben desplegarse (expandirse) para mostrar la información completa (el prompt usado, la descripción del proceso, etc.) sin romper el flujo horizontal. Puedes usar elementos `<details>` estilizados o modales/overlays elegantes.

3.  **Estética:**
    - Fondo oscuro o neutro (estilo "Dark Mode" elegante para resaltar el arte generativo).
    - Tipografía moderna (Sans-serif, estilo Helvética o similar).
    - Animaciones suaves al entrar y salir de las secciones.
    - El raton debe verse en estilo cruz, idealmente reaccionando al color sobre lo que esta posado

## ESPECIFICACIONES TÉCNICAS
- **Stack:** HTML5, CSS3 y Vanilla JavaScript (sin frameworks pesados como React o Vue para mantenerlo simple y editable, a menos que sea estrictamente necesario para animaciones complejas, en cuyo caso usa GSAP vía CDN).
- **Responsive:** Aunque el diseño es horizontal, asegúrate de que sea legible en celulares.
- **Marcadores de posición:** Donde irían las imágenes o videos, coloca `placeholder.com` o div de colores para que yo pueda insertar mi material después. Deja comentarios en el código indicando: ``.

## ENTREGABLES
Por favor, provee:
1.  Un solo archivo `index.html` con la estructura.
2.  Un archivo `style.css` con todo el estilizado (layout horizontal, transiciones).
3.  Un archivo `script.js` que maneje la lógica de navegación (ocultar index/mostrar módulo, botón volver, mapeo de scroll vertical a horizontal).

Genera el código ahora.