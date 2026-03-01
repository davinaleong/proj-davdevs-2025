import { MessageCircle } from 'lucide-react'
import Button from './Button'

interface ChatToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export default function ChatToggle({ isOpen, onToggle }: ChatToggleProps) {
  return (
    <Button 
      className="fixed bottom-4 right-4 p-3 shadow-lg" 
      onClick={onToggle}
      variant="primary"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      title={isOpen ? 'Close chat' : 'Open chat'}
    >
      <MessageCircle size={24} />
    </Button>
  )
}