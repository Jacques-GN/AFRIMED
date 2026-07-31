import { Lock } from 'lucide-react'

export function SectionCard({ title, icon: Icon, badge, children, disabled }) {
  return (
    <article className={`bg-white rounded-xl border border-slate-200 p-5 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={16} className={disabled ? 'text-slate-400' : 'text-green-600'} />}
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {badge && (
          <span className="ml-auto text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full bg-[#C4703F]/10 text-[#C4703F] border border-[#C4703F]/20">
            {badge}
          </span>
        )}
      </div>
      {children}
    </article>
  )
}

export function ComingSoon({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-2">
      <Lock size={24} className="text-slate-300" />
      <p className="text-xs text-slate-400 text-center">{message}</p>
    </div>
  )
}

export function EmptyState({ message }) {
  return <p className="text-xs text-slate-500">{message}</p>
}
