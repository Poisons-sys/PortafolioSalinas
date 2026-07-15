import type { AppDefinition, PortfolioProject, SkillGroup } from './types'

export const appDefinitions: AppDefinition[] = [
  {
    id: 'about',
    title: 'Acerca de Rene',
    shortTitle: 'Perfil',
    description: 'Quién soy y cómo construyo productos.',
    size: { width: 920, height: 650 },
  },
  {
    id: 'projects',
    title: 'Proyectos seleccionados',
    shortTitle: 'Proyectos',
    description: 'Productos recientes y trabajo técnico.',
    size: { width: 1060, height: 720 },
  },
  {
    id: 'skills',
    title: 'Tecnologías y herramientas',
    shortTitle: 'Stack',
    description: 'Capacidades de frontend, backend y sistemas.',
    size: { width: 960, height: 690 },
  },
  {
    id: 'terminal',
    title: 'rene@portfolio: ~',
    shortTitle: 'Terminal',
    description: 'Explora el portafolio con comandos.',
    size: { width: 760, height: 520 },
  },
  {
    id: 'contact',
    title: 'Hablemos',
    shortTitle: 'Contacto',
    description: 'Canales públicos y disponibilidad.',
    size: { width: 720, height: 600 },
  },
  {
    id: 'resume',
    title: 'Currículum — René Salinas Ramos',
    shortTitle: 'Currículum',
    description: 'Experiencia, formación y habilidades profesionales.',
    size: { width: 920, height: 720 },
  },
  {
    id: 'loadLogic',
    title: 'Caso de estudio — Load Logic',
    shortTitle: 'Load Logic',
    description: 'Planeación y optimización de estiba.',
    size: { width: 980, height: 700 },
    hideFromDesktop: true,
  },
  {
    id: 'salave',
    title: 'Caso de estudio — SalAve ERP',
    shortTitle: 'SalAve ERP',
    description: 'ERP corporativo y gestión de tráfico.',
    size: { width: 980, height: 700 },
    hideFromDesktop: true,
  },
  {
    id: 'dotnetApi',
    title: 'Caso técnico — API .NET',
    shortTitle: 'API .NET',
    description: 'APIs y desarrollo de sistemas.',
    size: { width: 820, height: 620 },
    hideFromDesktop: true,
  },
]

export const projects: PortfolioProject[] = [
  {
    id: 'loadLogic',
    name: 'Load Logic',
    eyebrow: 'Logística · SaaS B2B',
    summary:
      'Plataforma web para planear y documentar cargas de transporte terrestre, desde el catálogo y las unidades hasta la salida operativa.',
    impact:
      'Conecta simulación de estiba, visualización 3D, validaciones, secuencia por paradas, alertas y evidencia en un flujo trazable.',
    status: 'Producto terminado',
    year: '2026',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Auth.js', 'Radix UI', 'Vercel'],
    capabilities: [
      'Planeación de carga y catálogo conectado',
      'Visualización de acomodo 3D',
      'Balance, estabilidad y alertas operativas',
      'Versionado de layouts y reportes PDF',
      'Acceso por empresa, usuario y rol',
    ],
    primaryUrl: 'https://load-logic-olive.vercel.app/',
    primaryLabel: 'Ver plataforma',
    secondaryUrl: 'https://load-logic-olive.vercel.app/preview/optimization',
    secondaryLabel: 'Explorar demo',
  },
  {
    id: 'salave',
    name: 'SalAve ERP',
    eyebrow: 'Operaciones · ERP corporativo',
    summary:
      'ERP y sistema de gestión de tráfico para centralizar taller, flotilla, patio, inventario, recursos humanos, seguridad y administración.',
    impact:
      'Centraliza procesos con acceso por roles, evidencia, OCR, tableros, bitácora y reportes listos para la operación.',
    status: 'En producción',
    year: '2026',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'C#', 'ASP.NET Core', '.NET', 'REST API', 'SignalR', 'PWA'],
    capabilities: [
      'Taller, tractores e inspecciones vehiculares',
      'Tráfico, patio, remolques e historial',
      'Inventario, compras y movimientos',
      'RH, seguridad, usuarios y bitácora',
      'OCR de placas y reportes PDF/Excel',
    ],
    demoRequest: {
      label: 'Solicitar prueba del ERP',
      subject: 'Solicitud de demostración — SalAve ERP',
      body:
        'Hola René,\n\nVi el caso de estudio de SalAve ERP en tu portafolio y me gustaría solicitar una demostración o prueba controlada.\n\nNombre / empresa:\nObjetivo de la prueba:\n\nGracias.',
    },
  },
  {
    id: 'dotnetApi',
    name: 'API .NET',
    eyebrow: 'Backend · Integración',
    summary:
      'Desarrollo de APIs con C#, ASP.NET Core y .NET para conectar interfaces web, lógica de negocio y servicios operativos.',
    impact:
      'Una base técnica que cubre integración, lógica de negocio y comunicación entre interfaces web y servicios operativos.',
    status: 'Trabajo técnico',
    year: 'Actual',
    technologies: ['C#', 'ASP.NET Core', '.NET', 'REST API'],
    capabilities: [
      'Diseño e integración de APIs REST',
      'Servicios backend con el ecosistema .NET',
      'Integración con aplicaciones web',
      'Servicios mantenibles dentro del ecosistema .NET',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    description: 'Interfaces claras, rápidas y adaptables.',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    description: 'Servicios, autenticación e integraciones.',
    skills: ['C#', 'ASP.NET Core', '.NET', 'Node.js', 'REST API', 'GraphQL', 'SignalR', 'Auth.js'],
  },
  {
    title: 'Datos & plataforma',
    description: 'Datos, entrega y operación del producto.',
    skills: ['SQL', 'MongoDB', 'Docker', 'Git', 'PWA', 'WebSockets', 'PDF / Excel', 'Vercel'],
  },
  {
    title: 'Lenguajes & sistemas',
    description: 'Fundamentos que van más allá del navegador.',
    skills: ['C', 'C++', 'Python', 'C#', 'Programación orientada a objetos', 'Estructuras de datos'],
  },
]

// Son datos públicos del portafolio. Las variables permiten reemplazarlos por entorno.
export const publicLinks = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'rene.salinas2112@gmail.com',
  github: process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || 'https://github.com/Poisons-sys',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || '',
}

export const getDefinition = (id: AppDefinition['id']) =>
  appDefinitions.find((definition) => definition.id === id)!

export const getProject = (id: PortfolioProject['id']) =>
  projects.find((project) => project.id === id)!
