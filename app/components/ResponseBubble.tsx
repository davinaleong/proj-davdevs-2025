import Panel from './Panel'
import Prose from './Prose'

interface ResponseBubbleProps {
  response: string
}

export default function ResponseBubble({ response }: ResponseBubbleProps) {
  return (
    <Panel 
      className="max-w-80 p-4 rounded-lg text-black bg-gray-100 dark:text-white dark:bg-gray-800"
      overwrite={true}
    >
      <Prose className="text-sm">
        {response}
      </Prose>
    </Panel>
  )
}