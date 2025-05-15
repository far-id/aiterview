'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	function handleThemeChange() {
		if (theme === 'light') setTheme('dark');
		else setTheme('light');
	}

	return (
		<Button
			size='icon'
			onClick={handleThemeChange}
			className='bg-background hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-900 dark:text-white  rounded-full p-1'
		>
			<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-300' />
			<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
};

export default ThemeToggle;
