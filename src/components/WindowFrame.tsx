import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { Maximize2, Minimize2, Minus, X } from 'lucide-react'
import { useLanguage } from '../i18n'
import type { AppDefinition, AppWindow } from '../types'

interface WindowFrameProps {
  definition: AppDefinition
  windowState: AppWindow
  icon: ReactNode
  children: ReactNode
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
}

interface PointerOrigin {
  pointerId: number
  clientX: number
  clientY: number
  x: number
  y: number
  width: number
  height: number
}

export function WindowFrame({
  definition,
  windowState,
  icon,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
}: WindowFrameProps) {
  const { tr } = useLanguage()
  const dragOrigin = useRef<PointerOrigin | null>(null)
  const resizeOrigin = useRef<PointerOrigin | null>(null)

  if (!windowState.isOpen || windowState.isMinimized) return null

  const beginDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (windowState.isMaximized || (event.target as HTMLElement).closest('button')) return
    event.stopPropagation()
    onFocus()
    dragOrigin.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: windowState.x,
      y: windowState.y,
      width: windowState.width,
      height: windowState.height,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const origin = dragOrigin.current
    if (!origin || origin.pointerId !== event.pointerId) return
    const maxX = Math.max(0, window.innerWidth - 150)
    const maxY = Math.max(8, window.innerHeight - 110)
    const nextX = Math.min(maxX, Math.max(0, origin.x + event.clientX - origin.clientX))
    const nextY = Math.min(maxY, Math.max(8, origin.y + event.clientY - origin.clientY))
    onMove(nextX, nextY)
  }

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragOrigin.current?.pointerId === event.pointerId) {
      dragOrigin.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const beginResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onFocus()
    resizeOrigin.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: windowState.x,
      y: windowState.y,
      width: windowState.width,
      height: windowState.height,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const origin = resizeOrigin.current
    if (!origin || origin.pointerId !== event.pointerId) return
    const maxWidth = Math.max(340, window.innerWidth - origin.x - 8)
    const maxHeight = Math.max(280, window.innerHeight - origin.y - 76)
    onResize(
      Math.min(maxWidth, Math.max(340, origin.width + event.clientX - origin.clientX)),
      Math.min(maxHeight, Math.max(280, origin.height + event.clientY - origin.clientY)),
    )
  }

  const endResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (resizeOrigin.current?.pointerId === event.pointerId) {
      resizeOrigin.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      className={`app-window ${windowState.isMaximized ? 'is-maximized' : ''}`}
      style={
        windowState.isMaximized
          ? { zIndex: windowState.zIndex }
          : {
              left: windowState.x,
              top: windowState.y,
              width: windowState.width,
              height: windowState.height,
              zIndex: windowState.zIndex,
            }
      }
      role="dialog"
      aria-label={definition.title}
      tabIndex={-1}
      onPointerDown={onFocus}
    >
      <header
        className="window-titlebar"
        onDoubleClick={onToggleMaximize}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="window-title">
          <span className={`window-app-icon app-icon-${definition.id}`}>{icon}</span>
          <span>{definition.title}</span>
        </div>
        <div className="window-controls" aria-label={tr('Controles de ventana')}>
          <button type="button" onClick={onMinimize} aria-label={tr('Minimizar {name}', { name: definition.shortTitle })}>
            <Minus size={15} />
          </button>
          <button type="button" onClick={onToggleMaximize} aria-label={tr(windowState.isMaximized ? 'Restaurar {name}' : 'Maximizar {name}', { name: definition.shortTitle })}>
            {windowState.isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button type="button" className="close-control" onClick={onClose} aria-label={tr('Cerrar {name}', { name: definition.shortTitle })}>
            <X size={15} />
          </button>
        </div>
      </header>
      <div className="window-content">{children}</div>
      {!windowState.isMaximized && (
        <button
          type="button"
          className="resize-handle"
          aria-label={tr('Cambiar tamaño de {name}', { name: definition.shortTitle })}
          onPointerDown={beginResize}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        />
      )}
    </section>
  )
}
