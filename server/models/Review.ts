import { Schema, model } from 'mongoose';

export interface IReview {
  name: string;
  role: string;
  text: string;
  stars: number;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export const Review = model<IReview>('Review', ReviewSchema);
