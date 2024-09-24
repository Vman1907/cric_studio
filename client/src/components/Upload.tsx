import { CloseIcon } from '@chakra-ui/icons';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	HStack,
	IconButton,
	Input,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';
import DataService from '../services/data.service';

export default function Upload() {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const [password, setPassword] = React.useState('');
	const [file, setFile] = React.useState<File | null>(null);

	const [validating, setValidating] = React.useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		if (!e.target.files[0].name.endsWith('.csv')) {
			toast({
				title: 'Invalid file',
				description: 'Please upload a CSV file',
				status: 'error',
			});
			return;
		}
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleFileUpload = async () => {
		if (!file) return;
		setValidating(true);
		const promise = DataService.uploadFile(file, password);
		toast.promise(promise, {
			loading: { title: 'Uploading file...', description: 'Please wait' },
			success: () => {
				setFile(null);
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
				setValidating(false);
				setPassword('');
				return {
					title: 'File uploaded',
					description: 'The file has been uploaded successfully',
				};
			},
			error: (err: AxiosError) => {
				setValidating(false);
				if (err?.response?.status === 400) {
					return {
						title: 'Invalid entries',
						description: 'Some entries in the file are invalid',
					};
				}
				if (err?.response?.status === 401) {
					return {
						title: 'Unauthorized',
						description: 'You are not authorized to upload the file',
					};
				}
				return {
					title: 'Error',
					description: 'An error occurred while uploading the file',
				};
			},
		});
	};

	return (
		<div className='px-4'>
			<div className='flex items-center justify-center mt-4'>
				<label
					htmlFor='file-upload'
					className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-100'
				>
					<div className='flex flex-col items-center justify-center pt-8 pb-6'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-12 h-12 text-gray-500 mb-4'
						>
							<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v12m6-6H6' />
						</svg>
						<p className='mb-2 text-sm text-gray-500'>
							<span className='font-semibold'>Select your file</span>
						</p>
					</div>
				</label>
				<input
					ref={fileInputRef}
					id='file-upload'
					type='file'
					className='hidden'
					onInput={handleFileChange}
				/>
			</div>
			<HStack hidden={!file} width={'100%'} justifyContent={'space-between'} mt={'1rem'}>
				<div>{file && file.name}</div>
				<IconButton
					size={'xs'}
					colorScheme='red'
					rounded={'full'}
					aria-label='delete_file'
					icon={<CloseIcon />}
					onClick={() => {
						setFile(null);
						if (fileInputRef.current) {
							fileInputRef.current.value = '';
						}
					}}
				/>
			</HStack>
			<Button
				onClick={onOpen}
				mt={'2rem'}
				width={'100%'}
				colorScheme='black'
				bgColor={'black'}
				color={'white'}
				isDisabled={!file}
			>
				Upload file
			</Button>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader textAlign={'center'} fontSize='lg' fontWeight='bold'>
							Enter admin password
						</AlertDialogHeader>

						<AlertDialogBody>
							<Input
								textAlign={'center'}
								_focus={{ borderColor: 'black', outline: 'black' }}
								_active={{ borderColor: 'black' }}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								colorScheme='black'
								bgColor={'black'}
								width={'100%'}
								onClick={handleFileUpload}
								isLoading={validating}
							>
								Submit
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</div>
	);
}
