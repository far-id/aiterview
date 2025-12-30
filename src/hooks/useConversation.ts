'use client'

import { Conversation } from '@/interfaces/conversations';
import { useEffect, useState } from 'react';

export default function useConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [lastConversation, setLastConversation] = useState<Conversation>();

  const addConversation = (message: Conversation) => {
    setConversations((prev) => [...prev, message]);
  };

  const clearConversation = (): void => {
    setConversations([]);
    setLastConversation(undefined);
    sessionStorage.removeItem('conversation');
  };

  const removeLastConversation = () => {
    setConversations((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const storedConversation = sessionStorage.getItem('conversation');
    if (storedConversation) {
      const parsedConversation = JSON.parse(storedConversation) as Conversation[];
      setConversations(parsedConversation);
    }
  }, []);


  useEffect(() => {
    sessionStorage.setItem('conversation', JSON.stringify(conversations));
    setLastConversation(conversations.at(-1));
  }, [conversations])


  return {
    lastConversation,
    conversations,
    addConversation,
    clearConversation,
    removeLastConversation,
  };
}
