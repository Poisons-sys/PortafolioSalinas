# Portafolio — Rene Salinas Ramos

Portafolio interactivo con experiencia de escritorio, construido con React, TypeScript y Vite. Presenta los casos de Load Logic, SalAve ERP, trabajo backend con .NET y el stack técnico actualizado.

## Desarrollo local

```bash
npm install
npm run dev
```

Validación de producción:

```bash
npm run lint
npm run build
```

## Contacto público

Las credenciales compartidas para revisar proyectos no se publican. Copia `.env.example` como `.env.local` y agrega únicamente los canales públicos que quieras mostrar:

```env
NEXT_PUBLIC_CONTACT_EMAIL=correo-publico@ejemplo.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/usuario
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/usuario
```

Si ninguna variable está configurada, la ventana de contacto mantiene un mensaje de presentación copiable sin exponer datos privados.

## Contenido principal

- `src/data.ts`: proyectos, tecnologías, capacidades y enlaces.
- `src/components/AppContent.tsx`: contenido de cada aplicación/ventana.
- `src/App.tsx`: escritorio, lanzador, barra de tareas y gestor de ventanas.
- `src/styles.css`: sistema visual, proyectos ilustrados y responsive.

## Interacciones

- Mover, redimensionar, minimizar, maximizar y cerrar ventanas.
- Lanzador con búsqueda mediante `Alt + Espacio` o `Ctrl + K`.
- Terminal funcional con `help`, `stack`, `projects` y `open <app>`.
- Tema claro/oscuro.
- Ventanas a pantalla completa optimizadas para móvil.
