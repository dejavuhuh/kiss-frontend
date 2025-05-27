interface SearchHighlightProps {
  text: string
  keyword: string
}

export function SearchHighlight({ text, keyword }: SearchHighlightProps) {
  if (!keyword) {
    return text
  }

  const parts = text.split(new RegExp(`(${keyword})`, 'i'))
  return (
    <span>
      {parts.map((part, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={index} className={part.toLowerCase() === keyword.toLowerCase() ? 'text-primary font-semibold' : ''}>
          {part}
        </span>
      ))}
    </span>
  )
}
