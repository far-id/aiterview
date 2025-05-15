'use client';
import { useState } from 'react';
import ThemeToggle from './theme-toggle';
import AiterviewNavLogo from './aiterview-nav-logo';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	function linkStyle(currentPath: string | string[]) {
		function isCurrentPath() {
			if (Array.isArray(currentPath)) {
				return currentPath.includes(pathname);
			}
			return pathname === currentPath;
		}
		return clsx('block py-2 px-3  rounded md:bg-transparent md:p-0', {
			'text-blue-700 dark:text-blue-500': isCurrentPath(),
			'text-gray-900 dark:text-white': !isCurrentPath(),
		});
	}
	return (
		<nav className='absolute z-30 top-0 w-full bg-transparent border-gray-200  mb-10'>
			<div className='max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-3'>
				<div className='flex items-center space-x-4'>
					<button
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						onClick={toggleMenu}
					>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M1 1h15M1 7h15M1 13h15'
							/>
						</svg>
					</button>
					<Link href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
						<AiterviewNavLogo />
					</Link>
				</div>
				<div className='flex md:hidden md:items-center md:space-x-8'>
					<ThemeToggle />
				</div>
				<div
					className={clsx('w-full md:block md:w-auto', {
						'hidden': !isMenuOpen,
						'block': isMenuOpen,
					})}
					id='navbar-default'
				>
					<ul className='font-medium bg-background md:bg-transparent flex md:items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700'>
						<li>
							<Link href='/' className={linkStyle('/')} aria-current='page'>
								Home
							</Link>
						</li>
						<li>
							<Link href='/start' className={linkStyle('/interview')}>
								Interview
							</Link>
						</li>
						<li>
							<Link href='#' className={linkStyle('/interview')}>
								Contact
							</Link>
						</li>
						<li className='hidden md:flex'>
							<ThemeToggle />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
