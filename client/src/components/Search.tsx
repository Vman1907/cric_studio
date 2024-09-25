import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
	Badge,
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
import SearchResults from './SearchResults';

export default function Search() {
	const toast = useToast();
	const [type, setType] = useState<'Domestic' | 'International'>('Domestic');
	const [value, { toggle }] = useBoolean();
	const [search, setSearch] = useState<string>('');
	const [fetchingResults, setFetchingResults] = useState<boolean>(false);

	const [results, setResults] = useState<
		{
			Company: string;
			Discount: string;
			DomesticMRP: string;
			InternationalMRP: string;
			MRP: string;
			Name: string;
			Quantity: string;
			SKU: string;
		}[]
	>([]);

	const [selectedProducts, setSelectedProducts] = useState<
		{
			Company: string;
			Discount: string;
			DomesticMRP: string;
			InternationalMRP: string;
			MRP: string;
			Name: string;
			Quantity: string;
			SKU: string;
		}[]
	>([]);

	const handleAddProduct = (product: {
		Company: string;
		Discount: string;
		DomesticMRP: string;
		InternationalMRP: string;
		MRP: string;
		Name: string;
		Quantity: string;
		SKU: string;
	}) => {
		if (selectedProducts.find((p) => p.SKU === product.SKU)) {
			toast({
				title: 'Error',
				description: 'Product already added',
				status: 'error',
			});
			return;
		}
		setSelectedProducts([...selectedProducts, product]);
	};

	const handleRemoveProduct = (product: {
		Company: string;
		Discount: string;
		DomesticMRP: string;
		InternationalMRP: string;
		MRP: string;
		Name: string;
		Quantity: string;
		SKU: string;
	}) => {
		const newProducts = selectedProducts.filter((p) => p.SKU !== product.SKU);
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
			<Flex mt={'0.5rem'} gap={'0.5rem'} overflowX={'auto'} className='hidden-scrollbar'>
				{selectedProducts.map((product, index) => (
					<Badge
						display={'flex'}
						alignItems={'center'}
						key={index}
						variant='solid'
						colorScheme='unstyled'
						bgColor={'black'}
						rounded={'md'}
						color={'white'}
						py={'0.5rem'}
						px={'1rem'}
					>
						<Text>{product.Name}</Text>
						<CloseIcon
							fontSize={'x-small'}
							ml={'0.5rem'}
							onClick={() => handleRemoveProduct(product)}
						/>
					</Badge>
				))}
			</Flex>

			<Flex direction={'column'} gap={'1rem'} mt={'1rem'}>
				{selectedProducts.map((product, index) => (
					<Flex key={index} borderWidth={'1px'} borderColor={'black'} rounded={'lg'}>
						<Box p={'1rem'}>
							<Text>SKU</Text>
							<Text>Name</Text>
							<Text>Quantity</Text>
							<Text>Company</Text>
							<Text>Discount</Text>
							<Text>MRP</Text>
							{type === 'Domestic' && <Text>MRP(Dom.)</Text>}
							{type === 'International' && <Text>MRP(Int.)</Text>}
						</Box>
						<Divider orientation={'vertical'} color={'black'} height={'200px'} />
						<Box p={'1rem'} whiteSpace={'nowrap'} overflow={'hidden'}>
							<Text>{product.SKU === '' ? '-' : product.SKU}</Text>
							<Text>{product.Name === '' ? '' : product.Name}</Text>
							<Text>{product.Quantity === '' ? '-' : product.Quantity}</Text>
							<Text>{product.Company === '' ? '-' : product.Company}</Text>
							<Text>{product.Discount === '' ? '-' : product.Discount}</Text>
							<Text>{product.MRP === '' ? '-' : product.MRP}</Text>
							{type === 'Domestic' && (
								<Text>{product.DomesticMRP === '' ? '-' : product.DomesticMRP}</Text>
							)}
							{type === 'International' && (
								<Text>{product.InternationalMRP === '' ? '-' : product.InternationalMRP}</Text>
							)}
						</Box>
					</Flex>
				))}
			</Flex>
		</Box>
	);
}
