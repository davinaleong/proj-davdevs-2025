import jokesData from '../data/jokes.json'

export interface Joke {
  type: 'single' | 'qa';
  text?: string;
  question?: string;
  answer?: string;
}

/**
 * Get a random joke from the jokes data
 */
export function getRandomJoke(): Joke {
  const randomIndex = Math.floor(Math.random() * jokesData.jokes.length);
  return jokesData.jokes[randomIndex] as Joke;
}

/**
 * Get multiple random jokes (no duplicates)
 */
export function getRandomJokes(count: number): Joke[] {
  const shuffled = [...jokesData.jokes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, jokesData.jokes.length)) as Joke[];
}

/**
 * Get total number of available jokes
 */
export function getJokesCount(): number {
  return jokesData.jokes.length;
}

/**
 * Get jokes by type
 */
export function getJokesByType(type: Joke['type']): Joke[] {
  return jokesData.jokes.filter(joke => joke.type === type) as Joke[];
}