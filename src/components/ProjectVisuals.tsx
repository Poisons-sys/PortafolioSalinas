import { Braces, Check, PackageCheck, Radio, ShieldCheck, Truck } from 'lucide-react'

interface ProjectVisualProps {
  project: 'loadLogic' | 'salave' | 'dotnetApi'
  compact?: boolean
}

function LoadLogicVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`project-visual load-logic-visual ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <div className="visual-topbar">
        <span className="visual-brand"><Truck size={13} /> LOAD LOGIC</span>
        <span className="visual-live"><i /> plan activo</span>
      </div>
      <div className="load-visual-grid">
        <div className="trailer-view">
          <div className="trailer-shell">
            <span className="cargo cargo-a" />
            <span className="cargo cargo-b" />
            <span className="cargo cargo-c" />
            <span className="cargo cargo-d" />
            <span className="cargo cargo-e" />
            <span className="cargo cargo-f" />
          </div>
          <div className="trailer-axis"><span /><span /></div>
        </div>
        <div className="load-kpis">
          <span>UTILIZACIÓN <strong>88%</strong></span>
          <span>BALANCE <strong>49 / 51</strong></span>
          <span className="ok"><Check size={11} /> LISTO</span>
        </div>
      </div>
    </div>
  )
}

function SalaveVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`project-visual salave-visual ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <aside className="salave-sidebar">
        <div className="salave-mark">SA</div>
        <span className="active" />
        <span />
        <span />
        <span />
      </aside>
      <div className="salave-dashboard">
        <div className="salave-heading">
          <span>OPERACIÓN SALAVE</span>
          <i><Radio size={10} /> tiempo real</i>
        </div>
        <div className="salave-cards">
          <div><small>Módulos</small><strong>10+</strong></div>
          <div><small>Roles</small><strong>06</strong></div>
          <div><small>Estado</small><strong>LIVE</strong></div>
        </div>
        <div className="salave-chart">
          <span style={{ height: '38%' }} />
          <span style={{ height: '62%' }} />
          <span style={{ height: '48%' }} />
          <span style={{ height: '82%' }} />
          <span style={{ height: '70%' }} />
          <span style={{ height: '92%' }} />
        </div>
      </div>
    </div>
  )
}

function DotnetVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`project-visual dotnet-visual ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <div className="code-head">
        <span><i /><i /><i /></span>
        <small>Program.cs</small>
        <Braces size={14} />
      </div>
      <div className="code-body">
        <span><b>var</b> builder = WebApplication.CreateBuilder(args);</span>
        <span>builder.Services.<em>AddControllers</em>();</span>
        <span><b>var</b> app = builder.Build();</span>
        <span>app.<em>MapControllers</em>();</span>
        <span>app.<em>Run</em>();</span>
      </div>
      <div className="code-status"><ShieldCheck size={12} /> API ONLINE <PackageCheck size={12} /></div>
    </div>
  )
}

export function ProjectVisual({ project, compact }: ProjectVisualProps) {
  if (project === 'loadLogic') return <LoadLogicVisual compact={compact} />
  if (project === 'salave') return <SalaveVisual compact={compact} />
  return <DotnetVisual compact={compact} />
}
