export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const dummyResponses = [
  "Hello! How can I help you today?",
  "That's an interesting question. Let me think about it...",
  "I understand what you're asking. Here's my thoughts:\n\n**Key points:**\n- This is a dummy response\n- It demonstrates *markdown formatting*\n- The real AI will be more helpful",
  "Great question! I'm just a dummy chatbot for now, but I can show you how responses will look with:\n\n1. Numbered lists\n2. **Bold text**\n3. *Italic text*\n\nThe real AI will provide much more valuable insights!",
  "I'm processing your request... \n\n```javascript\n// This is how code will be displayed\nconst response = 'formatted nicely';\nconsole.log(response);\n```\n\nPretty cool, right?",
  "Sorry, I didn't quite understand that. Could you rephrase your question?",
  "That's a complex topic! When the real AI is integrated, it will provide detailed analysis and insights.",
  "I'm still learning! The production version will be much smarter and more helpful.",
]

export function generateDummyResponse(userMessage: string): string {
  // Simple logic to vary responses
  const messageLength = userMessage.length
  const responseIndex = messageLength % dummyResponses.length
  return dummyResponses[responseIndex]
}

export function createMessage(content: string, isUser: boolean): Message {
  return {
    id: Math.random().toString(36).substr(2, 9),
    content,
    isUser,
    timestamp: new Date()
  }
}