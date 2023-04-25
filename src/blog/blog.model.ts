import mongoose, { Document, Schema, model } from 'mongoose';

export interface IBlog extends Document {
	_id: string;
	title: string;
	content?: string;
}

const schema = new Schema<IBlog>({
	title: {
		type: String,
		required: true,
		unique: true
	},
	content: String
});

export const Blog = model<IBlog>('Blog', schema);
