/**
 * Configuración centralizada para adaptar la plataforma a diferentes clientes (White-label)
 * Estos datos alimentan los centros de atención, carruseles y frames del portal.
 */

export const PLATFORM_CONFIG = {
  institutionName: "Sanatorio Quantum Medical",
  logoUrl: "/logo-quantum.png",
  primaryColor: "#0f172a", // Slate 900
  supportPhone: "0800-555-HEALTH",
  
  // Sedes / Centros de Atención (Para demos con datos ficticios)
  centers: [
    {
      id: "sede-central",
      name: "Sede Central",
      address: "Av. Libertador 4450, CABA",
      phone: "+54 11 4455-6600",
      type: "Alta Complejidad",
      guardTime: "15 min",
      status: "normal", // normal, busy, critical
      image: "/images/sede-central.png",
      link: "https://goo.gl/maps/example1"
    },
    {
      id: "sede-belgrano",
      name: "Centro Médico Belgrano",
      address: "Cabildo 1800, Belgrano",
      phone: "+54 11 4800-9900",
      type: "Consultorios Externos",
      guardTime: "45 min",
      status: "busy",
      image: "/images/sede-belgrano.png",
      link: "https://goo.gl/maps/example2"
    },
    {
      id: "sede-pilar",
      name: "Sanatorio Pilar Campus",
      address: "Km 50 Panamericana, Pilar",
      phone: "+54 0230 448-7700",
      type: "Internación y Guardia",
      guardTime: "5 min",
      status: "normal",
      image: "/images/sede-pilar.png",
      link: "https://goo.gl/maps/example3"
    }

  ],

  // Banners y Mensajes Destacados
  promotions: [
    {
      id: "vacunacion",
      title: "Campaña de Vacunación Antigripal",
      description: "Habilitamos el pre-registro online para la campaña 2024.",
      cta: "Quiero mi dosis",
      color: "bg-blue-600"
    },
    {
      id: "prevencion",
      title: "Chequeo Preventivo Mujer",
      description: "Un circuito de salud integral en solo 4 horas.",
      cta: "Ver programa",
      color: "bg-purple-600"
    }
  ]
};
