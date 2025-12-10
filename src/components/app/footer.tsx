'use client';
import React from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import AiterviewNavLogo from './aiterview-nav-logo';
import { usePathname } from 'next/navigation';

const Footer = () => {
	const pathname = usePathname();

	return (
		<footer className='bg-background dark:text-white text-center md:text-left text-black py-10'>
			<div className='container mx-auto px-4 max-w-6xl'>
				{pathname === '/' && (
					<div className='flex flex-col gap-y-2 justify-center items-center'>
						<h2 className='text-xl sm:text-3xl tracking-tight font-semibold'>
							Siap untuk{' '}
							<span className='bg-blue-500 text-white px-1'>
								Meningkatkan Keterampilan Wawancara Anda
							</span>
							{/* */}?
						</h2>
						<p className='mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base'>
							Gunakan pelatih wawancara berbasis AI kami secara{' '}
							<span className='text-yellow-600 dark:text-yellow-400'>GRATIS</span>
						</p>
						<Link
							href={'/guidelines'}
							className='mt-4 md:text-lg hover:bg-gray-800 dark:hover:bg-gray-100 dark:bg-white dark:text-black text-white bg-black font-semibold py-2 px-4 rounded text-sm sm:text-base'
						>
							Mulai Sekarang
						</Link>
					</div>
				)}

				<div className='flex flex-col md:flex-row justify-center md:justify-around items-start mt-16'>
					<div className='mt-4 sm:mt-0 flex flex-col items-center sm:items-start'>
						<AiterviewNavLogo />
						<p className='text-gray-600 dark:text-gray-400 max-w-md text-balance '>
							Platform berbasis AI yang membantu pencari kerja berlatih dan meningkatkan kemampuan
							wawancara mereka.
						</p>
					</div>

					<div className='flex flex-col mx-auto items-center justify-center md:justify-start mt-2 md:mt-0 space-y-2 md:space-y-4'>
						<Link
							href={'/'}
							className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm sm:text-base'
						>
							Home
						</Link>
						<Link
							href={'/start'}
							className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm sm:text-base'
						>
							Interview
						</Link>
						<Link
							href={'#'}
							className='text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm sm:text-base'
						>
							Privacy Policy
						</Link>
					</div>

					<div className='mt-4 sm:mt-0 flex mx-auto flex-col items-center md:items-start'>
						<p className='text-lg sm:text-xl font-semibold'>Hubungi Kami</p>
						<p className='text-gray-400 text-sm sm:text-base'>Email: fsrizkywijaya@gmail.com</p>
					</div>
				</div>
				<Separator className='my-4' />
				<p className='text-gray-500 text-center'>© 2025 Aiterview. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
