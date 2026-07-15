import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clipboard,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Globe2,
  Layers3,
  BriefcaseBusiness,
  Mail,
  MonitorSmartphone,
  PackageOpen,
  Radio,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { getProject, projects, publicLinks, skillGroups } from '../data'
import type { AppId, PortfolioProject } from '../types'
import { ProjectVisual } from './ProjectVisuals'

interface AppContentProps {
  openApp: (id: AppId) => void
}

export function AboutApp({ openApp }: AppContentProps) {
  return (
    <div className="app-page about-app">
      <section className="about-hero">
        <div className="about-copy">
          <div className="availability"><span /> Producto web · APIs · Integraciones</div>
          <p className="section-kicker">FULL STACK DEVELOPER · PRODUCT BUILDER</p>
          <h1>
            Diseño y construyo
            <span> productos web, APIs y software para operaciones.</span>
          </h1>
          <p className="about-lead">
            Soy <strong>René Salinas Ramos</strong>. Diseño y construyo productos web de punta a punta:
            Frontend, Backend APIs, bases de datos e integraciones que convierten procesos complejos en herramientas claras.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-action" onClick={() => openApp('projects')}>
              Explorar proyectos <ArrowRight size={16} />
            </button>
            <button type="button" className="secondary-action" onClick={() => openApp('skills')}>
              Ver stack técnico
            </button>
            <button type="button" className="secondary-action" onClick={() => openApp('contact')}>
              Contacto
            </button>
          </div>
        </div>
        <div className="identity-card">
          <div className="identity-orbit orbit-one" />
          <div className="identity-orbit orbit-two" />
          <div className="identity-mark">RS</div>
          <div className="identity-meta">
            <span>RENÉ SALINAS</span>
            <small>Full Stack Developer</small>
          </div>
          <span className="identity-coordinate">WEB / API / SYSTEMS</span>
        </div>
      </section>

      <section className="quick-stats" aria-label="Resumen profesional">
        <article><strong>02</strong><span>Plataformas recientes</span></article>
        <article><strong>360°</strong><span>Producto de punta a punta</span></article>
        <article><strong>.NET</strong><span>APIs y backend</span></article>
        <article><strong>WEB</strong><span>Interfaces operativas</span></article>
      </section>

      <section className="about-section">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">EN QUÉ TRABAJO</p>
            <h2>Del problema al producto funcionando.</h2>
          </div>
          <button type="button" className="text-action" onClick={() => openApp('terminal')}>
            Abrir terminal <TerminalSquare size={15} />
          </button>
        </div>
        <div className="focus-grid">
          <article>
            <span className="focus-icon"><MonitorSmartphone size={21} /></span>
            <h3>Producto web</h3>
            <p>Experiencias responsive pensadas para usuarios, negocio y operación cotidiana.</p>
          </article>
          <article>
            <span className="focus-icon"><ServerCog size={21} /></span>
            <h3>Backend & APIs</h3>
            <p>Servicios con C#, ASP.NET Core, .NET y Node.js conectados con el flujo real.</p>
          </article>
          <article>
            <span className="focus-icon"><Workflow size={21} /></span>
            <h3>Software para operaciones</h3>
            <p>Logística, ERP, reportes, multiplataforma, tiempo real y trazabilidad en una sola plataforma.</p>
          </article>
        </div>
      </section>

      <section className="about-section recent-work">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">TRABAJO RECIENTE</p>
            <h2>Productos listos para uso real.</h2>
          </div>
          <button type="button" className="text-action" onClick={() => openApp('projects')}>
            Ver todos <ArrowRight size={15} />
          </button>
        </div>
        <div className="recent-grid">
          <button type="button" className="recent-card" onClick={() => openApp('loadLogic')}>
            <ProjectVisual project="loadLogic" compact />
            <span className="recent-info"><b>Load Logic</b><small>Optimización de estiba</small></span>
            <ChevronRight size={18} />
          </button>
          <button type="button" className="recent-card" onClick={() => openApp('salave')}>
            <ProjectVisual project="salave" compact />
            <span className="recent-info"><b>SalAve ERP</b><small>Operación corporativa</small></span>
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}

interface ProjectCardProps {
  project: PortfolioProject
  onOpen: () => void
}

function getDemoRequestUrl(project: PortfolioProject) {
  if (!project.demoRequest || !publicLinks.email) return ''

  const params = new URLSearchParams({
    subject: project.demoRequest.subject,
    body: project.demoRequest.body,
  })

  return `mailto:${publicLinks.email}?${params.toString()}`
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const demoRequestUrl = getDemoRequestUrl(project)

  return (
    <article className="project-card">
      <ProjectVisual project={project.id} />
      <div className="project-card-copy">
        <div className="project-meta-row">
          <span>{project.eyebrow}</span>
          <span className="project-status"><i /> {project.status}</span>
        </div>
        <h2>{project.name}</h2>
        <p>{project.summary}</p>
        <div className="tech-row">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <button type="button" className="primary-action small" onClick={onOpen}>
            Ver caso <ArrowRight size={14} />
          </button>
          {project.primaryUrl && (
            <a href={project.primaryUrl} target="_blank" rel="noreferrer" className="secondary-action small">
              Sitio <ExternalLink size={13} />
            </a>
          )}
          {demoRequestUrl && (
            <a href={demoRequestUrl} className="secondary-action small">
              Solicitar prueba <Mail size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsApp({ openApp }: AppContentProps) {
  return (
    <div className="app-page projects-app">
      <header className="app-page-header projects-header">
        <div>
          <p className="section-kicker">Mis Logros</p>
          <h1>Proyectos que resuelven trabajo real.</h1>
          <p>
            De logística y visualización de carga a un ERP modular con backend .NET:
            productos pensados para operar, crecer y dejar evidencia.
          </p>
        </div>
        <div className="project-count"><strong>03</strong><span>casos<br />seleccionados</span></div>
      </header>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => openApp(project.id)} />
        ))}
      </div>
      <div className="projects-footer-note">
        <Sparkles size={17} />
        <span>También trabajo con C, C++ y Python como parte de mi stack general.</span>
        <button type="button" onClick={() => openApp('skills')}>Explorar tecnologías</button>
      </div>
    </div>
  )
}

const groupIcons = [MonitorSmartphone, ServerCog, Database, Code2]

export function SkillsApp() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase('es')
  const visibleGroups = skillGroups
    .map((group) => ({
      ...group,
      skills: normalizedQuery
        ? group.skills.filter((skill) => skill.toLocaleLowerCase('es').includes(normalizedQuery))
        : group.skills,
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <div className="app-page skills-app">
      <header className="app-page-header skills-header">
        <div>
          <p className="section-kicker">HABILIDADES</p>
          <h1>Un stack para construir el sistema completo.</h1>
          <p>Frontend, backend, bases de datos y lenguajes de sistemas organizados por la parte del problema que resuelven.</p>
        </div>
        <label className="skill-search">
          <span>Buscar tecnología</span>
          <div><Code2 size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="React, C#, C++..." />{query && <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={14} /></button>}</div>
        </label>
      </header>

      <div className="skill-overview">
        <span><BadgeCheck size={15} /> Web & producto</span>
        <span><BadgeCheck size={15} /> APIs .NET</span>
        <span><BadgeCheck size={15} /> Bases de datos</span>
        <span><BadgeCheck size={15} /> Sistemas</span>
      </div>

      {visibleGroups.length > 0 ? (
        <div className="skill-groups">
          {visibleGroups.map((group) => {
            const originalIndex = skillGroups.findIndex((item) => item.title === group.title)
            const Icon = groupIcons[originalIndex]
            return (
              <section className="skill-group" key={group.title}>
                <div className="skill-group-title">
                  <span><Icon size={19} /></span>
                  <div><h2>{group.title}</h2><p>{group.description}</p></div>
                </div>
                <div className="skill-cloud">
                  {group.skills.map((skill) => <span key={skill}><i>{skill.slice(0, 2).toUpperCase()}</i>{skill}</span>)}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="empty-state"><PackageOpen size={34} /><h2>Sin coincidencias</h2><p>Prueba con otro nombre o categoría.</p></div>
      )}

      <footer className="skills-note">
        <CircleDot size={15} />
        <span>No uso porcentajes arbitrarios: el nivel se demuestra en producto, arquitectura y decisiones técnicas.</span>
      </footer>
    </div>
  )
}

export function CaseStudyApp({ projectId }: { projectId: PortfolioProject['id'] }) {
  const project = getProject(projectId)
  const demoRequestUrl = getDemoRequestUrl(project)
  const isSalave = project.id === 'salave'
  const isLoadLogic = project.id === 'loadLogic'

  return (
    <div className={`app-page case-study case-${project.id}`}>
      <header className="case-hero">
        <div className="case-copy">
          <div className="project-meta-row">
            <span>{project.eyebrow}</span>
            <span className="project-status"><i /> {project.status}</span>
          </div>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
          <div className="case-actions">
            {project.primaryUrl && (
              <a className="primary-action" href={project.primaryUrl} target="_blank" rel="noreferrer">
                {project.primaryLabel} <ExternalLink size={15} />
              </a>
            )}
            {project.secondaryUrl && (
              <a className="secondary-action" href={project.secondaryUrl} target="_blank" rel="noreferrer">
                {project.secondaryLabel} <ExternalLink size={14} />
              </a>
            )}
            {demoRequestUrl && (
              <a className="primary-action" href={demoRequestUrl}>
                {project.demoRequest?.label} <Mail size={15} />
              </a>
            )}
          </div>
        </div>
        <ProjectVisual project={project.id} />
      </header>

      <div className="case-layout">
        <div className="case-main">
          <section className="case-section">
            <p className="section-kicker">EL PRODUCTO</p>
            <h2>Una herramienta conectada con la operación.</h2>
            <p className="case-impact">{project.impact}</p>
          </section>

          <section className="case-section">
            <p className="section-kicker">CAPACIDADES</p>
            <div className="capability-list">
              {project.capabilities.map((capability, index) => (
                <div key={capability}><span>{String(index + 1).padStart(2, '0')}</span><p>{capability}</p><CheckCircle2 size={18} /></div>
              ))}
            </div>
          </section>

          {isLoadLogic && (
            <section className="case-section callout-section">
              <ShieldCheck size={24} />
              <div>
                <h3>Demo pública sin persistencia</h3>
                <p>Las vistas de demostración permiten explorar escenarios comerciales sin modificar datos reales. El preview muestra el flujo y la lectura del resultado; no ejecuta el optimizador productivo.</p>
              </div>
            </section>
          )}

          {isSalave && (
            <section className="case-section callout-section">
              <Radio size={24} />
              <div>
                <h3>Operación modular y en tiempo real</h3>
                <p>La experiencia integra módulos por rol, API en C#/.NET, actualizaciones con SignalR, OCR de placas, PWA y generación de documentos para uso operativo.</p>
              </div>
            </section>
          )}
        </div>

        <aside className="case-sidebar">
          <section>
            <span>AÑO</span><strong>{project.year}</strong>
          </section>
          <section>
            <span>ROL</span><strong>Full Stack<br />Development</strong>
          </section>
          <section>
            <span>TECNOLOGÍAS</span>
            <div className="case-tech-list">{project.technologies.map((technology) => <i key={technology}>{technology}</i>)}</div>
          </section>
          <section className="case-status-card">
            <small>ESTADO</small>
            <strong><i /> {project.status}</strong>
          </section>
        </aside>
      </div>
    </div>
  )
}

interface TerminalEntry {
  command?: string
  lines: string[]
  tone?: 'normal' | 'accent' | 'error'
  kind?: 'text' | 'neofetch'
}

interface DeviceSnapshot {
  platform: string
  browser: string
  display: string
  cpu: string
  memory: string
  locale: string
  network: string
}

type BrowserNavigator = Navigator & {
  deviceMemory?: number
  connection?: { effectiveType?: string }
  userAgentData?: { platform?: string }
}

const rsAscii = String.raw`        
      :::::::::::::            :::::::::::
     ::::::::::::::::        ::::::::::::::
     ::::        :::::      ::::::      :::
    ::::          ::::     :::::
    ::::          ::::     ::::::
   ::::        ::::::       :::::::
   ::::::::::::::::          :::::::
  ::::::::::::                 :::::::
  ::::    :::::                   ::::::
 ::::      :::::       ::          ::::::
 ::::        ::::     ::::        ::::::
::::         :::::     ::::::::::::::::
::::         :::::       ::::::::::::`

const initialDeviceSnapshot: DeviceSnapshot = {
  platform: 'Web Runtime',
  browser: 'Detectando…',
  display: 'Detectando…',
  cpu: 'No expuesto',
  memory: 'No expuesta',
  locale: 'Detectando…',
  network: 'Detectando…',
}

function getBrowserName(userAgent: string) {
  const browsers: Array<[RegExp, string]> = [
    [/Edg\/(\d+)/, 'Microsoft Edge'],
    [/Firefox\/(\d+)/, 'Firefox'],
    [/OPR\/(\d+)/, 'Opera'],
    [/Chrome\/(\d+)/, 'Chrome'],
    [/Version\/(\d+).+Safari/, 'Safari'],
  ]
  const match = browsers.find(([pattern]) => pattern.test(userAgent))
  if (!match) return 'Navegador web'
  const version = userAgent.match(match[0])?.[1]
  return `${match[1]}${version ? ` ${version}` : ''}`
}

function NeofetchOutput() {
  const [device, setDevice] = useState<DeviceSnapshot>(initialDeviceSnapshot)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const browserNavigator = navigator as BrowserNavigator
      const scale = Number.isInteger(window.devicePixelRatio)
        ? window.devicePixelRatio.toFixed(0)
        : window.devicePixelRatio.toFixed(1)
      const connection = browserNavigator.connection?.effectiveType?.toUpperCase()

      setDevice({
        platform: browserNavigator.userAgentData?.platform || navigator.platform || 'Web Runtime',
        browser: getBrowserName(navigator.userAgent),
        display: `${window.screen.width}×${window.screen.height} @ ${scale}x`,
        cpu: navigator.hardwareConcurrency
          ? `${navigator.hardwareConcurrency} hilos lógicos expuestos`
          : 'No expuesto',
        memory: browserNavigator.deviceMemory
          ? `≈ ${browserNavigator.deviceMemory} GB (estimación)`
          : 'No expuesta por el navegador',
        locale: navigator.language || 'No expuesto',
        network: navigator.onLine ? `${connection ?? 'En línea'} (estimación)` : 'Sin conexión',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const specs = [
    ['OS', 'ReneOS Web 2.0 “SSL Aether”'],
    ['Host', 'Portfolio Browser Runtime'],
    ['Kernel', 'RS WebKernel 6.13'],
    ['Shell', 'rs-shell 2.0'],
    ['Desktop', 'Rene Workspace'],
    ['Platform', device.platform],
    ['Browser', device.browser],
    ['Display', device.display],
    ['CPU', device.cpu],
    ['Memory', device.memory],
    ['Locale', device.locale],
    ['Network', device.network],
  ]

  return (
    <section className="neofetch-output" aria-label="Resumen del sistema ReneOS Web">
      <pre className="neofetch-logo" aria-hidden="true">{rsAscii}</pre>
      <div className="neofetch-specs">
        <div className="neofetch-identity"><strong>rene</strong><span>@</span><b>reneos-web</b></div>
        <div className="neofetch-rule" />
        <dl>
          {specs.map(([label, value]) => (
            <div className="neofetch-row" key={label}>
              <dt>{label}</dt><dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="neofetch-colors" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
        </div>
      </div>
    </section>
  )
}

const terminalHelp = [
  'help                 lista de comandos',
  'neofetch             resumen visual del sistema',
  'whoami               perfil profesional',
  'stack                tecnologías principales',
  'projects             proyectos seleccionados',
  'open <app>           abre una aplicación',
  'date                 fecha y hora local',
  'clear                limpia la terminal',
  '',
  'app: about, projects, skills, load-logic, salave, api, contact',
]

export function TerminalApp({ openApp }: AppContentProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      lines: [
        'ReneOS Web Terminal v2.0',
        'Sesión iniciada · escribe “help” para explorar.',
      ],
      tone: 'accent',
    },
    { lines: [], kind: 'neofetch' },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries])

  const appAliases: Record<string, AppId> = useMemo(() => ({
    about: 'about', perfil: 'about', projects: 'projects', proyectos: 'projects',
    skills: 'skills', stack: 'skills', terminal: 'terminal', contact: 'contact', contacto: 'contact',
    'load-logic': 'loadLogic', loadlogic: 'loadLogic', salave: 'salave', erp: 'salave', api: 'dotnetApi', dotnet: 'dotnetApi',
  }), [])

  const execute = (rawCommand: string) => {
    const command = rawCommand.trim()
    const [name = '', ...args] = command.toLocaleLowerCase('es').split(/\s+/)
    if (!command) return
    if (name === 'clear' || name === 'cls') {
      setEntries([])
      return
    }

    let entry: TerminalEntry = { command, lines: [] }
    switch (name) {
      case 'help':
      case 'ayuda':
        entry.lines = terminalHelp
        break
      case 'neofetch':
      case 'fastfetch':
        entry = { command, lines: [], kind: 'neofetch' }
        break
      case 'whoami':
      case 'perfil':
        entry.lines = [
          'René Salinas Ramos',
          'Full Stack Developer · Web, APIs y software para operaciones.',
          'Enfoque actual: logística, ERP, C#/.NET, producto web y Bases de Datos.',
        ]
        break
      case 'stack':
        entry.lines = [
          'Frontend : JavaScript, TypeScript, React, Next.js, Vite, Tailwind',
          'Backend  : C#, ASP.NET Core, .NET, Node.js, REST, GraphQL, SignalR',
          'Data/Ops : SQL, MongoDB, Docker, Git, PWA, WebSockets',
          'Systems  : C, C++, Python',
        ]
        break
      case 'projects':
      case 'proyectos':
        entry.lines = [
          '01  Load Logic  — Optimización y documentación de estiba',
          '02  SalAve ERP  — ERP corporativo y gestión de tráfico',
          '03  API .NET    — Backend e ingeniería de sistemas',
          '',
          'Usa: open load-logic | open salave | open api',
        ]
        break
      case 'open': {
        const target = appAliases[args.join('-')] ?? appAliases[args[0]]
        if (target) {
          openApp(target)
          entry = { command, lines: [`Abriendo ${args.join(' ')}...`], tone: 'accent' }
        } else {
          entry = { command, lines: [`Aplicación no encontrada: ${args.join(' ') || '(vacío)'}`, 'Usa “help” para ver las opciones.'], tone: 'error' }
        }
        break
      }
      case 'date':
      case 'fecha':
        entry.lines = [new Intl.DateTimeFormat('es-MX', { dateStyle: 'full', timeStyle: 'medium' }).format(new Date())]
        break
      case 'contact':
      case 'contacto':
        openApp('contact')
        entry = { command, lines: ['Abriendo contacto...'], tone: 'accent' }
        break
      case 'sudo':
        entry = args.join(' ').includes('hire')
          ? { command, lines: ['Permiso concedido. Buena decisión. 🚀'], tone: 'accent' }
          : { command, lines: ['Este portafolio no necesita privilegios de administrador.'], tone: 'error' }
        break
      default:
        entry = { command, lines: [`Comando no encontrado: ${name}`, 'Escribe “help” para ver los comandos disponibles.'], tone: 'error' }
    }
    setEntries((current) => [...current, entry])
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    execute(input)
    setInput('')
  }

  return (
    <div className="terminal-app" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="terminal-output" ref={scrollRef} aria-live="polite">
        {entries.map((entry, index) => (
          <div className={`terminal-entry tone-${entry.tone ?? 'normal'}`} key={`${entry.command ?? 'boot'}-${index}`}>
            {entry.command && <div className="terminal-command"><span>rene@portfolio</span>:<b>~</b>$ {entry.command}</div>}
            {entry.kind === 'neofetch'
              ? <NeofetchOutput />
              : entry.lines.map((line, lineIndex) => <div key={`${line}-${lineIndex}`}>{line || '\u00a0'}</div>)}
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={submit}>
        <label htmlFor="terminal-input"><span>rene@portfolio</span>:<b>~</b>$</label>
        <input id="terminal-input" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" aria-label="Comando de terminal" />
      </form>
    </div>
  )
}

function getContactHandle(url: string, fallback: string) {
  if (!url) return fallback

  try {
    const segments = new URL(url).pathname.split('/').filter(Boolean)
    const profile = segments.at(-1)
    return profile ? `@${decodeURIComponent(profile)}` : fallback
  } catch {
    return fallback
  }
}

export function ContactApp({ openApp }: AppContentProps) {
  const [copied, setCopied] = useState(false)
  const activeContactCount = [publicLinks.email, publicLinks.github, publicLinks.linkedin].filter(Boolean).length
  const hasPublicContact = activeContactCount > 0
  const githubHandle = getContactHandle(publicLinks.github, 'Perfil de GitHub')
  const linkedinHandle = getContactHandle(publicLinks.linkedin, 'Perfil de LinkedIn')

  const copyIntro = async () => {
    const text = 'Hola René, vi tu portafolio y me gustaría conversar sobre un proyecto contigo.'
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt('Copia este mensaje:', text)
    }
  }

  return (
    <div className="app-page contact-app">
      <section className="contact-hero">
        <span className="contact-spark"><Sparkles size={26} /></span>
        <p className="section-kicker">HABLEMOS</p>
        <h1>¿Tienes un proceso complejo que necesita una solución clara?</h1>
        <p>Me interesa colaborar en productos web, herramientas internas, APIs, Bases de datos e integraciones para operaciones reales.</p>
        <div className="availability large"><span /> Disponible para conversar</div>
      </section>

      <div className="contact-directory-heading">
        <div>
          <p className="section-kicker">CANALES DIRECTOS</p>
          <h2>Contactos configurados</h2>
        </div>
        <span className={hasPublicContact ? 'is-active' : undefined}>
          <CheckCircle2 size={14} />
          {activeContactCount} {activeContactCount === 1 ? 'canal activo' : 'canales activos'}
        </span>
      </div>

      <div className="contact-grid">
        {publicLinks.email && (
          <a href={`mailto:${publicLinks.email}`} className="contact-channel">
            <span><Mail size={20} /></span><div><small>CORREO · CONFIGURADO</small><strong>{publicLinks.email}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {publicLinks.github && (
          <a href={publicLinks.github} target="_blank" rel="noreferrer" className="contact-channel">
            <span><GitBranch size={20} /></span><div><small>GITHUB · CONFIGURADO</small><strong>{githubHandle}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {publicLinks.linkedin && (
          <a href={publicLinks.linkedin} target="_blank" rel="noreferrer" className="contact-channel">
            <span><BriefcaseBusiness size={20} /></span><div><small>LINKEDIN · CONFIGURADO</small><strong>{linkedinHandle}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {!hasPublicContact && (
          <button type="button" className="contact-channel contact-copy" onClick={copyIntro}>
            <span><Clipboard size={20} /></span>
            <div><small>MENSAJE DE PRESENTACIÓN</small><strong>{copied ? 'Copiado al portapapeles' : 'Copiar mensaje'}</strong></div>
            <ArrowRight size={15} />
          </button>
        )}
        <button type="button" className="contact-channel" onClick={() => openApp('projects')}>
          <span><Rocket size={20} /></span><div><small>TRABAJO RECIENTE</small><strong>Ver proyectos</strong></div><ArrowRight size={15} />
        </button>
      </div>

      <section className="contact-services">
        <h2>Podemos trabajar en</h2>
        <div>
          <span><Globe2 size={15} /> Aplicaciones web</span>
          <span><ServerCog size={15} /> APIs .NET</span>
          <span><Layers3 size={15} /> Sistemas internos</span>
          <span><Wrench size={15} /> Modernización</span>
        </div>
      </section>

      {!hasPublicContact && (
        <p className="contact-private-note"><ShieldCheck size={14} /> Los canales profesionales se pueden conectar sin cambiar el diseño del sitio.</p>
      )}
    </div>
  )
}
