import { connect } from 'mongoose';

let db = null;

export const init = async () => {
	try {
		if (!db) {
			db = await connect(process.env['CosmosDbConnectionString']);
		}
	} catch (error) {
		console.error('Error connecting to database:', error);
	}
};
