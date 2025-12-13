import { ComponentProps } from 'react'
import Card from './Card'

type CardData = Omit<ComponentProps<typeof Card>, 'className'>;

interface CardCarouselProps {
  title?: string;
  cards: CardData[];
  showViewAllLink?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
}



export default function CardCarousel({
  title,
  cards,
  showViewAllLink = false,
  viewAllHref = "#",
  viewAllText = "View All",
  className = ""
}: CardCarouselProps) {

  const gridClasses = "flex md:grid md:grid-cols-3 gap-4 md:gap-6 min-w-max md:min-w-0 items-stretch";

  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      
      <div className="overflow-x-auto md:overflow-hidden pb-2">
        <div className={gridClasses}>
          {cards.map((cardData, index) => (
            <div key={cardData.title || index} className="shrink-0 w-72 md:w-auto">
              <Card 
                {...cardData}
                className="h-full w-full max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
      
      {showViewAllLink && (
        <div className="text-center mt-6">
          <a 
            href={viewAllHref} 
            className="inline-block text-blue-500 hover:text-blue-600 font-medium underline transition-colors"
          >
            {viewAllText}
          </a>
        </div>
      )}
    </section>
  )
}