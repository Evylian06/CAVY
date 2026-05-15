const negocio = {
  telefonoWhatsApp: "51989191035",
  instagram: "https://instagram.com/tuusuario",
  facebook: "https://facebook.com/tuusuario",
  mensajeBase: "Hola CAVY, quisiera cotizar un pedido de postres."
};

const productos = [
  {
    nombre: "Torta helada",
    categoria: "tortas",
    etiqueta: "Favorito",
    descripcion: "Torta fresca y suave, ideal para celebraciones familiares.",
    precio: "Desde S/ 80",
    imagen: "torta-helada.png"
  },
  {
    nombre: "Torta personalizada",
    categoria: "tortas",
    etiqueta: "A pedido",
    descripcion: "Diseño, sabor y decoración coordinados según tu ocasión.",
    precio: "Cotizar",
    imagen: "torta-personalizada.jpg"
  },
  {
    nombre: "Cupcakes decorados",
    categoria: "detalles",
    etiqueta: "Detalles",
    descripcion: "Bizcocho suave con frosting y decoración para regalar o compartir.",
    precio: "Desde S/ 10",
    imagen: "cupcake.png"
  },
  {
    nombre: "Chocotejas",
    categoria: "detalles",
    etiqueta: "Clasico",
    descripcion: "Chocolate artesanal con rellenos dulces y presentación para detalle.",
    precio: "Desde S/ 30",
    imagen: "chocoteja.png"
  },
  {
    nombre: "Crema volteada",
    categoria: "postres",
    etiqueta: "Postre",
    descripcion: "Textura cremosa, caramelo dorado y sabor casero.",
    precio: "Desde S/ 55",
    imagen: "crema-volteada.jpeg"
  },
  {
    nombre: "Brownie intenso",
    categoria: "postres",
    etiqueta: "Chocolate",
    descripcion: "Brownie húmedo con sabor profundo a chocolate.",
    precio: "Desde S/ 18",
    imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=900&auto=format&fit=crop"
  }
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navLinks = document.querySelectorAll(".nav-links a");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

function whatsappUrl(mensaje = negocio.mensajeBase) {
  return `https://wa.me/${negocio.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

function renderProductos(categoria = "todos") {
  const lista = categoria === "todos"
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);

  productGrid.innerHTML = lista.map((producto) => {
    const mensaje = `Hola CAVY, me interesa: ${producto.nombre}. Quisiera más información.`;

    return `
      <article class="product-card reveal visible">
        <div class="product-media">
          <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
          <span class="badge">${producto.etiqueta}</span>
        </div>
        <div class="product-body">
          <span class="product-meta">${producto.categoria}</span>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <strong class="product-price">${producto.precio}</strong>
          <a class="btn" href="${whatsappUrl(mensaje)}" target="_blank" rel="noopener">
            Pedir por WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}

function configurarEnlaces() {
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.href = whatsappUrl();
  });

  document.querySelectorAll(".js-instagram").forEach((link) => {
    link.href = negocio.instagram;
  });

  document.querySelectorAll(".js-facebook").forEach((link) => {
    link.href = negocio.facebook;
  });
}

function activarScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}

function iniciarReveals() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProductos(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navbar.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navbar.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", activarScroll);

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hidden"), 450);
    setTimeout(() => loader.remove(), 950);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

configurarEnlaces();
renderProductos();
activarScroll();
iniciarReveals();
