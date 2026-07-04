import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SourceBadge from './SourceBadge'

describe('SourceBadge', () => {
  it('exibe o título e a categoria da fonte', () => {
    render(
      <SourceBadge
        doc={{
          id: '1',
          categoria: 'rh',
          titulo: 'Política de Férias',
          tags: ['ferias'],
          conteudo: 'conteúdo',
          atualizadoEm: '2025-01-01',
        }}
      />,
    )

    expect(screen.getByText(/Política de Férias/i)).toBeInTheDocument()
    expect(screen.getByText(/RH/i)).toBeInTheDocument()
  })
})
