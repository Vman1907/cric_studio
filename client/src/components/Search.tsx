import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
	Box,
	Divider,
	Flex,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
	useBoolean,
	useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import DataService from '../services/data.service';
import { Product } from '../types/Product';
import SearchResults from './SearchResults';
import SelectedResults from './SelectedResults';

export default function Search() {
	const toast = useToast();
	const [type, setType] = useState<'Domestic' | 'International'>('Domestic');
	const [value, { toggle }] = useBoolean();
	const [search, setSearch] = useState<string>('');
	const [fetchingResults, setFetchingResults] = useState<boolean>(false);

	const [results, setResults] = useState<Product[]>([]);

	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	const handleAddProduct = (product: Product) => {
		if (selectedProducts.find((p) => p.Sku === product.Sku)) {
			toast({
				title: 'Error',
				description: 'Product already added',
				status: 'error',
			});
			return;
		}
		setSelectedProducts([...selectedProducts, product]);
	};

	const handleRemoveProduct = (product: Product) => {
		const newProducts = selectedProducts.filter((p) => p.Sku !== product.Sku);
		setSelectedProducts(newProducts);
	};

	const debouncedSearchTerm = useDebounce<string>(search, 500);

	const fetchResults = useCallback(
		async (keyword: string) => {
			setFetchingResults(true);
			const data = await DataService.search(keyword);
			if (!data) {
				return toast({
					title: 'Error',
					description: 'Error fetching results',
					status: 'error',
				});
			}
			setResults(data);
			setFetchingResults(false);
		},
		[toast]
	);

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchResults(debouncedSearchTerm);
		} else {
			setResults([]);
		}
	}, [debouncedSearchTerm, fetchResults]);

	return (
		<Box mt={'2rem'} px={'0.5rem'} pb={'1rem'}>
			<Flex
				direction={type === 'Domestic' ? 'column' : 'column-reverse'}
				cursor={'pointer'}
				bgColor={'black'}
				color={'white'}
				py={'0.5rem'}
				rounded={'xl'}
				position={'relative'}
				height={value ? '80px' : '40px'}
				className='transition-[1s]'
				justifyContent={'start'}
				overflow={'hidden'}
				gap={'0.5rem'}
			>
				<Box
					onClick={() => {
						toggle();
						setType('Domestic');
					}}
					textAlign={'center'}
					justifySelf={'start'}
				>
					<Text fontWeight={'medium'}>Domestic</Text>
				</Box>
				<Divider />
				<Box
					onClick={() => {
						toggle();
						setType('International');
					}}
					textAlign={'center'}
					justifySelf={'start'}
				>
					<Text fontWeight={'medium'}>International</Text>
				</Box>
				<ChevronDownIcon onClick={toggle} position={'absolute'} right={'1rem'} top={'0.7rem'} />
			</Flex>
			<InputGroup mt={'1rem'}>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					variant={'filled'}
					placeholder={'Search a product'}
				/>
				<InputRightAddon>
					<CloseIcon onClick={() => setSearch('')} />
				</InputRightAddon>
			</InputGroup>
			<SearchResults
				fetchingResults={fetchingResults}
				results={results}
				handleAddProduct={handleAddProduct}
			/>
			<SelectedResults
				handleRemoveProduct={handleRemoveProduct}
				selectedProducts={selectedProducts}
				type={type}
			/>
		</Box>
	);
}
