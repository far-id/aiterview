import { Conversation } from '@/interfaces/conversations';
import { normalizeConversationText } from './utils';

export function buildConversationHistory(conversations: Conversation[]) {
  return conversations.map((message) => ({
    role: message.role,
    parts: [{
      text:
        message.category ?
          `${normalizeConversationText(message.text)} [Kategori: ${message.category}]` :
          normalizeConversationText(message.text)
    }],
  }));
}
