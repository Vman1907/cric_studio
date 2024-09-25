import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Box, Divider, Flex, Text } from "@chakra-ui/react";

export default function SelectedResults({selectedProducts, type, handleRemoveProduct}:{
    selectedProducts: {
        Company: string;
        Discount: string;
        DomesticMRP: string;
        InternationalMRP: string;
        MRP: string;
        Name: string;
        Quantity: string;
        SKU: string;
    }[];
    type: 'Domestic' | 'International';
    handleRemoveProduct: (product: {
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
			</>
		);
}