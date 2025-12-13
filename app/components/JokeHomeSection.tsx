'use client'

import { useState } from 'react'
import HomeSection from './HomeSection'
import Button from './Button'
import jokesData from './../data/jokes.json'

interface Joke {
  type: 'single' | 'qa';
  text?: string;
  question?: string;
  answer?: string;
}

export default function JokeHomeSection() {
  const [joke] = useState<Joke>(() => {
    // Select a random joke on component initialization
    const randomIndex = Math.floor(Math.random() * jokesData.jokes.length);
    return jokesData.jokes[randomIndex] as Joke;
  });
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const renderJokeContent = () => {

    if (joke.type === 'single') {
      return (
        <p className="text-center whitespace-pre-line leading-relaxed">
          {joke.text}
        </p>
      );
    }

    if (joke.type === 'qa') {
      return (
        <div className="text-center space-y-4">
          <p className="whitespace-pre-line leading-relaxed font-medium">
            {joke.question}
          </p>
          
          {!showAnswer ? (
            <Button variant="secondary" onClick={handleShowAnswer}>
              Show Answer
            </Button>
          ) : (
            <p className="whitespace-pre-line leading-relaxed font-medium">
              {joke.answer}
            </p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <HomeSection
      title="Something Funny"
      variant="primary"
      anchorProps={{
        href: "/funny",
        children: "More jokes"
      }}
    >
      <div className="max-w-2xl mx-auto p-6">
        {renderJokeContent()}
      </div>
    </HomeSection>
  );
}