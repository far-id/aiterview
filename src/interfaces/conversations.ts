export interface Conversation {
  role: 'user' | 'model';
  message: string;
  timeLeft?: number; // Optional if role is 'user'
  category?: 'technical' | 'behavioral' | 'situational'; // Optional if role is 'model'
  tips?: string; // Optional if role is 'model'
}
