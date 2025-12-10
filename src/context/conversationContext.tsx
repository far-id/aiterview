'use client';
import useConversation from '@/hooks/useConversation';
import React, { createContext, ReactNode, useContext } from 'react';

type conversationContextType = ReturnType<typeof useConversation>;

const ConversationContext = createContext<conversationContextType | null>(null);

export default function ConversationProvider({ children }: Readonly<{ children: ReactNode }>) {
	const conversation = useConversation();
	return (
		<ConversationContext.Provider value={conversation}>{children}</ConversationContext.Provider>
	);
}

export function useConversationContext() {
	const ctx = useContext(ConversationContext);
	if (!ctx) {
		throw new Error('useInterviewContext must be used inside InterviewProvider');
	}
	return ctx;
}
