interface SuggestionChipsProps {
  suggestions: string[]
  onSelect: (value: string) => void
}

function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="suggestion-row">
      {suggestions.map((suggestion) => (
        <button key={suggestion} className="suggestion-chip" type="button" onClick={() => onSelect(suggestion)}>
          {suggestion}
        </button>
      ))}
    </div>
  )
}

export default SuggestionChips
