'use client'

import { Conversation } from '@/interfaces/conversations';
import { useEffect, useState } from 'react';

export default function useConversation() {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [lastConversation, setLastConversation] = useState<Conversation | null>(null)

  const addMessage = (message: Conversation) => {
    setConversation((prev) => [...prev, {
      id: conversation.length + 1,
      role: message.role,
      message: message.message,
      send_time: Date.now().toString(),
      timeLeft: message.timeLeft ?? undefined,
      category: message.category ?? undefined,
      tips: message.tips ?? undefined,
    }]);

    const storedConversation = window.sessionStorage.getItem('conversation');
    if (storedConversation) {
      const parsedConversation = JSON.parse(storedConversation) as Conversation[];
      window.sessionStorage.setItem('conversation', JSON.stringify([...parsedConversation, message]));
    }
    else {
      window.sessionStorage.setItem('conversation', JSON.stringify([message]));
    }
  };

  const clearConversation = (): void => {
    setConversation([]);
    window.sessionStorage.removeItem('conversation');

  };
  useEffect(() => {
    const storedConversation = window.sessionStorage.getItem('conversation');
    if (storedConversation) {
      const parsedConversation = JSON.parse(storedConversation) as Conversation[];
      setConversation(parsedConversation);
    }
  }, []);

  const getLastConversation = () => {
    const storedConversation = window.sessionStorage.getItem('conversation');
    if (storedConversation) {
      const parsedConversation = JSON.parse(storedConversation) as Conversation[];
      return parsedConversation[parsedConversation.length - 1];
    }
    return null;
  }

  useEffect(() => {
    setLastConversation(getLastConversation());
  }, [conversation])


  return {
    lastConversation,
    conversation,
    addMessage,
    clearConversation,
  };
}
