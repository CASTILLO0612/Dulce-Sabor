import { Schema, model } from 'mongoose';

export interface IProduct {
  id: string;
  name: string;
  category: string;
  tag: string;
  tagColor: string;
  desc: string;
  longDesc: string;
  price: string;
  flavors: string[];
  benefits: string[];
  specs: string[];
  availability: string;
  img: string;
  alt: string;
}

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  tag: { type: String, required: true },
  tagColor: { type: String, required: true },
  desc: { type: String, required: true },
  longDesc: { type: String, required: true },
  price: { type: String, required: true },
  flavors: [{ type: String }],
  benefits: [{ type: String }],
  specs: [{ type: String }],
  availability: { type: String, required: true },
  img: { type: String, required: true },
  alt: { type: String, required: true },
});

export const Product = model<IProduct>('Product', ProductSchema);
