'use client';
import ConversationProvider from '@/context/conversationContext';
import React, { ReactNode } from 'react';

export default function layout({ children }: Readonly<{ children: ReactNode }>) {
	return <ConversationProvider>{children}</ConversationProvider>;
}
