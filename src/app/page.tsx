import Footer from '@/components/my/footer';
import Navbar from '@/components/my/navbar';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Navbar />
			<div className='relative w-full bg-gradient-to-br mx-auto dark:from-background dark:via-zinc-800 dark:to-blue-800 from-white via-gray-100 to-blue-200  h-screen flex items-center justify-center md:justify-between text-center px-6 overflow-hidden transition-colors duration-300 text-foreground dark:text-gray-100'>
				<div className='relative z-10 max-w-3xl'>
					<h1 className='text-3xl md:text-5xl font-bold md:font-extrabold mb-4 tracking-tighter md:tracking-normal text-balance'>
						Tingkatkan Keterampilan Wawancara Anda dengan AI
					</h1>
					<p className='text-sm md:text-lg mb-6 opacity-90 text-balance'>
						Aiterview menghadirkan pengalaman wawancara interaktif berbasis AI yang dirancang untuk
						membantu Anda mempersiapkan diri dan meraih posisi impian dengan percaya diri.
					</p>
					<div className='flex gap-4 justify-center mb-8 '>
						<Link
							href='/guidelines'
							className='hover:bg-gray-800 md:text-lg dark:hover:bg-gray-100 dark:bg-white dark:text-black text-white bg-black font-semibold py-2 px-4 rounded text-sm sm:text-base'
						>
							Mulai Sekarang
						</Link>
					</div>

					<div className='flex justify-center gap-6 text-sm opacity-90 border-t border-border pt-4 dark:border-gray-700'>
						<div className='flex items-center gap-2'>
							<span className='text-lg'>💰</span>
							<span>Gratis</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='text-lg'>🔒</span>
							<span>Privasi Terjamin</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='text-lg'>✅</span>
							<span>Terpercaya</span>
						</div>
					</div>
				</div>
				<div className='inset-0 md:flex hidden justify-center items-center pointer-events-none select-none'>
					<img src='/aiterview-logo.svg' alt='aiterview' className='w-4/5 h-4/5 ' />
				</div>
			</div>
			<Footer />
		</>
	);
}
