import { Box, Flex, Text } from '@chakra-ui/react';

export default function SearchResults({
	results,
	handleAddProduct,
	fetchingResults,
}: {
	fetchingResults: boolean;
	results: {
		Company: string;
		Discount: string;
		DomesticMRP: string;
		InternationalMRP: string;
		MRP: string;
		Name: string;
		Quantity: string;
		SKU: string;
	}[];
	handleAddProduct: (product: {
		Company: string;
		Discount: string;
		DomesticMRP: string;
		InternationalMRP: string;
		MRP: string;
		Name: string;
		Quantity: string;
		SKU: string;
	}) => void;
}) {
	if (fetchingResults) {
		return (
			<Box
				mt={'1rem'}
				bgColor={'gray.100'}
				p={'1rem'}
				rounded={'md'}
				my={'0.5rem'}
				fontWeight={'bold'}
				textAlign={'center'}
			>
				Loading ...
			</Box>
		);
	}

	return (
		<Flex
			maxHeight={'600px'}
			overflowY={'auto'}
			direction={'column'}
			gap={'1rem'}
			mt={'1rem'}
			bgColor={'gray.100'}
			p={'1rem'}
			rounded={'md'}
			my={'0.5rem'}
		>
			{results.length === 0 && (
				<Text fontWeight={'bold'} textAlign={'center'}>
					No results found
				</Text>
			)}
			{results.map((result, index) => (
				<Flex gap={2} key={index} onClick={() => handleAddProduct(result)}>
					<Text>{index + 1}. </Text>
					<Text fontWeight={'bold'}>{result.Name}</Text>
				</Flex>
			))}
		</Flex>
	);
}
