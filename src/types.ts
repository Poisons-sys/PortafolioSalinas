export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'terminal'
  | 'contact'
  | 'loadLogic'
  | 'salave'
  | 'dotnetApi'

export interface WindowRect {
  x: number
  y: number
  width: number
  height: number
}

export interface AppWindow extends WindowRect {
  id: AppId
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export interface AppDefinition {
  id: AppId
  title: string
  shortTitle: string
  description: string
  size: Pick<WindowRect, 'width' | 'height'>
  hideFromDesktop?: boolean
  hideFromLauncher?: boolean
}

export interface PortfolioProject {
  id: 'loadLogic' | 'salave' | 'dotnetApi'
  name: string
  eyebrow: string
  summary: string
  impact: string
  status: string
  year: string
  technologies: string[]
  capabilities: string[]
  primaryUrl?: string
  primaryLabel?: string
  secondaryUrl?: string
  secondaryLabel?: string
  demoRequest?: {
    label: string
    subject: string
    body: string
  }
}

export interface SkillGroup {
  title: string
  description: string
  skills: string[]
}
