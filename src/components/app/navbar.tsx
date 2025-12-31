'use client';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar = () => {
	const pathname = usePathname();

	return (
		<section className='border-b border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
			<div className='container px-4 md:mx-auto flex h-16 items-center justify-between'>
				<Link href={'/'} className='flex items-center space-x-2'>
					<Sparkles fill='currentColor' className='h-8 w-8 text-blue-400' />
					<span className='font-heading text-xl font-bold text-foreground'>Aiterview</span>
				</Link>
				{pathname === '/' ? (
					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='#features'
							className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
						>
							Features
						</Link>
						<Link
							href='#how-it-works'
							className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
						>
							How It Works
						</Link>
						<ThemeToggle />

						<Button
							asChild
							size='sm'
							className='bg-primary hover:bg-primary/80 text-primary-foreground'
						>
							<Link href={'/guidelines'}>Get Started</Link>
						</Button>
					</nav>
				) : (
					<ThemeToggle />
				)}
				<div className='md:hidden flex items-center space-x-2'>
					<ThemeToggle />
				</div>
			</div>
		</section>
	);
};
export default Navbar;
