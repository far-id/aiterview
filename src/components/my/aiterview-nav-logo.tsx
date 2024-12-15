import clsx from 'clsx';
import React from 'react';

type Props = {};

export default function AiterviewNavLogo() {
	return (
		<div className='flex text-color-1'>
			<img src='aiterview-logo.svg' alt='aiterview-logo' className='w-12 h-12 ' />
			<span className='self-center text-2xl font-semibold whitespace-nowrap'>Aiterview</span>
		</div>
	);
}
