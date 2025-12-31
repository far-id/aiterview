import { Conversation } from '@/interfaces/conversations';
import { buildConversationHistory } from '@/lib/conversationHistoryBuilder';

describe('Conversation History Builder', () => {
  test('Should map conversation without category', () => {
    const conversations: Conversation[] = [{ role: 'user', text: 'Halo' }];
    const history = buildConversationHistory(conversations);

    expect(history[0].role).toBe('user');
    expect(history[0].parts[0].text).toBe('Halo');
  });

  test('Should append category when provided', () => {
    const conversations: Conversation[] = [{
      role: 'model',
      text: 'Apa priject terbaik kamu',
      category: 'behavioral',
    }];

    const history = buildConversationHistory(conversations);

    expect(history[0].parts[0].text)
      .toBe('Apa priject terbaik kamu [Kategori: behavioral]');
  });

  test('Should preserve conversation order', () => {
    const conversations: Conversation[] = [
      { role: 'user', text: 'Pertanyaan' },
      { role: 'model', text: 'Jawaban', category: 'technical' },
    ];

    const history = buildConversationHistory(conversations);

    expect(history[0].role).toBe('user');
    expect(history[1].role).toBe('model');
  });

  test('Should handle empty text safely', () => {
    const conversations: Conversation[] = [{ role: 'user', text: '' }];
    const history = buildConversationHistory(conversations);

    expect(history[0].parts[0].text).toBe('');
  });

  test('Should return empty array when input is empty', () => {
    const history = buildConversationHistory([]);
    expect(history).toEqual([]);
  });
});
