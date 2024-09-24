import { AttachmentIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export default function Navbar({ setPage }: { setPage: (page: string) => void }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);

	return (
		<nav>
			<div className='flex flex-row w-full bg-black items-center'>
				<IconButton
					aria-label='menu'
					icon={<HamburgerIcon className='!text-white' />}
					className='bg-transparent'
					variant={'ghost'}
					ref={btnRef}
					onClick={onOpen}
				/>
				<Text className='text-white mx-auto font-bold'>CRICSTUDIO</Text>
			</div>
			<Drawer isOpen={isOpen} size={'xs'} placement='left' onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton className='text-white' />

					<DrawerBody className='!bg-black'>
						<Flex direction={'column'} mt={'4rem'} gap={'0.5rem'}>
							<Button
								onClick={() => {
									onClose();
									setPage('home');
								}}
								variant={'ghost'}
								color={'white'}
								colorScheme='black'
								leftIcon={<SearchIcon />}
							>
								Search
							</Button>
							<Button
								onClick={() => {
									onClose();
									setPage('upload');
								}}
								variant={'ghost'}
								color={'white'}
								colorScheme='black'
								leftIcon={<AttachmentIcon />}
							>
								Upload
							</Button>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</nav>
	);
}
