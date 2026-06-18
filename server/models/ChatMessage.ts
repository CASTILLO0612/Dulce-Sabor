import { Schema, model } from 'mongoose';

export interface IChatMessage {
  sessionId: string;
  sender: 'user' | 'bot';
  text: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  sessionId: { type: String, required: true },
  sender: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ChatMessage = model<IChatMessage>('ChatMessage', ChatMessageSchema);
