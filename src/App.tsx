'use client'

import {
  Boxes,
  Braces,
  ChevronUp,
  CircleUserRound,
  Command,
  FileText,
  FolderKanban,
  Layers3,
  Languages,
  Mail,
  Moon,
  PanelBottom,
  Search,
  Sun,
  TerminalSquare,
  Truck,
  Wifi,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { appDefinitions, getDefinition } from './data'
import {
  AboutApp,
  CaseStudyApp,
  ContactApp,
  ProjectsApp,
  ResumeApp,
  SkillsApp,
  TerminalApp,
} from './components/AppContent'
import { WindowFrame } from './components/WindowFrame'
import { LanguageProvider, languageOptions, useLanguage, type Language } from './i18n'
import type { AppId, AppWindow } from './types'

const desktopApps = ['about', 'projects', 'loadLogic', 'salave', 'skills', 'terminal', 'contact', 'resume'] as const satisfies readonly AppId[]
const pinnedApps: AppId[] = ['about', 'projects', 'skills', 'terminal', 'resume']

type DesktopAppId = (typeof desktopApps)[number]

interface IconPosition {
  x: number
  y: number
}

type IconPositions = Record<DesktopAppId, IconPosition>

const ICON_WIDTH = 82
const ICON_HEIGHT = 82
const ICON_GRID_ORIGIN_X = 18
const ICON_GRID_ORIGIN_Y = 20
const ICON_GRID_STEP_X = 90
const ICON_GRID_STEP_Y = 88
const DESKTOP_BOTTOM_INSET = 68
const LEGACY_ICON_POSITIONS_STORAGE_KEY = 'rene-workspace-icon-positions'

const defaultIconPositions: IconPositions = {
  about: { x: 18, y: 20 },
  projects: { x: 18, y: 108 },
  loadLogic: { x: 18, y: 196 },
  salave: { x: 18, y: 284 },
  skills: { x: 108, y: 20 },
  terminal: { x: 108, y: 108 },
  contact: { x: 108, y: 196 },
  resume: { x: 108, y: 284 },
}

function clampIconPosition(position: IconPosition, width: number, height: number): IconPosition {
  return {
    x: Math.round(Math.min(Math.max(8, width - ICON_WIDTH - 8), Math.max(8, position.x))),
    y: Math.round(Math.min(Math.max(8, height - ICON_HEIGHT - 8), Math.max(8, position.y))),
  }
}

function getIconGridSlots(width: number, height: number): IconPosition[] {
  const maxX = Math.max(8, width - ICON_WIDTH - 8)
  const maxY = Math.max(8, height - ICON_HEIGHT - 8)
  const columns: number[] = []
  const rows: number[] = []

  for (let x = Math.min(ICON_GRID_ORIGIN_X, maxX); x <= maxX; x += ICON_GRID_STEP_X) columns.push(x)
  for (let y = Math.min(ICON_GRID_ORIGIN_Y, maxY); y <= maxY; y += ICON_GRID_STEP_Y) rows.push(y)

  return columns.flatMap((x) => rows.map((y) => ({ x, y })))
}

function getPositionDistance(first: IconPosition, second: IconPosition) {
  return Math.hypot(first.x - second.x, first.y - second.y)
}

function positionsMatch(first: IconPosition, second: IconPosition) {
  return first.x === second.x && first.y === second.y
}

function snapIconPosition(position: IconPosition, width: number, height: number): IconPosition {
  const slots = getIconGridSlots(width, height)
  return slots.reduce((nearest, slot) => (
    getPositionDistance(position, slot) < getPositionDistance(position, nearest) ? slot : nearest
  ), slots[0] ?? clampIconPosition(position, width, height))
}

function arrangeIconPositions(positions: IconPositions, width: number, height: number): IconPositions {
  const availableSlots = getIconGridSlots(width, height)

  return Object.fromEntries(desktopApps.map((id) => {
    const preferred = snapIconPosition(positions[id], width, height)
    const exactIndex = availableSlots.findIndex((slot) => positionsMatch(slot, preferred))
    const slotIndex = exactIndex >= 0
      ? exactIndex
      : availableSlots.reduce((nearestIndex, slot, index) => (
        nearestIndex < 0 || getPositionDistance(slot, preferred) < getPositionDistance(availableSlots[nearestIndex], preferred)
          ? index
          : nearestIndex
      ), -1)
    const position = slotIndex >= 0
      ? availableSlots.splice(slotIndex, 1)[0]
      : clampIconPosition(preferred, width, height)
    return [id, position]
  })) as IconPositions
}

function AppGlyph({ id, size = 22 }: { id: AppId; size?: number }) {
  const props = { size, strokeWidth: 1.8 }
  switch (id) {
    case 'about': return <CircleUserRound {...props} />
    case 'projects': return <FolderKanban {...props} />
    case 'skills': return <Layers3 {...props} />
    case 'terminal': return <TerminalSquare {...props} />
    case 'contact': return <Mail {...props} />
    case 'resume': return <FileText {...props} />
    case 'loadLogic': return <Truck {...props} />
    case 'salave': return <Boxes {...props} />
    case 'dotnetApi': return <Braces {...props} />
  }
}

function createInitialWindows(): Record<AppId, AppWindow> {
  const viewportWidth = typeof window === 'undefined' ? 1440 : window.innerWidth
  const viewportHeight = typeof window === 'undefined' ? 900 : window.innerHeight
  return Object.fromEntries(
    appDefinitions.map((definition, index) => {
      const width = Math.min(definition.size.width, Math.max(340, viewportWidth - 32))
      const height = Math.min(definition.size.height, Math.max(300, viewportHeight - 92))
      const x = Math.max(10, Math.round((viewportWidth - width) / 2 + (index % 3) * 18 - 18))
      const y = Math.max(12, Math.round((viewportHeight - height - 66) / 2 + (index % 4) * 12 - 12))
      return [
        definition.id,
        {
          id: definition.id,
          x,
          y,
          width,
          height,
          isOpen: definition.id === 'about',
          isMinimized: false,
          isMaximized: false,
          zIndex: definition.id === 'about' ? 20 : 10 + index,
        },
      ]
    }),
  ) as Record<AppId, AppWindow>
}

function BootScreen({ onSkip }: { onSkip: () => void }) {
  const { tr } = useLanguage()
  return (
    <div className="boot-screen" role="status" aria-label={tr('Iniciando portafolio')}>
      <div className="boot-mark"><span>R</span><i /></div>
      <div className="boot-copy">
        <strong>RENE <span>WORKSPACE</span></strong>
        <small>{tr('Preparando el entorno...')}</small>
      </div>
      <div className="boot-progress"><i /></div>
      <button type="button" onClick={onSkip}>{tr('Omitir')}</button>
    </div>
  )
}

function AppContent({ id, openApp }: { id: AppId; openApp: (id: AppId) => void }) {
  const { language } = useLanguage()
  switch (id) {
    case 'about': return <AboutApp openApp={openApp} />
    case 'projects': return <ProjectsApp openApp={openApp} />
    case 'skills': return <SkillsApp />
    case 'terminal': return <TerminalApp key={language} openApp={openApp} />
    case 'contact': return <ContactApp openApp={openApp} />
    case 'resume': return <ResumeApp />
    case 'loadLogic': return <CaseStudyApp projectId="loadLogic" />
    case 'salave': return <CaseStudyApp projectId="salave" />
    case 'dotnetApi': return <CaseStudyApp projectId="dotnetApi" />
  }
}

interface DesktopShortcutProps {
  id: DesktopAppId
  position: IconPosition
  selected: boolean
  onOpen: () => void
  onSelect: () => void
  onPositionChange: (position: IconPosition, commit: boolean) => void
}

interface IconDragState {
  pointerId: number
  pointerType: string
  startClientX: number
  startClientY: number
  startPosition: IconPosition
  latestPosition: IconPosition
  moved: boolean
}

function DesktopShortcut({ id, position, selected, onOpen, onSelect, onPositionChange }: DesktopShortcutProps) {
  const definition = getDefinition(id)
  const { tr } = useLanguage()
  const dragState = useRef<IconDragState | null>(null)
  const suppressOpenUntil = useRef(0)
  const [dragging, setDragging] = useState(false)

  const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>, cancelled = false) => {
    const drag = dragState.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (drag.moved) {
      onPositionChange(cancelled ? drag.startPosition : drag.latestPosition, true)
      suppressOpenUntil.current = Date.now() + 700
    } else if (!cancelled && drag.pointerType !== 'mouse') {
      onOpen()
    }

    dragState.current = null
    setDragging(false)
  }

  return (
    <button
      type="button"
      className={`desktop-shortcut ${selected ? 'is-selected' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={{ left: position.x, top: position.y }}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        event.stopPropagation()
        onSelect()
        event.currentTarget.setPointerCapture(event.pointerId)
        dragState.current = {
          pointerId: event.pointerId,
          pointerType: event.pointerType,
          startClientX: event.clientX,
          startClientY: event.clientY,
          startPosition: position,
          latestPosition: position,
          moved: false,
        }
      }}
      onPointerMove={(event) => {
        const drag = dragState.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const deltaX = event.clientX - drag.startClientX
        const deltaY = event.clientY - drag.startClientY
        if (!drag.moved && Math.hypot(deltaX, deltaY) < 4) return

        drag.moved = true
        setDragging(true)
        const layer = event.currentTarget.parentElement?.getBoundingClientRect()
        const nextPosition = snapIconPosition(
          { x: drag.startPosition.x + deltaX, y: drag.startPosition.y + deltaY },
          layer?.width ?? window.innerWidth,
          layer?.height ?? Math.max(ICON_HEIGHT + 16, window.innerHeight - DESKTOP_BOTTOM_INSET),
        )
        drag.latestPosition = nextPosition
        onPositionChange(nextPosition, false)
      }}
      onPointerUp={(event) => finishDrag(event)}
      onPointerCancel={(event) => finishDrag(event, true)}
      onDoubleClick={(event) => {
        event.stopPropagation()
        if (Date.now() >= suppressOpenUntil.current) onOpen()
      }}
      onClick={(event) => {
        event.stopPropagation()
        if (Date.now() < suppressOpenUntil.current) event.preventDefault()
      }}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
          event.preventDefault()
          onOpen()
        }
      }}
      aria-label={tr('Abrir {name}', { name: tr(definition.shortTitle) })}
      aria-pressed={selected}
      title={tr('{name} · alineado a la cuadrícula', { name: tr(definition.shortTitle) })}
    >
      <span className={`desktop-app-icon app-icon-${id}`}><AppGlyph id={id} size={29} /></span>
      <span>{tr(definition.shortTitle)}</span>
    </button>
  )
}

interface LauncherProps {
  openApp: (id: AppId) => void
  onClose: () => void
}

function Launcher({ openApp, onClose }: LauncherProps) {
  const [query, setQuery] = useState('')
  const { locale, tr } = useLanguage()
  const filteredApps = appDefinitions.filter((definition) => {
    if (definition.hideFromLauncher) return false
    const value = `${tr(definition.shortTitle)} ${tr(definition.description)}`.toLocaleLowerCase(locale)
    return value.includes(query.toLocaleLowerCase(locale))
  })

  const launch = (id: AppId) => {
    openApp(id)
    onClose()
  }

  return (
    <aside className="launcher" aria-label={tr('Lanzador de aplicaciones')}>
      <header className="launcher-profile">
        <div className="launcher-avatar">RS</div>
        <div><strong>Rene Salinas</strong><span>{tr('Full Stack Developer')}</span></div>
        <button type="button" onClick={onClose} aria-label={tr('Cerrar lanzador')}><X size={16} /></button>
      </header>
      <label className="launcher-search">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tr('Buscar aplicaciones...')} aria-label={tr('Buscar aplicaciones')} autoFocus />
        <kbd>ESC</kbd>
      </label>
      <div className="launcher-section-title"><span>{tr('APLICACIONES')}</span><small>{filteredApps.length}</small></div>
      <div className="launcher-apps">
        {filteredApps.map((definition) => (
          <button type="button" key={definition.id} onClick={() => launch(definition.id)}>
            <span className={`launcher-app-icon app-icon-${definition.id}`}><AppGlyph id={definition.id} size={20} /></span>
            <span><strong>{tr(definition.shortTitle)}</strong><small>{tr(definition.description)}</small></span>
            <ChevronUp size={14} className="launcher-arrow" />
          </button>
        ))}
      </div>
    </aside>
  )
}

function Clock() {
  const [now, setNow] = useState(new Date())
  const { locale } = useLanguage()
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <time dateTime={now.toISOString()} className="taskbar-clock">
      <strong>{new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(now)}</strong>
      <span>{new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(now)}</span>
    </time>
  )
}

function LanguageSelector() {
  const { language, option, setLanguage, tr } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeMenu)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeMenu)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    setOpen(false)
  }

  return (
    <div className="language-selector" ref={rootRef}>
      {open && (
        <div className="language-menu" role="menu" aria-label={tr('Seleccionar idioma')}>
          <div className="language-menu-heading"><Languages size={15} /><span>{tr('Idioma')}</span></div>
          {languageOptions.map((item) => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={language === item.code}
              className={language === item.code ? 'is-active' : undefined}
              key={item.code}
              onClick={() => chooseLanguage(item.code)}
            >
              <span>{item.shortCode}</span>
              <strong>{item.name}</strong>
              <i aria-hidden="true">{language === item.code ? '✓' : ''}</i>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className={open ? 'is-active' : undefined}
        onClick={() => setOpen((current) => !current)}
        aria-label={tr('Idioma actual: {language}', { language: option.name })}
        title={tr('Cambiar idioma')}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>{option.shortCode}</span>
      </button>
    </div>
  )
}

function WorkspaceApp() {
  const { tr } = useLanguage()
  const [windows, setWindows] = useState<Record<AppId, AppWindow>>(createInitialWindows)
  const [launcherOpen, setLauncherOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [booting, setBooting] = useState(true)
  const [iconPositions, setIconPositions] = useState<IconPositions>(defaultIconPositions)
  const [selectedIcon, setSelectedIcon] = useState<DesktopAppId | null>(null)
  const iconPositionsRef = useRef<IconPositions>(defaultIconPositions)
  const zIndex = useRef(30)

  const finishBoot = useCallback(() => {
    sessionStorage.setItem('rene-workspace-booted', 'true')
    setBooting(false)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = localStorage.getItem('rene-workspace-theme')
      if (savedTheme === 'light') setTheme('light')
      if (sessionStorage.getItem('rene-workspace-booted') === 'true') setBooting(false)
      localStorage.removeItem(LEGACY_ICON_POSITIONS_STORAGE_KEY)
      const arranged = arrangeIconPositions(
        defaultIconPositions,
        window.innerWidth,
        Math.max(ICON_HEIGHT + 16, window.innerHeight - DESKTOP_BOTTOM_INSET),
      )
      iconPositionsRef.current = arranged
      setIconPositions(arranged)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!booting) return
    const timer = window.setTimeout(finishBoot, 900)
    return () => window.clearTimeout(timer)
  }, [booting, finishBoot])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('rene-workspace-theme', theme)
  }, [theme])

  useEffect(() => {
    const clampWindowsToViewport = () => {
      setWindows((current) => Object.fromEntries(
        Object.entries(current).map(([id, windowState]) => [
          id,
          {
            ...windowState,
            x: Math.min(Math.max(0, window.innerWidth - 150), Math.max(0, windowState.x)),
            y: Math.min(Math.max(8, window.innerHeight - 110), Math.max(8, windowState.y)),
          },
        ]),
      ) as Record<AppId, AppWindow>)

      const arrangedIcons = arrangeIconPositions(
        iconPositionsRef.current,
        window.innerWidth,
        Math.max(ICON_HEIGHT + 16, window.innerHeight - DESKTOP_BOTTOM_INSET),
      )
      iconPositionsRef.current = arrangedIcons
      setIconPositions(arrangedIcons)
    }
    window.addEventListener('resize', clampWindowsToViewport)
    return () => window.removeEventListener('resize', clampWindowsToViewport)
  }, [])

  const updateIconPosition = useCallback((id: DesktopAppId, position: IconPosition, commit: boolean) => {
    if (!commit) {
      setIconPositions((current) => ({ ...current, [id]: position }))
      return
    }

    const currentPositions = iconPositionsRef.current
    const occupiedBy = desktopApps.find((otherId) => otherId !== id && positionsMatch(currentPositions[otherId], position))
    const nextPositions = { ...currentPositions, [id]: position }
    if (occupiedBy) nextPositions[occupiedBy] = currentPositions[id]
    iconPositionsRef.current = nextPositions
    setIconPositions(nextPositions)
  }, [])

  const focusWindow = useCallback((id: AppId) => {
    zIndex.current += 1
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], zIndex: zIndex.current },
    }))
  }, [])

  const openApp = useCallback((id: AppId) => {
    zIndex.current += 1
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isOpen: true,
        isMinimized: false,
        zIndex: zIndex.current,
      },
    }))
    setLauncherOpen(false)
  }, [])

  const updateWindow = useCallback((id: AppId, patch: Partial<AppWindow>) => {
    setWindows((current) => ({ ...current, [id]: { ...current[id], ...patch } }))
  }, [])

  const visibleWindows = useMemo(
    () => Object.values(windows).filter((windowState) => windowState.isOpen).sort((a, b) => a.zIndex - b.zIndex),
    [windows],
  )
  const focusableWindows = useMemo(
    () => visibleWindows.filter((windowState) => !windowState.isMinimized),
    [visibleWindows],
  )

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLauncherOpen(false)
      if ((event.altKey && event.code === 'Space') || (event.ctrlKey && event.key.toLocaleLowerCase('es') === 'k')) {
        event.preventDefault()
        setLauncherOpen((open) => !open)
      }
      if (event.altKey && event.key === 'Tab' && focusableWindows.length > 0) {
        event.preventDefault()
        const topWindow = focusableWindows.at(-1)!
        const nextIndex = (focusableWindows.findIndex((item) => item.id === topWindow.id) + 1) % focusableWindows.length
        openApp(focusableWindows[nextIndex].id)
      }
      if (event.altKey && event.key === 'F4' && focusableWindows.length > 0) {
        event.preventDefault()
        updateWindow(focusableWindows.at(-1)!.id, { isOpen: false })
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [focusableWindows, openApp, updateWindow, visibleWindows])

  const handleTaskButton = (id: AppId) => {
    const target = windows[id]
    const openWindows = Object.values(windows).filter((item) => item.isOpen && !item.isMinimized)
    const topZ = openWindows.length ? Math.max(...openWindows.map((item) => item.zIndex)) : -1
    if (target.isOpen && !target.isMinimized && target.zIndex === topZ) {
      updateWindow(id, { isMinimized: true })
    } else {
      openApp(id)
    }
  }

  if (booting) return <BootScreen onSkip={finishBoot} />

  return (
    <main
      className="desktop"
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) setSelectedIcon(null)
      }}
    >
      <section className="desktop-shortcuts" aria-label={tr('Accesos directos')}>
        {desktopApps.map((id) => (
          <DesktopShortcut
            key={id}
            id={id}
            position={iconPositions[id]}
            selected={selectedIcon === id}
            onOpen={() => openApp(id)}
            onSelect={() => setSelectedIcon(id)}
            onPositionChange={(position, commit) => updateIconPosition(id, position, commit)}
          />
        ))}
      </section>

      <div className="desktop-hint"><Command size={13} /><span><kbd>Ctrl</kbd> + <kbd>K</kbd> {tr('para buscar')}</span></div>

      {appDefinitions.map((definition) => (
        <WindowFrame
          key={definition.id}
          definition={{
            ...definition,
            title: tr(definition.title),
            shortTitle: tr(definition.shortTitle),
            description: tr(definition.description),
          }}
          windowState={windows[definition.id]}
          icon={<AppGlyph id={definition.id} size={16} />}
          onFocus={() => focusWindow(definition.id)}
          onClose={() => updateWindow(definition.id, { isOpen: false })}
          onMinimize={() => updateWindow(definition.id, { isMinimized: true })}
          onToggleMaximize={() => updateWindow(definition.id, { isMaximized: !windows[definition.id].isMaximized })}
          onMove={(x, y) => updateWindow(definition.id, { x, y })}
          onResize={(width, height) => updateWindow(definition.id, { width, height })}
        >
          <AppContent id={definition.id} openApp={openApp} />
        </WindowFrame>
      ))}

      {launcherOpen && <Launcher openApp={openApp} onClose={() => setLauncherOpen(false)} />}
      {launcherOpen && <button type="button" className="launcher-backdrop" aria-label={tr('Cerrar lanzador')} onClick={() => setLauncherOpen(false)} />}

      <nav className="taskbar" aria-label={tr('Barra de tareas')}>
        <button type="button" className={`launcher-button ${launcherOpen ? 'is-active' : ''}`} onClick={() => setLauncherOpen((open) => !open)} aria-label={tr('Abrir lanzador')}>
          <span>R</span>
        </button>
        <div className="taskbar-pinned">
          {pinnedApps.map((id) => (
            <button type="button" key={id} className={windows[id].isOpen ? 'is-open' : ''} onClick={() => handleTaskButton(id)} aria-label={tr(getDefinition(id).shortTitle)} title={tr(getDefinition(id).shortTitle)}>
              <span className={`taskbar-app-icon app-icon-${id}`}><AppGlyph id={id} size={20} /></span>
            </button>
          ))}
        </div>
        <div className="taskbar-windows">
          {visibleWindows.map((windowState) => {
            const definition = getDefinition(windowState.id)
            return (
              <button type="button" key={windowState.id} className={windowState.isMinimized ? 'is-minimized' : ''} onClick={() => handleTaskButton(windowState.id)}>
                <AppGlyph id={windowState.id} size={15} /><span>{tr(definition.shortTitle)}</span>
              </button>
            )
          })}
        </div>
        <div className="system-tray">
          <button type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={tr('Cambiar tema')} title={tr('Cambiar tema')}>
            {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <LanguageSelector />
          <span className="tray-network"><Wifi size={15} /><PanelBottom size={14} /></span>
          <Clock />
        </div>
      </nav>
    </main>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <WorkspaceApp />
    </LanguageProvider>
  )
}
