import { Mongoose } from 'mongoose';
import { IBlog, Blog } from './blog.model';

export const createBlogHelper = async (data: IBlog) => {
	try {
		const blogId = await Blog.create(data);
		return blogId;
	} catch (error) {
		throw error;
	}
};

export const getBlogHelper = async (blogId: string) => {
	try {
		if (blogId) return await Blog.findById(blogId, { __v: 0 }, { lean: true });
		else return await Blog.find({}, { __v: 0 }, { lean: true });
	} catch (error) {
		throw error;
	}
};

export const deleteBlogHelper = async (blogId: string) => {
	try {
		await Blog.findByIdAndRemove(blogId);
	} catch (error) {
		throw error;
	}
};
