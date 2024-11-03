import { CloseIcon } from '@chakra-ui/icons';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { Product } from '../types/Product';

export default function SelectedResults({
	selectedProducts,
	type,
	handleRemoveProduct,
}: {
	selectedProducts: Product[];
	type: 'Domestic' | 'International';
	handleRemoveProduct: (product: Product) => void;
}) {
	return (
		<>
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
						<Text>{product.itemName}</Text>
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
							<Text>Brand</Text>
							<Text>Department</Text>
							<Text>MRP</Text>
							<Text>S-Rate</Text>
							<Text>D-CODE</Text>
							<Text>AHD-Store</Text>
							<Text>MRT-Store</Text>
							<Text>AHD-WH</Text>
							<Text>MRT-WH</Text>
							<Text>Total</Text>
							{type === 'Domestic' && <Text>MRP(Dom.)</Text>}
							{type === 'International' && <Text>MRP(Int.)</Text>}
						</Box>
						<Box className='w-[1px]  bg-black' />
						<Box p={'1rem'} whiteSpace={'nowrap'} overflow={'hidden'}>
							<Text>{product.Sku === '' ? '-' : product.Sku}</Text>
							<Text>{product.itemName === '' ? '' : product.itemName}</Text>
							<Text>{product.Brand === '' ? '-' : product.Brand}</Text>
							<Text>{product.department === '' ? '-' : product.department}</Text>
							<Text>{product.mrp === '' ? '-' : product.mrp}</Text>
							<Text>{product.standrate === '' ? '-' : product.standrate}</Text>
							<Text>{product.dcode === '' ? '-' : product.dcode}</Text>
							<Text>{product.ahdStore === '' ? '-' : product.ahdStore}</Text>
							<Text>{product.mrtStore === '' ? '-' : product.mrtStore}</Text>
							<Text>{product.ahdWH === '' ? '-' : product.ahdWH}</Text>
							<Text>{product.mrtWH === '' ? '-' : product.mrtWH}</Text>
							<Text>{Number(product.ahdStore) + Number(product.mrtStore)}</Text>
							{type === 'Domestic' && (
								<Text>{product.domesticRate === '' ? '-' : product.domesticRate}</Text>
							)}
							{type === 'International' && (
								<Text>{product.internationalRate === '' ? '-' : product.internationalRate}</Text>
							)}
						</Box>
					</Flex>
				))}
			</Flex>
		</>
	);
}
