import { Schema, model } from 'mongoose';

interface IProduct {
	Sku: string;
	Brand: string;
	department: string;
	itemName: string;
	mrp: string;
	standrate: string;
	dcode: string;
	ahdStore: string;
	mrtStore: string;
	ahdWH: string;
	mrtWH: string;
	domesticRate: string;
	internationalRate: string;
}

const productSchema = new Schema<IProduct>({
	Sku: {
		type: String,
		
	},
	Brand: {
		type: String,
	},
	department: {
		type: String,
	},
	itemName: {
		type: String,
	},
	mrp: {
		type: String,
	},
	standrate: {
		type: String,
	},
	dcode: {
		type: String,
	},
	ahdStore: {
		type: String,
		default: '0',
	},
	mrtStore: {
		type: String,
		default: '0',
	},
	ahdWH: {
		type: String,
		default: '0',
	},
	mrtWH: {
		type: String,
		default: '0',
	},
	domesticRate: {
		type: String,
	},
	internationalRate: {
		type: String,
	},
});

const ProductModel = model<IProduct>('Product', productSchema);
export default ProductModel;
