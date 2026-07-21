import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clipboard,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
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
import { useLanguage } from '../i18n'
import type { AppId, PortfolioProject } from '../types'
import { ProjectVisual } from './ProjectVisuals'

interface AppContentProps {
  openApp: (id: AppId) => void
}

export function AboutApp({ openApp }: AppContentProps) {
  const { tr } = useLanguage()
  return (
    <div className="app-page about-app">
      <section className="about-hero">
        <div className="about-copy">
          <div className="availability"><span /> {tr('Producto web · APIs · Integraciones')}</div>
          <p className="section-kicker">{tr('FULL STACK DEVELOPER · PRODUCT BUILDER')}</p>
          <h1>
            {tr('Diseño y construyo')}
            <span>{tr(' productos web, APIs y software para operaciones.')}</span>
          </h1>
          <p className="about-lead">
            {tr('Soy ')}<strong>{tr('René Salinas Ramos')}</strong>
            {tr('. Diseño y construyo productos web de punta a punta: Frontend, Backend APIs, bases de datos e integraciones que convierten procesos complejos en herramientas claras.')}
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-action" onClick={() => openApp('projects')}>
              {tr('Explorar proyectos')} <ArrowRight size={16} />
            </button>
            <button type="button" className="secondary-action" onClick={() => openApp('skills')}>
              {tr('Ver stack técnico')}
            </button>
            <button type="button" className="secondary-action" onClick={() => openApp('contact')}>
              {tr('Contacto')}
            </button>
          </div>
        </div>
        <div className="identity-card">
          <div className="identity-orbit orbit-one" />
          <div className="identity-orbit orbit-two" />
          <div className="identity-mark">RS</div>
          <div className="identity-meta">
            <span>{tr('RENÉ SALINAS')}</span>
            <small>{tr('Full Stack Developer')}</small>
          </div>
          <span className="identity-coordinate">{tr('WEB / API / SYSTEMS')}</span>
        </div>
      </section>

      <section className="quick-stats" aria-label={tr('Resumen profesional')}>
        <article><strong>02</strong><span>{tr('Plataformas recientes')}</span></article>
        <article><strong>360°</strong><span>{tr('Producto de punta a punta')}</span></article>
        <article><strong>.NET</strong><span>{tr('APIs y backend')}</span></article>
        <article><strong>WEB</strong><span>{tr('Interfaces operativas')}</span></article>
      </section>

      <section className="about-section">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">{tr('EN QUÉ TRABAJO')}</p>
            <h2>{tr('Del problema al producto funcionando.')}</h2>
          </div>
          <button type="button" className="text-action" onClick={() => openApp('terminal')}>
            {tr('Abrir terminal')} <TerminalSquare size={15} />
          </button>
        </div>
        <div className="focus-grid">
          <article>
            <span className="focus-icon"><MonitorSmartphone size={21} /></span>
            <h3>{tr('Producto web')}</h3>
            <p>{tr('Experiencias responsive pensadas para usuarios, negocio y operación cotidiana.')}</p>
          </article>
          <article>
            <span className="focus-icon"><ServerCog size={21} /></span>
            <h3>{tr('Backend & APIs')}</h3>
            <p>{tr('Servicios con C#, ASP.NET Core, .NET y Node.js conectados con el flujo real.')}</p>
          </article>
          <article>
            <span className="focus-icon"><Workflow size={21} /></span>
            <h3>{tr('Software para operaciones')}</h3>
            <p>{tr('Logística, ERP, reportes, multiplataforma, tiempo real y trazabilidad en una sola plataforma.')}</p>
          </article>
        </div>
      </section>

      <section className="about-section recent-work">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">{tr('TRABAJO RECIENTE')}</p>
            <h2>{tr('Productos listos para uso real.')}</h2>
          </div>
          <button type="button" className="text-action" onClick={() => openApp('projects')}>
            {tr('Ver todos')} <ArrowRight size={15} />
          </button>
        </div>
        <div className="recent-grid">
          <button type="button" className="recent-card" onClick={() => openApp('loadLogic')}>
            <ProjectVisual project="loadLogic" compact />
            <span className="recent-info"><b>Load Logic</b><small>{tr('Optimización de estiba')}</small></span>
            <ChevronRight size={18} />
          </button>
          <button type="button" className="recent-card" onClick={() => openApp('salave')}>
            <ProjectVisual project="salave" compact />
            <span className="recent-info"><b>SalAve ERP</b><small>{tr('Operación corporativa')}</small></span>
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

function getDemoRequestUrl(project: PortfolioProject, tr: (source: string) => string) {
  if (!project.demoRequest || !publicLinks.email) return ''

  const params = new URLSearchParams({
    subject: tr(project.demoRequest.subject),
    body: tr(project.demoRequest.body),
  })

  return `mailto:${publicLinks.email}?${params.toString()}`
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { tr } = useLanguage()
  const demoRequestUrl = getDemoRequestUrl(project, tr)

  return (
    <article className="project-card">
      <ProjectVisual project={project.id} />
      <div className="project-card-copy">
        <div className="project-meta-row">
          <span>{tr(project.eyebrow)}</span>
          <span className="project-status"><i /> {tr(project.status)}</span>
        </div>
        <h2>{project.name}</h2>
        <p>{tr(project.summary)}</p>
        <div className="tech-row">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <button type="button" className="primary-action small" onClick={onOpen}>
            {tr('Ver caso')} <ArrowRight size={14} />
          </button>
          {project.primaryUrl && (
            <a href={project.primaryUrl} target="_blank" rel="noreferrer" className="secondary-action small">
              {tr('Sitio')} <ExternalLink size={13} />
            </a>
          )}
          {demoRequestUrl && (
            <a href={demoRequestUrl} className="secondary-action small">
              {tr('Solicitar prueba')} <Mail size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsApp({ openApp }: AppContentProps) {
  const { tr } = useLanguage()
  return (
    <div className="app-page projects-app">
      <header className="app-page-header projects-header">
        <div>
          <p className="section-kicker">{tr('Mis Logros')}</p>
          <h1>{tr('Proyectos que resuelven trabajo real.')}</h1>
          <p>
            {tr('De logística y visualización de carga a un ERP modular con backend .NET: productos pensados para operar, crecer y dejar evidencia.')}
          </p>
        </div>
        <div className="project-count"><strong>03</strong><span>{tr('casos')}<br />{tr('seleccionados')}</span></div>
      </header>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => openApp(project.id)} />
        ))}
      </div>
      <div className="projects-footer-note">
        <Sparkles size={17} />
        <span>{tr('También trabajo con C, C++ y Python como parte de mi stack general.')}</span>
        <button type="button" onClick={() => openApp('skills')}>{tr('Explorar tecnologías')}</button>
      </div>
    </div>
  )
}

const groupIcons = [MonitorSmartphone, ServerCog, Database, Code2]

export function SkillsApp() {
  const { locale, tr } = useLanguage()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase(locale)
  const visibleGroups = skillGroups
    .map((group) => ({
      ...group,
      skills: normalizedQuery
        ? group.skills.filter((skill) => `${skill} ${tr(skill)}`.toLocaleLowerCase(locale).includes(normalizedQuery))
        : group.skills,
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <div className="app-page skills-app">
      <header className="app-page-header skills-header">
        <div>
          <p className="section-kicker">{tr('HABILIDADES')}</p>
          <h1>{tr('Un stack para construir el sistema completo.')}</h1>
          <p>{tr('Frontend, backend, bases de datos y lenguajes de sistemas organizados por la parte del problema que resuelven.')}</p>
        </div>
        <label className="skill-search">
          <span>{tr('Buscar tecnología')}</span>
          <div><Code2 size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="React, C#, C++..." />{query && <button type="button" onClick={() => setQuery('')} aria-label={tr('Limpiar búsqueda')}><X size={14} /></button>}</div>
        </label>
      </header>

      <div className="skill-overview">
        <span><BadgeCheck size={15} /> {tr('Web & producto')}</span>
        <span><BadgeCheck size={15} /> APIs .NET</span>
        <span><BadgeCheck size={15} /> {tr('Bases de datos')}</span>
        <span><BadgeCheck size={15} /> {tr('Sistemas')}</span>
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
                  <div><h2>{tr(group.title)}</h2><p>{tr(group.description)}</p></div>
                </div>
                <div className="skill-cloud">
                  {group.skills.map((skill) => <span key={skill}><i>{skill.slice(0, 2).toUpperCase()}</i>{tr(skill)}</span>)}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="empty-state"><PackageOpen size={34} /><h2>{tr('Sin coincidencias')}</h2><p>{tr('Prueba con otro nombre o categoría.')}</p></div>
      )}

      <footer className="skills-note">
        <CircleDot size={15} />
        <span>{tr('No uso porcentajes arbitrarios: el nivel se demuestra en producto, arquitectura y decisiones técnicas.')}</span>
      </footer>
    </div>
  )
}

export function CaseStudyApp({ projectId }: { projectId: PortfolioProject['id'] }) {
  const { tr } = useLanguage()
  const project = getProject(projectId)
  const demoRequestUrl = getDemoRequestUrl(project, tr)
  const isSalave = project.id === 'salave'
  const isLoadLogic = project.id === 'loadLogic'

  return (
    <div className={`app-page case-study case-${project.id}`}>
      <header className="case-hero">
        <div className="case-copy">
          <div className="project-meta-row">
            <span>{tr(project.eyebrow)}</span>
            <span className="project-status"><i /> {tr(project.status)}</span>
          </div>
          <h1>{project.name}</h1>
          <p>{tr(project.summary)}</p>
          <div className="case-actions">
            {project.primaryUrl && (
              <a className="primary-action" href={project.primaryUrl} target="_blank" rel="noreferrer">
                {project.primaryLabel && tr(project.primaryLabel)} <ExternalLink size={15} />
              </a>
            )}
            {project.secondaryUrl && (
              <a className="secondary-action" href={project.secondaryUrl} target="_blank" rel="noreferrer">
                {project.secondaryLabel && tr(project.secondaryLabel)} <ExternalLink size={14} />
              </a>
            )}
            {demoRequestUrl && (
              <a className="primary-action" href={demoRequestUrl}>
                {project.demoRequest && tr(project.demoRequest.label)} <Mail size={15} />
              </a>
            )}
          </div>
        </div>
        <ProjectVisual project={project.id} />
      </header>

      <div className="case-layout">
        <div className="case-main">
          <section className="case-section">
            <p className="section-kicker">{tr('EL PRODUCTO')}</p>
            <h2>{tr('Una herramienta conectada con la operación.')}</h2>
            <p className="case-impact">{tr(project.impact)}</p>
          </section>

          <section className="case-section">
            <p className="section-kicker">{tr('CAPACIDADES')}</p>
            <div className="capability-list">
              {project.capabilities.map((capability, index) => (
                <div key={capability}><span>{String(index + 1).padStart(2, '0')}</span><p>{tr(capability)}</p><CheckCircle2 size={18} /></div>
              ))}
            </div>
          </section>

          {isLoadLogic && (
            <section className="case-section callout-section">
              <ShieldCheck size={24} />
              <div>
                <h3>{tr('Demo pública sin persistencia')}</h3>
                <p>{tr('Las vistas de demostración permiten explorar escenarios comerciales sin modificar datos reales. El preview muestra el flujo y la lectura del resultado; no ejecuta el optimizador productivo.')}</p>
              </div>
            </section>
          )}

          {isSalave && (
            <section className="case-section callout-section">
              <Radio size={24} />
              <div>
                <h3>{tr('Operación modular y en tiempo real')}</h3>
                <p>{tr('La experiencia integra módulos por rol, API en C#/.NET, actualizaciones con SignalR, OCR de placas, PWA y generación de documentos para uso operativo.')}</p>
              </div>
            </section>
          )}
        </div>

        <aside className="case-sidebar">
          <section>
            <span>{tr('AÑO')}</span><strong>{tr(project.year)}</strong>
          </section>
          <section>
            <span>{tr('ROL')}</span><strong>{tr('Full Stack')}<br />{tr('Development')}</strong>
          </section>
          <section>
            <span>{tr('TECNOLOGÍAS')}</span>
            <div className="case-tech-list">{project.technologies.map((technology) => <i key={technology}>{technology}</i>)}</div>
          </section>
          <section className="case-status-card">
            <small>{tr('ESTADO')}</small>
            <strong><i /> {tr(project.status)}</strong>
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

function getBrowserName(userAgent: string, fallback: string) {
  const browsers: Array<[RegExp, string]> = [
    [/Edg\/(\d+)/, 'Microsoft Edge'],
    [/Firefox\/(\d+)/, 'Firefox'],
    [/OPR\/(\d+)/, 'Opera'],
    [/Chrome\/(\d+)/, 'Chrome'],
    [/Version\/(\d+).+Safari/, 'Safari'],
  ]
  const match = browsers.find(([pattern]) => pattern.test(userAgent))
  if (!match) return fallback
  const version = userAgent.match(match[0])?.[1]
  return `${match[1]}${version ? ` ${version}` : ''}`
}

function NeofetchOutput() {
  const { tr } = useLanguage()
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
        browser: getBrowserName(navigator.userAgent, tr('Navegador web')),
        display: `${window.screen.width}×${window.screen.height} @ ${scale}x`,
        cpu: navigator.hardwareConcurrency
          ? tr('{count} hilos lógicos expuestos', { count: navigator.hardwareConcurrency })
          : tr('No expuesto'),
        memory: browserNavigator.deviceMemory
          ? tr('≈ {count} GB (estimación)', { count: browserNavigator.deviceMemory })
          : tr('No expuesta por el navegador'),
        locale: navigator.language || tr('No expuesto'),
        network: navigator.onLine
          ? tr('{connection} (estimación)', { connection: connection ?? tr('En línea') })
          : tr('Sin conexión'),
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [tr])

  const specs = [
    [tr('OS'), 'ReneOS Web 2.0 “SSL Aether”'],
    [tr('Host'), tr('Portfolio Browser Runtime')],
    [tr('Kernel'), 'RS WebKernel 6.13'],
    [tr('Shell'), 'rs-shell 2.0'],
    [tr('Desktop'), tr('Rene Workspace')],
    [tr('Platform'), device.platform],
    [tr('Browser'), device.browser],
    [tr('Display'), device.display],
    [tr('CPU'), device.cpu],
    [tr('Memory'), device.memory],
    [tr('Locale'), device.locale],
    [tr('Network'), device.network],
  ]

  return (
    <section className="neofetch-output" aria-label={tr('Resumen del sistema ReneOS Web')}>
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

export function TerminalApp({ openApp }: AppContentProps) {
  const { locale, tr } = useLanguage()
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      lines: [
        'ReneOS Web Terminal v2.0',
        tr('Sesión iniciada · escribe “help” para explorar.'),
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
    about: 'about', perfil: 'about', profil: 'about', projects: 'projects', proyectos: 'projects', projets: 'projects',
    skills: 'skills', stack: 'skills', terminal: 'terminal', contact: 'contact', contacto: 'contact',
    contato: 'contact', cv: 'resume', resume: 'resume', curriculum: 'resume', 'currículum': 'resume', currículo: 'resume',
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
        entry.lines = [
          `help                 ${tr('lista de comandos')}`,
          `neofetch             ${tr('resumen visual del sistema')}`,
          `whoami               ${tr('perfil profesional')}`,
          `stack                ${tr('tecnologías principales')}`,
          `projects             ${tr('proyectos seleccionados')}`,
          `open <app>           ${tr('abre una aplicación')}`,
          `date                 ${tr('fecha y hora local')}`,
          `clear                ${tr('limpia la terminal')}`,
          '',
          'app: about, projects, skills, load-logic, salave, api, contact, cv',
        ]
        break
      case 'neofetch':
      case 'fastfetch':
        entry = { command, lines: [], kind: 'neofetch' }
        break
      case 'whoami':
      case 'perfil':
        entry.lines = [
          'René Salinas Ramos',
          tr('Full Stack Developer · Web, APIs y software para operaciones.'),
          tr('Enfoque actual: logística, ERP, C#/.NET, producto web y Bases de Datos.'),
        ]
        break
      case 'stack':
        entry.lines = [
          `${tr('Frontend')} : JavaScript, TypeScript, React, Next.js, Vite, Tailwind`,
          `${tr('Backend')}  : C#, ASP.NET Core, .NET, Node.js, REST, GraphQL, SignalR`,
          `${tr('Data/Ops')} : SQL, MongoDB, Docker, Git, PWA, WebSockets`,
          `${tr('Systems')}  : C, C++, Python`,
        ]
        break
      case 'projects':
      case 'proyectos':
        entry.lines = [
          tr('01  Load Logic  — Optimización y documentación de estiba'),
          tr('02  SalAve ERP  — ERP corporativo y gestión de tráfico'),
          tr('03  API .NET    — Backend e ingeniería de sistemas'),
          '',
          tr('Usa: open load-logic | open salave | open api'),
        ]
        break
      case 'open': {
        const target = appAliases[args.join('-')] ?? appAliases[args[0]]
        if (target) {
          openApp(target)
          entry = { command, lines: [tr('Abriendo {target}...', { target: args.join(' ') })], tone: 'accent' }
        } else {
          entry = { command, lines: [tr('Aplicación no encontrada: {target}', { target: args.join(' ') || tr('(vacío)') }), tr('Usa “help” para ver las opciones.')], tone: 'error' }
        }
        break
      }
      case 'date':
      case 'fecha':
        entry.lines = [new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date())]
        break
      case 'contact':
      case 'contacto':
        openApp('contact')
        entry = { command, lines: [tr('Abriendo contacto...')], tone: 'accent' }
        break
      case 'sudo':
        entry = args.join(' ').includes('hire')
          ? { command, lines: [tr('Permiso concedido. Buena decisión. 🚀')], tone: 'accent' }
          : { command, lines: [tr('Este portafolio no necesita privilegios de administrador.')], tone: 'error' }
        break
      default:
        entry = { command, lines: [tr('Comando no encontrado: {command}', { command: name }), tr('Escribe “help” para ver los comandos disponibles.')], tone: 'error' }
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
        <input id="terminal-input" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" aria-label={tr('Comando de terminal')} />
      </form>
    </div>
  )
}

const resumeUrls = {
  es: '/ReneSalinasRamosCV.pdf',
  en: '/ReneSalinasRamosCV-EN.pdf',
  fr: '/ReneSalinasRamosCV-FR.pdf',
  pt: '/ReneSalinasRamosCV-PT.pdf',
} as const

export function ResumeApp() {
  const { language, tr } = useLanguage()
  const resumeUrl = resumeUrls[language]
  const resumeFilename = resumeUrl.slice(1)
  return (
    <div className="resume-app">
      <header className="resume-toolbar">
        <div>
          <span className="resume-file-icon"><FileText size={19} /></span>
          <div>
            <strong>{resumeFilename}</strong>
            <small>{tr('Currículum profesional · PDF')}</small>
          </div>
        </div>
        <nav aria-label={tr('Acciones del currículum')}>
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={15} /> {tr('Abrir en navegador')}
          </a>
          <a href={resumeUrl} download={resumeFilename} className="resume-download">
            <Download size={15} /> {tr('Descargar PDF')}
          </a>
        </nav>
      </header>

      <div className="resume-preview">
        <iframe
          src={`${resumeUrl}#view=FitH&toolbar=0`}
          title={tr('Vista previa del currículum de René Salinas Ramos')}
        />
        <p>
          {tr('Si el navegador no muestra la vista previa,')}{' '}
          <a href={resumeUrl} target="_blank" rel="noreferrer">{tr('abre el currículum en una pestaña nueva')}</a>.
        </p>
      </div>
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
  const { tr } = useLanguage()
  const [copied, setCopied] = useState(false)
  const activeContactCount = [publicLinks.email, publicLinks.github, publicLinks.linkedin].filter(Boolean).length
  const hasPublicContact = activeContactCount > 0
  const githubHandle = getContactHandle(publicLinks.github, tr('Perfil de GitHub'))
  const linkedinHandle = getContactHandle(publicLinks.linkedin, tr('Perfil de LinkedIn'))

  const copyIntro = async () => {
    const text = tr('Hola René, vi tu portafolio y me gustaría conversar sobre un proyecto contigo.')
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.prompt(tr('Copia este mensaje:'), text)
    }
  }

  return (
    <div className="app-page contact-app">
      <section className="contact-hero">
        <span className="contact-spark"><Sparkles size={26} /></span>
        <p className="section-kicker">{tr('HABLEMOS')}</p>
        <h1>{tr('¿Tienes un proceso complejo que necesita una solución clara?')}</h1>
        <p>{tr('Me interesa colaborar en productos web, herramientas internas, APIs, Bases de datos e integraciones para operaciones reales.')}</p>
        <div className="availability large"><span /> {tr('Disponible para conversar')}</div>
      </section>

      <div className="contact-directory-heading">
        <div>
          <p className="section-kicker">{tr('CANALES DIRECTOS')}</p>
          <h2>{tr('Contactos configurados')}</h2>
        </div>
        <span className={hasPublicContact ? 'is-active' : undefined}>
          <CheckCircle2 size={14} />
          {tr(activeContactCount === 1 ? '{count} canal activo' : '{count} canales activos', { count: activeContactCount })}
        </span>
      </div>

      <div className="contact-grid">
        {publicLinks.email && (
          <a href={`mailto:${publicLinks.email}`} className="contact-channel">
            <span><Mail size={20} /></span><div><small>{tr('CORREO · CONFIGURADO')}</small><strong>{publicLinks.email}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {publicLinks.github && (
          <a href={publicLinks.github} target="_blank" rel="noreferrer" className="contact-channel">
            <span><GitBranch size={20} /></span><div><small>{tr('GITHUB · CONFIGURADO')}</small><strong>{githubHandle}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {publicLinks.linkedin && (
          <a href={publicLinks.linkedin} target="_blank" rel="noreferrer" className="contact-channel">
            <span><BriefcaseBusiness size={20} /></span><div><small>{tr('LINKEDIN · CONFIGURADO')}</small><strong>{linkedinHandle}</strong></div><ExternalLink size={15} />
          </a>
        )}
        {!hasPublicContact && (
          <button type="button" className="contact-channel contact-copy" onClick={copyIntro}>
            <span><Clipboard size={20} /></span>
            <div><small>{tr('MENSAJE DE PRESENTACIÓN')}</small><strong>{tr(copied ? 'Copiado al portapapeles' : 'Copiar mensaje')}</strong></div>
            <ArrowRight size={15} />
          </button>
        )}
        <button type="button" className="contact-channel" onClick={() => openApp('projects')}>
          <span><Rocket size={20} /></span><div><small>{tr('TRABAJO RECIENTE')}</small><strong>{tr('Ver proyectos')}</strong></div><ArrowRight size={15} />
        </button>
        <button type="button" className="contact-channel" onClick={() => openApp('resume')}>
          <span><FileText size={20} /></span><div><small>{tr('CURRÍCULUM · PDF')}</small><strong>{tr('Ver experiencia profesional')}</strong></div><ArrowRight size={15} />
        </button>
      </div>

      <section className="contact-services">
        <h2>{tr('Podemos trabajar en')}</h2>
        <div>
          <span><Globe2 size={15} /> {tr('Aplicaciones web')}</span>
          <span><ServerCog size={15} /> APIs .NET</span>
          <span><Layers3 size={15} /> {tr('Sistemas internos')}</span>
          <span><Wrench size={15} /> {tr('Modernización')}</span>
        </div>
      </section>

      {!hasPublicContact && (
        <p className="contact-private-note"><ShieldCheck size={14} /> {tr('Los canales profesionales se pueden conectar sin cambiar el diseño del sitio.')}</p>
      )}
    </div>
  )
}
