import csv from 'csv-parser';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import { validateData } from './helper/uploadValidator';
import ProductModel from './models/DataModel';

const router = Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
	if (!req.file) {
		return res.status(400).json({ error: 'File is required' });
	}

	if (req.body.password !== 'Cricstudio@2002') {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const fileRows: any[] = [];
	fs.createReadStream(req.file.path)
		.pipe(csv())
		.on('data', (data) => {
			fileRows.push(data);
		})
		.on('end', async () => {

			const { valid, errors } = validateData(fileRows);
			if (!valid) {
				return res.status(400).json({ errors });
			}

			try {
				await ProductModel.deleteMany({});
				await ProductModel.insertMany(fileRows);
				return res.json({ success: true });
			} catch (error) {
				console.error('Error uploading file:', error);
				return res.status(500).json({ error: 'Internal Server Error' });
			}
		});
});

router.get('/search', async (req: Request, res: Response) => {
	const { keyword } = req.query;

	try {
		if (!keyword) {
			return res.status(400).json({ error: 'Keyword is required' });
		}
		const products = await ProductModel.find({
			$or: [
				{ Name: { $regex: keyword, $options: 'i' } },
				{ SKU: { $regex: keyword, $options: 'i' } },
			],
		});

		return res.json({ results: products });
	} catch (error) {
		console.error('Error searching products:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;
