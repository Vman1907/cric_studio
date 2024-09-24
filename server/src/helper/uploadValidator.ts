export const validateData = (data: any[]): { valid: boolean; errors: string[] } => {
	//check if all the columns are string type only
	const errors: string[] = [];
	const headers = Object.keys(data[0]);
	const requiredHeaders = [
		'Name',
		'SKU',
		'MRP',
		'Company',
		'Quantity',
		'DomesticMRP',
		'InternationalMRP',
		'Discount',
	];

	const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
	if (missingHeaders.length) {
		errors.push(`Missing headers: ${missingHeaders.join(', ')}`);
	}

	const invalidTypes = data.filter((row) => {
		const values = Object.values(row);
		return values.some((value) => typeof value !== 'string');
	});

	if (invalidTypes.length) {
		errors.push('All columns should be string type');
	}

	return {
		valid: errors.length === 0,
		errors,
	};
};
