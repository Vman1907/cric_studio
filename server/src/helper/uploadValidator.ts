export const validateData = (data: any[]): { valid: boolean; errors: string[] } => {
	const errors: string[] = [];
	const headers = Object.keys(data[0]);
	const requiredHeaders = [
		'Sku',
		'Brand',
		'department',
		'itemName',
		'mrp',
		'standrate',
		'dcode',
		'ahdStore',
		'mrtStore',
		'ahdWH',
		'mrtWH',
		'total',
		'domesticRate',
		'internationalRate',
	];

	console.log(data[0]);

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
