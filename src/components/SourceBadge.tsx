import type { KnowledgeDoc } from '../types'

interface SourceBadgeProps {
  doc: KnowledgeDoc
}

const sanitizeTextForDisplay = (value: string): string =>
  value.replace(/\u0000/g, '').replace(/<(\/?)(script|style|img|svg|iframe|object|embed|link|meta)(\s|>)/gi, '')

function SourceBadge({ doc }: SourceBadgeProps) {
  const safeTitle = sanitizeTextForDisplay(doc.titulo)
  const safeCategory = sanitizeTextForDisplay(doc.categoria)

  return (
    <span className="source-badge">
      {safeTitle} • {safeCategory.toUpperCase()}
    </span>
  )
}

export default SourceBadge
