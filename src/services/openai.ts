// Mock OpenAI service for development
const MOCK_RESPONSES = {
  greeting: "Hello! I'm your AI assistant. How can I help you today?",
  default: "I understand. Let me help you with that.",
  error: "I'm having trouble processing that request. Could you try rephrasing it?"
};

export async function createThread(): Promise<string> {
  return 'mock-thread-' + Date.now();
}

export async function sendMessage(threadId: string, content: string): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simple mock response logic
  if (content.toLowerCase().includes('hello')) {
    return MOCK_RESPONSES.greeting;
  }
  
  return MOCK_RESPONSES.default;
}