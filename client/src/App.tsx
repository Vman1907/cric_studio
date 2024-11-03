import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Upload from './components/Upload';

function App() {
	const [page, setPage] = useState('home');

	console.log(import.meta.env.VITE_SERVER_URL);

	return (
		<main className='w-screen'>
			<Navbar setPage={setPage} />
			{page === 'home' ? <Search /> : <Upload />}
		</main>
	);
}

export default App;
