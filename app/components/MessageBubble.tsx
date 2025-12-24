import Panel from './Panel'

interface MessageBubbleProps {
  message: string
  isUser: boolean
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <Panel 
      className={`max-w-80 p-4 rounded-sm ${
        isUser 
          ? 'self-end text-white bg-blue-500 dark:bg-blue-600' 
          : 'text-black bg-gray-100 dark:text-white dark:bg-gray-800'
      }`}
      overwrite={true}
    >
      {message}
    </Panel>
  )
}