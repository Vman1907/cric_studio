import { Schema, model } from 'mongoose';

interface IProduct {
	SKU: string;
	Name: string;
	Quantity: string;
	Company: string;
	Discount: string;
	MRP: string;
	DomesticMRP: string;
	InternationalMRP: string;
}

const productSchema = new Schema<IProduct>({
	SKU: {
		type: 'String',
		unique: true,
	},
	Name: {
		type: 'String',
	},
	Quantity: {
		type: 'String',
	},
	Company: {
		type: 'String',
	},
	Discount: {
		type: 'String',
		default: '0',
	},
	MRP: {
		type: String,
		default: '0',
	},
	DomesticMRP: {
		type: 'String',
		default: '0',
	},
	InternationalMRP: {
		type: 'String',
		default: '0',
	},
});

const ProductModel = model<IProduct>('Product', productSchema);
export default ProductModel;
