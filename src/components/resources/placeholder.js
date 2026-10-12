// Neutral placeholder copy for body text the spec gives only as "~N words".
// Deterministic: same (words, seed) always yields the same paragraph.
const BANK = [
  'This paragraph is placeholder text that stands in for the final copy of this section.',
  'It is written to match the approximate length and rhythm of the original paragraph.',
  'The final wording will describe the relevant practices, responsibilities and processes in plain language.',
  'Each statement here is neutral and carries no factual claims about products, customers or results.',
  'Replace this text with approved copy before publishing the page.',
  'The layout, spacing and typography are preserved so the page reads as intended.',
  'Additional detail can be added in later revisions once the content has been reviewed.',
  'Readers should treat everything in this block as an illustration of structure only.',
]

export function placeholder(words, seed = 0) {
  const out = []
  let i = seed % BANK.length
  while (out.length < words) {
    out.push(...BANK[i].split(' '))
    i = (i + 1) % BANK.length
  }
  let text = out.slice(0, words).join(' ')
  text = text.replace(/[.,;:]$/, '')
  return text + '.'
}

// Same text, sized by character count (closer line-count match than word count when the
// original copy uses longer words). Measured live lengths are passed in by the pages.
export function placeholderChars(chars, seed = 0) {
  const words = []
  let i = seed % BANK.length
  let len = 0
  outer: while (true) {
    for (const w of BANK[i].split(' ')) {
      if (len + w.length + (words.length ? 1 : 0) > chars - 1 && words.length) break outer
      len += w.length + (words.length ? 1 : 0)
      words.push(w)
    }
    i = (i + 1) % BANK.length
  }
  // avoid ending on a dangling function word ("… and.")
  while (words.length > 1 && /^(and|the|of|to|in|a|an|for|on|as|is|be|or|with|this|that|it|can|will|so)$/i.test(words[words.length - 1].replace(/[.,;:]$/, ''))) words.pop()
  return words.join(' ').replace(/[.,;:]$/, '') + '.'
}
