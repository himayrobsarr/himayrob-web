import type { WebOfferContent } from "../types/webOffer";

export const webOfferContent: WebOfferContent = {
  packages: {
    badge: "Paginas web para negocios",
    title: "Paquetes claros para emprendedores y negocios de Bucaramanga",
    description:
      "No se trata solo de una pagina bonita. Construyo una presencia profesional para que tu negocio se vea confiable, explique mejor lo que vende y reciba clientes por WhatsApp.",
    items: [
      {
        id: "landing-emprendedor",
        name: "Landing Emprendedor",
        price: "$800.000 COP",
        summary:
          "Ideal para emprendedores que necesitan una pagina sencilla, bonita y funcional.",
        bestFor: [
          "Manicuristas",
          "Barberos",
          "Restaurantes pequenos",
          "Coaches",
          "Profesionales independientes",
          "Negocios que quieren presentarse mejor",
        ],
        includes: [
          "Pagina de una sola vista",
          "Diseno personalizado",
          "Adaptacion para celular",
          "Boton de WhatsApp",
          "Formulario de contacto basico",
          "Secciones de inicio, servicios, beneficios, testimonios o galeria y contacto",
          "Publicacion de la pagina",
          "2 rondas de cambios",
        ],
        clientPitch:
          "Esta opcion es ideal si quieres una pagina sencilla para mostrar tu negocio, explicar tus servicios y recibir clientes por WhatsApp.",
      },
      {
        id: "pagina-web-negocio",
        name: "Pagina Web Negocio",
        price: "$1.500.000 COP",
        summary:
          "Para negocios que necesitan una pagina mas completa y quieren generar mas confianza.",
        featured: true,
        bestFor: [
          "Empresas pequenas",
          "Marcas personales",
          "Negocios con varios servicios",
          "Centros de estetica",
          "Academias",
          "Consultorios",
          "Tiendas fisicas",
        ],
        includes: [
          "Hasta 6 secciones o vistas",
          "Diseno personalizado",
          "Pagina adaptada a celular",
          "Boton de WhatsApp",
          "Formulario de contacto",
          "Enlaces a redes sociales",
          "SEO basico",
          "Publicacion",
          "2 rondas de cambios",
        ],
        clientPitch:
          "Esta opcion es mejor si quieres una pagina mas completa, con varias secciones para explicar mejor tu negocio, mostrar tus servicios y generar mas confianza.",
      },
      {
        id: "tienda-whatsapp",
        name: "Tienda Online 3A",
        price: "$3.000.000 COP",
        summary:
          "Para negocios que quieren mostrar productos, armar carrito y recibir pedidos por WhatsApp.",
        bestFor: [
          "Tiendas de ropa",
          "Tiendas de accesorios",
          "Reposterias",
          "Floristerias",
          "Productos personalizados",
          "Emprendedores que venden por WhatsApp",
        ],
        includes: [
          "Catalogo de productos",
          "Listado de productos",
          "Carrito de compras",
          "Calculo del total",
          "Boton para enviar el pedido por WhatsApp",
          "Diseno personalizado",
          "Adaptacion para celular",
          "Publicacion",
          "3 rondas de cambios",
        ],
        clientPitch:
          "Tus clientes agregan productos al carrito y luego te envian el pedido directamente por WhatsApp.",
      },
      {
        id: "tienda-pagos",
        name: "Tienda Online 3B",
        price: "$4.000.000 COP",
        summary:
          "Para negocios que quieren vender y recibir pagos directamente desde la pagina.",
        bestFor: [
          "Negocios que ya venden constantemente",
          "Tiendas que quieren recibir pagos en linea",
          "Emprendedores mas organizados",
          "Marcas que quieren automatizar mejor sus ventas",
        ],
        includes: [
          "Todo lo del paquete 3A",
          "Carrito de compras",
          "Integracion con pasarela de pago",
          "Flujo de pago en linea",
          "Pagina de confirmacion",
          "Pruebas basicas de compra",
          "Publicacion",
          "3 rondas de cambios",
        ],
        clientPitch:
          "El cliente puede elegir productos, agregarlos al carrito y pagar directamente desde la pagina.",
      },
    ],
  },
  maintenance: {
    badge: "Mantenimiento mensual",
    title: "Soporte para clientes que no quieren encargarse de lo tecnico",
    description:
      "Estos planes se ofrecen despues de publicar la pagina, especialmente cuando el cliente quiere tranquilidad, cambios pequenos y soporte continuo.",
    items: [
      {
        id: "basico",
        name: "Mantenimiento Basico",
        price: "Desde $100.000/mes",
        includes: [
          "Mantener la pagina activa",
          "Soporte tecnico basico",
          "Correccion de errores pequenos",
          "1 cambio pequeno al mes",
        ],
      },
      {
        id: "pro",
        name: "Mantenimiento Pro",
        price: "Desde $200.000/mes",
        includes: [
          "Mantener la pagina activa",
          "Soporte tecnico",
          "Hasta 3 cambios pequenos al mes",
          "Cambios de textos o imagenes",
          "Revision general de la pagina",
        ],
      },
      {
        id: "ecommerce",
        name: "Mantenimiento Ecommerce",
        price: "Desde $350.000/mes",
        includes: [
          "Soporte tecnico para tienda",
          "Revision del carrito",
          "Cambios menores",
          "Ajustes de productos limitados",
          "Correccion de errores",
        ],
      },
    ],
  },
  projects: {
    badge: "Paginas creadas",
    title: "Ejemplos reales de paginas creadas",
    description:
      "Mira algunos proyectos desarrollados para presentar negocios, explicar servicios y generar mas confianza en internet.",
    items: [
      {
        id: "somic-erp-demo",
        title: "Somic ERP Demo",
        businessType: "Software ERP/POS",
        description:
          "Landing comercial para presentar un sistema ERP/POS con enfoque profesional y orientado a negocios que necesitan ordenar sus operaciones.",
        result:
          "Muestra el producto, sus beneficios y la propuesta de valor en una pagina clara que ayuda a generar confianza y conversaciones comerciales.",
        url: "https://somicerpdemo.vercel.app/",
        imageSrc: "/previews/somic-erp-demo.jpg.png",
        tags: ["ERP", "POS", "Landing", "Software"],
      },
      {
        id: "himayrob-web",
        title: "Himayrob Web",
        businessType: "Servicios digitales",
        description:
          "Sitio personal para presentar desarrollo web, automatizacion, consultoria y formacion practica.",
        result:
          "Centraliza servicios, contacto por WhatsApp, consultoria y portafolio en una presencia profesional.",
        url: "https://himayrob.com",
        tags: ["React", "Landing", "Servicios", "WhatsApp"],
      },
    ],
  },
};
