export interface Conversation {
  role: 'user' | 'model';
  text: string;
  category?: 'technical' | 'behavioral' | 'situational'; // Optional if role is 'model'
  tips?: string; // Optional if role is 'model'
}
