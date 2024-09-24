/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../utils/api';

export default class DataService {
	static async validateUser(password: string) {
		try {
			const { data } = await api.post('/api/validate', { password });
			return data.success;
		} catch (err: any) {
			return false;
		}
	}

	//check for password in the upload route

	static async uploadFile(file: File, password: string) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('password', password);
		const { data } = await api.post('/api/upload', formData);
		return data.success;
	}

	static async search(keyword: string) {
		try {
			const { data } = await api.get('/api/search', { params: { keyword } });
			return (data.results ?? []).map((result: any) => {
				return {
					Company: result.Company ?? '-',
					Discount: result.Discount ?? '-',
					DomesticMRP: result.DomesticMRP ?? '-',
					InternationalMRP: result.InternationalMRP ?? '-',
					MRP: result.MRP ?? '-',
					Name: result.Name ?? '-',
					Quantity: result.Quantity ?? '-',
					SKU: result.SKU ?? '-',
				};
			});
		} catch (err: any) {
			return null;
		}
	}
}
