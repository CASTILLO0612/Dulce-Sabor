import { Schema, model } from 'mongoose';

export interface IOrder {
  shape: string;
  dough: string;
  filling: string;
  frostingColor: string;
  messageText: string;
  textColor: string;
  status: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  shape: { type: String, required: true },
  dough: { type: String, required: true },
  filling: { type: String, required: true },
  frostingColor: { type: String, required: true },
  messageText: { type: String, default: '' },
  textColor: { type: String, required: true },
  status: { type: String, default: 'pendiente' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model<IOrder>('Order', OrderSchema);
