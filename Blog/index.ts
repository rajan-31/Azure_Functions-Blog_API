import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import * as db from '../src/helpers/db';
import { createBlogHelper, getBlogHelper, deleteBlogHelper } from '../src/blog/blog.service';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
	await db.init();
	const blogId = req.params.blogId;

	switch (req.method) {
		case 'POST':
			await createBlog(context, req);
			break;

		case 'GET':
			await getBlog(context, req, blogId);
			break;

		case 'DELETE':
			await deleteBlog(context, req, blogId);
			break;

		default:
			context.res = {
				status: 405,
				body: 'Method Not Allowed'
			};
	}
};

const createBlog = async function (context: Context, req: HttpRequest): Promise<void> {
	try {
		const blog = req.body;
		const blogId = await createBlogHelper(blog);

		context.res = { status: 200, body: { blogId: blogId } };
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000) {
			context.res = { status: 400, body: { message: 'Duplicate blog title' } };
		} else {
			context.res = { status: 500, body: { message: 'Server error' } };
			console.log(error);
		}
	}
};

const getBlog = async function (context: Context, req: HttpRequest, blogId: string): Promise<void> {
	try {
		const blog = await getBlogHelper(blogId);
		context.res = { status: 200, body: { message: 'Blog retrieved successfully', blog: blog } };
	} catch (error) {
		context.res = { status: 500, message: 'Server error' };
		console.log(error);
	}
};

const deleteBlog = async function (context: Context, req: HttpRequest, blogId: string): Promise<void> {
	try {
		await deleteBlogHelper(blogId);
		context.res = { status: 200, body: { message: 'Blog deleted successfully' } };
	} catch (error) {
		context.res = { status: 500, message: 'Server error' };
		console.log(error);
	}
};

export default httpTrigger;
