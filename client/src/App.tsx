import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Upload from './components/Upload';

function App() {
	const [page, setPage] = useState('home');

	return (
		<main className='max-w-md w-full mx-auto'>
			<Navbar setPage={setPage} />
			{page === 'home' ? <Search /> : <Upload />}
		</main>
	);
}

export default App;
