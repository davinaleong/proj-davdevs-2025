import { ComponentProps } from 'react'
import Card from './Card'

type CardData = Omit<ComponentProps<typeof Card>, 'className' | 'size'>;

interface CardCarouselProps {
  title?: string;
  cards: CardData[];
  desktopColumns?: 2 | 3 | 4;
  mobileCardWidth?: string;
  showViewAllLink?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const GRID_COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3", 
  4: "md:grid-cols-4"
} as const;

const GAP_SIZES = {
  sm: "gap-3 md:gap-4",
  md: "gap-4 md:gap-6", 
  lg: "gap-6 md:gap-8"
} as const;

export default function CardCarousel({
  title,
  cards,
  desktopColumns = 3,
  mobileCardWidth = "w-72",
  showViewAllLink = false,
  viewAllHref = "#",
  viewAllText = "View All",
  className = "",
  gap = "md"
}: CardCarouselProps) {

  const gridClasses = `flex md:grid ${GRID_COLUMNS[desktopColumns]} ${GAP_SIZES[gap]} min-w-max md:min-w-0 items-stretch`;

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
            <div key={cardData.title || index} className={`shrink-0 ${mobileCardWidth} md:w-auto`}>
              <Card 
                {...cardData}
                size="lg"
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