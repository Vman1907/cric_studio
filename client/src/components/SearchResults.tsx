import { Box, Flex, Text } from '@chakra-ui/react';
import { Product } from '../types/Product';

export default function SearchResults({
	results,
	handleAddProduct,
	fetchingResults,
}: {
	fetchingResults: boolean;
	results: Product[];
	handleAddProduct: (product: Product) => void;
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
			maxHeight={'300px'}
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
					<Text fontWeight={'bold'}>{result.itemName}</Text>
				</Flex>
			))}
		</Flex>
	);
}
