'use client'

import { Conversation } from '@/interfaces/conversations';
import { useEffect, useState } from 'react';

export default function useConversation() {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [lastConversation, setLastConversation] = useState<Conversation>();

  const addMessage = (message: Conversation) => {
    setConversation((prev) => [...prev, {
      role: message.role,
      message: message.message,
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


  useEffect(() => {
    setLastConversation(conversation[conversation.length - 1]);
  }, [conversation])


  return {
    lastConversation,
    conversation,
    addMessage,
    clearConversation,
  };
}
