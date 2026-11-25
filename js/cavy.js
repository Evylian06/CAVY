const negocio = {
  telefonoWhatsApp: "51989191035",
  // Cuando existan las redes, pega aquí la URL completa (ej. "https://instagram.com/cavy")
  // y los iconos aparecen solos en las 5 páginas. Si están vacías, se ocultan.
  instagram: "",
  facebook: "",
  mensajeBase: "Hola CAVY, quisiera cotizar un pedido de postres."
};

const categorias = {
  tortas: "Tortas",
  postres: "Postres",
  detalles: "Detalles"
};

const productos = [
  {
    nombre: "Torta helada",
    categoria: "tortas",
    etiqueta: "Favorito",
    descripcion: "Torta fresca y suave, ideal para celebraciones familiares.",
    precio: "Desde S/ 80",
    imagen: "torta-helada.webp"
  },
  {
    nombre: "Pie de Manzana",
    categoria: "postres",
    etiqueta: "A pedido",
    descripcion: "Delicioso pie de manzana con relleno casero, trozos de manzana y un toque de canela sobre una base crocante.",
    precio: "Precio a cotizar",
    imagen: "pie-manzana2.jpeg"
  },
  {
    nombre: "Cupcakes decorados",
    categoria: "detalles",
    etiqueta: "Detalles",
    descripcion: "Bizcocho suave con frosting y decoración para regalar o compartir.",
    precio: "Desde S/ 10",
    imagen: "cupcake.webp"
  },
  {
    nombre: "Chocotejas",
    categoria: "detalles",
    etiqueta: "Clasico",
    descripcion: "Chocolate artesanal con rellenos dulces y presentación para detalle.",
    precio: "Desde S/ 30",
    imagen: "chocoteja.webp"
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
    nombre: "ChocoFlan",
    categoria: "postres",
    etiqueta: "Chocolate y crema volteada",
    descripcion: "Brownie húmedo con sabor profundo a chocolate.",
    precio: "Desde S/ 18",
    imagen: "chocoflan.jpeg"
  },
  {
    nombre: "Sueño de Piña",
    categoria: "postres",
    etiqueta: "Piña y crema",
    descripcion: "Una mezcla de sabores tropicales con textura suave y cremosa.",
    precio: "Precio a cotizar",
    imagen: "sueño-piña.jpeg"
  },
  {
    nombre: "Keke de Piña",
    categoria: "postres",
    etiqueta: "Piña",
    descripcion: "Un keke suave y esponjoso con sabor a piña y una capa cremosa.",
    precio: "Precio a cotizar",
    imagen: "keke-piña.jpeg"
  }
];

function whatsappUrl(mensaje = negocio.mensajeBase) {
  return `https://wa.me/${negocio.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

function crearTarjeta(producto, compacta = false) {
  const mensaje = `Hola CAVY, me interesa: ${producto.nombre}. Quisiera más información.`;
  const categoria = compacta
    ? ""
    : `<span class="product-meta">${categorias[producto.categoria]}</span>`;
  const precio = compacta
    ? ""
    : `<strong class="product-price">${producto.precio}</strong>`;
  const boton = compacta
    ? ""
    : `
        <a class="btn" href="${whatsappUrl(mensaje)}" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          Pedir por WhatsApp
        </a>`;

  return `
    <article class="product-card reveal visible">
      <div class="product-media">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <span class="badge">${producto.etiqueta}</span>
      </div>
      <div class="product-body">
        ${categoria}
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        ${precio}${boton}
      </div>
    </article>
  `;
}

function renderProductos(categoria = "todos") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const compacta = grid.dataset.compacta === "true";
  const limite = Number(grid.dataset.limite) || 0;
  let lista = categoria === "todos"
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);

  if (limite) lista = lista.slice(0, limite);

  grid.innerHTML = lista.map((producto) => crearTarjeta(producto, compacta)).join("");
}

function iniciarFiltros() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProductos(button.dataset.filter);
    });
  });
}

function configurarEnlaces() {
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.href = whatsappUrl();
  });

  const redes = [
    { selector: ".js-instagram", url: negocio.instagram },
    { selector: ".js-facebook", url: negocio.facebook }
  ];

  redes.forEach(({ selector, url }) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (url) {
        link.href = url;
        link.removeAttribute("aria-disabled");
        link.removeAttribute("title");
      } else {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.title = "Próximamente";
      }
    });
  });
}

function iniciarNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navLinks");
  if (!navbar || !navToggle || !navMenu) return;

  const cerrarMenu = () => {
    navMenu.classList.remove("open");
    navbar.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const abierto = navMenu.classList.toggle("open");
    navbar.classList.toggle("open", abierto);
    navToggle.setAttribute("aria-expanded", String(abierto));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", cerrarMenu);
  });

  if (navbar.classList.contains("solid")) return;

  const actualizarScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", actualizarScroll, { passive: true });
  actualizarScroll();
}

function iniciarReveals() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => elemento.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach((elemento) => observer.observe(elemento));
}

function iniciarLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const inicio = performance.now();
  const ocultar = () => {
    const restante = Math.max(0, 2000 - (performance.now() - inicio));

    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 800);
    }, restante);
  };

  if (document.readyState === "complete") {
    ocultar();
  } else {
    window.addEventListener("load", ocultar);
  }
}

function iniciarAnio() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

configurarEnlaces();
renderProductos();
iniciarFiltros();
iniciarNavbar();
iniciarReveals();
iniciarLoader();
iniciarAnio();
