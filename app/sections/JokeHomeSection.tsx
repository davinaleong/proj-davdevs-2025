'use client'

import { useState } from 'react'
import HomeSection from '../components/HomeSection'
import Button from '../components/Button'
import { type Joke, getRandomJoke } from '../utils/jokes'

export default function JokeHomeSection() {
  const [joke] = useState<Joke>(() => getRandomJoke());
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
      title="Something Original and Funny"
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