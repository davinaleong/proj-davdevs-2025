import Panel from './Panel'
import Prose from './Prose'

interface ResponseBubbleProps {
  response: string
  sources?: string[]
}

export default function ResponseBubble({ response, sources }: ResponseBubbleProps) {
  return (
    <Panel 
      className="max-w-80 p-4 rounded-lg text-black bg-gray-100 dark:text-white dark:bg-gray-800"
      overwrite={true}
    >
      <Prose className="text-sm">
        {response}
      </Prose>
      
      {sources && sources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            📚 Sources:
          </div>
          <div className="space-y-1">
            {sources.map((source, index) => (
              <div 
                key={index} 
                className="text-xs text-blue-600 dark:text-blue-400 truncate"
                title={source}
              >
                • {source.split('/').pop() || source}
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  )
}