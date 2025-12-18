/**
 * Password Generation Utilities
 * Extracted from PasswordCreator component for better organization and reusability
 */

// Symbols available for password generation
export const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "-",
  "=",
  "{",
  "}",
  "[",
  "]",
  ":",
  ";",
  ".",
  "?",
]

// Base phrases for password generation
export const basePhrases = [
  "embrace the beauty of the journey and never stop learning or dreaming",
  "the light of understanding shines brightest when shared with the world",
  "peaceful hearts create powerful change in chaotic times",
  "follow the rhythm of your heart and let passion guide your path",
  "every challenge is a step closer to strength and wisdom",
]

// Foreign word substitutions
export const foreignWords: Record<string, string> = {
  journey: "voyage",
  light: "lumière",
  dream: "sueño",
  world: "mundo",
  peace: "salem",
  challenge: "reto",
  strength: "forza",
  heart: "corazón",
}

/**
 * Normalize and spell out a word by removing accents
 */
export function spellOut(word: string): string {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
}

/**
 * Generate a secure password using phrase-based algorithm
 */
export function generateSecurePassword(): string {
  // Step 1: Select random phrase
  const phrase = basePhrases[Math.floor(Math.random() * basePhrases.length)]

  // Step 2: Randomly capitalize 2–4 words
  const words = phrase.split(" ")
  const toCapCount = Math.floor(Math.random() * 3) + 2
  const indexesToCap = new Set<number>()
  while (indexesToCap.size < toCapCount) {
    indexesToCap.add(Math.floor(Math.random() * words.length))
  }

  const capitalizedPhrase = words
    .map((word, index) =>
      indexesToCap.has(index)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join("")

  // Step 3: Replace a word with a foreign word if present
  let replaced = capitalizedPhrase
  for (const [en, foreign] of Object.entries(foreignWords)) {
    const regex = new RegExp(en, "i")
    if (regex.test(replaced)) {
      replaced = replaced.replace(regex, spellOut(foreign))
      break
    }
  }

  // Step 4: Add a symbol
  const symbol = symbols[Math.floor(Math.random() * symbols.length)]

  // Step 5: Add 2–3 digits
  const number = Math.floor(Math.random() * 900 + 100) // 100–999

  return `${replaced}${symbol}${number}`
}